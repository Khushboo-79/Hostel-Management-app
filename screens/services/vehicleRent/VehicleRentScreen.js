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

export default function VehicleRentScreen({ navigation }) {
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

      <Animated.View style={animStyle}>
        {/* ══════════ FIXED HEADER ══════════ */}
        <View style={styles.fixedTop}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Services')}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={28} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Vehicle Rent</Text>
            {/* Spacer to keep title perfectly centered */}
            <View style={styles.headerSpacer} />
          </View>
        </View>

        {/* ══════════ SCROLLABLE CONTENT ══════════ */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── TOP PICKES TITLE BAR ───────────────── */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Top Pickes</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AllVehicle')}
            >
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {/* ── VEHICLE CARD ROW (SIDE BY SIDE) ─────── */}
          <View style={styles.vehicleCardRow}>
            {/* Pulsar 150 */}
            <GlassPanel style={styles.vehicleCard} intensity={12}>
              <View style={styles.vehicleImageWrap}>
                <Image
                  source={require('../../../assets/images/rentBike.webp')}
                  style={styles.vehicleImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.vehicleDetailsArea}>
                <Text style={styles.vehicleName}>Pulsar 150</Text>
                <Text style={styles.vehiclePrice}>₹699/day</Text>
              </View>
            </GlassPanel>

            {/* Activa 5G */}
            <GlassPanel style={styles.vehicleCard} intensity={12}>
              <View style={styles.vehicleImageWrap}>
                <Image
                  source={require('../../../assets/images/rentScooty.webp')}
                  style={styles.vehicleImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.vehicleDetailsArea}>
                <Text style={styles.vehicleName}>Activa 5G</Text>
                <Text style={styles.vehiclePrice}>₹ 499/day</Text>
              </View>
            </GlassPanel>
          </View>

          {/* ── MY BOOKINGS BUTTON ─────────────────── */}
          <TouchableOpacity activeOpacity={0.8} style={styles.myBookingsBtnWrap}>
            <GlassPanel style={styles.myBookingsBtn} intensity={12}>
              <Text style={styles.myBookingsBtnText}>My Bookings</Text>
            </GlassPanel>
          </TouchableOpacity>

          {/* ── FILTER TABS ───────────────────────── */}
          <View style={styles.tabFiltersRow}>
            <TouchableOpacity activeOpacity={0.7} style={styles.tabItemActive}>
              <Text style={styles.tabTextActive}>Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.tabItemInactive}>
              <Text style={styles.tabTextInactive}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.tabItemInactive}>
              <Text style={styles.tabTextInactive}>Cancelled</Text>
            </TouchableOpacity>
          </View>

          {/* ── BOOKING CARDS LIST ─────────────────── */}
          <View style={styles.bookingsList}>
            {/* Booking Card 1 */}
            <GlassPanel style={styles.bookingCard} intensity={10}>
              <View style={styles.bookingLeft}>
                <Image
                  source={require('../../../assets/images/rentBike.webp')}
                  style={styles.bookingCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.bookingRight}>
                <Text style={styles.bookingTitle}>Activa 5G</Text>
                <Text style={styles.bookingDate}>16 May 2026,10:00AM</Text>
                <Text style={styles.bookingToText}>To</Text>
                <Text style={styles.bookingDate}>17 May 2026,10:00AM</Text>
                <Text style={styles.bookingId}>Booking ID:#VRT12345</Text>
              </View>
              <View style={styles.bookingIconArea}>
                <Icon name="check-circle-outline" size={24} color="#000" />
              </View>
            </GlassPanel>

            {/* Booking Card 2 */}
            <GlassPanel style={styles.bookingCard} intensity={10}>
              <View style={styles.bookingLeft}>
                <Image
                  source={require('../../../assets/images/rentScooty.webp')}
                  style={styles.bookingCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.bookingRight}>
                <Text style={styles.bookingTitle}>Activa 5G</Text>
                <Text style={styles.bookingDate}>16 May 2026,10:00AM</Text>
                <Text style={styles.bookingToText}>To</Text>
                <Text style={styles.bookingDate}>17 May 2026,10:00AM</Text>
                <Text style={styles.bookingId}>Booking ID:#VRT12345</Text>
              </View>
              <View style={styles.bookingIconArea}>
                <Icon name="check-circle-outline" size={24} color="#000" />
              </View>
            </GlassPanel>

            {/* Booking Card 3 */}
            <GlassPanel style={[styles.bookingCard, styles.lastBookingCard]} intensity={10}>
              <View style={styles.bookingLeft}>
                <Image
                  source={require('../../../assets/images/rentScooty.webp')}
                  style={styles.bookingCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.bookingRight}>
                <Text style={styles.bookingTitle}>Activa 5G</Text>
                <Text style={styles.bookingDate}>16 May 2026,10:00AM</Text>
                <Text style={styles.bookingToText}>To</Text>
                <Text style={styles.bookingDate}>17 May 2026,10:00AM</Text>
                <Text style={styles.bookingId}>Booking ID:#VRT12345</Text>
              </View>
              <View style={styles.bookingIconArea}>
                <Icon name="check-circle-outline" size={24} color="#000" />
              </View>
            </GlassPanel>
          </View>
        </ScrollView>
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

  // ── Scroll Content ────────────────────────────────
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 44 : 30,
  },

  // ── Section Title Row ─────────────────────────────
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 0.2,
  },
  viewAllText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#3A3A3A',
  },

  // ── Vehicle Cards (Side by Side) ──────────────────
  vehicleCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  vehicleCard: {
    width: '48%',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  vehicleImageWrap: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  vehicleImg: {
    width: '100%',
    height: '100%',
  },
  vehicleDetailsArea: {
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
    textAlign: 'center',
  },
  vehiclePrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4A4A4A',
    textAlign: 'center',
  },

  // ── My Bookings Button ────────────────────────────
  myBookingsBtnWrap: {
    width: '100%',
    marginBottom: 24,
  },
  myBookingsBtn: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(88, 55, 22, 0.2)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  myBookingsBtnText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1A1A1A',
    letterSpacing: 0.2,
  },

  // ── Tab Filters Row ───────────────────────────────
  tabFiltersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  tabItemActive: {
    marginRight: 16,
  },
  tabTextActive: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tabItemInactive: {
    marginRight: 16,
  },
  tabTextInactive: {
    fontSize: 20,
    fontWeight: '500',
    color: '#8A8580',
  },

  // ── Bookings List ─────────────────────────────────
  bookingsList: {
    width: '100%',
  },
  bookingCard: {
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  lastBookingCard: {
    marginBottom: 10,
  },
  bookingLeft: {
    width: 90,
    height: 90,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  bookingCardImg: {
    width: '100%',
    height: '100%',

  },
  bookingRight: {
    flex: 1,
    justifyContent: 'center',
  },
  bookingTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A4A4A',
    lineHeight: 16,
  },
  bookingToText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A4A4A',
    lineHeight: 16,
  },
  bookingId: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6A6560',
    marginTop: 6,
  },
  bookingIconArea: {
    justifyContent: 'flex-start',
    paddingTop: 4,
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
