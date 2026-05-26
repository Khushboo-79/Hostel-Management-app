import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from '../components/BottomNavbar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Precise Layout Constants
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = height * 0.55;

// Sorted precisely from 1 to 9 so Room Cleaning is the absolute first
const INITIAL_DATA = [
  { id: '1', title: 'Room Cleaning', tagline: 'A clean room, a better you', image: require('../assets/images/roomCleaning.webp') },
  { id: '2', title: 'Laundry', tagline: 'Hassle free laundry service at your hostel', image: require('../assets/images/laundry.jpg') },
  { id: '3', title: 'Gym', tagline: 'Stay fit. stay focused', image: require('../assets/images/gym.jpeg') },
  { id: '4', title: 'Vehicle Rent', tagline: 'Rent bikes and scooties anytime, anywhere', image: require('../assets/images/vehicleRent.png') },
  { id: '5', title: 'Cab Booking', tagline: 'Your ride. our priority', image: require('../assets/images/cab.png') },
  { id: '6', title: 'Emergency', tagline: 'Help is just a call away', image: require('../assets/images/emergency.jpg') },
  { id: '7', title: 'Study Room', tagline: 'Focus, book, achieve', image: require('../assets/images/study.jpeg') },
  { id: '8', title: 'Events', tagline: 'Festivals that bring us together', image: require('../assets/images/events.jpeg') },
  { id: '9', title: 'Health', tagline: 'Complete health support, anytime you need', image: require('../assets/images/health.jpeg') },
];

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 140,
  mass: 0.7,
};

const Card = ({ item, index, totalCards, translateX, translateY, activeIndex, navigation }) => {

  // Pure UI thread math: distance from the currently active front card
  const animatedStyle = useAnimatedStyle(() => {
    let dist = (index - activeIndex.value) % totalCards;
    while (dist < 0) dist += totalCards;

    // Hidden back cards
    if (dist > 3) {
      return { opacity: 0, zIndex: 0, transform: [{ scale: 0.88 }, { translateX: -70 }] };
    }

    // Entering card (becoming 3rd)
    if (dist === 3) {
      const opacity = interpolate(Math.abs(translateX.value), [0, width * 0.5], [0, 0.45], Extrapolation.CLAMP);
      return {
        zIndex: 0,
        elevation: 0,
        opacity,
        transform: [{ scale: 0.88 }, { translateX: -70 }],
      };
    }

    // Third card
    if (dist === 2) {
      const scale = interpolate(Math.abs(translateX.value), [0, width], [0.88, 0.94], Extrapolation.CLAMP);
      const shiftX = interpolate(Math.abs(translateX.value), [0, width], [-70, -35], Extrapolation.CLAMP);
      const opacity = interpolate(Math.abs(translateX.value), [0, width], [0.45, 0.7], Extrapolation.CLAMP);

      return {
        zIndex: 1,
        elevation: 5,
        opacity,
        transform: [{ scale }, { translateX: shiftX }],
      };
    }

    // Second card
    if (dist === 1) {
      const scale = interpolate(Math.abs(translateX.value), [0, width], [0.94, 1], Extrapolation.CLAMP);
      const shiftX = interpolate(Math.abs(translateX.value), [0, width], [-35, 0], Extrapolation.CLAMP);
      const opacity = interpolate(Math.abs(translateX.value), [0, width], [0.7, 1], Extrapolation.CLAMP);

      return {
        zIndex: 2,
        elevation: 8,
        opacity,
        transform: [{ scale }, { translateX: shiftX }],
      };
    }

    // Front card
    if (dist === 0) {
      const rotate = interpolate(translateX.value, [-width, 0, width], [-10, 0, 10], Extrapolation.CLAMP);
      return {
        zIndex: 3,
        elevation: 10,
        opacity: 1,
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { rotate: `${rotate}deg` },
        ],
      };
    }

    return { opacity: 0 };
  });

  const blur8Style = useAnimatedStyle(() => {
    let dist = (index - activeIndex.value) % totalCards;
    while (dist < 0) dist += totalCards;

    if (dist === 1) {
      const op = interpolate(Math.abs(translateX.value), [0, width * 0.5], [1, 0], Extrapolation.CLAMP);
      return { opacity: op };
    }
    if (dist === 2) {
      const op = interpolate(Math.abs(translateX.value), [0, width * 0.5], [0, 1], Extrapolation.CLAMP);
      return { opacity: op };
    }
    return { opacity: dist > 2 ? 1 : 0 };
  });

  const blur12Style = useAnimatedStyle(() => {
    let dist = (index - activeIndex.value) % totalCards;
    while (dist < 0) dist += totalCards;

    if (dist === 2) {
      const op = interpolate(Math.abs(translateX.value), [0, width * 0.5], [1, 0], Extrapolation.CLAMP);
      return { opacity: op };
    }
    if (dist === 3) {
      const op = interpolate(Math.abs(translateX.value), [0, width * 0.5], [0, 1], Extrapolation.CLAMP);
      return { opacity: op };
    }
    return { opacity: dist > 3 ? 1 : 0 };
  });

  // Navigate to the correct screen based on the card tapped
  const handleNavigation = () => {
    if (item.id === '1') navigation.navigate('RoomCleaning');
    if (item.id === '2') navigation.navigate('Laundry');
    if (item.id === '3') navigation.navigate('Gym');
    if (item.id === '4') navigation.navigate('VehicleRent');
    if (item.id === '7') navigation.navigate('StudyRoom');
    if (item.id === '5') navigation.navigate('CabBooking');
  };

  const tapGesture = Gesture.Tap().onEnd(() => {
<<<<<<< HEAD
    if (activeIndex.value === index && (item.id === '1' || item.id === '2' || item.id === '5' || item.id === '7')) {
=======
    if (activeIndex.value === index && (item.id === '1' || item.id === '2' || item.id === '3' || item.id === '4' || item.id === '7')) {
>>>>>>> fd5d80376ecc7fc0b566261a599ce85e6b32c8be
      runOnJS(handleNavigation)();
    }
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.cardBase, animatedStyle]}>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
          style={styles.frontCardContent}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardTagline}>{item.tagline}</Text>
        </LinearGradient>

        <Animated.View style={[StyleSheet.absoluteFill, blur8Style]} pointerEvents="none">
          <View style={styles.depthOverlay} />
        </Animated.View>

        <Animated.View style={[StyleSheet.absoluteFill, blur12Style]} pointerEvents="none">
          <View style={styles.depthOverlayDarker} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default function ServicesScreen() {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const activeIndex = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.15;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > 50 || Math.abs(event.velocityX) > 300) {
        const direction = Math.sign(event.translationX);
        const targetX = direction * width * 1.5;

        translateX.value = withSpring(targetX, { ...SPRING_CONFIG, velocity: event.velocityX }, () => {
          activeIndex.value = (activeIndex.value + 1) % INITIAL_DATA.length;
          translateX.value = 0;
          translateY.value = 0;
        });
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={StyleSheet.absoluteFill}>
        <Image source={require('../assets/images/room1.jpg')} style={styles.backgroundImage} resizeMode="cover" />
        <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={15} reducedTransparencyFallbackColor="#EBE5DF" />
        <View style={styles.backgroundOverlay} />
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuIconBtn}
          onPress={() => navigation.navigate('Sidebar')}
        >
          <Image
            source={require('../assets/images/direction.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Services</Text>
      </View>
      <GestureDetector gesture={panGesture}>
        <View style={styles.cardsContainer} pointerEvents="box-none">
          {INITIAL_DATA.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              index={index}
              totalCards={INITIAL_DATA.length}
              translateX={translateX}
              translateY={translateY}
              activeIndex={activeIndex}
              navigation={navigation}
            />
          ))}
        </View>
      </GestureDetector>

      {/* BOTTOM NAVBAR */}
      <BottomNavbar activeTab="chatbot" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE5DF',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(235, 229, 223, 0.4)',
  },
  header: {
    paddingTop:
      Platform.OS === 'ios'
        ? 60
        : (StatusBar.currentHeight || 24) + 20,

    height:
      Platform.OS === 'ios'
        ? 110
        : (StatusBar.currentHeight || 24) + 70,

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 10,
  },
  menuIconBtn: {
    position: 'absolute',
    left: 20,
    top:
      Platform.OS === 'ios'
        ? 60
        : (StatusBar.currentHeight || 24) + 20,

    padding: 8,
    zIndex: 11,
  },
  menuIcon: {
    width: 28,
    height: 28,
    tintColor: '#1A1A1A',
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  cardsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
    marginTop: '80%',
    elevation: 5,
  },
  cardBase: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -CARD_HEIGHT / 2,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#1A1A1A',
    borderRadius: 36,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  depthOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  depthOverlayDarker: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  frontCardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  cardTagline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFF',
    marginTop: 6,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});