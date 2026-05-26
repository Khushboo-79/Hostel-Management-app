// screens/BookRide.jsx

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  COLORS,
  FONT_FAMILY,
  SHADOWS,
  scaleH,
  scaleV,
  scaleM,
} from '../../constants/AppTheme';
import { BlurView } from '@react-native-community/blur';

const RIDES = [
  {
    id: '1',
    title: 'Mini',
    seats: '4 seats',
    desc: 'Affordable & Comfy',
  },
  {
    id: '2',
    title: 'SUV',
    seats: '6 seats',
    desc: 'Extra space & Comforts',
  },
  {
    id: '3',
    title: 'Prime',
    seats: '4 seats',
    desc: 'Top drivers , premium cars',
  },
];

const RideCard = ({ item, index }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      delay: index * 120,
      useNativeDriver: true,
      tension: 55,
      friction: 8,
    }).start();
  }, [anim, index]);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.rideCard,
          index === RIDES.length - 1 && styles.rideCardActive,
        ]}
      >
        {/* Glass Overlay */}
        <View style={styles.cardGlow} />

        {/* Car Image */}
        <View style={styles.carShell}>
          <Image
            source={require('../../assets/images/hyundaiimg.png')}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>

        {/* Ride Info */}
        <View style={styles.rideInfo}>
          <Text style={styles.rideTitle}>
            {item.title}
          </Text>

          <Text style={styles.rideSeats}>
            {item.seats}
          </Text>

          <Text style={styles.rideDesc}>
            {item.desc}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const BookRide = ({ navigation }) => {
  const headerAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(headerAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [headerAnim]);

  return (
    <ImageBackground
      source={require('../../assets/BackgroundImages/cab.webp')}
      style={styles.bg}
      blurRadius={10}
    >
      {/* Warm Overlay */}
      <View style={styles.overlay} />

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.safeArea}>
 <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={8}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
          />
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation?.goBack()}
            style={styles.backBtn}
          >
            <Icon
              name="arrow-left"
              size={26}
              color="#1A1008"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Book a Ride
          </Text>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: scaleV(40),
          }}
        >

          {/* Location Card */}
          <View style={styles.locationCard}>

            {/* Pickup */}
            <View style={styles.locationRow}>
              <Icon
                name="magnify"
                size={24}
                color="#080808"
              />

              <TextInput
                placeholder="Enter pickup location"
                placeholderTextColor="rgba(26,16,8,0.55)"
                style={styles.input}
              />
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Drop */}
            <View style={styles.locationRow}>
              <View style={styles.dropLeft}>
                <Icon
                  name="map-marker-outline"
                  size={24}
                  color="#080808"
                />

                <View>
                  <Text style={styles.whereText}>
                    Where to?
                  </Text>
                  <Text style={styles.dropText}>
                    Add drop location
                  </Text>
                </View>
              </View>

               
            </View>
          </View>

          {/* Ride Title */}
          <Text style={styles.chooseRide}>
            Choose a Ride
          </Text>

          {/* Ride Cards */}
          <View style={styles.rideList}>
            {RIDES.map((item, index) => (
              <RideCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </View>

        </ScrollView>

        {/* Confirm Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.confirmBtn}
        >
          <Text style={styles.confirmText}>
            Confirm Ride
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default BookRide;

const styles = StyleSheet.create({

  bg: {
    flex: 1,
    backgroundColor: '#CDB291',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(213,185,154,0.34)',
  },

  safeArea: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? scaleV(30)
        : 0,
  },

  // HEADER

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleH(16),
    paddingTop: scaleV(6),
    marginBottom: scaleV(16),
    minHeight: scaleV(46),
  },

  backBtn: {
    position: 'absolute',
    left: scaleH(16),
    width: scaleH(34),
    height: scaleH(34),
    borderRadius: scaleH(17),
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: scaleM(23),
    fontFamily: FONT_FAMILY.medium,
    color: '#080808',
    textAlign: 'center',
  },

  // LOCATION CARD

  locationCard: {
    marginHorizontal: scaleH(17),
    borderRadius: scaleH(18),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(20,20,20,0.32)',
    backgroundColor: 'rgba(255,255,255,0.20)',
    // ...SHADOWS.medium,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scaleV(61),
    paddingHorizontal: scaleH(19),
    paddingVertical: scaleV(13),
  },

  input: {
    flex: 1,
    marginLeft: scaleH(16),
    paddingVertical: 0,
    fontSize: scaleM(14),
    fontFamily: FONT_FAMILY.semibold,
    color: '#3A332E',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(25,25,25,0.27)',
  },

  dropLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: scaleH(15),
  },

  whereText: {
    fontSize: scaleM(14),
    fontFamily: FONT_FAMILY.semibold,
    color: 'rgba(70,62,57,0.84)',
  },

  dropText: {
    fontSize: scaleM(14),
    fontFamily: FONT_FAMILY.semibold,
    color: 'rgba(70,62,57,0.76)',
    marginTop: scaleV(1),
  },

  plusBtn: {
    width: scaleH(25),
    height: scaleH(25),
    borderRadius: scaleH(13),
    borderWidth: 1,
    borderColor: '#080808',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  // TITLE

  chooseRide: {
    marginTop: scaleV(17),
    marginBottom: scaleV(12),
    marginHorizontal: scaleH(16),
    fontSize: scaleM(21),
    fontFamily: FONT_FAMILY.regular,
    color: '#080808',
  },

  // RIDE LIST

  rideList: {
    gap: scaleV(13),
    paddingHorizontal: scaleH(13),
  },

  // CARD

  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scaleV(76),
    borderRadius: scaleH(18),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.44)',
    backgroundColor: 'rgba(151, 143, 130, 0.56)',
    paddingHorizontal: scaleH(11),
    paddingVertical: scaleV(10),
   

  },

  rideCardActive: {
    borderColor: 'rgba(151, 143, 130, 0.56)',
    borderWidth: 1,
    backgroundColor: 'rgba(151, 143, 130, 0.56)',
     
  },

  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  carShell: {
    width: scaleH(116),
    height: scaleV(66),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scaleH(1),
  },

  carImage: {
    width: scaleH(112),
    height: scaleV(65),
  },

  rideInfo: {
    flex: 1,
  },

  rideTitle: {
    fontSize: scaleM(20),
    color: COLORS.white,
    fontFamily: FONT_FAMILY.medium,
    lineHeight: scaleV(24),
  },

  rideSeats: {
    marginTop: scaleV(1),
    fontSize: scaleM(12),
    color: 'rgba(255,255,255,0.96)',
    fontFamily: FONT_FAMILY.medium,
  },

  rideDesc: {
    marginTop: scaleV(1),
    fontSize: scaleM(12),
    color: COLORS.white,
    fontFamily: FONT_FAMILY.medium,
  },

  // BUTTON

  confirmBtn: {
    marginHorizontal: scaleH(17),
    marginBottom: scaleV(24),
    height: scaleV(52),
    borderRadius: scaleH(17),
    backgroundColor: 'rgba(151, 143, 130, 0.56)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.26)',
    
  },

  confirmText: {
    fontSize: scaleM(20),
    color: COLORS.white,
    fontFamily: FONT_FAMILY.semibold,
    letterSpacing: 0,
  },
});
 
