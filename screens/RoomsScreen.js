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
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavbar from '../components/BottomNavbar';

const { width } = Dimensions.get('window');

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
    <View style={[styles.contentWrapper, { borderRadius }]}>
      {children}
    </View>
  </View>
);

const CATEGORIES = ['All', 'Single', 'Shared', 'AC/Non-AC', 'Triple', 'Four Shared'];

const ROOMS = [
  { id: '1', title: 'Single', image: require('../assets/images/room1.jpg') },
  { id: '2', title: 'Shared', image: require('../assets/images/room2.jpg') },
  { id: '3', title: 'Triple', image: require('../assets/images/room3.jpg') },
  { id: '4', title: 'Four Shared', image: require('../assets/images/roomSelected.jpeg') },
];

export default function RoomsScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* FULLSCREEN BACKGROUND */}
      <ImageBackground
        source={require('../assets/images/room3.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={8}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        <View style={styles.backgroundOverlay} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* TOP NAVIGATION */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <GlassContainer style={styles.circleBtn} borderRadius={24}>
                <Icon name="arrow-left" size={24} color="#000" style={styles.iconCenter} />
              </GlassContainer>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}>
              <GlassContainer style={styles.circleBtn} borderRadius={24}>
                <Icon name="bookmark-outline" size={24} color="#000" style={styles.iconCenter} />
              </GlassContainer>
            </TouchableOpacity>
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchSection}>
            <GlassContainer style={styles.searchBar} borderRadius={28}>
              <View style={styles.searchContent}>
                <Icon name="magnify" size={26} color="#000" style={styles.searchIcon} />
                <TextInput
                  placeholder="Search rooms"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  style={styles.searchInput}
                />
                <TouchableOpacity style={styles.filterBtn}>
                  <Icon name="tune-variant" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </GlassContainer>
          </View>

          {/* CATEGORY FILTER CHIPS */}
          <View style={styles.categorySection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {CATEGORIES.map((cat, index) => {
                const isActive = activeCategory === cat;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveCategory(cat)}
                    activeOpacity={0.7}
                  >
                    <GlassContainer
                      style={styles.categoryChip}
                      borderRadius={20}
                    >
                      <Text style={styles.categoryText}>
                        {cat}
                      </Text>
                    </GlassContainer>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* SECTION TITLE */}
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>All Rooms</Text>
          </View>

          {/* ROOM CARDS SECTION */}
          <View style={styles.roomsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.roomsScroll}
              snapToInterval={width * 0.7 + 16}
              decelerationRate="fast"
            >
              {ROOMS.map((room) => (
                <TouchableOpacity 
                  key={room.id} 
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('RoomSelection')}
                >
                  <View style={styles.roomCard}>
                    <Image source={room.image} style={styles.roomImage} />
                    <View style={styles.roomImageOverlay} />
                    <LinearGradient
                      colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
                      style={styles.roomTextContainer}
                    >
                      <Text style={styles.roomTitle}>{room.title}</Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* BOTTOM NAVBAR */}
        <BottomNavbar activeTab="home" />

      </ImageBackground>
    </View>
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
    paddingTop: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  circleBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCenter: {
    top: 11,
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchBar: {
    height: 60,
    width: '100%',
  },
  searchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  filterBtn: {
    marginLeft: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryScroll: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  sectionTitleRow: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  roomsContainer: {
    marginBottom: 24,
  },
  roomsScroll: {
    paddingHorizontal: 16,
  },
  roomCard: {
    width: width * 0.7,
    height: width * 0.95,
    marginHorizontal: 8,
    alignItems: 'center',
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  roomImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  roomImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  roomTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 50,
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  // Shared Glass Base
  cardShell: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 32,
    elevation: 8,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.46)',
  },
  topInsetHighlight: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
  },
  contentWrapper: {
    flex: 1,
  },
});
