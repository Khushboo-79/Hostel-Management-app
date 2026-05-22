import React, { useState, useEffect } from 'react';
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

// ─── Invoice data ─────────────────────────────────────────────────────────────
const INVOICES = [
  {
    id: '1',
    invoice: '#INV-2024-0387',
    subtitle: 'Room Rent - May 2024',
    due: 'Due: 15 May 2025',
    amount: '3,250',
    status: 'Unpaid',
  },
  {
    id: '2',
    invoice: '#INV-2024-0386',
    subtitle: 'Room Rent - May 2024',
    due: 'Due: 15 May 2025',
    amount: '3,250',
    status: 'Unpaid',
  },
  {
    id: '3',
    invoice: '#INV-2024-0385',
    subtitle: 'Room Rent - May 2024',
    due: 'Due: 15 May 2025',
    amount: '3,250',
    status: 'Paid',
  },
  {
    id: '4',
    invoice: '#INV-2024-0384',
    subtitle: 'Room Rent - May 2024',
    due: 'Due: 15 May 2025',
    amount: '3,250',
    status: 'Paid',
  },
  {
    id: '5',
    invoice: '#INV-2024-0383',
    subtitle: 'Mess Charges - Apr 2024',
    due: 'Due: 30 Apr 2025',
    amount: '1,200',
    status: 'Unpaid',
  },
  {
    id: '6',
    invoice: '#INV-2024-0382',
    subtitle: 'Laundry - Apr 2024',
    due: 'Due: 30 Apr 2025',
    amount: '450',
    status: 'Paid',
  },
];

// ─── Reusable glass card (same Login/Dashboard config) ───────────────────────
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
export default function MyInvoicesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All');

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 420, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 420, easing: Easing.out(Easing.ease) });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const filtered = INVOICES.filter((item) => {
    if (activeTab === 'Outstanding') { return item.status === 'Unpaid'; }
    if (activeTab === 'Paid') { return item.status === 'Paid'; }
    return true;
  });

  const totalOutstanding = INVOICES
    .filter((i) => i.status === 'Unpaid')
    .reduce((sum, i) => sum + parseInt(i.amount.replace(',', ''), 10), 0);

  const formatAmount = (n) => n.toLocaleString('en-IN');

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={require('../assets/images/paymentimg.webp')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Subtle white overlay so text stays legible */}
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
              <Text style={styles.headerTitle}>My Invoices</Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* Filter tabs */}
            <View style={styles.tabsRow}>
              {['All', 'Outstanding', 'Paid'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    activeOpacity={0.7}
                    style={styles.tabItem}
                  >
                    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.tabDivider} />
          </View>

          {/* ══════════════ SCROLLABLE MIDDLE ══════════════ */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {filtered.map((item) => {
              const isPaid = item.status === 'Paid';
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('InvoiceDetail', { invoiceId: item.id })}
                >
                  <GlassCard style={styles.invoiceCard} borderRadius={18}>
                    <View style={styles.invoiceRow}>
                      {/* Left side */}
                      <View style={styles.invoiceLeft}>
                        <Text style={styles.invoiceTitle}>
                          Invoice{'  '}{item.invoice}
                        </Text>
                        <Text style={styles.invoiceSubtitle}>{item.subtitle}</Text>
                        <Text style={styles.invoiceDue}>{item.due}</Text>
                      </View>

                      {/* Right side */}
                      <View style={styles.invoiceRight}>
                        <Text style={styles.invoiceAmount}>{item.amount}</Text>
                        <Text
                          style={[
                            styles.invoiceStatus,
                            { color: isPaid ? '#2E7D32' : '#C62828' },
                          ]}
                        >
                          {item.status}
                        </Text>
                      </View>
                    </View>
                  </GlassCard>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ══════════════ FIXED BOTTOM ══════════════ */}
          <View style={styles.fixedBottom}>

            {/* TOTAL OUTSTANDING CARD */}
            <GlassCard style={styles.totalCard} borderRadius={18} glassBgColor="rgba(255, 140, 0, 0.22)">
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Outstanding</Text>
                <Text style={styles.totalAmount}>{formatAmount(totalOutstanding)}</Text>
              </View>
            </GlassCard>

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

  // ── Fixed top ──
  fixedTop: {
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
  },
  headerSpacer: { width: 40 },

  // ── Tabs ──
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  tabItem: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.45)',
  },
  activeTabText: {
    fontWeight: '700',
    color: '#5C4A32',
  },
  tabDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginBottom: 8,
  },

  // ── Scrollable area ──
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
    gap: 12,
  },

  // ── Invoice card ──
  invoiceCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  invoiceLeft: { flex: 1, paddingRight: 10 },
  invoiceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  invoiceSubtitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.55)',
    marginBottom: 2,
  },
  invoiceDue: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.45)',
  },
  invoiceRight: { alignItems: 'flex-end' },
  invoiceAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  invoiceStatus: {
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Fixed bottom ──
  fixedBottom: {
    paddingHorizontal: 14,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingTop: 8,
    gap: 10,
  },
  totalCard: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 166, 0, 0.44)', // orange glass
    borderColor: 'rgba(255, 166, 0, 0.88)',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  payNowBtn: {
    backgroundColor: '#6B6560',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowText: {
    fontSize: 16,
    fontWeight: '600',
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
