import React, { useEffect, useRef } from 'react';
import {
  Animated,
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
  CAB_COLORS,
  COLORS,
  FONT_FAMILY,
  RADIUS,
  scaleH,
  scaleM,
  scaleV,
} from '../../constants/AppTheme';

const C = CAB_COLORS;

const CARDS = [
  {
    id: 'book',
    title: 'Book A\nRide',
    reversed: false,
  },
  {
    id: 'rides',
    title: 'My\nRides',
    reversed: true,
  },
  {
    id: 'track',
    title: 'Rides\nTracking',
    badge: 'Live',
  },
];

const RideCard = ({ title, subtitle, badge, reversed, onPress }) => {
  const pressAnim = useRef(new Animated.Value(1)).current;
  const lines = title.split('\n');

  const onIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();
  };

  const onOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={onIn}
        onPressOut={onOut}
        style={[s.card, reversed && s.cardReversed]}
      >
        <View style={s.glow} pointerEvents="none" />

        {badge && (
          <View style={s.badge}>
            <Text style={s.badgeText}>● {badge}</Text>
          </View>
        )}

        <View style={[s.textSide, reversed && s.textSideR]}>
          <Text style={[s.cardSub, reversed && s.rightAlign]}>
            {subtitle}
          </Text>

          <Text style={[s.cardTitle, reversed && s.rightAlign]}>
            {lines.map((line, index) => (
              <Text key={line}>
                {line}
                {index < lines.length - 1 ? '\n' : ''}
              </Text>
            ))}
          </Text>

          <View style={[s.arrowBtn, reversed && s.arrowBtnR]} />
        </View>

        <View style={[s.carWrap, reversed && s.carWrapR]}>
          <Image
            source={require('../../assets/images/hyundaiimg.png')}
            style={s.carImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function CabBookingScreen({ navigation }) {
  const anims = useRef(CARDS.map(() => new Animated.Value(0))).current;
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerAnim, {
        toValue: 1,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.stagger(
        130,
        anims.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            tension: 55,
            friction: 10,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();
  }, [anims, headerAnim]);

  const handlePress = id => {
    const routes = {
      book: 'BookRide',
      rides: 'MyRides',
      track: 'RideTracking',
    };

    navigation?.navigate(routes[id]);
  };

  return (
    <ImageBackground
      source={require('../../assets/BackgroundImages/cab.webp')}
      style={s.bg}
      blurRadius={10}
    >
      <View style={s.overlay} pointerEvents="none" />

      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={COLORS.transparent}
      />

      <SafeAreaView style={s.safe}>
        <Animated.View
          style={[
            s.header,
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
            style={s.backBtn}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.8}
          >
            <Icon name="arrow-left" size={28} color={COLORS.black} />
          </TouchableOpacity>

          <Text style={s.pageTitle}>Cab Booking</Text>
        </Animated.View>

        <ScrollView
          contentContainerStyle={s.cardsList}
          showsVerticalScrollIndicator={false}
        >
          {CARDS.map((card, index) => (
            <Animated.View
              key={card.id}
              style={{
                opacity: anims[index],
                transform: [
                  {
                    translateY: anims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              }}
            >
              <RideCard
                title={card.title}
                subtitle={card.subtitle}
                badge={card.badge}
                reversed={card.reversed}
                onPress={() => handlePress(card.id)}
              />
            </Animated.View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: C.bgWarm,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.overlayWarm,
  },

  safe: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? scaleV(30)
        : 0,
  },

  header: {
    paddingHorizontal: scaleH(22),
    paddingTop: scaleV(8),
    paddingBottom: scaleV(16),
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    width: scaleH(38),
    height: scaleH(38),
    marginRight: scaleH(14),
    marginBottom: scaleV(12),
    borderRadius: RADIUS.full,
    borderColor: C.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageTitle: {
    fontSize: scaleM(30),
    fontFamily: FONT_FAMILY.extrabold,
    fontWeight: '800',
    color: C.textDark,
    lineHeight: scaleV(34),
    letterSpacing: -0.5,
  },

  cardsList: {
    paddingHorizontal: scaleH(14),
    paddingBottom: scaleV(16),
    gap: scaleV(32),
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scaleV(114),
    borderRadius: scaleH(24),
    backgroundColor: C.glass,
    borderWidth: 1,
    borderColor: C.glassBorder,
    overflow: 'hidden',
    position: 'relative',
  },

  cardReversed: {
    flexDirection: 'row-reverse',
  },

  glow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.glassGlow,
  },

  badge: {
    position: 'absolute',
    top: scaleV(12),
    right: scaleH(12),
    paddingHorizontal: scaleH(10),
    paddingVertical: scaleV(3),
    borderRadius: RADIUS.full,
    backgroundColor: C.liveBg,
    borderWidth: 0.5,
    borderColor: C.liveBorder,
    zIndex: 10,
  },

  badgeText: {
    fontSize: scaleM(9),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: C.liveText,
  },

  textSide: {
    flex: 1,
    paddingHorizontal: scaleH(40),
    paddingVertical: scaleV(20),
    justifyContent: 'center',
    gap: scaleV(4),
  },

  textSideR: {
    alignItems: 'flex-end',
  },

  cardSub: {
    fontSize: scaleM(9),
    fontFamily: FONT_FAMILY.semibold,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: C.textMuted,
    marginBottom: scaleV(2),
  },

  cardTitle: {
    fontSize: scaleM(21),
    fontFamily: FONT_FAMILY.extrabold,
    fontWeight: '800',
    color: C.textDark,
    lineHeight: scaleV(25),
    letterSpacing: -0.4,
  },

  rightAlign: {
    textAlign: 'right',
  },

  arrowBtn: {
    width: scaleH(30),
    height: scaleH(30),
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleV(8),
  },

  arrowBtnR: {
    alignSelf: 'flex-end',
  },

  carWrap: {
    width: scaleH(148),
    height: scaleV(114),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingBottom: scaleV(5),
    marginRight: scaleH(-6),
  },

  carWrapR: {
    alignItems: 'flex-start',
    marginRight: 0,
    marginLeft: scaleH(-6),
  },

  carImage: {
    width: scaleH(145),
    height: scaleV(82),
  },
});
