import React from 'react';
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
  ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const CATEGORIES = ['AC', 'NON - AC', 'Sharing'];

const ROOMS_DATA = [
  { id: '1', title: 'Single\nSeater', price: '7,500', image: require('../assets/images/room1.jpg') },
  { id: '2', title: 'Single\nSeater', price: '7,500', image: require('../assets/images/room2.jpg') },
  { id: '3', title: 'Single\nSeater', price: '7,500', image: require('../assets/images/room3.jpg') },
  { id: '4', title: 'Single\nSeater', price: '7,500', image: require('../assets/images/roomSelected.jpeg') },
  { id: '5', title: 'Single\nSeater', price: '7,500', image: require('../assets/images/room1.jpg') },
];

export default function RoomSelectionScreen({ navigation }) {
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

        {/* FIXED UPPER SECTION */}
        <View style={styles.fixedHeaderArea}>
          {/* TOP HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={styles.iconBtn}>
              <Icon name="arrow-left" size={28} color="#000" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Room Selection</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.darkCircleBtn}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={20}
                reducedTransparencyFallbackColor="rgba(0,0,0,0.6)"
              />
              <View style={styles.darkNavGlassBg} />
              <Icon name="bell-outline" size={24} color="#FFF" style={styles.iconCenter} />
            </TouchableOpacity>
          </View>

          {/* TOP FILTER SECTION */}
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterIconBtn}>
              <Icon name="tune-variant" size={28} color="#000" />
            </TouchableOpacity>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {CATEGORIES.map((cat, index) => (
                <GlassContainer 
                  key={index}
                  style={styles.categoryChip} 
                  borderRadius={16}
                >
                  <Text style={styles.categoryText}>{cat}</Text>
                </GlassContainer>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* SCROLLABLE ROOM CARDS SECTION */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          {ROOMS_DATA.map((room) => (
            <TouchableOpacity key={room.id} activeOpacity={0.9} style={styles.cardContainer}>
              <View style={styles.roomCard}>
                <Image source={room.image} style={styles.roomImage} />
                
                {/* Image Overlay for text readability */}
                <View style={styles.roomImageOverlay} />

                {/* Bookmark Icon (Top Left) */}
                <TouchableOpacity style={styles.bookmarkBtn}>
                  <Icon name="bookmark-outline" size={30} color="#000" />
                </TouchableOpacity>

                {/* Bottom Content Area with Fade Overlay */}
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
                  style={styles.roomTextContainer}
                >
                  <View style={styles.bottomContentRow}>
                    {/* Room Name (Bottom Left) */}
                    <Text style={styles.roomNameText}>{room.title}</Text>

                    {/* Price Button (Bottom Right) */}
                    <GlassContainer style={styles.priceBtn} borderRadius={24}>
                      <Text style={styles.priceText}>{room.price}</Text>
                    </GlassContainer>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
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
  fixedHeaderArea: {
    paddingTop: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
    paddingBottom: 16,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  iconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    letterSpacing: 0.5,
  },
  darkCircleBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  darkNavGlassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(40, 40, 40, 0.4)',
  },
  iconCenter: {
    top: 0,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  filterIconBtn: {
    marginRight: 16,
  },
  categoryScroll: {
    alignItems: 'center',
    paddingRight: 24,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    marginBottom: 24,
  },
  roomCard: {
    width: '100%',
    height: width * 0.95, // Tall vertical layout
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
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
    backgroundColor: 'rgba(0,0,0,0.15)', // Very soft dark overlay
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 24,
    left: 24,
    padding: 8,
  },
  roomTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 80,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  bottomContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  roomNameText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#FFF',
    lineHeight: 38,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  priceBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.5)', // Adds a dark tint to the glass
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  // Shared Glass Base
  cardShell: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.2)',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
