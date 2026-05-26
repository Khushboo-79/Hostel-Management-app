import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Alert,
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

// ─── Screen Component ─────────────────────────────────────────────────────────
export default function DownloadReceiptScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All');
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

  const handleDownload = (id) => {
    Alert.alert('Download Receipt', `Downloading receipt for ${id}...`);
  };

  const handleSupport = () => {
    navigation.navigate('HelpSupport');
  };

  const receipts = [
    { id: 'INV-2024-0387-1', name: 'INV-2024-0387', date: '15 May 2025, 10:30 AM', amount: '3,250' },
    { id: 'INV-2024-0387-2', name: 'INV-2024-0387', date: '15 May 2025, 10:30 AM', amount: '3,250' },
    { id: 'INV-2024-0387-3', name: 'INV-2024-0387', date: '15 May 2025, 10:30 AM', amount: '3,250' },
    { id: 'INV-2024-0387-4', name: 'INV-2024-0387', date: '15 May 2025, 10:30 AM', amount: '3,250' },
  ];

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={require('../assets/images/paymentimg.webp')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Dim overlay */}
        <View style={styles.bgOverlay} />

        <Animated.View style={animStyle}>

          {/* ══════════════ FIXED TOP HEADER & TABS ══════════════ */}
          <View style={styles.fixedTop}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PaymentSuccessScreen')}
                style={styles.backBtn}
                activeOpacity={0.7}
              >
                <Icon name="arrow-left" size={28} color="#111" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Download Receipt</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
              {['All', 'Payments', 'Invoices'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={styles.tabBtn}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* Divider line below tabs */}
            <View style={styles.tabsDivider} />
          </View>

          {/* ══════════════ SCROLLABLE CONTENT ══════════════ */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Receipt Cards */}
            <View style={styles.cardsWrapper}>
              {receipts.map((item) => (
                <GlassCard key={item.id} style={styles.receiptCard} borderRadius={24}>
                  <View style={styles.cardContentRow}>
                    {/* Left Column */}
                    <View style={styles.cardLeft}>
                      <Text style={styles.receiptTitle}>Receipt - {item.name}</Text>
                      <Text style={styles.receiptDate}>{item.date}</Text>
                    </View>

                    {/* Right Column */}
                    <View style={styles.cardRight}>
                      <Text style={styles.receiptAmount}>{item.amount}</Text>
                      <TouchableOpacity
                        onPress={() => handleDownload(item.name)}
                        activeOpacity={0.7}
                        style={styles.downloadIconWrapper}
                      >
                        <Icon name="file-download-outline" size={32} color="#111" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </GlassCard>
              ))}
            </View>

            {/* Support Help Card */}
            <TouchableOpacity onPress={handleSupport} activeOpacity={0.85}>
              <GlassCard
                style={styles.helpCard}
                borderRadius={20}
                glassBgColor="rgba(255, 166, 0, 0.15)"
              >
                <View style={styles.helpContentRow}>
                  {/* Left Column */}
                  <View style={styles.helpLeft}>
                    <Text style={styles.helpTitle}>Need Help?</Text>
                    <Text style={styles.helpSubtitle}>Talk to our support team.</Text>
                  </View>

                  {/* Right Column */}
                  <View style={styles.helpRight}>
                    <Icon name="headset" size={36} color="#111" />
                  </View>
                </View>
              </GlassCard>
            </TouchableOpacity>
          </ScrollView>

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

  // ── Fixed Top Header & Tabs ──
  fixedTop: {
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 4,
  },

  // ── Tabs ──
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  tabBtn: {
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  tabTextActive: {
    color: '#111',
    fontWeight: '700',
  },
  tabsDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    width: '100%',
  },

  // ── Scrollable Middle ──
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: Platform.OS === 'ios' ? 44 : 30,
  },

  // ── Cards Wrapper ──
  cardsWrapper: {
    gap: 12,
    marginBottom: 20,
  },

  // ── Receipt Card ──
  receiptCard: {
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  cardContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  receiptTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
    letterSpacing: 0.1,
  },
  receiptDate: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.55)',
    letterSpacing: 0.1,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  receiptAmount: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111',
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  downloadIconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  // ── Help Card ──
  helpCard: {
    height: 130,
    borderColor: 'rgba(255, 166, 0, 0.88)',
    backgroundColor: 'rgba(255, 166, 0, 0.15)', // orange glass
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 22,
    marginTop: 8,
  },
  helpContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  helpTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  helpSubtitle: {
    marginTop: 10,
    fontSize: 15,
    color: 'rgba(0,0,0,0.60)',
  },
  helpRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
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
