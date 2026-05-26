import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  COLORS,
  FONT_FAMILY,
  SHADOWS,
  scaleH,
  scaleM,
  scaleV,
} from '../../constants/AppTheme';

const RouteDot = ({ type }) => (
  <View style={styles.routeDotWrap}>
    <View style={type === 'pickup' ? styles.pickupDot : styles.dropDot}>
      <View style={styles.dotCore} />
    </View>
  </View>
);

const MapPreview = () => (
  <View style={styles.mapCard}>
    <Svg width="100%" height="100%" viewBox="0 0 270 188">
      <Rect x="0" y="0" width="270" height="188" rx="14" fill="#F7EFE4" />
      <Path d="M0 28 L270 10" stroke="#FFFFFF" strokeWidth="8" opacity="0.95" />
      <Path d="M12 0 L78 188" stroke="#FFFFFF" strokeWidth="7" opacity="0.9" />
      <Path d="M96 0 L130 188" stroke="#FFFFFF" strokeWidth="5" opacity="0.78" />
      <Path d="M176 0 L212 188" stroke="#FFFFFF" strokeWidth="6" opacity="0.78" />
      <Path d="M0 100 L270 68" stroke="#FFFFFF" strokeWidth="6" opacity="0.88" />
      <Path d="M0 150 L270 126" stroke="#FFFFFF" strokeWidth="6" opacity="0.82" />
      <Path d="M20 46 L88 28 L150 34 L246 20" stroke="#E3D4C3" strokeWidth="2" />
      <Path d="M42 180 L92 134 L123 120 L135 94 L166 82 L196 58 L222 48" stroke="#3B2B20" strokeWidth="2.4" fill="none" />
      <Circle cx="42" cy="180" r="4" fill="#3B2B20" />
      <Circle cx="222" cy="48" r="4" fill="#3B2B20" />
      <Line x1="222" y1="48" x2="222" y2="28" stroke="#3B2B20" strokeWidth="2" />
      <Circle cx="222" cy="25" r="6" fill="#6D5138" />
      <Circle cx="222" cy="25" r="2.4" fill="#FFFFFF" />
      <Rect x="58" y="72" width="18" height="30" fill="#D8E7D2" opacity="0.8" />
      <Rect x="185" y="100" width="24" height="19" fill="#D8E7D2" opacity="0.8" />
      <Rect x="210" y="141" width="24" height="20" fill="#D8E7D2" opacity="0.75" />
      <Circle cx="232" cy="92" r="5" fill="#B99463" opacity="0.8" />
      <SvgText x="157" y="112" fill="#9B8977" fontSize="7">MG Road</SvgText>
      <SvgText x="218" y="102" fill="#9B8977" fontSize="7">City Center</SvgText>
      <SvgText x="212" y="155" fill="#9B8977" fontSize="7">Central Park</SvgText>
      <SvgText x="28" y="177" fill="#9B8977" fontSize="7">Sunrise Hostel</SvgText>
    </Svg>

    <View style={styles.mapCarWrap}>
      <Image
        source={require('../../assets/images/hyundaiimg.png')}
        resizeMode="contain"
        style={styles.mapCar}
      />
    </View>
  </View>
);

const RideTracking = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/BackgroundImages/cab.webp')}
      style={styles.bg}
      blurRadius={6}
    >
      <View style={styles.overlay} />

      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={8}
        reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
      />

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation?.goBack()}
            style={styles.headerBtn}
          >
            <Icon name="arrow-left" size={28} color="#15110E" />
          </TouchableOpacity>

          <Text style={styles.title}>Ride Tracking</Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.headerBtn}>
            <Icon name="share-variant-outline" size={24} color="#15110E" />
          </TouchableOpacity>
        </View>

        <Text style={styles.statusTitle}>Your ride is on the way</Text>
        <Text style={styles.statusSub}>Arriving in 2 min</Text>

        <View style={styles.trackingCard}>
          <View style={styles.driverRow}>
            <View style={styles.avatar}>
              <Icon name="account-outline" size={31} color="#080808" />
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Rakesh yadav</Text>
              <Text style={styles.carNumber}>KAD5 AB 1234-White Drive</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity activeOpacity={0.85} style={styles.roundAction}>
                <Icon name="phone-outline" size={22} color="#080808" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} style={styles.roundAction}>
                <Icon name="message-processing-outline" size={22} color="#080808" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.taxiWatermark}>TAXI</Text>

          <MapPreview />

          <View style={styles.routePanel}>
            <View style={styles.routeLineWrap}>
              <RouteDot type="pickup" />
              <View style={styles.dashedLine}>
                <View style={styles.dash} />
                <View style={styles.dash} />
                <View style={styles.dash} />
              </View>
              <RouteDot type="drop" />
            </View>

            <View style={styles.routeTextWrap}>
              <View style={styles.routeTextBlock}>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routePlace}>Railway station</Text>
              </View>
              <View style={styles.routeTextBlock}>
                <Text style={styles.routeLabel}>Drop</Text>
                <Text style={styles.routePlace}>Sunrise hostel</Text>
              </View>
            </View>
          </View>
          <View style={styles.rideIdBox}>
            <Text style={styles.rideIdLabel}>Ride ID</Text>
            <Text style={styles.rideIdValue}>RID12345678</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel Ride</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RideTracking;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#CDB291',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(213,185,154,0.24)',
  },

  safeArea: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? scaleV(30)
        : 0,
  },

  header: {
    minHeight: scaleV(55),
    paddingHorizontal: scaleH(12),
    paddingTop: scaleV(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerBtn: {
    width: scaleH(38),
    height: scaleH(38),
    borderRadius: scaleH(19),
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: scaleM(24),
    fontFamily: FONT_FAMILY.medium,
    color: '#080808',
  },

  statusTitle: {
    marginTop: scaleV(17),
    marginHorizontal: scaleH(23),
    fontSize: scaleM(19),
    lineHeight: scaleV(24),
    fontFamily: FONT_FAMILY.medium,
    color: '#080808',
  },

  statusSub: {
    marginHorizontal: scaleH(23),
    fontSize: scaleM(16),
    lineHeight: scaleV(22),
    fontFamily: FONT_FAMILY.regular,
    color: '#080808',
  },

  trackingCard: {
    marginTop: scaleV(13),
    marginHorizontal: scaleH(21),
    borderRadius: scaleH(18),
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.42)',
    backgroundColor: 'rgba(230,210,187,0.23)',
    overflow: 'hidden',
    paddingHorizontal: scaleH(8),
    paddingTop: scaleV(11),
    paddingBottom: scaleV(13),
  },

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },

  avatar: {
    width: scaleH(30),
    height: scaleH(30),
    borderRadius: scaleH(16),
    borderWidth: 1.7,
    borderColor: '#080808',
    alignItems: 'center',
    justifyContent: 'center',
  },

  driverInfo: {
    flex: 1,
    marginLeft: scaleH(6),
  },

  driverName: {
    fontSize: scaleM(14),
    lineHeight: scaleV(18),
    fontFamily: FONT_FAMILY.medium,
    color: '#080808',
  },

  carNumber: {
    fontSize: scaleM(10),
    lineHeight: scaleV(14),
    fontFamily: FONT_FAMILY.regular,
    color: 'rgba(12,10,8,0.72)',
  },

  actionRow: {
    flexDirection: 'row',
    gap: scaleH(6),
  },

  roundAction: {
    width: scaleH(30),
    height: scaleH(30),
    borderRadius: scaleH(15),
    borderWidth: 1.5,
    borderColor: '#080808',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  taxiWatermark: {
    position: 'absolute',
    top: scaleV(41),
    right: scaleH(65),
    fontSize: scaleM(26),
    fontFamily: FONT_FAMILY.bold,
    color: 'rgba(26,16,8,0.45)',
    letterSpacing: 1,
  },

  mapCard: {
    height: scaleV(196),
    marginTop: scaleV(11),
    borderRadius: scaleH(15),
    borderWidth: scaleH(7),
    borderColor: 'rgba(255,255,255,0.96)',
    backgroundColor: '#F7EFE4',
    overflow: 'hidden',
    ...SHADOWS.medium,
  },

  mapCarWrap: {
    position: 'absolute',
    left: scaleH(106),
    top: scaleV(79),
    width: scaleH(38),
    height: scaleV(38),
    transform: [{ rotate: '-28deg' }],
  },

  mapCar: {
    width: '100%',
    height: '100%',
  },

  routePanel: {
    minHeight: scaleV(101),
    marginTop: scaleV(7),
    paddingTop: scaleV(12),
    paddingHorizontal: scaleH(6),
    borderRadius: scaleH(16),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(83,75,65,0.52)',
    flexDirection: 'row',
  },

  routeLineWrap: {
    width: scaleH(30),
    alignItems: 'center',
  },

  routeDotWrap: {
    width: scaleH(17),
    height: scaleH(17),
    alignItems: 'center',
    justifyContent: 'center',
  },

  pickupDot: {
    width: scaleH(11),
    height: scaleH(11),
    borderRadius: scaleH(6),
    backgroundColor: '#2BE47D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropDot: {
    width: scaleH(11),
    height: scaleH(11),
    borderRadius: scaleH(6),
    backgroundColor: '#F34A42',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dotCore: {
    width: scaleH(4),
    height: scaleH(4),
    borderRadius: scaleH(2),
    backgroundColor: COLORS.white,
  },

  dashedLine: {
    height: scaleV(31),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  dash: {
    width: scaleH(2),
    height: scaleV(4),
    borderRadius: scaleH(1),
    backgroundColor: '#080808',
  },

  routeTextWrap: {
    flex: 1,
  },

  routeTextBlock: {
    height: scaleV(42),
  },

  routeLabel: {
    fontSize: scaleM(14),
    lineHeight: scaleV(18),
    fontFamily: FONT_FAMILY.medium,
    color: COLORS.white,
  },

  routePlace: {
    marginTop: scaleV(2),
    fontSize: scaleM(12),
    lineHeight: scaleV(16),
    fontFamily: FONT_FAMILY.regular,
    color: 'rgba(255,255,255,0.75)',
  },

  rideIdBox: {
    height: scaleV(39),
    marginHorizontal: scaleH(7),
    
    borderRadius: scaleH(14),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.62)',
    backgroundColor: 'rgba(92,84,75,0.58)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(13),
  },

  rideIdLabel: {
    fontSize: scaleM(13),
    fontFamily: FONT_FAMILY.medium,
    color: COLORS.white,
  },

  rideIdValue: {
    fontSize: scaleM(13),
    fontFamily: FONT_FAMILY.medium,
    color: COLORS.white,
  },

  cancelBtn: {
    height: scaleV(40),
    marginHorizontal: scaleH(8),
    marginTop: scaleV(27),
    borderRadius: scaleH(14),
    borderWidth: 1.3,
    borderColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.13)',
  },

  cancelText: {
    fontSize: scaleM(18),
    fontFamily: FONT_FAMILY.medium,
    color: '#FF0000',
  },
});
