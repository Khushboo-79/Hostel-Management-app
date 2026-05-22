import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import BottomNavbar from '../components/BottomNavbar';

const { width, height } = Dimensions.get('window');

const GlassContainer = ({ children, style, borderRadius = 20 }) => (
  <View style={[styles.cardShell, { borderRadius }, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
    />
    <View style={[styles.glassBg, { borderRadius }]} />
    <View style={[styles.topInsetHighlight, { borderRadius }]} />
    <View style={[styles.bottomInsetHighlight, { borderRadius }]} />
    <LinearGradient
      colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.topEdgeLine, { borderRadius }]}
    />
    <LinearGradient
      colors={['rgba(255,255,255,0.8)', 'transparent', 'rgba(255,255,255,0.3)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.leftEdgeLine, { borderRadius }]}
    />
    <View style={[styles.contentWrapper, { borderRadius }]}>{children}</View>
  </View>
);

export default function DashboardScreen({ navigation }) {
  const [activeBanner, setActiveBanner] = useState(1);

  // SOS Button Drag Animation logic
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate(event => {
      translateX.value = event.translationX + contextX.value;
      translateY.value = event.translationY + contextY.value;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* FULLSCREEN BACKGROUND */}
      <ImageBackground
        source={require('../assets/images/room3.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        <View style={styles.backgroundOverlay} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sidebar')}
              activeOpacity={0.7}
            >
              <GlassContainer style={styles.circleBtn} borderRadius={24}>
                <Image
                  source={require('../assets/images/direction.png')}
                  style={styles.iconBlack}
                />
              </GlassContainer>
            </TouchableOpacity>

            <View style={styles.headerRight}>
              <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 12 }}>
                <GlassContainer style={styles.circleBtn} borderRadius={24}>
                  <Image
                    source={require('../assets/images/bell.png')}
                    style={styles.iconBlack}
                  />
                </GlassContainer>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <GlassContainer style={styles.circleBtn} borderRadius={24}>
                  <Image
                    source={require('../assets/images/woman.png')}
                    style={styles.avatarIcon}
                  />
                </GlassContainer>
              </TouchableOpacity>
            </View>
          </View>

          {/* WELCOME TEXT & SEARCH */}
          <View style={styles.welcomeSection}>
            <View>
              <Text style={styles.welcomeTitle}>Hi Sarah</Text>
              <Text style={styles.welcomeSubtitle}>Welcome Home</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <GlassContainer style={styles.circleBtnSearch} borderRadius={28}>
                <Image
                  source={require('../assets/images/search.png')}
                  style={styles.iconSearch}
                />
              </GlassContainer>
            </TouchableOpacity>
          </View>

          {/* MAIN BANNER */}
          <View style={styles.bannerContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={width - 32}
              decelerationRate="fast"
              onScroll={e => {
                const offset = e.nativeEvent.contentOffset.x;
                const index = Math.round(offset / (width - 32));
                setActiveBanner(index);
              }}
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              {[0, 1, 2, 3].map(item => (
                <View key={item} style={styles.bannerWrapper}>
                  <GlassContainer style={styles.bannerCard} borderRadius={24} />
                </View>
              ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {[0, 1, 2, 3].map(item => (
                <View
                  key={item}
                  style={[
                    styles.dot,
                    activeBanner === item ? styles.activeDot : {},
                  ]}
                />
              ))}
            </View>
          </View>

          {/* FEATURE GRID */}
          <View style={styles.gridContainer}>
            {/* Left Column */}
            <View style={styles.gridColumn}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Rooms')}
              >
                <GlassContainer style={styles.gridCardRooms} borderRadius={28}>
                  <Text style={styles.cardTitle}>Rooms</Text>
                  <Image
                    source={require('../assets/images/roomsBooking.png')}
                    style={styles.cardImageRooms}
                  />
                </GlassContainer>
              </TouchableOpacity>

              <GlassContainer style={styles.gridCardMeal} borderRadius={28}>
                <Text style={styles.cardTitle}>Meal Menu</Text>
                <Image source={require('../assets/images/meal.png')} style={styles.cardImageMeal} />
              </GlassContainer>
            </View>

            <View style={styles.gridColumn}>
              <GlassContainer style={styles.gridCardAi} borderRadius={28}>
                <Text style={styles.cardTitle}>AI assistant</Text>
                <Image source={require('../assets/images/asistant.png')} style={styles.cardImageAi} />
              </GlassContainer>

              <GlassContainer style={styles.gridCardPayment} borderRadius={28}>
                <Text style={styles.cardTitle}>Payment &{'\n'}Billing</Text>
                <Image source={require('../assets/images/payment.png')} style={styles.cardImagePayment} />
              </GlassContainer>
            </View>
          </View>
          <View style={{ height: 120 }} />
        </ScrollView>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.sosContainer, rStyle]}>
            <LinearGradient
              colors={['#FF5252', '#D32F2F', '#9A0007']}
              style={styles.sosGradient}
            >
              <View style={styles.sosHighlight} />
              <Text style={styles.sosText}>SOS!</Text>
            </LinearGradient>
          </Animated.View>
        </GestureDetector>
        <BottomNavbar activeTab="home" />
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9CFC8',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop:
      Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerRight: {
    flexDirection: 'row',
  },
  circleBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBlack: {
    width: 20,
    height: 20,
    top: 12,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  avatarIcon: {
    width: 32,
    height: 32,
    top: 8,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 4,
  },
  circleBtnSearch: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSearch: {
    width: 26,
    height: 26,
    top: 14,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  bannerContainer: {
    marginBottom: 32,
  },
  bannerWrapper: {
    width: width - 32,
    paddingHorizontal: 8,
  },
  bannerCard: {
    width: '100%',
    height: 160,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  gridContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  gridColumn: {
    width: (width - 64) / 2,
  },
  gridCardRooms: {
    height: 220,
    marginBottom: 16,
    padding: 16,
  },
  gridCardAi: {
    height: 240,
    marginBottom: 16,
    padding: 16,
  },
  gridCardMeal: {
    height: 160,
    marginBottom: 16,
    padding: 16,
  },
  gridCardPayment: {
    height: 180,
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.3,
    zIndex: 2,
  },
  cardImageRooms: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: '120%',
    height: '75%',
    resizeMode: 'contain',
  },
  cardImageAi: {
    position: 'absolute',
    bottom: -15,
    right: -20,
    width: '120%',
    height: '85%',
    resizeMode: 'contain',
  },
  cardImageMeal: {
    position: 'absolute',
    bottom: -20,
    right: -10,
    width: '120%',
    height: '90%',
    resizeMode: 'contain',
  },
  cardImagePayment: {
    position: 'absolute',
    bottom: -15,
    right: -25,
    width: '130%',
    height: '80%',
    resizeMode: 'contain',
  },
  sosContainer: {
    position: 'absolute',
    top: height * 0.45,
    right: 20,
    width: 68,
    height: 68,
    borderRadius: 34,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 100,
  },
  sosGradient: {
    flex: 1,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  sosHighlight: {
    position: 'absolute',
    top: 4,
    left: 12,
    right: 12,
    height: 18,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  sosText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  // Shared Glass Base
  cardShell: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 8,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.46)',
  },
  topInsetHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: '100%',
    zIndex: 2,
  },
  contentWrapper: {
    flex: 1,
  },
});
