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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Precise Layout Constants
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = height * 0.55;

// Sorted precisely from 1 to 9 so Room Cleaning is the absolute first
const INITIAL_DATA = [
  { id: '1', title: 'Room Cleaning', tagline: 'A clean room, a better you', image: require('../assets/images/roomCleaning.jpg') },
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

const Card = ({ item, index, totalCards, translateX, translateY, activeIndex }) => {
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

  return (
    <Animated.View style={[styles.cardBase, animatedStyle]}>
      {/* Absolute Fill ensures Image covers the ENTIRE card perfectly with no empty edges */}
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

      {/* Linear Gradient Fade ensures the text is protected but smoothly blends out */}
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
  );
};

export default function ServicesScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Start with index 0 (Room Cleaning)
  const activeIndex = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.15;
    })
    .onEnd((event) => {
      // Significantly lowered threshold so even a light swipe successfully triggers the next card
      if (Math.abs(event.translationX) > 50 || Math.abs(event.velocityX) > 300) {
        const direction = Math.sign(event.translationX);
        const targetX = direction * width * 1.5;

        // Fly away and unconditionally loop
        translateX.value = withSpring(targetX, { ...SPRING_CONFIG, velocity: event.velocityX }, () => {
          activeIndex.value = (activeIndex.value + 1) % INITIAL_DATA.length;
          translateX.value = 0;
          translateY.value = 0;
        });
      } else {
        // Snap back if barely moved
        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
        <Image source={require('../assets/images/room1.jpg')} style={styles.backgroundImage} resizeMode="cover" />
        <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={15} reducedTransparencyFallbackColor="#EBE5DF" />
        <View style={styles.backgroundOverlay} />
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
      </View>

      {/* CARDS CONTAINER - Single gesture detector wraps the entire stack area */}
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
            />
          ))}
        </View>
      </GestureDetector>

      {/* BOTTOM NAVBAR */}
      <View style={styles.bottomNavContainer}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={20}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.6)"
        />
        <View style={styles.navGlassBg} />

        <View style={styles.navContent}>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/images/home.png')} style={styles.navIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItemActive}>
            <View style={styles.activeIconCircle}>
              <Image source={require('../assets/images/chatbot.png')} style={styles.navIconActive} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/images/badge.png')} style={styles.navIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/images/wallet.png')} style={styles.navIcon} />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 20,
    alignItems: 'center',
    marginBottom: 10,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },

  cardsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
    marginTop: '80%', // Keep user's exact vertical offset preference
    elevation: 5,
  },

  cardBase: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -CARD_HEIGHT / 2,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#1A1A1A', // Dark background hides PNG transparency
    borderRadius: 36,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: CARD_WIDTH, // Force exact mathematical dimensions
    height: CARD_HEIGHT, // Force exact mathematical dimensions
    resizeMode: 'cover',
  },

  depthOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)', // Adjusted to replace the missing blur effect natively
  },
  depthOverlayDarker: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)', // Adjusted to replace the deeper missing blur
  },

  frontCardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    paddingBottom: 50, // Extra padding to make the gradient fade incredibly smooth
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

  bottomNavContainer: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    width: width * 0.85,
    height: 75,
    borderRadius: 38,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
    zIndex: 20,
  },
  navGlassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(40, 40, 40, 0.4)',
  },
  navContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  navItem: {
    padding: 10,
  },
  navItemActive: {
    padding: 2,
  },
  navIcon: {
    width: 26,
    height: 26,
    tintColor: '#FFF',
    resizeMode: 'contain',
  },
  navIconActive: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
    resizeMode: 'contain',
  },
  activeIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
});
