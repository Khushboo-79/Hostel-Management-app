import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const GlassContainer = ({ children, style, borderRadius = 20 }) => (
  <View style={[styles.cardShell, { borderRadius }, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={12}
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

const ImagePlaceholder = () => (
  <Svg width="60" height="60" viewBox="0 0 100 100">
    <Rect x="5" y="5" width="90" height="90" rx="20" fill="none" stroke="black" strokeWidth="8" />
    <Circle cx="35" cy="35" r="10" fill="black" />
    <Path d="M 5 80 Q 25 50 50 70 T 95 45 L 95 95 L 5 95 Z" fill="black" />
  </Svg>
);

export default function StudyRoomScreen({ navigation }) {
  const rooms = [
    { id: 1, title: 'Quiet Room 1', loc: '1st Floor, Library' },
    { id: 2, title: 'Focus Room 2', loc: '2nd Floor, Library' },
    { id: 3, title: 'Group Room A', loc: '3rd Floor, Library' },
    { id: 4, title: 'Study Pod 3', loc: '1st Floor, Library' },
    { id: 5, title: 'Collab Pod 3', loc: '3rd Floor, Library' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* FULLSCREEN BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../assets/images/study.jpeg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* Slight blur — image stays clearly visible */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        <View style={styles.backgroundOverlay} />
      </View>

      {/* Top Header Area */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Image source={require('../assets/images/left.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Room</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={require('../assets/images/filter.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Search Bar */}
        <GlassContainer style={styles.searchContainer} borderRadius={20}>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
          <TextInput
            placeholder="Search rooms"
            placeholderTextColor="#555"
            style={styles.searchInput}
          />
        </GlassContainer>

        {/* Categories */}
        <View style={styles.categoriesRow}>
          {['All', 'Solo', 'Group', 'Silent'].map((cat, index) => (
            <GlassContainer key={index} style={styles.categoryBtn} borderRadius={20}>
              <TouchableOpacity style={styles.categoryBtnTouch} activeOpacity={0.7}>
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            </GlassContainer>
          ))}
        </View>

        {/* Rooms List */}
        {rooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RoomDetails', { room })}
          >
            <GlassContainer style={styles.roomCard} borderRadius={24}>
              <View style={styles.roomCardInner}>

                {/* Left Thumbnail Placeholder */}
                <View style={styles.thumbnailContainer}>
                  <ImagePlaceholder />
                </View>

                {/* Center Content */}
                <View style={styles.roomInfo}>
                  <Text style={styles.roomTitle}>{room.title}</Text>
                  <Text style={styles.roomLoc}>{room.loc}</Text>
                </View>

                {/* Right Bookmark */}
                <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.7}>
                  <Image source={require('../assets/images/bookmark.png')} style={styles.bookmarkIcon} />
                </TouchableOpacity>

              </View>
            </GlassContainer>
          </TouchableOpacity>
        ))}

      </ScrollView>
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
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
    paddingBottom: 24,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
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
    position: 'absolute',
    top: 0, left: 0, right: 0, height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  bottomInsetHighlight: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0, height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  topEdgeLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: 1,
    zIndex: 1,
  },
  leftEdgeLine: {
    position: 'absolute',
    top: 0, left: 0, width: 1, height: '100%',
    zIndex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  searchContainer: {
    height: 52,
    marginBottom: 24,
    justifyContent: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 15,
    left: 20,
    tintColor: '#444',
    zIndex: 2,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 52,
    paddingRight: 20,
    fontSize: 16,
    color: '#000',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryBtn: {
    flex: 1,
    marginHorizontal: 4,
  },
  categoryBtnTouch: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
  },
  roomCard: {
    marginBottom: 16,
  },
  roomCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingRight: 20,
  },
  thumbnailContainer: {
    marginRight: 16,
  },
  roomInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  roomTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  roomLoc: {
    fontSize: 14,
    color: '#444',
    fontWeight: '400',
  },
  bookmarkBtn: {
    padding: 4,
  },
  bookmarkIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
    resizeMode: 'contain',
  }
});
