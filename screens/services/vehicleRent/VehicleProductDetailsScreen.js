import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// ─── Reusable Premium GlassPanel ────────────────────────────────────────────
const GlassPanel = ({ children, style, intensity = 12 }) => (
  <View style={[styles.glassShell, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={intensity}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.5)"
    />
    <View style={styles.glassBg} />
    <View style={styles.topInsetHighlight} />
    <View style={styles.bottomInsetHighlight} />
    <LinearGradient
      colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.topEdgeLine}
    />
    <LinearGradient
      colors={['rgba(255,255,255,0.5)', 'transparent', 'rgba(255,255,255,0.2)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.leftEdgeLine}
    />
    {children}
  </View>
);

export default function VehicleProductDetailsScreen({ navigation }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    require('../../../assets/images/rentBike.webp'),
    require('../../../assets/images/rentScooty.webp'),
    require('../../../assets/images/rentBike.webp'),
    require('../../../assets/images/rentScooty.webp'),
  ];

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide >= 0 && slide < images.length) {
      setActiveSlide(slide);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* ── FULL SCREEN BACKGROUND ───────────────────────── */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../../../assets/images/bgImgVehicleRent1.webp')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        <View style={styles.backgroundOverlay} />
      </View>

      <Animated.View style={[animStyle, { position: 'relative' }]}>
        {/* ══════════ FIXED HEADER ══════════ */}
        <View style={styles.fixedTop}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllVehicle')}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={28} color="#111" />
            </TouchableOpacity>

            <View style={styles.headerRightIcons}>
              <TouchableOpacity activeOpacity={0.7} style={styles.headerIconBtn}>
                <Icon name="heart-outline" size={28} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={styles.headerIconBtn}>
                <Icon name="share-variant-outline" size={28} color="#111" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ══════════ SCROLLABLE CONTENT ══════════ */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── IMAGE SLIDER SECTION (Swipeable) ────── */}
          <View style={styles.sliderContainer}>
            <FlatList
              data={images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              snapToInterval={width}
              decelerationRate="fast"
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.slideFrame}>
                  <Image source={item} style={styles.slideImage} resizeMode="contain" />
                </View>
              )}
            />

            {/* PAGINATION DOTS (4 dots, active matching activeSlide) */}
            <View style={styles.paginationDotsContainer}>
              {[0, 1, 2, 3].map((dotIndex) => {
                const isActive = dotIndex === activeSlide;
                return (
                  <View
                    key={dotIndex}
                    style={[
                      styles.paginationDot,
                      isActive ? styles.paginationDotActive : styles.paginationDotInactive,
                    ]}
                  />
                );
              })}
            </View>
          </View>

          {/* ── PRODUCT TITLE & DETAILS ──────────────── */}
          <View style={styles.detailsHeader}>
            <Text style={styles.productTitle}>Pulsar 150</Text>
            <Text style={styles.productSubtitle}>110cc + Automatic +Petrol</Text>
          </View>

          {/* ── FEATURES SECTION ─────────────────────── */}
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>Features</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuresScrollContent}
            >
              <GlassPanel style={styles.featureCard} intensity={8}>
                <Text style={styles.featureCardText}>Good Mileage</Text>
              </GlassPanel>

              <GlassPanel style={styles.featureCard} intensity={8}>
                <Text style={styles.featureCardText}>Self start</Text>
              </GlassPanel>

              <GlassPanel style={styles.featureCard} intensity={8}>
                <Text style={styles.featureCardText}>Good Mileage</Text>
              </GlassPanel>

              <GlassPanel style={styles.featureCard} intensity={8}>
                <Text style={styles.featureCardText}>Good Mileage</Text>
              </GlassPanel>
            </ScrollView>
          </View>

          {/* ── ABOUT VEHICLE SECTION ────────────────── */}
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>About Vehicle</Text>
            <Text style={styles.aboutParagraphText}>
              Well maintained bike , smooth ride, perfect for city commute
            </Text>
          </View>

          {/* ── RENTAL PLANS SECTION ─────────────────── */}
          <View style={styles.sectionWrapLast}>
            <Text style={styles.sectionTitle}>Select Rental Plan</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.plansScrollContent}
            >
              {/* Plan Card 1: Selected */}
              <TouchableOpacity activeOpacity={0.8} style={styles.planCardWrap}>
                <View style={[styles.planCard, styles.planCardActive]}>
                  <Text style={[styles.planCardTitle, styles.planCardTitleActive]}>3 Days</Text>
                  <Text style={[styles.planCardPrice, styles.planCardPriceActive]}>₹479</Text>
                  <Text style={[styles.planCardSub, styles.planCardSubActive]}>per day</Text>
                </View>
              </TouchableOpacity>

              {/* Plan Card 2 */}
              <TouchableOpacity activeOpacity={0.8} style={styles.planCardWrap}>
                <GlassPanel style={styles.planCard} intensity={8}>
                  <Text style={styles.planCardTitle}>3 Days</Text>
                  <Text style={styles.planCardPrice}>₹479</Text>
                  <Text style={styles.planCardSub}>per day</Text>
                </GlassPanel>
              </TouchableOpacity>

              {/* Plan Card 3 */}
              <TouchableOpacity activeOpacity={0.8} style={styles.planCardWrap}>
                <GlassPanel style={styles.planCard} intensity={8}>
                  <Text style={styles.planCardTitle}>3 Days</Text>
                  <Text style={styles.planCardPrice}>₹479</Text>
                  <Text style={styles.planCardSub}>per day</Text>
                </GlassPanel>
              </TouchableOpacity>

              {/* Plan Card 4 */}
              <TouchableOpacity activeOpacity={0.8} style={styles.planCardWrap}>
                <GlassPanel style={styles.planCard} intensity={8}>
                  <Text style={styles.planCardTitle}>3 Days</Text>
                  <Text style={styles.planCardPrice}>₹479</Text>
                  <Text style={styles.planCardSub}>per day</Text>
                </GlassPanel>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.fixedBottomBarWrap}>
            <View style={styles.bottomBarRow}>
              {/* Total display glass card */}
              <GlassPanel style={styles.totalDisplayCard} intensity={12}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹499</Text>
              </GlassPanel>

              {/* Continue booking solid button */}
              <TouchableOpacity activeOpacity={0.8} style={styles.continueBtn} onPress={() => navigation.navigate('BookVehicle')}>
                <Text style={styles.continueBtnText}>Continue booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>


      </Animated.View>
    </View>
  );
}

const TOP_PAD = Platform.OS === 'android'
  ? (StatusBar.currentHeight || 24) + 14
  : 60;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#EDE8E2' },

  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(238, 232, 225, 0.08)',
  },

  // ── Fixed Top Header ──────────────────────────────
  fixedTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // ── Scroll Content ────────────────────────────────
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingTop: TOP_PAD + 44,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },

  // ── Image Slider Section ──────────────────────────
  sliderContainer: {
    width: width,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  slideFrame: {
    width: width,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '85%',
    height: '100%',
  },
  paginationDotsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 10,
    backgroundColor: '#000',
  },
  paginationDotInactive: {
    width: 10,
    backgroundColor: '#8A858075',
  },

  // ── Product Title Header ──────────────────────────
  detailsHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  productSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6A6560',
    letterSpacing: 0.1,
  },

  // ── Section Container layouts ─────────────────────
  sectionWrap: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionWrapLast: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },

  // ── Features horizontal scrolling ─────────────────
  featuresScrollContent: {
    paddingRight: 20,
  },
  featureCard: {
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  featureCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  // ── About paragraph ───────────────────────────────
  aboutParagraphText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4A4A4A',
    lineHeight: 20,
    letterSpacing: 0.15,
  },

  // ── Rental Plans horizontal cards ─────────────────
  plansScrollContent: {
    paddingRight: 20,
  },
  planCardWrap: {
    width: 96,
    marginRight: 12,
  },
  planCard: {
    height: 124,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  planCardActive: {
    backgroundColor: '#3e3a3775',
    borderColor: 'rgba(5, 5, 5, 0.15)',
  },
  planCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
    textAlign: 'center',
  },
  planCardTitleActive: {
    color: '#FFF',
  },
  planCardPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  planCardPriceActive: {
    color: '#FFF',
  },
  planCardSub: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6A6560',
    textAlign: 'center',
  },
  planCardSubActive: {
    color: '#DDD',
  },

  // ── Fixed Bottom Booking Bar ──────────────────────
  fixedBottomBarWrap: {

    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 34 : 18,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  bottomBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalDisplayCard: {
    width: '32%',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6A6560',
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 19,
    fontWeight: '700',
    color: '#000',
  },
  continueBtn: {
    width: '64%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e3a3775',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  continueBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.1,
  },

  // ── Glass Panel Base Styles ───────────────────────
  glassShell: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.46)',
  },
  topInsetHighlight: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255,255,255,0.50)', zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255,255,255,0.10)', zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
  },
});
