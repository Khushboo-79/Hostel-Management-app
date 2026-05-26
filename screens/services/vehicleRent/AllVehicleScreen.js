import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Dimensions,
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

const { width } = Dimensions.get('window');

// ─── Reusable Premium GlassPanel ────────────────────────────────────────────
const GlassPanel = ({ children, style, intensity = 12 }) => (
  <View style={[styles.glassShell, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={intensity}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.5)"
    />
    <View style={styles.glassBg} />
    <View style={styles.topInsetHighlight} />
    <View style={styles.bottomInsetHighlight} />
    <LinearGradient
      colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.topEdgeLine}
    />
    <LinearGradient
      colors={['rgba(255,255,255,0.5)', 'transparent', 'rgba(255,255,255,0.2)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.leftEdgeLine}
    />
    {children}
  </View>
);

export default function AllVehicleScreen({ navigation }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* ── FULL SCREEN BACKGROUND ───────────────────────── */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../../../assets/images/bgImgVehicleRent1.webp')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        <View style={styles.backgroundOverlay} />
      </View>

      <Animated.View style={animStyle}>
        {/* ══════════ FIXED TOP HEADER & CATEGORY TABS ══════════ */}
        <View style={styles.fixedTop}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VehicleRent')}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={28} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>All Vehicles</Text>
            {/* Spacer to keep title perfectly centered */}
            <View style={styles.headerSpacer} />
          </View>

          {/* ── CATEGORY TABS ───────────────────────── */}
          <View style={styles.categoryTabsRow}>
            {/* Active All Tab */}
            <TouchableOpacity activeOpacity={0.8} style={styles.activeTabWrap}>
              <GlassPanel style={styles.activeTab} intensity={12}>
                <Text style={styles.activeTabText}>All</Text>
              </GlassPanel>
            </TouchableOpacity>

            {/* Bikes Tab */}
            <TouchableOpacity activeOpacity={0.7} style={styles.inactiveTabWrap}>
              <Text style={styles.inactiveTabText}>Bikes</Text>
            </TouchableOpacity>

            {/* Scooty Tab */}
            <TouchableOpacity activeOpacity={0.7} style={styles.inactiveTabWrap}>
              <Text style={styles.inactiveTabText}>Scooty</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ══════════ SCROLLABLE CONTENT (VEHICLES LIST) ══════════ */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Card 1: Hero Splender (Bike) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VehicleProductDetails')}
          >
            <GlassPanel style={styles.vehicleCard} intensity={10}>
              <View style={styles.cardLeft}>
                <Image
                  source={require('../../../assets/images/rentBike.webp')}
                  style={styles.vehicleCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.vehicleTitle}>Hero Splender</Text>
                <Text style={styles.vehicleSubtitle}>170cc+ Automatic</Text>
                <Text style={styles.vehiclePrice}>₹499/Day</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.favoriteIconWrap}>
                <Icon name="heart-outline" size={24} color="#000" />
              </TouchableOpacity>
            </GlassPanel>
          </TouchableOpacity>

          {/* Card 2: Hero Splender (Scooty) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VehicleProductDetails')}
          >
            <GlassPanel style={styles.vehicleCard} intensity={10}>
              <View style={styles.cardLeft}>
                <Image
                  source={require('../../../assets/images/rentScooty.webp')}
                  style={styles.vehicleCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.vehicleTitle}>Hero Splender</Text>
                <Text style={styles.vehicleSubtitle}>170cc+ Automatic</Text>
                <Text style={styles.vehiclePrice}>₹499/Day</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.favoriteIconWrap}>
                <Icon name="heart-outline" size={24} color="#000" />
              </TouchableOpacity>
            </GlassPanel>
          </TouchableOpacity>

          {/* Card 3: Hero Splender (Bike) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VehicleProductDetails')}
          >
            <GlassPanel style={styles.vehicleCard} intensity={10}>
              <View style={styles.cardLeft}>
                <Image
                  source={require('../../../assets/images/rentBike.webp')}
                  style={styles.vehicleCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.vehicleTitle}>Hero Splender</Text>
                <Text style={styles.vehicleSubtitle}>170cc+ Automatic</Text>
                <Text style={styles.vehiclePrice}>₹499/Day</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.favoriteIconWrap}>
                <Icon name="heart-outline" size={24} color="#000" />
              </TouchableOpacity>
            </GlassPanel>
          </TouchableOpacity>

          {/* Card 4: Hero Splender (Scooty) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VehicleProductDetails')}
          >
            <GlassPanel style={styles.vehicleCard} intensity={10}>
              <View style={styles.cardLeft}>
                <Image
                  source={require('../../../assets/images/rentScooty.webp')}
                  style={styles.vehicleCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.vehicleTitle}>Hero Splender</Text>
                <Text style={styles.vehicleSubtitle}>170cc+ Automatic</Text>
                <Text style={styles.vehiclePrice}>₹499/Day</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.favoriteIconWrap}>
                <Icon name="heart-outline" size={24} color="#000" />
              </TouchableOpacity>
            </GlassPanel>
          </TouchableOpacity>

          {/* Card 5: Hero Splender (Bike) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VehicleProductDetails')}
          >
            <GlassPanel style={styles.vehicleCard} intensity={10}>
              <View style={styles.cardLeft}>
                <Image
                  source={require('../../../assets/images/rentScooty.webp')}
                  style={styles.vehicleCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.vehicleTitle}>Hero Splender</Text>
                <Text style={styles.vehicleSubtitle}>170cc+ Automatic</Text>
                <Text style={styles.vehiclePrice}>₹499/Day</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.favoriteIconWrap}>
                <Icon name="heart-outline" size={24} color="#000" />
              </TouchableOpacity>
            </GlassPanel>
          </TouchableOpacity>

          {/* Card 6: Hero Splender (Bike) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VehicleProductDetails')}
          >
            <GlassPanel style={[styles.vehicleCard, styles.lastVehicleCard]} intensity={10}>
              <View style={styles.cardLeft}>
                <Image
                  source={require('../../../assets/images/rentBike.webp')}
                  style={styles.vehicleCardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.vehicleTitle}>Hero Splender</Text>
                <Text style={styles.vehicleSubtitle}>170cc+ Automatic</Text>
                <Text style={styles.vehiclePrice}>₹499/Day</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.favoriteIconWrap}>
                <Icon name="heart-outline" size={24} color="#000" />
              </TouchableOpacity>
            </GlassPanel>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const TOP_PAD = Platform.OS === 'android'
  ? (StatusBar.currentHeight || 24) + 14
  : 60;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#EDE8E2' },

  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(238, 232, 225, 0.08)',
  },

  // ── Fixed Top Header & Category Tabs ──────────────
  fixedTop: {
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '500',
    color: '#1A1A1A',
    letterSpacing: 0.3,
  },
  headerSpacer: {
    width: 40,
  },

  // ── Category Tabs Row ─────────────────────────────
  categoryTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  activeTabWrap: {
    width: '30%',
  },
  activeTab: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e3a3775',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  activeTabText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  inactiveTabWrap: {
    width: '30%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveTabText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#8A8580',
  },

  // ── Scroll Content ────────────────────────────────
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: Platform.OS === 'ios' ? 44 : 30,
  },

  // ── Stacked Vehicle Cards ─────────────────────────
  vehicleCard: {
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(5, 5, 5, 0.1)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  lastVehicleCard: {
    marginBottom: 10,
  },
  cardLeft: {
    width: 90,
    height: 90,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  vehicleCardImg: {
    width: '100%',
    height: '100%',
  },
  cardRight: {
    flex: 1,
    justifyContent: 'center',
  },
  vehicleTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  vehicleSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6A6560',
    marginBottom: 4,
  },
  vehiclePrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  favoriteIconWrap: {
    justifyContent: 'flex-start',
    paddingTop: 4,
  },

  // ── Glass Panel Base Styles ───────────────────────
  glassShell: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.46)',
  },
  topInsetHighlight: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255,255,255,0.50)', zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255,255,255,0.10)', zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
  },
});
