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

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function GymScreen({ navigation }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />


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
        {/* ══════════ FIXED HEADER & TOP ACTION CARDS ══════════ */}
        <View style={styles.fixedTop}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Services')}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={26} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Gym</Text>
            {/* Spacer to keep title centered */}
            <View style={styles.headerSpacer} />
          </View>

          {/* ── TOP ACTION CARDS ───────────────────── */}
          <View style={styles.actionRow}>
            {/* Card 1 — View Plans */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionCardWrap}
              onPress={() => navigation.navigate('GymViewPlans')}
            >
              <GlassPanel style={styles.actionCard} intensity={12}>
                <Text style={styles.actionCardText}>View Plans</Text>
              </GlassPanel>
            </TouchableOpacity>

            {/* Card 2 — Current Plans */}
            <TouchableOpacity activeOpacity={0.8} style={styles.actionCardWrap}>
              <GlassPanel style={styles.actionCard} intensity={12}>
                <Text style={styles.actionCardText}>{'Current Plans\n: Basic'}</Text>
              </GlassPanel>
            </TouchableOpacity>
          </View>
        </View>

        {/* ══════════ SCROLLABLE CONTENT ══════════ */}
        <View style={styles.historyContainerWrap}>
          <GlassPanel style={styles.historyContainer} intensity={10}>
            {/* History Title */}
            <Text style={styles.historyTitle}>History</Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.historyScrollContent}
            >
              {/* History card 1 — blank */}
              <GlassPanel style={styles.historyCard} intensity={8} />

              {/* History card 2 — blank with down-arrow */}
              <GlassPanel style={styles.historyCard} intensity={8}>
                <View style={styles.historyCardInner}>
                  <Icon
                    name="arrow-bottom-right"
                    size={20}
                    color="rgba(0,0,0,0.35)"
                    style={styles.downArrow}
                  />
                </View>
              </GlassPanel>

              {/* History card 3 — blank */}
              <GlassPanel style={styles.historyCard} intensity={8} />

              {/* History card 4 — blank */}
              <GlassPanel style={[styles.historyCard, styles.lastHistoryCard]} intensity={8} />
            </ScrollView>
          </GlassPanel>
        </View>
      </Animated.View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
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

  // ── History Wrap & Scroll ────────────────────────
  historyContainerWrap: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    marginTop: 8,
  },
  historyScrollContent: {
    paddingBottom: 10,
  },

  // ── Action Cards Row ──────────────────────────────
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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

  // ── History Container ─────────────────────────────
  historyContainer: {
    flex: 1,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    paddingTop: 22,
    paddingBottom: 20,
    paddingHorizontal: 14,
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  historyTitle: {
    fontSize: 25,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.3,
  },

  // ── Individual History Cards ──────────────────────
  historyCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    height: 72,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  lastHistoryCard: {
    marginBottom: 0,
  },
  historyCardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  downArrow: {
    opacity: 0.6,
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
