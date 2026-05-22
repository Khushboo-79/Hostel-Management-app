import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
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

// ─── Reusable glass card component ───────────────────────────────────────────
const GlassCard = ({ children, style, borderRadius = 16, glassBgColor }) => (
  <View style={[styles.glassShell, { borderRadius }, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={12}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
    />
    <View style={[styles.glassBg, { borderRadius }, glassBgColor && { backgroundColor: glassBgColor }]} />
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

// ─── Custom Vector Bill & Coins Illustration ─────────────────────────────────
const BillIllustration = () => {
  return (
    <View style={styles.illustrationContainer}>
      {/* Leaf sprig at the bottom-left of the folded bill paper */}
      <View style={styles.sprigContainer}>
        <Icon name="leaf" size={24} color="#75935E" style={styles.leaf1} />
        <Icon name="leaf" size={18} color="#8DA974" style={styles.leaf2} />
        <Icon name="leaf" size={16} color="#5B7647" style={styles.leaf3} />
      </View>

      {/* Folded bill paper sheet */}
      <View style={styles.billPaper}>
        {/* Curled top edge */}
        <View style={styles.billTopCurl} />

        {/* Bill lines representing text rows */}
        <View style={styles.billLinesContainer}>
          <View style={[styles.billLine, { width: 34 }]} />
          <View style={[styles.billLine, { width: 40 }]} />
          <View style={[styles.billLine, { width: 30 }]} />
          <View style={[styles.billLine, { width: 34 }]} />
          <View style={[styles.billLine, { width: 22 }]} />
        </View>

        {/* Curled bottom edge */}
        <View style={styles.billBottomCurl} />
      </View>

      {/* 3D-styled Gold Coin Stack */}
      <View style={styles.coinStack}>
        {/* Bottom coin */}
        <View style={[styles.coin, { transform: [{ translateY: 14 }] }]}>
          <LinearGradient
            colors={['#E5A93C', '#C78C24']}
            style={StyleSheet.absoluteFillObject}
            borderRadius={6}
          />
          <View style={styles.coinTopInner}>
            <LinearGradient
              colors={['#FFEAA7', '#F3B33E']}
              style={StyleSheet.absoluteFillObject}
              borderRadius={5}
            />
          </View>
        </View>

        {/* Middle coin */}
        <View style={[styles.coin, { transform: [{ translateY: 4 }] }]}>
          <LinearGradient
            colors={['#E5A93C', '#C78C24']}
            style={StyleSheet.absoluteFillObject}
            borderRadius={6}
          />
          <View style={styles.coinTopInner}>
            <LinearGradient
              colors={['#FFEAA7', '#F3B33E']}
              style={StyleSheet.absoluteFillObject}
              borderRadius={5}
            />
          </View>
        </View>

        {/* Top coin */}
        <View style={[styles.coin, { transform: [{ translateY: -6 }] }]}>
          <LinearGradient
            colors={['#E5A93C', '#C78C24']}
            style={StyleSheet.absoluteFillObject}
            borderRadius={6}
          />
          <View style={styles.coinTopInner}>
            <LinearGradient
              colors={['#FFEAA7', '#F3B33E']}
              style={StyleSheet.absoluteFillObject}
              borderRadius={6}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── Screen Component ────────────────────────────────────────────────────────
export default function BillingSummaryScreen({ navigation }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 420, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 420, easing: Easing.out(Easing.ease) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  // Middle charges list data exactly matching the screenshot labels and amounts
  const charges = [
    { id: '1', label: 'Room Rent', amount: '5,500' },
    { id: '2', label: 'Maintenance Charges', amount: '5,500' },
    { id: '3', label: 'Electricity Charges', amount: '5,500' },
    { id: '4', label: 'Mess Charges', amount: '5,500' },
    { id: '5', label: 'Other Charges', amount: '5,500' },
  ];

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={require('../assets/images/paymentimg.webp')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Dark overlay for consistent readability */}
        <View style={styles.bgOverlay} />

        <Animated.View style={animStyle}>

          {/* ══════════════ FIXED TOP ══════════════ */}
          <View style={styles.fixedTop}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
                activeOpacity={0.7}
              >
                <Icon name="arrow-left" size={28} color="#111" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Billing Summary</Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* Total Charges Card - Premium Orange Glass */}
            <GlassCard
              style={styles.totalChargesCard}
              borderRadius={24}
              glassBgColor="rgba(255, 166, 0, 0.44)"
            >
              <View style={styles.totalChargesRow}>
                <View style={styles.totalLeft}>
                  <Text style={styles.totalLabel}>Total Charges</Text>
                  <Text style={styles.totalAmount}>₹10,000</Text>
                </View>
                <View style={styles.totalRight}>
                  <BillIllustration />
                </View>
              </View>
            </GlassCard>
          </View>

          {/* ══════════════ SCROLLABLE MIDDLE ══════════════ */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Unified Glass Charges List Container */}
            <GlassCard style={styles.listCard} borderRadius={24}>
              {charges.map((item, index) => (
                <View key={item.id}>
                  {index > 0 && <View style={styles.rowDivider} />}
                  <View style={styles.chargeRow}>
                    <Text style={styles.chargeLabel}>{item.label}</Text>
                    <Text style={styles.chargeAmount}>{item.amount}</Text>
                  </View>
                </View>
              ))}
            </GlassCard>
          </ScrollView>

          {/* ══════════════ FIXED BOTTOM ══════════════ */}
          <View style={styles.fixedBottom}>
            {/* Bottom Summary Card - Premium Orange Glass */}
            <GlassCard
              style={styles.summaryCard}
              borderRadius={24}
              glassBgColor="rgba(255, 166, 0, 0.44)"
            >
              {/* Paid Amount Row */}
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.greenText]}>Paid Amount</Text>
                <Text style={[styles.summaryValue, styles.greenText]}>₹3,250</Text>
              </View>

              {/* Spacer/Divider */}
              <View style={styles.summaryRowSpacer} />

              {/* Outstanding Amount Row */}
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.redText]}>Outstanding Amount</Text>
                <Text style={[styles.summaryValue, styles.redText]}>₹6,750</Text>
              </View>
            </GlassCard>

            {/* Pay Now Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.payNowBtn}
              onPress={() => navigation.navigate('PayScreen')}
            >
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ImageBackground>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const TOP_PAD = Platform.OS === 'android'
  ? (StatusBar.currentHeight || 24) + 12
  : 60;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#C8C0B8' },
  bg: { flex: 1, width: '100%', height: '100%' },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },

  // ── Fixed Top Layout ──
  fixedTop: {
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: { width: 40 },

  // ── Total Charges Card ──
  totalChargesCard: {
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderColor: 'rgba(255, 166, 0, 0.88)',
    backgroundColor: 'rgba(255, 166, 0, 0.15)', // orange glass
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  totalChargesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  totalAmount: {
    fontSize: 38,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
  },
  totalRight: {
    width: 110,
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // ── 3D Vector Illustration Styles ──
  illustrationContainer: {
    width: 90,
    height: 80,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  billPaper: {
    width: 52,
    height: 68,
    backgroundColor: '#F6F2EC',
    borderRadius: 6,
    borderColor: '#DFD8CE',
    borderWidth: 1.5,
    paddingTop: 12,
    paddingHorizontal: 8,
    transform: [{ rotate: '-8deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  billTopCurl: {
    position: 'absolute',
    top: -2,
    left: 4,
    right: 4,
    height: 4,
    backgroundColor: '#EAE2D7',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  billBottomCurl: {
    position: 'absolute',
    bottom: -2,
    left: 4,
    right: 4,
    height: 4,
    backgroundColor: '#EAE2D7',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  billLinesContainer: {
    gap: 4.5,
  },
  billLine: {
    height: 3,
    backgroundColor: '#C8BDB0',
    borderRadius: 1.5,
  },
  sprigContainer: {
    position: 'absolute',
    left: 2,
    bottom: 4,
    zIndex: 12,
    transform: [{ rotate: '-12deg' }],
  },
  leaf1: {
    transform: [{ rotate: '-10deg' }],
  },
  leaf2: {
    position: 'absolute',
    left: 10,
    top: -4,
    transform: [{ rotate: '25deg' }],
  },
  leaf3: {
    position: 'absolute',
    left: -2,
    top: -8,
    transform: [{ rotate: '-35deg' }],
  },
  coinStack: {
    position: 'absolute',
    right: -4,
    bottom: 6,
    width: 32,
    height: 38,
    zIndex: 15,
  },
  coin: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#C78C24',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  coinTopInner: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 3,
    borderRadius: 5,
  },

  // ── Scrollable Middle Layout ──
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 20,
  },
  listCard: {
    paddingVertical: 4,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 19,
    paddingHorizontal: 22,
  },
  chargeLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111',
    letterSpacing: 0.1,
  },
  chargeAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginHorizontal: 22,
  },

  // ── Fixed Bottom Layout ──
  fixedBottom: {
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingTop: 10,
    gap: 12,
    zIndex: 10,
  },
  payNowBtn: {
    backgroundColor: '#6B6560',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 5,
  },
  payNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.4,
  },
  summaryCard: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderColor: 'rgba(255, 166, 0, 0.88)',
    backgroundColor: 'rgba(255, 166, 0, 0.27)', // orange glass
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryRowSpacer: {
    height: 14,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  greenText: {
    color: '#2E7D32',
  },
  redText: {
    color: '#C62828',
  },

  // ── Glass Base Styles ──
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
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
  },
  topInsetHighlight: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255, 255, 255, 0.60)', zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255, 255, 255, 0.12)', zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
  },
});
