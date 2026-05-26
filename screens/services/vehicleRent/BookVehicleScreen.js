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

// ─── Reusable Premium GlassPanel ────────────────────────────────────────────
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

export default function BookVehicleScreen({ navigation }) {
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
          source={require('../../../assets/images/bgImgVehicleRent1.webp')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        <View style={styles.backgroundOverlay} />
      </View>

      <Animated.View style={[animStyle, { flex: 1 }]}>
        {/* ══════════ FIXED TOP HEADER ══════════ */}
        <View style={styles.fixedTop}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VehicleProductDetails')}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={28} color="#111" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Book Vehicle</Text>

            {/* Spacer for perfect layout centering */}
            <View style={styles.headerSpacer} />
          </View>
        </View>

        {/* ══════════ SCROLLABLE CONTENT ══════════ */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── VEHICLE DETAILS CARD ────────────────── */}
          <GlassPanel style={styles.vehicleDetailsCard} intensity={12}>
            <View style={styles.vehicleCardLeft}>
              <Image
                source={require('../../../assets/images/rentScooty.webp')}
                style={styles.vehicleCardImg}
                resizeMode="cover"
              />
            </View>
            <View style={styles.vehicleCardRight}>
              <Text style={styles.vehicleTitle}>Hero Splender</Text>
              <Text style={styles.vehicleSubtitle}>170cc+ Automatic</Text>
              <Text style={styles.vehiclePrice}>₹499/Day</Text>
            </View>
          </GlassPanel>

          {/* ── PICKUP & DROP-OFF SECTION ───────────── */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Pickup & Drop-off</Text>
          </View>

          <GlassPanel style={styles.routeCard} intensity={12}>
            <View style={styles.routeContainer}>
              {/* Timeline graphic on the left */}
              <View style={styles.timelineCol}>
                <Icon name="map-marker-outline" size={22} color="#1A1A1A" />
                <View style={styles.verticalTimelineLine} />
                <Icon name="map-marker-outline" size={22} color="#1A1A1A" />
              </View>

              {/* Text details in the middle */}
              <View style={styles.routeDetailsCol}>
                <View style={styles.routeDetailItem}>
                  <Text style={styles.routeMainText}>Sunrise Hostel, Main Gate</Text>
                  <Text style={styles.routeSubText}>Pickup location</Text>
                </View>
                <View style={styles.routeDetailItem}>
                  <Text style={styles.routeMainText}>Sunrise Hostel, Main Gate</Text>
                  <Text style={styles.routeSubText}>Drop-off location</Text>
                </View>
              </View>

              {/* Swap vertical icon on the right */}
              <TouchableOpacity activeOpacity={0.7} style={styles.swapBtnWrap}>
                <Icon name="swap-vertical" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
          </GlassPanel>

          {/* ── SELECT DATE & TIME SECTION ──────────── */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Select Date & Time</Text>
          </View>

          <GlassPanel style={styles.dateTimeCard} intensity={12}>
            {/* Pick Up Row */}
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateTimeLabel}>Pick up</Text>
              <Text style={styles.dateTimeValue}>16 May 2026,10:00AM</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Icon name="calendar-check-outline" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            {/* Subtle Divider Line */}
            <View style={styles.rowDivider} />

            {/* Drop Off Row */}
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateTimeLabel}>Drop off</Text>
              <Text style={styles.dateTimeValue}>16 May 2026,10:00AM</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Icon name="calendar-check-outline" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
          </GlassPanel>

          {/* ── PRICE DETAILS SECTION ───────────────── */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Price Details</Text>
          </View>

          <GlassPanel style={styles.priceCard} intensity={12}>
            {/* Rental row */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Rental(1 Day)</Text>
              <Text style={styles.priceValue}>₹499</Text>
            </View>

            {/* Security Deposit row */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Security Deposit</Text>
              <Text style={styles.priceValue}>₹1000</Text>
            </View>

            {/* Platform Fee row */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Platform Fee</Text>
              <Text style={styles.priceValue}>₹49</Text>
            </View>

            {/* Inset Line Divider */}
            <View style={styles.priceDivider} />

            {/* Total Amount Row */}
            <View style={styles.totalAmountRow}>
              <Text style={styles.totalAmountLabel}>Total Amount</Text>
              <Text style={styles.totalAmountValue}>₹1548</Text>
            </View>
          </GlassPanel>

          <View style={styles.fixedBottomBarWrap}>
            <TouchableOpacity activeOpacity={0.85} style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>Confirm booking</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ══════════ FIXED BOTTOM ACTION BAR ══════════ */}

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

  // ── Fixed Top Header ──────────────────────────────
  fixedTop: {

    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '500',
    color: '#1A1A1A',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },

  // ── Scroll Content ────────────────────────────────
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingTop: 8,
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },

  // ── Vehicle Details Card ──────────────────────────
  vehicleDetailsCard: {
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },
  vehicleCardLeft: {
    width: 100,
    height: 80,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  vehicleCardImg: {
    width: '100%',
    height: '100%',
  },
  vehicleCardRight: {
    flex: 1,
    justifyContent: 'center',
  },
  vehicleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  vehicleSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6A6560',
    marginBottom: 4,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  // ── Section Title Row ─────────────────────────────
  sectionHeaderRow: {
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 0.2,
  },

  // ── Pickup & Drop-Off Card ────────────────────────
  routeCard: {
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineCol: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    marginRight: 14,
  },
  verticalTimelineLine: {
    width: 1.5,
    height: 34,
    backgroundColor: '#8A8580',
    marginVertical: 4,
    borderStyle: 'dashed',
  },
  routeDetailsCol: {
    flex: 1,
  },
  routeDetailItem: {
    paddingVertical: 2,
  },
  routeMainText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  routeSubText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6A6560',
    marginBottom: 8,
  },
  swapBtnWrap: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // ── Select Date & Time Card ───────────────────────
  dateTimeCard: {
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  dateTimeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6A6560',
    width: 70,
  },
  dateTimeValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  rowDivider: {
    height: 1.5,
    backgroundColor: 'rgba(5, 5, 5, 0.08)',
  },

  // ── Price Details Card ────────────────────────────
  priceCard: {
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    paddingVertical: 20,
    paddingHorizontal: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A4A',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  priceDivider: {
    height: 1.5,
    backgroundColor: 'rgba(5, 5, 5, 0.08)',
    marginVertical: 14,
  },
  totalAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  totalAmountLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  totalAmountValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  // ── Fixed Bottom Button ───────────────────────────
  fixedBottomBarWrap: {

    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 34 : 18,
    paddingTop: 10,
    backgroundColor: 'transparent',

  },
  confirmBtn: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e3a3775',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  confirmBtnText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.1,
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
