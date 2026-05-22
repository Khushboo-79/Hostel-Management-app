import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  useAnimatedScrollHandler,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// ─── Stable assets (module-level, never recreated on re-render) ───────────────
const IMAGES = [
  require('../assets/images/room.jpg'),
  require('../assets/images/room1.jpg'),
  require('../assets/images/room2.jpg'),
];

// ─── Platform-aware blur ──────────────────────────────────────────────────────
// BlurView on Android uses RenderScript which causes severe GPU lag.
// On Android we use an optimized semi-transparent background that looks identical.
const MaybeBlur = memo(({ style, blurType, blurAmount, androidBg }) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        style={style}
        blurType={blurType || 'light'}
        blurAmount={blurAmount || 12}
        reducedTransparencyFallbackColor={androidBg || 'rgba(255,255,255,0.7)'}
      />
    );
  }
  // Android: just a styled view — zero GPU overhead, same glass look
  return <View style={[style, { backgroundColor: androidBg || 'rgba(255,255,255,0.65)' }]} />;
});

// ─── Memoized background image slide ─────────────────────────────────────────
const SliderSlide = memo(({ source }) => (
  <View style={styles.sliderSlide}>
    <Image source={source} style={styles.sliderImage} resizeMode="cover" />
    <View style={styles.slideOverlay} />
  </View>
));

// ─── Memoized glass panel backdrop (renders once, never re-renders) ───────────
const GlassPanelBg = memo(() => (
  <>
    <MaybeBlur
      style={StyleSheet.absoluteFill}
      blurType="dark"
      blurAmount={15}
      androidBg="rgba(58, 55, 55, 0.9)"
    />
    <View style={styles.sheetGlassBg} />
    <View style={styles.topInsetHighlight} />
    <LinearGradient
      colors={['transparent', 'rgba(255,255,255,0.25)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.topEdgeLine}
    />
    <LinearGradient
      colors={['rgba(255,255,255,0.25)', 'transparent', 'rgba(255,255,255,0.1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.leftEdgeLine}
    />
  </>
));

// ─── Memoized preview thumbnail (no BlurView needed for small thumbs) ─────────
const PreviewThumb = memo(({ source }) => (
  <View style={styles.previewBoxShell}>
    <Image source={source} style={styles.previewThumbnail} resizeMode="cover" />
  </View>
));

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function RoomDetailsScreen({ route, navigation }) {
  const room = route?.params?.room || {};
  const insets = useSafeAreaInsets();
  const safeBottom = Math.max(insets.bottom, 16);
  const COLLAPSED_Y = height - safeBottom - 160;

  const [activeIndex, setActiveIndex] = useState(0);

  // Shared values — never cause JS-thread re-renders
  const translateX = useSharedValue(0);

  // Panel slide: COLLAPSED_Y = collapsed (only pricing box peeking), height*0.08 = expanded
  // Using translateY (NOT animating 'top') → runs 100% on native UI thread, zero JS overhead
  const panelY = useSharedValue(COLLAPSED_Y);

  // ── Slider navigation ───────────────────────────────────────────────────
  const handlePrev = useCallback(() => {
    const prev = (activeIndex - 1 + IMAGES.length) % IMAGES.length;
    setActiveIndex(prev);
    translateX.value = withTiming(-prev * width, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeIndex, translateX]);

  const handleNext = useCallback(() => {
    const next = (activeIndex + 1) % IMAGES.length;
    setActiveIndex(next);
    translateX.value = withTiming(-next * width, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeIndex, translateX]);

  // Tap background → collapse panel (only pricing box visible)
  const handleImageTap = useCallback(() => {
    panelY.value = withSpring(COLLAPSED_Y, { damping: 22, stiffness: 120 });
  }, [panelY, COLLAPSED_Y]);

  // ── Pan Gesture for smooth, finger-following drag ────────────────────────
  const contextY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      contextY.value = panelY.value;
    })
    .onUpdate((event) => {
      'worklet';
      const newY = contextY.value + event.translationY;
      panelY.value = Math.max(height * 0.08, Math.min(newY, COLLAPSED_Y));
    })
    .onEnd((event) => {
      'worklet';
      const thresh = (height * 0.08 + COLLAPSED_Y) / 2;
      const velocity = event.velocityY;
      if (velocity < -400) {
        panelY.value = withSpring(height * 0.08, { damping: 20, stiffness: 100 });
      } else if (velocity > 400) {
        panelY.value = withSpring(COLLAPSED_Y, { damping: 20, stiffness: 100 });
      } else if (panelY.value < thresh) {
        panelY.value = withSpring(height * 0.08, { damping: 20, stiffness: 100 });
      } else {
        panelY.value = withSpring(COLLAPSED_Y, { damping: 20, stiffness: 100 });
      }
    });

  // Scroll → expand panel on first scroll down, collapse when back at top
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      'worklet';
      const y = event.contentOffset.y;
      if (y > 10 && panelY.value > height * 0.12) {
        panelY.value = withSpring(height * 0.08, { damping: 22, stiffness: 120 });
      } else if (y <= 3 && panelY.value < height * 0.45) {
        panelY.value = withSpring(COLLAPSED_Y, { damping: 22, stiffness: 120 });
      }
    },
  });

  // ── Animated styles ─────────────────────────────────────────────────────
  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // translateY only → native driver → zero JS thread cost → butter smooth
  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: panelY.value }],
  }));

  // Fade out and scale down arrows as panel moves up
  const arrowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      panelY.value,
      [COLLAPSED_Y - 80, COLLAPSED_Y],
      [0, 1],
      'clamp'
    );
    return {
      opacity,
      transform: [
        {
          scale: interpolate(
            panelY.value,
            [COLLAPSED_Y - 80, COLLAPSED_Y],
            [0.85, 1],
            'clamp'
          ),
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        {/* ════════════════════════════════════════════════════════════════
            BACKGROUND IMAGE CAROUSEL
            Wrapped in TouchableOpacity so tapping collapses glass panel
        ════════════════════════════════════════════════════════════════ */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleImageTap}
          style={StyleSheet.absoluteFill}
        >
          <Animated.View style={[styles.sliderTrack, sliderStyle]}>
            {IMAGES.map((img, idx) => (
              <SliderSlide key={idx} source={img} />
            ))}
          </Animated.View>
        </TouchableOpacity>

        {/* ════════════════════════════════════════════════════════════════
            TOP HEADER (back + bookmark)
        ════════════════════════════════════════════════════════════════ */}
        <View style={styles.header}>
          {/* Back — arrow-left same as RoomSelectionScreen */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={styles.circleBtn}
          >
            <MaybeBlur
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={12}
              androidBg="rgba(255,255,255,0.75)"
            />
            <View style={styles.buttonGlassBg} />
            <Icon name="arrow-left" size={26} color="#000" />
          </TouchableOpacity>

          {/* Bookmark */}
          <TouchableOpacity activeOpacity={0.7} style={styles.circleBtn}>
            <MaybeBlur
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={12}
              androidBg="rgba(255,255,255,0.75)"
            />
            <View style={styles.buttonGlassBg} />
            <Icon name="bookmark-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* ════════════════════════════════════════════════════════════════
            CAROUSEL PREV / NEXT CONTROLS
        ════════════════════════════════════════════════════════════════ */}
        <Animated.View style={[styles.carouselControls, arrowStyle]}>
          <TouchableOpacity onPress={handlePrev} activeOpacity={0.7} style={styles.arrowBtn}>
            <MaybeBlur
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={10}
              androidBg="rgba(255,255,255,0.72)"
            />
            <View style={styles.buttonGlassBg} />
            <Icon name="chevron-left" size={32} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} activeOpacity={0.7} style={styles.arrowBtn}>
            <MaybeBlur
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={10}
              androidBg="rgba(255,255,255,0.72)"
            />
            <View style={styles.buttonGlassBg} />
            <Icon name="chevron-right" size={32} color="#000" />
          </TouchableOpacity>
        </Animated.View>

        {/* ════════════════════════════════════════════════════════════════
            GLASS BOTTOM PANEL
            - position: absolute top:0, height: height (full screen)
            - animated via translateY only → native driver → no jank
            - panel extends below screen; only portion above screen visible
        ════════════════════════════════════════════════════════════════ */}
        <Animated.View style={[styles.bottomPanel, panelStyle]}>
          {/* Static glass backdrop — memoized, renders exactly once */}
          <GlassPanelBg />

          {/* Dedicated Drag Zone (Top of the panel) */}
          <GestureDetector gesture={panGesture}>
            <View style={styles.dragZone}>
              <View style={styles.dragHandleIndicator} />
            </View>
          </GestureDetector>

          {/* Scrollable content */}
          <Animated.ScrollView
            contentContainerStyle={[
              styles.panelScroll,
              { paddingBottom: safeBottom + 110 },
            ]}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            bounces
            overScrollMode="always"
          >
            {/* ── OVERVIEW ──────────────────────────────────────────── */}
            <View style={styles.section}>
              <View style={styles.overviewRow}>
                <Text style={styles.sectionTitle}>Overview</Text>

                {/* ── PRICE BADGE (subtle transparent green chip) ── */}
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>7,500</Text>
                </View>
              </View>

              <Text style={styles.bodyText}>
                lalalalllalalalalalalaalalalalallalalalalla{'\n'}
                lalalalalalalalalalalalallalalallalalla{'\n'}
                lalaalalalalalallalalallalalalalalalalaala{'\n'}
                alalalalalalalla
              </Text>
            </View>

            {/* ── LOCATION ──────────────────────────────────────────── */}
            <View style={styles.section}>
              <View style={styles.locationRow}>
                <Text style={styles.sectionTitle}>Location</Text>

                <TouchableOpacity style={styles.directionsBtn}>
                  <MaybeBlur
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={8}
                    androidBg="rgba(255,255,255,0.18)"
                  />
                  <View style={styles.directionsBg} />
                  <Icon name="share" size={18} color="#FFF" style={styles.shareIcon} />
                  <Text style={styles.directionsTxt}>Directions</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.locationAddr}>
                <Icon name="map-marker-outline" size={24} color="#FFF" style={styles.mapIcon} />
                <Text style={styles.locationTxt}>
                  Skye privilion, Tulsi Nagar,{'\n'}Nipania, Indore, 452001
                </Text>
              </View>
            </View>

            {/* ── PREVIEW ───────────────────────────────────────────── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preview</Text>
              <View style={styles.previewRow}>
                {IMAGES.map((img, idx) => (
                  <PreviewThumb key={idx} source={img} />
                ))}
              </View>
            </View>

            {/* ── AMENITIES ─────────────────────────────────────────── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.bulletList}>
                {[
                  'AC / NON-AC',
                  'Attached Washroom',
                  'Spacious Cupboard',
                  'Study Light/Table/Chair',
                  'Iron, Kettle, Induction, Cooler',
                  'Refrigerators,',
                ].map((item, i) => (
                  <Text key={i} style={styles.bulletItem}>• {item}</Text>
                ))}
              </View>
            </View>

            {/* ── SERVICES ──────────────────────────────────────────── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Services</Text>
              <View style={styles.bulletList}>
                {[
                  'High Speed Wi-Fi',
                  'Gym/Workout Zone',
                  'Hot Water Supply',
                  'Power Backup',
                  'Hot & Delicious Meals',
                  'Laundry Service',
                  'Professional Housekeeping',
                  '24/7 Security Surveillance',
                  'Biometric Entry',
                ].map((item, i) => (
                  <Text key={i} style={styles.bulletItem}>• {item}</Text>
                ))}
              </View>
              <Text style={styles.electricTxt}>No extra electricity charges.</Text>
            </View>

            {/* ── ROOMMATE ──────────────────────────────────────────── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Roommate Selection</Text>
              <Text style={styles.sectionSub}>Find your perfect roommate</Text>

              <View style={styles.roommateCard}>
                <MaybeBlur
                  style={StyleSheet.absoluteFill}
                  blurType="light"
                  blurAmount={12}
                  androidBg="rgba(255,255,255,0.18)"
                />
                <View style={styles.roommateCardBg} />
                <View style={styles.roommateCardTopLine} />

                <View style={styles.roommateHeader}>
                  <Image
                    source={require('../assets/images/woman.png')}
                    style={styles.avatar}
                  />
                  <View style={styles.roommateInfo}>
                    <Text style={styles.roommateName}>Neha Verma</Text>
                    <Text style={styles.roommateSub}>B.Tech IT . 2nd Year</Text>
                  </View>
                  <Text style={styles.existedTag}>Existed</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.roommateGrid}>
                  {[
                    { label: 'Cleanliness', value: 'Excellent' },
                    { label: 'Study Habit', value: 'Focus' },
                    { label: 'Sleep', value: '12:00 AM' },
                    { label: 'Food', value: 'Vegetarian' },
                  ].map((col, i, arr) => (
                    <React.Fragment key={i}>
                      <View style={styles.gridCol}>
                        <Text style={styles.gridLabel}>{col.label}</Text>
                        <Text style={styles.gridValue}>{col.value}</Text>
                      </View>
                      {i < arr.length - 1 && <View style={styles.gridDivider} />}
                    </React.Fragment>
                  ))}
                </View>
              </View>
            </View>

            {/* ── ROOM RULES ────────────────────────────────────────── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Room Rules</Text>
              <View style={styles.bulletList}>
                <Text style={styles.bulletItem}>Respect • Cleanliness • No noise</Text>
                <Text style={styles.bulletItem}>After 11 PM • Veg Only</Text>
              </View>
            </View>
          </Animated.ScrollView>
        </Animated.View>

        {/* ════════════════════════════════════════════════════════════════
            BOTTOM ACTION BAR
            ✅ Placed OUTSIDE the animated panel so it is ALWAYS on screen.
            ✅ Anchored to screen bottom using SafeArea insets.
        ════════════════════════════════════════════════════════════════ */}
        <View style={[styles.bottomBar, { bottom: safeBottom + 4 }]}>
          {/* Book Now */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.bookNowBtn}
            onPress={() => navigation.navigate('BookingSlots', { room })}
          >
            {Platform.OS === 'ios' ? (
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={14}
                reducedTransparencyFallbackColor="rgba(20,20,20,0.82)"
              />
            ) : (
              <View style={[StyleSheet.absoluteFill, styles.darkBtnBg]} />
            )}
            <Text style={styles.bookNowTxt}>Book now</Text>
          </TouchableOpacity>

          {/* Calendar */}
          <TouchableOpacity activeOpacity={0.85} style={styles.calendarBtn}>
            <Icon name="calendar-month-outline" size={28} color="#000" />
          </TouchableOpacity>

          {/* Arrow */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.arrowCircleBtn}
            onPress={() => navigation.navigate('BookingSlots', { room })}
          >
            {Platform.OS === 'ios' ? (
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={14}
                reducedTransparencyFallbackColor="rgba(20,20,20,0.82)"
              />
            ) : (
              <View style={[StyleSheet.absoluteFill, styles.darkBtnBg]} />
            )}
            <Icon name="arrow-right" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex1: { flex: 1 },

  container: {
    flex: 1,
    backgroundColor: '#111',
  },

  // ── Slider ─────────────────────────────────────────────────────────────────
  sliderTrack: {
    flexDirection: 'row',
    width: width * IMAGES.length,
    height: '100%',
  },
  sliderSlide: {
    width,
    height: '100%',
    overflow: 'hidden',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 12,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  circleBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    elevation: 3,
  },
  buttonGlassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.32)',
  },

  // ── Carousel controls ──────────────────────────────────────────────────────
  carouselControls: {
    position: 'absolute',
    top: height * 0.28,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 15,
  },
  arrowBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    elevation: 3,
  },

  // ── Glass panel ────────────────────────────────────────────────────────────
  // top:0 + height:height → full-screen tall panel
  // translateY moves it into view from below; native thread, no layout thrashing
  bottomPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: 'hidden',
    elevation: 16,
  },
  sheetGlassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 20, 20, 0.45)', // Premium dark glass tint
  },
  topInsetHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)', // Subtler for dark theme
    zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1.5,
    zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1.5,
    height: '100%',
    zIndex: 2,
  },

  // ── Scroll content ─────────────────────────────────────────────────────────
  panelScroll: {
    paddingHorizontal: 24,
    paddingTop: 12, // adjusted for the new drag handle zone
  },
  dragZone: {
    width: '100%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  dragHandleIndicator: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    marginTop: 8,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  sectionSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 14,
    fontWeight: '400',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFF',
    fontWeight: '400',
  },

  // ── Price badge ────────────────────────────────────────────────────────────
  // Green border + green transparent fill inside
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.3)', // subtle green border
    backgroundColor: 'rgba(46, 204, 113, 0.18)', // full chip slightly green transparent color
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2ECC71', // vibrant premium green text (very readable)
    letterSpacing: 0.5,
  },

  // ── Location ───────────────────────────────────────────────────────────────
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  directionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  directionsBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  shareIcon: {
    marginRight: 6,
    transform: [{ rotate: '45deg' }],
  },
  directionsTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  locationAddr: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  mapIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  locationTxt: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFF',
    fontWeight: '400',
  },

  // ── Preview ────────────────────────────────────────────────────────────────
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  previewBoxShell: {
    width: (width - 48 - 32) / 3,
    height: (width - 48 - 32) / 3,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    elevation: 3,
  },
  previewThumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },

  // ── Bullet lists ───────────────────────────────────────────────────────────
  bulletList: {
    marginTop: 10,
  },
  bulletItem: {
    fontSize: 16,
    lineHeight: 28,
    color: '#FFF',
    fontWeight: '500',
    marginBottom: 3,
  },
  electricTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginVertical: 22,
    lineHeight: 26,
  },

  // ── Roommate card ──────────────────────────────────────────────────────────
  roommateCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    padding: 20,
    marginTop: 8,
    elevation: 4,
  },
  roommateCardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  roommateCardTopLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  roommateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  roommateInfo: {
    flex: 1,
    marginLeft: 14,
  },
  roommateName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  roommateSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    fontWeight: '400',
  },
  existedTag: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    alignSelf: 'flex-start',
    marginTop: 4,
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 18,
  },
  roommateGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridCol: {
    flex: 1,
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '400',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  gridDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // ── Bottom action bar ──────────────────────────────────────────────────────
  // ✅ Positioned at SCREEN LEVEL (outside animated panel).
  // ✅ Always anchored to screen bottom via SafeArea insets.
  bottomBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,           // above everything
  },
  bookNowBtn: {
    flex: 1.4,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    marginRight: 12,
    elevation: 6,
  },
  darkBtnBg: {
    backgroundColor: 'rgba(22,22,22,0.82)',
  },
  bookNowTxt: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  calendarBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 6,
  },
  arrowCircleBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    elevation: 6,
  },
});
