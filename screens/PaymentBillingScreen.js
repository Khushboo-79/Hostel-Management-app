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
  FlatList,
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

// ─── Payment history data ─────────────────────────────────────────────────────
const ALL_HISTORY = [
  {
    id: '1',
    title: 'Payment to INV-2024-0387',
    subtitle: 'Mess Charges - May 2024',
    date: '15 May 2025, 10:30 AM',
    amount: '3,250',
    status: 'Success',
  },
  {
    id: '2',
    title: 'Payment to INV-2024-0387',
    subtitle: 'Mess Charges - May 2024',
    date: '15 May 2025, 10:30 AM',
    amount: '3,250',
    status: 'Success',
  },
  {
    id: '3',
    title: 'Payment to INV-2024-0387',
    subtitle: 'Mess Charges - May 2024',
    date: '15 May 2025, 10:30 AM',
    amount: '3,250',
    status: 'Success',
  },
  {
    id: '4',
    title: 'Payment to INV-2024-0387',
    subtitle: 'Mess Charges - May 2024',
    date: '15 May 2025, 10:30 AM',
    amount: '3,250',
    status: 'Failed',
  },
  {
    id: '5',
    title: 'Payment to INV-2024-0387',
    subtitle: 'Mess Charges - May 2024',
    date: '15 May 2025, 10:30 AM',
    amount: '3,250',
    status: 'Success',
  },
];

// ─── Reusable glass card (same as Login/Dashboard) ───────────────────────────
const GlassCard = ({ children, style, borderRadius = 16 }) => (
  <View style={[styles.glassShell, { borderRadius }, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={12}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
    />
    <View style={[styles.glassBg, { borderRadius }]} />
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
export default function PaymentBillingScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All');

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 450, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 450, easing: Easing.out(Easing.ease) });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const filtered = ALL_HISTORY.filter((item) => {
    if (activeTab === 'Successful') { return item.status === 'Success'; }
    if (activeTab === 'Failed') { return item.status === 'Failed'; }
    return true;
  });

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={require('../assets/images/paymentimg.webp')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Slight white overlay so text stays legible */}
        <View style={styles.bgOverlay} />

        <Animated.View style={animStyle}>

          {/* ── HEADER ─────────────────────────────────────────── */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={28} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment/Billing</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* ── ACTION BUTTONS ─────────────────────────────────── */}
          <View style={styles.actionRow}>
            <TouchableOpacity activeOpacity={0.8} style={styles.actionBtn} onPress={() => navigation.navigate('BillingSummary')}>
              <GlassCard style={styles.actionCard} borderRadius={50}>
                <Text style={styles.actionText}>Pay Rent</Text>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.actionBtn} onPress={() => navigation.navigate('MyInvoices')}>
              <GlassCard style={styles.actionCard} borderRadius={50}>
                <Text style={styles.actionText}>Invoices</Text>
              </GlassCard>
            </TouchableOpacity>
          </View>

          {/* ── HISTORY SECTION ────────────────────────────────── */}
          <GlassCard style={styles.historySection} borderRadius={28}>

            {/* "History" heading */}
            <Text style={styles.historyHeading}>History</Text>

            {/* Tabs row */}
            <View style={styles.tabsRow}>
              {['All', 'Successful', 'Failed'].map((tab) => {
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

            {/* Divider */}
            <View style={styles.divider} />

            {/* Scrollable list */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => {
                const isSuccess = item.status === 'Success';
                return (
                  <GlassCard style={styles.payCard} borderRadius={14}>
                    <View style={styles.payCardRow}>
                      <View style={styles.payLeft}>
                        <Text style={styles.payTitle}>{item.title}</Text>
                        <Text style={styles.paySubtitle}>{item.subtitle}</Text>
                        <Text style={styles.payDate}>{item.date}</Text>
                      </View>
                      <View style={styles.payRight}>
                        <Text style={styles.payAmount}>{item.amount}</Text>
                        <Text
                          style={[
                            styles.payStatus,
                            { color: isSuccess ? '#2E7D32' : '#C62828' },
                          ]}
                        >
                          {item.status}
                        </Text>
                      </View>
                    </View>
                  </GlassCard>
                );
              }}
            />
          </GlassCard>

          {/* ── TOTAL PAID BAR ─────────────────────────────────── */}
          <View style={styles.totalBar}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalAmount}>15,600</Text>
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

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    paddingBottom: 14,
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

  // ── Action buttons ──
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    gap: 14,
    marginBottom: 14,
  },
  actionBtn: { flex: 1 },
  actionCard: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    letterSpacing: 0.2,
  },

  // ── History section ──
  historySection: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 0,
    paddingTop: 4,
    paddingHorizontal: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  historyHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    paddingTop: 14,
    paddingBottom: 6,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.5)',
  },
  activeTabText: {
    fontWeight: '700',
    color: '#5C4A32',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginHorizontal: 14,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    gap: 10,
  },

  // ── Payment card ──
  payCard: { paddingVertical: 12, paddingHorizontal: 14 },
  payCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  payLeft: { flex: 1, paddingRight: 8 },
  payTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 3,
  },
  paySubtitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.55)',
    marginBottom: 2,
  },
  payDate: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.4)',
  },
  payRight: { alignItems: 'flex-end' },
  payAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 3,
  },
  payStatus: {
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Total paid bar ──
  totalBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6B6560',
    marginHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    bottom: 10,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.3,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
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
