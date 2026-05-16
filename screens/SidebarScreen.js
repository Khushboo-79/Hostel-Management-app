import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = 64;
const PROFILE_SIZE = 220;

/* Menu items mapped to local image assets */
const MENU_ITEMS = [
  { image: require('../assets/images/calendar.png'), label: 'Calendar', iconSize: 28 },
  { image: require('../assets/images/report.png'), label: 'Notifications', iconSize: 26 },
  { image: require('../assets/images/protection.png'), label: 'Security', iconSize: 28 },
  { image: require('../assets/images/ecommerce.png'), label: 'Membership', iconSize: 38 },
  { image: require('../assets/images/settings.png'), label: 'Settings', iconSize: 28 },
  { image: require('../assets/images/out.png'), label: 'Logout', iconSize: 26 },
];

/*
  Semicircle arc calculation:
  - Arc center = center of the profile circle
  - Buttons are placed along the RIGHT semicircle (from top to bottom)
  - Angles go from -75° (top) to +75° (bottom), evenly spaced
*/
const PROFILE_CENTER_X = -20;
const PROFILE_CENTER_Y = height * 0.47;
const ARC_RADIUS = 280;

const getArcPositions = () => {
  const startAngle = 60;
  const endAngle = -60;
  const step = (endAngle - startAngle) / (MENU_ITEMS.length - 1);

  return MENU_ITEMS.map((_, i) => {
    const angleDeg = startAngle + step * i;
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: PROFILE_CENTER_X + ARC_RADIUS * Math.cos(angleRad),
      y: PROFILE_CENTER_Y - ARC_RADIUS * Math.sin(angleRad),
    };
  });
};

const BUTTON_POSITIONS = getArcPositions();

export default function SidebarScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const profileAnim = useRef(new Animated.Value(0)).current;
  const buttonAnims = useRef(MENU_ITEMS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(profileAnim, {
      toValue: 1,
      duration: 400,
      delay: 150,
      useNativeDriver: true,
    }).start();

    buttonAnims.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 350,
        delay: 200 + i * 80,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handlePress = (label) => {
    if (label === 'Logout') {
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/images/room1.jpg')}
        style={styles.background}
        resizeMode="cover"
        blurRadius={15}
      >
        <View style={styles.overlay} />

        {/* Back Arrow */}
        <Animated.View style={[styles.backBtn, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/direction.png')}
              style={{ width: 28, height: 28, tintColor: '#fff' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>

        {/* ========== PROFILE CIRCLE ========== */}
        <Animated.View
          style={[
            styles.profileCircle,
            {
              opacity: profileAnim,
              transform: [{
                translateX: profileAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-60, 0],
                }),
              }],
            },
          ]}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={20}
            reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
          />
          <View style={styles.profileGlass} />

          {/* Avatar */}
          <View style={styles.avatarRow}>
            <View style={styles.avatarCircle}>
              <Image
                source={require('../assets/images/woman.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Image
                source={require('../assets/images/edit.png')}
                style={{ width: 13, height: 13, tintColor: '#fff' }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>Sarah Johnson</Text>
          <Text style={styles.profileEmail}>Sarah@gmail.com</Text>
        </Animated.View>

        {/* ========== MENU BUTTONS (semicircle arc) ========== */}
        {MENU_ITEMS.map((item, i) => (
          <Animated.View
            key={item.label}
            style={[
              styles.menuBtnPos,
              {
                left: BUTTON_POSITIONS[i].x - BUTTON_SIZE / 2,
                top: BUTTON_POSITIONS[i].y - BUTTON_SIZE / 2,
                opacity: buttonAnims[i],
                transform: [{
                  scale: buttonAnims[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 1],
                  }),
                }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.menuBtn}
              activeOpacity={0.7}
              onPress={() => handlePress(item.label)}
            >
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={15}
                reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
              />
              <View style={styles.menuBtnGlass} />
              <Image
                source={item.image}
                style={{ width: item.iconSize, height: item.iconSize, tintColor: '#fff' }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </Animated.View>
        ))}

      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },

  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
    left: 24,
    zIndex: 10,
  },

  /* ───── Profile Circle ───── */
  profileCircle: {
    position: 'absolute',
    left: -50,
    top: height * 0.47 - PROFILE_SIZE / 2,
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    borderRadius: PROFILE_SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 14,
  },

  profileGlass: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },

  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(180,140,115,0.45)',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  editBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  profileName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  profileEmail: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    fontWeight: '400',
    marginTop: 2,
  },

  /* ───── Menu Buttons ───── */
  menuBtnPos: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuBtn: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  menuBtnGlass: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },

  menuLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
