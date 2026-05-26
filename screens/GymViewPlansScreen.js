import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
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

// ─── Reusable GlassPanel ────────────────────────────────────────────────────
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

export default function GymViewPlansScreen({ navigation }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* ── FULL SCREEN BACKGROUND ───────────────────────── */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../assets/images/gym.jpeg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        <View style={styles.backgroundOverlay} />
      </View>

      <Animated.View style={animStyle}>
        {/* ══════════ FIXED TOP HEADER & TOP ACTION CARDS ══════════ */}
        <View style={styles.fixedTop}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Gym')}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={26} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Plans</Text>
            {/* Spacer to keep title centered */}
            <View style={styles.headerSpacer} />
          </View>

        </View>

        {/* ══════════ SCROLLABLE CONTENT (PLANS LIST) ══════════ */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── CARD 1: BASIC PLAN ─────────────────── */}
          <GlassPanel style={styles.planCard} intensity={10}>
            <View style={styles.bulletsContainer}>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Gym Access (General)</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Basic Equipments</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Locker Facility</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.solidPillBtn}>
                <Text style={styles.solidPillBtnText}>Basic Plan</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.frostedUpgradeBtn}>
                <Text style={styles.frostedUpgradeBtnText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
          </GlassPanel>

          {/* ── CARD 2: PREMIUM PLAN ────────────────── */}
          <GlassPanel style={styles.planCard} intensity={10}>
            <View style={styles.bulletsContainer}>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Gym Access (All hours)</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>All Equipments Access</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Locker+Towel</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>1 Free Personal Training Monthly</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.solidPillBtn}>
                <Text style={styles.solidPillBtnText}>Premium Plan</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.frostedUpgradeBtn}>
                <Text style={styles.frostedUpgradeBtnText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
          </GlassPanel>

          {/* ── CARD 3: LUXURIOUS PLAN ──────────────── */}
          <GlassPanel style={[styles.planCard, styles.lastPlanCard]} intensity={10}>
            <View style={styles.bulletsContainer}>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>All Premium Benefits</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Personal Training (4 session)</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Diet Consultation</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Body composition Analysis</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.solidPillBtn}>
                <Text style={styles.solidPillBtnText}>Luxurious Plan</Text>
              </View>
            </View>
          </GlassPanel>
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

  // ── Fixed Header ──────────────────────────────────
  fixedTop: {
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '500',
    color: '#1A1A1A',
    letterSpacing: 0.3,
  },
  headerSpacer: {
    width: 40,
  },

  // ── Action Cards Row ──────────────────────────────
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionCardWrap: {
    width: '48%',
  },
  actionCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  actionCardText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },

  // ── Scroll Content ────────────────────────────────
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: Platform.OS === 'ios' ? 44 : 30,
  },

  // ── Plan Card ─────────────────────────────────────
  planCard: {
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#d29b4d86',
    paddingVertical: 24,
    paddingHorizontal: 22,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 6,
  },
  lastPlanCard: {
    marginBottom: 10,
  },

  // ── Bullets ───────────────────────────────────────
  bulletsContainer: {
    marginBottom: 20,
    paddingLeft: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletDot: {
    fontSize: 18,
    lineHeight: 22,
    color: '#000',
    marginRight: 10,
    fontWeight: '600',
  },
  bulletText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#1A1A1A',
    lineHeight: 22,
    flex: 1,
  },

  // ── Buttons ───────────────────────────────────────
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  solidPillBtn: {
    height: 48,
    backgroundColor: '#6B6560',
    borderRadius: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  solidPillBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  frostedUpgradeBtn: {
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  frostedUpgradeBtnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
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
