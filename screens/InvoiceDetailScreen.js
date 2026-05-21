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

// ─── Invoice details mock data ───────────────────────────────────────────────
const INVOICES_DETAIL_DATA = {
  '1': {
    invoice: '#INV-2024-0387',
    issueDate: '10 May 2025',
    dueDate: '15 May 2025',
    billFor: 'May 2025',
    amount: '3,250',
    status: 'Unpaid',
    items: [
      { id: '1', name: 'Base Room Rent', price: '2,500' },
      { id: '2', name: 'Mess & Catering Fee', price: '500' },
      { id: '3', name: 'Utility & Internet Service', price: '250' },
    ],
  },
  '2': {
    invoice: '#INV-2024-0386',
    issueDate: '10 May 2025',
    dueDate: '15 May 2025',
    billFor: 'May 2025',
    amount: '3,250',
    status: 'Unpaid',
    items: [
      { id: '1', name: 'Base Room Rent', price: '2,500' },
      { id: '2', name: 'Mess & Catering Fee', price: '500' },
      { id: '3', name: 'Utility & Internet Service', price: '250' },
    ],
  },
  '3': {
    invoice: '#INV-2024-0385',
    issueDate: '10 May 2025',
    dueDate: '15 May 2025',
    billFor: 'May 2025',
    amount: '3,250',
    status: 'Paid',
    items: [
      { id: '1', name: 'Base Room Rent', price: '2,500' },
      { id: '2', name: 'Mess & Catering Fee', price: '500' },
      { id: '3', name: 'Utility & Internet Service', price: '250' },
    ],
  },
  '4': {
    invoice: '#INV-2024-0384',
    issueDate: '10 May 2025',
    dueDate: '15 May 2025',
    billFor: 'May 2025',
    amount: '3,250',
    status: 'Paid',
    items: [
      { id: '1', name: 'Base Room Rent', price: '2,500' },
      { id: '2', name: 'Mess & Catering Fee', price: '500' },
      { id: '3', name: 'Utility & Internet Service', price: '250' },
    ],
  },
  '5': {
    invoice: '#INV-2024-0383',
    issueDate: '25 Apr 2025',
    dueDate: '30 Apr 2025',
    billFor: 'Apr 2025',
    amount: '1,200',
    status: 'Unpaid',
    items: [
      { id: '1', name: 'Mess Charges', price: '1,200' },
    ],
  },
  '6': {
    invoice: '#INV-2024-0382',
    issueDate: '25 Apr 2025',
    dueDate: '30 Apr 2025',
    billFor: 'Apr 2025',
    amount: '450',
    status: 'Paid',
    items: [
      { id: '1', name: 'Laundry Service', price: '450' },
    ],
  },
};

// ─── Reusable glass card ─────────────────────────────────────────────────────
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

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function InvoiceDetailScreen({ navigation, route }) {
  const { invoiceId } = route.params || { invoiceId: '1' };
  const data = INVOICES_DETAIL_DATA[invoiceId] || INVOICES_DETAIL_DATA['1'];

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

  const isPaid = data.status === 'Paid';
  const totalAmountVal = parseInt(data.amount.replace(',', ''), 10);
  const paidAmountVal = isPaid ? totalAmountVal : 0;
  const amountDueVal = totalAmountVal - paidAmountVal;

  const formatCurrency = (val) => val.toLocaleString('en-IN');

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={require('../assets/images/paymentimg.webp')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Exact same overlay from PaymentBillingScreen */}
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
              <Text style={styles.headerTitle}>Invoice Details</Text>
              <TouchableOpacity
                style={styles.downloadBtn}
                activeOpacity={0.7}
              >
                <Icon name="cloud-download-outline" size={28} color="#111" />
              </TouchableOpacity>
            </View>

            {/* Upper Glass Orange Card */}
            <GlassCard
              style={styles.upperOrangeCard}
              borderRadius={20}
              glassBgColor="rgba(255, 166, 0, 0.44)"
            >
              {/* Row 1: Invoice ID & Status */}
              <View style={styles.upperCardRow}>
                <Text style={styles.invoiceIdText}>Invoice {data.invoice}</Text>
                <Text style={[styles.statusText, { color: isPaid ? '#2E7D32' : '#C62828' }]}>
                  {data.status}
                </Text>
              </View>

              {/* Row 2: Invoice Date */}
              <View style={styles.upperCardRow}>
                <Text style={styles.upperLabel}>Invoice Date</Text>
                <Text style={styles.upperValue}>{data.issueDate}</Text>
              </View>

              {/* Row 3: Due Date */}
              <View style={styles.upperCardRow}>
                <Text style={styles.upperLabel}>Due Date</Text>
                <Text style={styles.upperValue}>{data.dueDate}</Text>
              </View>

              {/* Row 4: Bill For */}
              <View style={styles.upperCardRow}>
                <Text style={styles.upperLabel}>Bill For</Text>
                <Text style={styles.upperValue}>{data.billFor}</Text>
              </View>
            </GlassCard>
          </View>

          {/* ══════════════ SCROLLABLE MIDDLE ══════════════ */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Unified breakdown card exactly matching image */}
            <GlassCard style={styles.breakdownCard} borderRadius={22}>
              {/* Render dynamic breakdown items */}
              {data.items.map((item, index) => (
                <View key={item.id}>
                  {index > 0 && <View style={styles.itemDivider} />}
                  <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownLabel}>{item.name}</Text>
                    <Text style={styles.breakdownValue}>{formatCurrency(parseInt(item.price.replace(',', ''), 10))}</Text>
                  </View>
                </View>
              ))}

              {/* Maintenance Charges fallback for exact look & feel matching image if desired */}
              {data.items.length === 3 && (
                <>
                  <View style={styles.itemDivider} />
                  <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownLabel}>Maintenance Charges</Text>
                    <Text style={styles.breakdownValue}>{formatCurrency(250)}</Text>
                  </View>
                </>
              )}

              {/* Total Amount row */}
              <View style={styles.itemDivider} />
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, styles.boldText]}>Total Amount</Text>
                <Text style={[styles.breakdownValue, styles.boldValue]}>
                  {formatCurrency(totalAmountVal + (data.items.length === 3 ? 250 : 0))}
                </Text>
              </View>

              {/* Paid Amount row */}
              <View style={styles.itemDivider} />
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Paid Amount</Text>
                <Text style={[styles.breakdownValue, styles.boldValue]}>
                  {formatCurrency(isPaid ? (totalAmountVal + (data.items.length === 3 ? 250 : 0)) : 0)}
                </Text>
              </View>
            </GlassCard>
          </ScrollView>

          {/* ══════════════ FIXED BOTTOM ══════════════ */}
          <View style={styles.fixedBottom}>
            {/* Amount Due Orange Card */}
            <GlassCard
              style={styles.amountDueCard}
              borderRadius={16}
              glassBgColor="rgba(255, 166, 0, 0.44)"
            >
              <View style={styles.amountDueRow}>
                <Text style={styles.amountDueLabel}>Amount Due</Text>
                <Text style={styles.amountDueValue}>
                  {formatCurrency(isPaid ? 0 : (totalAmountVal + (data.items.length === 3 ? 250 : 0)))}
                </Text>
              </View>
            </GlassCard>

            {/* Pay Now Button */}
            <TouchableOpacity activeOpacity={0.85} style={styles.payNowBtn}>
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
    backgroundColor: 'rgba(0, 0, 0, .18)',
  },

  // ── Fixed top ──
  fixedTop: {
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
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
  downloadBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
  },

  // ── Upper Card ──
  upperOrangeCard: {
    padding: 20,
    borderColor: 'rgba(255, 166, 0, 0.88)',
    backgroundColor: 'rgba(255, 166, 0, 0.2)', // orange glass
    borderWidth: 1,
    gap: 14,
    marginBottom: 10,
  },
  upperCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceIdText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  statusText: {
    fontSize: 17,
    fontWeight: '700',
  },
  upperLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.65)',
  },
  upperValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },

  // ── Scrollable middle ──
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // ── Breakdown Card ──
  breakdownCard: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  breakdownLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111',
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  boldText: {
    fontWeight: '700',
  },
  boldValue: {
    fontWeight: '800',
  },
  itemDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  // ── Fixed bottom ──
  fixedBottom: {
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingTop: 10,
    gap: 12,
  },
  amountDueCard: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderColor: 'rgba(255, 166, 0, 0.88)',
    backgroundColor: 'rgba(255, 166, 0, 0.44)', // orange glass
    borderWidth: 1,
  },
  amountDueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountDueLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  amountDueValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  payNowBtn: {
    backgroundColor: '#6B6560',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.4,
  },

  // ── Glass base ──
  glassShell: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.50)',
  },
  topInsetHighlight: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255,255,255,0.6)', zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255,255,255,0.12)', zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
  },
});
