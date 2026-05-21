import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
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

const { width, height } = Dimensions.get('window');

/* ─────────────────────────────────────────────────────────
   MEAL DATA  (same items every day – user can edit later)
───────────────────────────────────────────────────────── */
const MEAL_DATA = {
  Breakfast: {
    image: require('../assets/images/breakfast.webp'),
    days: {
      1: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
      2: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
      3: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
      4: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
      5: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
      6: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
      7: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
    },
  },
  Lunch: {
    image: require('../assets/images/lunch.webp'),
    days: {
      1: ['Dal', 'Curry', 'Chapati', 'Rice'],
      2: ['Dal', 'Curry', 'Chapati', 'Rice'],
      3: ['Dal', 'Curry', 'Chapati', 'Rice'],
      4: ['Dal', 'Curry', 'Chapati', 'Rice'],
      5: ['Dal', 'Curry', 'Chapati', 'Rice'],
      6: ['Dal', 'Curry', 'Chapati', 'Rice'],
      7: ['Dal', 'Curry', 'Chapati', 'Rice'],
    },
  },
  Dinner: {
    image: require('../assets/images/dinner.webp'),
    days: {
      1: ['Chapati', 'Dal', 'Raita', 'Rice'],
      2: ['Chapati', 'Dal', 'Raita', 'Rice'],
      3: ['Chapati', 'Dal', 'Raita', 'Rice'],
      4: ['Chapati', 'Dal', 'Raita', 'Rice'],
      5: ['Chapati', 'Dal', 'Raita', 'Rice'],
      6: ['Chapati', 'Dal', 'Raita', 'Rice'],
      7: ['Chapati', 'Dal', 'Raita', 'Rice'],
    },
  },
};

/* ─────────────────────────────────────────────────────────
   REUSABLE GLASS CARD
───────────────────────────────────────────────────────── */
const GlassCard = ({ children, style }) => (
  <View style={[styles.glassShell, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={14}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
    />
    <View style={styles.glassBg} />
    <View style={styles.topInsetHighlight} />
    <View style={styles.bottomInsetHighlight} />
    <LinearGradient
      colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.topEdgeLine}
    />
    <LinearGradient
      colors={['rgba(255,255,255,0.8)', 'transparent', 'rgba(255,255,255,0.3)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.leftEdgeLine}
    />
    {children}
  </View>
);

/* ─────────────────────────────────────────────────────────
   SCREEN
───────────────────────────────────────────────────────── */
export default function WeeklyMealMenuScreen({ navigation, route }) {
  const { mealType = 'Breakfast' } = route.params || {};
  const [selectedDay, setSelectedDay] = useState(1);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(18);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 420, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 420, easing: Easing.out(Easing.ease) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const mealInfo = MEAL_DATA[mealType] || MEAL_DATA.Breakfast;
  const items = mealInfo.days[selectedDay] || [];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/images/meal1.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Background blur */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
        />
        {/* Dark overlay */}
        <View style={styles.overlay} />

        <Animated.View style={animatedStyle}>
          {/* ── HEADER ────────────────────────────────── */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={28} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Menu</Text>

            <View style={styles.headerSpacer} />
          </View>

          {/* ── BODY  ─────────────────────────────────── */}
          <View style={styles.body}>
            {/* LEFT: meal content */}
            <ScrollView
              style={styles.leftPanel}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.leftContent}
            >
              {/* Meal heading */}
              <GlassCard style={styles.mealHeadingCard}>
                <Text style={styles.mealHeadingText}>{mealType}</Text>
              </GlassCard>

              {/* Meal item chips  */}
              <View style={styles.chipsGrid}>
                {items.map((item, index) => (
                  <GlassCard key={`${item}-${index}`} style={styles.chipCard}>
                    <Text style={styles.chipText}>{item}</Text>
                  </GlassCard>
                ))}
              </View>
            </ScrollView>

            {/* RIGHT: day selector */}
            <View style={styles.rightPanel}>
              <GlassCard style={styles.daySelectorPanel}>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                  const isActive = selectedDay === day;
                  return (
                    <TouchableOpacity
                      key={day}
                      activeOpacity={0.75}
                      onPress={() => setSelectedDay(day)}
                      style={[styles.dayBtn, isActive && styles.dayBtnActive]}
                    >
                      {isActive && (
                        <>
                          <BlurView
                            style={StyleSheet.absoluteFill}
                            blurType="dark"
                            blurAmount={20}
                            reducedTransparencyFallbackColor="rgba(58, 55, 55, 0.9)"
                          />
                          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(40, 40, 40, 0.45)' }]} />
                        </>
                      )}
                      <Text style={[styles.dayText, isActive && styles.dayTextActive]}>
                        Day {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </GlassCard>
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

/* ─────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────── */
const RADIUS = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Slightly dark overlay to maintain warm aesthetic
  },

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
    paddingBottom: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  headerSpacer: {
    width: 44,
  },

  /* ── Body ── */
  body: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },

  /* LEFT PANEL */
  leftPanel: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 8,
  },
  leftContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },

  /* Meal heading card */
  mealHeadingCard: {
    borderRadius: RADIUS,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 14,
    alignItems: 'center',
  },
  mealHeadingText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  /* Chips */
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chipCard: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  /* RIGHT PANEL */
  rightPanel: {
    width: 88,
    paddingRight: 14,
    paddingLeft: 4,
    alignItems: 'stretch',
    height: '100%',
  },
  daySelectorPanel: {
    flex: 1,
    borderRadius: RADIUS,
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 0,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },

  /* Day button */
  dayBtn: {
    flex: 1,
    marginHorizontal: 6,
    marginVertical: 3,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 36,
  },
  dayBtnActive: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  dayText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  dayTextActive: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  /* ── Glass base ── */
  glassShell: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.46)',
  },
  topInsetHighlight: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 1,
    zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute',
    top: 0, left: 0,
    width: 1,
    height: '100%',
    zIndex: 2,
  },
});
