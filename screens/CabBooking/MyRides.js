import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  COLORS,
  FONT_FAMILY,
  SHADOWS,
  scaleH,
  scaleM,
  scaleV,
} from '../../constants/AppTheme';
import { BlurView } from '@react-native-community/blur';

const TABS = ['Upcoming', 'Completed', 'Cancelled'];

const RIDES = [
  {
    id: 'upcoming-1',
    section: 'upcoming',
    date: 'Today,10:30 AM',
    code: 'RID12345678',
    from: 'Railway station',
    to: 'Sunrise Hostel',
    type: 'SUV',
    price: '₹249',
  },
  {
    id: 'completed-1',
    section: 'completed',
    date: 'Yesterday,10:30 AM',
    code: 'RID12345678',
    from: 'Railway station',
    to: 'Sunrise Hostel',
    type: 'SUV',
    price: '₹249',
  },
  {
    id: 'completed-2',
    section: 'completed',
    date: 'Yesterday,10:30 AM',
    code: 'RID12345678',
    from: 'Railway station',
    to: 'Sunrise Hostel',
    type: 'SUV',
    price: '₹249',
  },
  {
    id: 'completed-3',
    section: 'completed',
    date: '12,May,10:30 AM',
    code: 'RID12345678',
    from: 'Railway station',
    to: 'Sunrise Hostel',
    type: 'SUV',
    price: '₹249',
  },
];

const RideCard = ({ ride }) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.card}>
    <View style={styles.cardGlow} />

    <View style={styles.cardInfo}>
      <Text style={styles.rideDate}>{ride.date}</Text>
      <Text style={styles.rideCode}>{ride.code}</Text>

      <View style={styles.routeRow}>
        <View style={styles.routeRail}>
          <View style={styles.startDot}>
            <View style={styles.dotCore} />
          </View>
          <View style={styles.dashWrap}>
            <View style={styles.dash} />
            <View style={styles.dash} />
            <View style={styles.dash} />
          </View>
          <View style={styles.endDot}>
            <View style={styles.dotCore} />
          </View>
        </View>

        <View style={styles.routeText}>
          <Text style={styles.placeText}>{ride.from}</Text>
          <Text style={styles.placeText}>{ride.to}</Text>
        </View>
      </View>
    </View>

    <View style={styles.carArea}>
      <Image
        source={require('../../assets/images/hyundaiimg.png')}
        resizeMode="contain"
        style={styles.carImage}
      />

      <Text style={styles.fareText}>
        {ride.type} - {ride.price}
      </Text>
    </View>
  </TouchableOpacity>
);

const MyRides = ({ navigation }) => {
  const upcomingRides = RIDES.filter(ride => ride.section === 'upcoming');
  const completedRides = RIDES.filter(ride => ride.section === 'completed');

  return (
    <ImageBackground
      source={require('../../assets/BackgroundImages/cab.webp')}
      style={styles.bg}
      blurRadius={5}
    >
      <View style={styles.overlay} />

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
 <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={12}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
          />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation?.goBack()}
            style={styles.backBtn}
          >
            <Icon name="arrow-left" size={27} color="#15110E" />
          </TouchableOpacity>

          <Text style={styles.title}>My Rides</Text>
        </View>

        <View style={styles.tabs}>
          {TABS.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              style={styles.tabItem}
            >
              <Text
                style={[
                  styles.tabText,
                  index === 0 && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {upcomingRides.map(ride => (
            <RideCard key={ride.id} ride={ride} />
          ))}

          <Text style={styles.sectionTitle}>Completed</Text>

          {completedRides.map(ride => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MyRides;

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

  header: {
    minHeight: scaleV(48),
    paddingHorizontal: scaleH(16),
    paddingTop: scaleV(5),
    alignItems: 'center',
    justifyContent: 'center',
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

  title: {
    fontSize: scaleM(23),
    fontFamily: FONT_FAMILY.medium,
    color: '#080808',
  },

  tabs: {
    height: scaleV(38),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(18,18,18,0.50)',
  },

  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabText: {
    fontSize: scaleM(15),
    fontFamily: FONT_FAMILY.medium,
    color: 'rgba(24,20,17,0.58)',
  },

  tabTextActive: {
    color: '#080808',
  },

  listContent: {
    paddingTop: scaleV(16),
    paddingHorizontal: scaleH(12),
    paddingBottom: scaleV(30),
  },

  sectionTitle: {
    marginTop: scaleV(12),
    marginBottom: scaleV(8),
    marginLeft: scaleH(10),
    fontSize: scaleM(16),
    fontFamily: FONT_FAMILY.medium,
    color: '#080808',
  },

  card: {
    minHeight: scaleV(132),
    marginBottom: scaleV(12),
    borderRadius: scaleH(17),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.58)',
    backgroundColor: 'rgba(230,210,187,0.31)',
    flexDirection: 'row',
   
  },

  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  cardInfo: {
    flex: 1,
    paddingLeft: scaleH(17),
    paddingTop: scaleV(9),
    paddingBottom: scaleV(12),
  },

  rideDate: {
    fontSize: scaleM(18),
    lineHeight: scaleV(23),
    fontFamily: FONT_FAMILY.medium,
    color: '#080808',
  },

  rideCode: {
    marginTop: scaleV(1),
    fontSize: scaleM(14),
    lineHeight: scaleV(19),
    fontFamily: FONT_FAMILY.regular,
    color: '#14110F',
  },

  routeRow: {
    marginTop: scaleV(7),
    flexDirection: 'row',
  },

  routeRail: {
    width: scaleH(14),
    alignItems: 'center',
    marginRight: scaleH(9),
  },

  startDot: {
    width: scaleH(11),
    height: scaleH(11),
    borderRadius: scaleH(6),
    backgroundColor: '#2BE47D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  endDot: {
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

  dashWrap: {
    height: scaleV(22),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  dash: {
    width: scaleH(2),
    height: scaleV(3),
    borderRadius: scaleH(1),
    backgroundColor: '#080808',
  },

  routeText: {
    justifyContent: 'space-between',
    height: scaleV(45),
  },

  placeText: {
    fontSize: scaleM(12),
    lineHeight: scaleV(18),
    fontFamily: FONT_FAMILY.medium,
    color: 'rgba(36,31,28,0.58)',
  },

  carArea: {
    width: scaleH(125),
    paddingRight: scaleH(12),
    paddingTop: scaleV(22),
    paddingBottom: scaleV(12),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  carImage: {
    width: scaleH(108),
    height: scaleV(62),
  },

  fareText: {
    fontSize: scaleM(16),
    lineHeight: scaleV(21),
    fontFamily: FONT_FAMILY.medium,
    color: '#080808',
  },
});
