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
    <View
      style={[
        styles.glassBg,
        { borderRadius },
        glassBgColor && { backgroundColor: glassBgColor },
      ]}
    />
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

// ─── Transaction Detail Row ───────────────────────────────────────────────────
const DetailRow = ({ label, value, bold }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, bold && styles.detailValueBold]}>{value}</Text>
  </View>
);

// ─── Screen Component ─────────────────────────────────────────────────────────
export default function PaymentSuccessScreen({ navigation }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

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

  const handleDownloadReceipt = () => {
    navigation.navigate('DownloadReceipt');
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={require('../assets/images/paymentimg.webp')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Consistent dark overlay */}
        <View style={styles.bgOverlay} />

        <Animated.View style={animStyle}>

          {/* ══════════════ FIXED HEADER ══════════════ */}
          <View style={styles.fixedTop}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PaymentFailed')}
                style={styles.backBtn}
                activeOpacity={0.7}
              >
                <Icon name="arrow-left" size={28} color="#111" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Payment successful</Text>
              <View style={styles.headerSpacer} />
            </View>
          </View>

          {/* ══════════════ SCROLLABLE CONTENT ══════════════ */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
          >
            {/* ── Success Icon ── */}
            <View style={styles.iconCircleWrapper}>
              <View style={styles.iconCircle}>
                <Icon name="check" size={48} color="#fff" />
              </View>
            </View>

            {/* ── Text Content ── */}
            <Text style={styles.mainTitle}>Payment successful</Text>
            <Text style={styles.subtitleText}>Your payment of</Text>
            <Text style={styles.amountText}>6,720</Text>
            <Text style={styles.statusText}>was successful.</Text>

            {/* Spacer to balance layout without description text */}
            <View style={styles.spacer} />

            {/* ── Transaction Details Card ── */}
            <GlassCard
              style={styles.detailsCard}
              borderRadius={20}
              glassBgColor="rgba(255, 166, 0, 0.15)"
            >
              <DetailRow label="Transaction ID" value="TXN1234567890" />
              <View style={styles.cardDivider} />
              <DetailRow label="Paid To" value="INV-2025-0456" bold />
              <View style={styles.cardDivider} />
              <DetailRow label="Date & Time" value="10/05/24,11:45 AM" bold />
              <View style={styles.cardDivider} />
              <DetailRow label="Payment Method" value="UPI - PhonePe" bold />
            </GlassCard>
          </ScrollView>

          {/* ══════════════ FIXED BOTTOM BUTTONS ══════════════ */}
          <View style={styles.fixedBottom}>
            {/* View Invoice - Grey button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.viewInvoiceBtn}
              onPress={() => navigation.navigate('InvoiceDetail', { invoiceId: '1' })}
            >
              <Text style={styles.viewInvoiceText}>View Invoice</Text>
            </TouchableOpacity>

            {/* Download Receipt - Beige outlined card button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleDownloadReceipt}
            >
              <GlassCard
                style={styles.downloadReceiptCard}
                borderRadius={14}
                glassBgColor="rgba(255, 166, 0, 0.15)"
              >
                <Text style={styles.downloadReceiptText}>Download Receipt</Text>
              </GlassCard>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ImageBackground>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
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

  // ── Fixed Header ──
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
    marginBottom: 6,
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

  // ── Scrollable Middle ──
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },

  // ── Success Icon ──
  iconCircleWrapper: {
    marginBottom: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },

  // ── Text Content ──
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    letterSpacing: 0.2,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.65)',
    textAlign: 'center',
    marginBottom: 4,
  },
  amountText: {
    fontSize: 38,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 12,
  },
  spacer: {
    height: 16,
  },

  // ── Transaction Details Card ──
  detailsCard: {
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 0,
    borderColor: 'rgba(255, 166, 0, 0.88)',
    backgroundColor: 'rgba(255, 166, 0, 0.15)', // orange glass
    borderWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  detailLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.65)',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  detailValueBold: {
    fontWeight: '800',
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginHorizontal: 22,
  },

  // ── Fixed Bottom Buttons ──
  fixedBottom: {
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingTop: 10,
    gap: 12,
    zIndex: 10,
  },
  viewInvoiceBtn: {
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
  viewInvoiceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.4,
  },
  downloadReceiptCard: {
    paddingVertical: 18,
    borderColor: 'rgba(255, 166, 0, 0.88)',
    backgroundColor: 'rgba(255, 166, 0, 0.15)', // orange glass
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadReceiptText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.3,
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
