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
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

const { width, height } = Dimensions.get('window');

const GlassContainer = ({ children, style, dark = false }) => (
  <View style={[styles.cardShell, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType={dark ? "dark" : "light"}
      blurAmount={14}
      reducedTransparencyFallbackColor={dark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.65)"}
    />
    <View style={[styles.glassBg, dark && styles.glassBgDark]} />
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
    <View style={styles.contentWrapper}>
      {children}
    </View>
  </View>
);

export default function RoomDetailsScreen({ route, navigation }) {
  const { room } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* FULLSCREEN BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../assets/images/roomSelected.jpeg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.backgroundOverlay} />
      </View>

      {/* FOREGROUND CONTENT */}
      <View style={styles.contentContainer}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={styles.iconBtn}>
            <Image source={require('../assets/images/left.png')} style={styles.iconBlack} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
            <Image source={require('../assets/images/bookmark.png')} style={styles.iconBlack} />
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        {/* BOTTOM GLASS PANEL */}
        <GlassContainer style={styles.bottomPanel}>
          <ScrollView
            contentContainerStyle={styles.panelScroll}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Title & Subtitle */}
            <Text style={styles.roomTitle}>{room?.title || 'Focus Room 2'}</Text>
            <Text style={styles.roomLoc}>{room?.loc || '2nd Floor, Central Library'}</Text>

            {/* Feature Tags */}
            <View style={styles.tagsRow}>
              <GlassContainer style={styles.tagBtn}>
                <View style={styles.tagInner}>
                  <Image source={require('../assets/images/user.png')} style={styles.tagIcon} />
                  <Text style={styles.tagText}>2 Seats</Text>
                </View>
              </GlassContainer>

              <GlassContainer style={styles.tagBtn}>
                <View style={styles.tagInner}>
                  <Image source={require('../assets/images/silent.png')} style={styles.tagIcon} />
                  <Text style={styles.tagText}>Silent</Text>
                </View>
              </GlassContainer>

              <GlassContainer style={styles.tagBtn}>
                <View style={styles.tagInner}>
                  <Image source={require('../assets/images/wifi.png')} style={styles.tagIcon} />
                  <Text style={styles.tagText}>Wi-Fi</Text>
                </View>
              </GlassContainer>

              <GlassContainer style={styles.tagBtn}>
                <View style={styles.tagInner}>
                  <Image source={require('../assets/images/ac.png')} style={styles.tagIcon} />
                  <Text style={styles.tagText}>AC</Text>
                </View>
              </GlassContainer>
            </View>

            {/* About this room */}
            <Text style={styles.sectionHeadingWhite}>About this room</Text>
            <Text style={styles.descriptionTextWhite}>
              A quite and comfortable space for deep focus and personal study.
            </Text>

            {/* Selected Slot */}
            <Text style={styles.sectionHeadingWhite}>Selected Slot</Text>
            <GlassContainer style={styles.slotCard}>
              <View style={styles.slotInner}>
                <View style={styles.slotRow}>
                  <Image source={require('../assets/images/calender.png')} style={styles.slotIconWhite} />
                  <Text style={styles.slotTextWhite}>16 May 2026, Saturday</Text>
                </View>
                <View style={styles.slotRow}>
                  <Image source={require('../assets/images/time.png')} style={styles.slotIconWhite} />
                  <Text style={styles.slotTextWhite}>4:00 PM - 6:00 PM</Text>
                </View>
              </View>
            </GlassContainer>

            {/* Book This Slot Button */}
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={styles.bookBtnWrapper}
              onPress={() => navigation.navigate('BookingConfirmation', { room })}
            >
              <GlassContainer style={styles.bookBtn} dark={true}>
                <View style={styles.bookBtnInner}>
                  <Text style={styles.bookBtnText}>Book This Slot</Text>
                </View>
              </GlassContainer>
            </TouchableOpacity>

          </ScrollView>
        </GlassContainer>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
  },
  iconBtn: {
    padding: 4,
  },
  iconBlack: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  spacer: {
    flex: 1,
  },
  bottomPanel: {
    width: '100%',
    maxHeight: height * 0.72,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  panelScroll: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  roomTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  roomLoc: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginHorizontal: -4,
  },
  tagBtn: {
    borderRadius: 16,
    flex: 1,
    marginHorizontal: 5,
    minHeight: 54,
  },
  tagInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  tagIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#000',
    marginRight: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
  },
  sectionHeadingWhite: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  descriptionTextWhite: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 28,
  },
  slotCard: {
    borderRadius: 24,
    marginBottom: 32,
  },
  slotInner: {
    padding: 20,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  slotIconWhite: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#FFF',
    marginRight: 14,
  },
  slotTextWhite: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
  },
  bookBtnWrapper: {
    marginTop: 8,
    marginBottom: 10,
  },
  bookBtn: {
    borderRadius: 20,
  },
  bookBtnInner: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
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
  glassBgDark: {
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    // let children dictate size
  },
});
