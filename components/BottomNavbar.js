import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BottomNavbar = ({ activeTab }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomNavContainer}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={20}
        reducedTransparencyFallbackColor="rgba(58, 55, 55, 0.9)"
      />
      <View style={styles.navGlassBg} />

      <View style={styles.navContent}>
        <TouchableOpacity
          style={activeTab === 'home' ? styles.navItemActive : styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          {activeTab === 'home' ? (
            <View style={styles.activeIconCircle}>
              <Image source={require('../assets/images/home.png')} style={styles.navIconActive} />
            </View>
          ) : (
            <Image source={require('../assets/images/home.png')} style={styles.navIcon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={activeTab === 'services' ? styles.navItemActive : styles.navItem}
          onPress={() => navigation.navigate('Services')}
        >
          {activeTab === 'services' ? (
            <View style={styles.activeIconCircle}>
              <Image source={require('../assets/images/service.png')} style={styles.navIconActive} />
            </View>
          ) : (
            <Image source={require('../assets/images/service.png')} style={styles.navIcon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={activeTab === 'RewardsTab' ? styles.navItemActive : styles.navItem}
          onPress={() => navigation.navigate('RewardsTab')}
        >
          {activeTab === 'RewardsTab' ? (
            <View style={styles.activeIconCircle}>
              <Image source={require('../assets/images/badge.png')} style={styles.navIconActive} />
            </View>
          ) : (
            <Image source={require('../assets/images/badge.png')} style={styles.navIcon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={activeTab === 'wallet' ? styles.navItemActive : styles.navItem}>
          {activeTab === 'wallet' ? (
            <View style={styles.activeIconCircle}>
              <Image source={require('../assets/images/wallet.png')} style={styles.navIconActive} />
            </View>
          ) : (
            <Image source={require('../assets/images/wallet.png')} style={styles.navIcon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default BottomNavbar;
