import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavbar from '../components/BottomNavbar';

const { width, height } = Dimensions.get('window');

/* ─────────────────────────────────────────────────────────
   GlassCard — identical glassmorphism to LoginScreen cardShell
   BlurView blurAmount=12 + glassBg rgba(255,255,255,0.46)
   + inset highlights + ::before + ::after edge lines
───────────────────────────────────────────────────────── */
const GlassCard = ({ style, children }) => (
  <View
    style={[
      {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.10,
        shadowRadius: 32,
        elevation: 8,
      },
      style,
    ]}
  >
    {/* backdrop-filter: blur(12px) */}
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={12}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
    />
    {/* background: rgba(255,255,255,0.46) */}
    <View style={glass.glassBg} />
    {/* inset top highlight */}
    <View style={glass.topInsetHighlight} />
    {/* inset bottom highlight */}
    <View style={glass.bottomInsetHighlight} />
    {/* ::before — horizontal top edge gradient */}
    <LinearGradient
      colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={glass.topEdgeLine}
    />
    {/* ::after — vertical left edge gradient */}
    <LinearGradient
      colors={['rgba(255,255,255,0.8)', 'transparent', 'rgba(255,255,255,0.3)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={glass.leftEdgeLine}
    />
    {children}
  </View>
);

const glass = StyleSheet.create({
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.46)',
  },
  topInsetHighlight: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
  },
});

/* ─────────────────────────────────────────────────────────
   LaundryScreen
───────────────────────────────────────────────────────── */
export default function LaundryScreen() {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* FULLSCREEN BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../assets/images/laundry.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* Slight blur — image stays clearly visible */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        {/* Very light warm tint */}
        <View style={styles.backgroundOverlay} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── TITLE ── */}
        <Text style={styles.screenTitle}>Laundry</Text>

        {/* ── ACTION BUTTONS ── */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButtonWrap} activeOpacity={0.75}>
            <GlassCard style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{'Laundry\nRequest'}</Text>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonWrap} activeOpacity={0.75}>
            <GlassCard style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{'Status\nTracker'}</Text>
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* ── HISTORY GLASS CONTAINER ── */}
        <GlassCard style={styles.historyContainer}>
          <Text style={styles.historyTitle}>History</Text>

          {/* Card 1 — large horizontal */}
          <GlassCard style={styles.cardLarge} />

          {/* Card 2 — thin strip */}
          <GlassCard style={styles.cardThinStrip} />

          {/* Card 3 — medium */}
          <GlassCard style={styles.cardMedium} />

          {/* Cards 4 & 5 — two stacked medium side by side */}
          <View style={styles.cardDuoRow}>
            <GlassCard style={styles.cardDuoItem} />
            <GlassCard style={styles.cardDuoItem} />
          </View>

          {/* Card 6 — wide bottom */}
          <GlassCard style={styles.cardWideFull} />
        </GlassCard>
      </ScrollView>

      {/* BOTTOM NAVBAR */}
      <BottomNavbar />
    </View>
  );
}

/* ─────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────── */
const CARD_RADIUS = 22;
const SPACING = 12;
const H_PAD = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9CFC8',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(210, 200, 190, 0.05)',
  },

  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 65 : (StatusBar.currentHeight || 24) + 22,
    paddingBottom: 130,
    paddingHorizontal: H_PAD,
  },

  /* Title */
  screenTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: 0.4,
  },

  /* Action buttons */
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  actionButtonWrap: {
    width: '47.5%',
  },
  actionButton: {
    borderRadius: CARD_RADIUS,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
    textAlign: 'center',
    lineHeight: 22,
  },

  /* Big history glass container */
  historyContainer: {
    borderRadius: 36,
    paddingTop: 26,
    paddingBottom: 26,
    paddingHorizontal: SPACING,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.3,
  },

  /* ── Nested placeholder cards ── */

  /* Card 1 — large */
  cardLarge: {
    borderRadius: CARD_RADIUS,
    height: 110,
    marginBottom: SPACING,
  },

  /* Card 2 — thin strip */
  cardThinStrip: {
    borderRadius: CARD_RADIUS,
    height: 44,
    marginBottom: SPACING,
  },

  /* Card 3 — medium */
  cardMedium: {
    borderRadius: CARD_RADIUS,
    height: 75,
    marginBottom: SPACING,
  },

  /* Cards 4 & 5 — side by side duo */
  cardDuoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING,
  },
  cardDuoItem: {
    borderRadius: CARD_RADIUS,
    width: '48.5%',
    height: 75,
  },

  /* Card 6 — wide bottom */
  cardWideFull: {
    borderRadius: CARD_RADIUS,
    height: 75,
  },
});
