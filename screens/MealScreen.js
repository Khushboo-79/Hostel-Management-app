import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
  Image,
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

const { width, height } = Dimensions.get('window');

export default function MealScreen({ navigation }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/images/meal.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={16}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
        />
        <View style={styles.overlay} />

        <Animated.View style={animatedStyle}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={28} color="#fff" />
            </TouchableOpacity>

            <View style={styles.titleWrapper}>
              <Text style={styles.headerTitle}>Meal</Text>
            </View>

            <View style={styles.headerRightPlaceholder} />
          </View>

          {/* SCROLLABLE CONTENT */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Breakfast Card */}
            <TouchableOpacity activeOpacity={0.9} style={styles.cardTouchable} onPress={() => navigation.navigate('WeeklyMealMenu', { mealType: 'Breakfast' })}>
              <View style={styles.cardContainer}>
                <View style={styles.cardShell}>
                  <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={12}
                    reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
                  />
                  <View style={styles.glassBg} />
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

                  <View style={[styles.cardContent, styles.contentRight]}>
                    <Text style={styles.cardTitle}>Breakfast</Text>
                    <Text style={styles.cardSubtitle}>
                      Start the day with healthy{'\n'}and energizing meals
                    </Text>
                  </View>
                </View>

                {/* Overlapping Image (LEFT) */}
                <View style={[styles.imageContainer, styles.imageLeft]}>
                  <Image
                    source={require('../assets/images/breakfast.webp')}
                    style={styles.foodImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </TouchableOpacity>

            {/* Lunch Card */}
            <TouchableOpacity activeOpacity={0.9} style={styles.cardTouchable} onPress={() => navigation.navigate('WeeklyMealMenu', { mealType: 'Lunch' })}>
              <View style={styles.cardContainer}>
                <View style={styles.cardShell}>
                  <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={12}
                    reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
                  />
                  <View style={styles.glassBg} />
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

                  <View style={[styles.cardContent, styles.contentLeft]}>
                    <Text style={styles.cardTitle}>Lunch</Text>
                    <Text style={styles.cardSubtitle}>
                      Wholesome afternoon{'\n'}meals with daily variety
                    </Text>
                  </View>
                </View>

                {/* Overlapping Image (RIGHT) */}
                <View style={[styles.imageContainer, styles.imageRight]}>
                  <Image
                    source={require('../assets/images/lunch.webp')}
                    style={styles.foodImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </TouchableOpacity>

            {/* Dinner Card */}
            <TouchableOpacity activeOpacity={0.9} style={styles.cardTouchable} onPress={() => navigation.navigate('WeeklyMealMenu', { mealType: 'Dinner' })}>
              <View style={styles.cardContainer}>
                <View style={styles.cardShell}>
                  <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={12}
                    reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
                  />
                  <View style={styles.glassBg} />
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

                  <View style={[styles.cardContent, styles.contentRight]}>
                    <Text style={styles.cardTitle}>Dinner</Text>
                    <Text style={styles.cardSubtitle}>
                      Comforting and satisfying{'\n'}meals for the evening
                    </Text>
                  </View>
                </View>

                {/* Overlapping Image (LEFT) */}
                <View style={[styles.imageContainer, styles.imageLeft]}>
                  <Image
                    source={require('../assets/images/dinner.webp')}
                    style={styles.foodImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ height: 50 }} />
          </ScrollView>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Slightly dark overlay to maintain warm aesthetic
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
    paddingBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerRightPlaceholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  cardTouchable: {
    marginBottom: 28,
  },
  cardContainer: {
    position: 'relative',
    height: 140,
    justifyContent: 'center',
  },
  cardShell: {
    height: 120,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.46)', // Exact same glass opacity and color as Login
  },
  topInsetHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  contentLeft: {
    paddingLeft: 24,
    paddingRight: 115,
  },
  contentRight: {
    paddingLeft: 115,
    paddingRight: 24,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardSubtitle: {
    color: '#ffffff',
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  imageContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 10,
    top: 10, // Centered inside 140 height container
  },
  imageLeft: {
    left: -12,
  },
  imageRight: {
    right: -12,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
});
