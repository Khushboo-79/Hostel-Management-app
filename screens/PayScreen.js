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

// ─── Custom UPI Slanted Triangles Icon ────────────────────────────────────────
const UpiIcon = () => {
  return (
    <View style={styles.upiContainer}>
      <View style={styles.upiOrangeTriangle} />
      <View style={styles.upiGreenTriangle} />
    </View>
  );
};

// ─── Screen Component ────────────────────────────────────────────────────────
export default function PayScreen({ navigation }) {
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

  // Reusable Payment option item renderer
  const paymentMethods = [
    {
      id: 'upi',
      title: 'UPI',
      subtitle: 'Pay using any UPI app',
      customIcon: <UpiIcon />,
    },
    {
      id: 'card',
      title: 'Debit / Credit Card',
      subtitle: 'Visa, Mastercard, Rupay',
      icon: 'credit-card',
    },
    {
      id: 'netbank',
      title: 'Net Banking',
      subtitle: 'All major banks supported',
      icon: 'bank',
    },
    {
      id: 'wallets',
      title: 'Wallets',
      subtitle: 'Payth, Phonpe, Razor-Pay',
      icon: 'wallet',
    },
    {
      id: 'emi',
      title: 'EMI Options',
      subtitle: 'Convert to easy EMIs',
      icon: 'calculator',
    },
  ];

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={require('../assets/images/paymentimg.webp')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Dark overlay for consistent legibility */}
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
              <Text style={styles.headerTitle}>Pay</Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* Amount Due Card - Orange/Cream Glass */}
            <GlassCard
              style={styles.amountDueCard}
              borderRadius={24}
              glassBgColor="rgba(255, 166, 0, 0.44)"
            >
              <View style={styles.amountDueRow}>
                <View style={styles.amountLeft}>
                  <Text style={styles.amountDueLabel}>Amount Due</Text>
                  <Text style={styles.amountDueText}>₹6,750</Text>
                </View>
                <View style={styles.amountRight}>
                  <View style={styles.shieldBadge}>
                    <Icon name="shield-check" size={42} color="#2E7D32" />
                    <Text style={styles.secureText}>Secure Payment</Text>
                  </View>
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
            {/* Heading */}
            <Text style={styles.sectionTitle}>Select Payment Method</Text>

            {/* Unified Glass Options Card */}
            <GlassCard style={styles.optionsCard} borderRadius={24}>
              {paymentMethods.map((method, index) => (
                <View key={method.id}>
                  {index > 0 && <View style={styles.rowDivider} />}
                  <TouchableOpacity activeOpacity={0.8} style={styles.optionRow}>
                    <View style={styles.optionLeft}>
                      {method.customIcon ? (
                        method.customIcon
                      ) : (
                        <Icon name={method.icon} size={32} color="#111" />
                      )}
                    </View>
                    <View style={styles.optionMiddle}>
                      <Text style={styles.optionTitle}>{method.title}</Text>
                      <Text style={styles.optionSubtitle}>{method.subtitle}</Text>
                    </View>
                    <View style={styles.optionRight}>
                      <Icon name="chevron-right" size={24} color="rgba(0,0,0,0.4)" />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </GlassCard>
          </ScrollView>

          {/* ══════════════ FIXED BOTTOM ══════════════ */}
          <View style={styles.fixedBottom}>
            {/* Total Payable Card - Orange/Cream Glass */}
            <GlassCard
              style={styles.totalPayableCard}
              borderRadius={24}
              glassBgColor="rgba(255, 166, 0, 0.44)"
            >
              <View style={styles.totalPayableRow}>
                <Text style={styles.totalPayableLabel}>Total Payable</Text>
                <Text style={styles.totalPayableText}>6,700</Text>
              </View>
            </GlassCard>

            {/* Proceed to Pay Button - Premium Disabled Gray */}
            <TouchableOpacity activeOpacity={0.8} style={styles.proceedBtn} onPress={() => navigation.navigate('PaymentFailed')}>
              <Text style={styles.proceedText}>Proceed to Pay</Text>
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

  // ── Amount Due Card ──
  amountDueCard: {
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
  amountDueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  amountDueLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  amountDueText: {
    fontSize: 38,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
  },
  amountRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2E7D32',
    marginTop: 4,
    letterSpacing: 0.1,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  optionsCard: {
    paddingVertical: 4,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  optionLeft: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  optionMiddle: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 3,
    letterSpacing: 0.1,
  },
  optionSubtitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.55)',
    letterSpacing: 0.1,
  },
  optionRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginHorizontal: 22,
  },

  // ── Custom UPI Triangles Icon Styles ──
  upiContainer: {
    width: 32,
    height: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upiOrangeTriangle: {
    width: 11,
    height: 22,
    backgroundColor: '#F05A28',
    transform: [{ skewX: '-24deg' }],
    marginRight: 3,
    borderTopLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  upiGreenTriangle: {
    width: 11,
    height: 22,
    backgroundColor: '#0F8F49',
    transform: [{ skewX: '-24deg' }],
    borderTopLeftRadius: 1,
    borderBottomRightRadius: 1,
  },

  // ── Fixed Bottom Layout ──
  fixedBottom: {
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingTop: 10,
    gap: 12,
    zIndex: 10,
  },
  totalPayableCard: {
    paddingVertical: 18,
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
  totalPayableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPayableLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
  },
  totalPayableText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    letterSpacing: 0.2,
  },
  proceedBtn: {
    backgroundColor: '#6B6560', // Premium disabled grey shade
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  proceedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.4,
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
