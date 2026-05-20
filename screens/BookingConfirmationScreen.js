import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

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
    <View style={[styles.contentWrapper, { borderRadius }]}>{children}</View>
  </View>
);

export default function BookingConfirmationScreen({ route, navigation }) {
  const { room } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* FULLSCREEN BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../assets/images/study.jpeg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={8}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        <View style={styles.backgroundOverlay} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrapper}>
          <GlassContainer style={styles.successIconCard} borderRadius={32}>
            <View style={styles.successIconInner}>
              <Image
                source={require('../assets/images/check.png')}
                style={styles.checkIcon}
              />
            </View>
          </GlassContainer>
        </View>

        {/* TITLE & SUBTITLE */}
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your study room slot is{'\n'}successfully booked.
        </Text>

        {/* BOOKING DETAILS CARD */}
        <GlassContainer style={styles.detailsCard} borderRadius={24}>
          <View style={styles.detailsInner}>
            <Text style={styles.roomTitle}>
              {room?.title || 'Focus Room 2'}
            </Text>
            <Text style={styles.roomLoc}>
              {room?.loc || '2nd Floor, Central Library'}
            </Text>

            <View style={styles.slotRow}>
              <Image
                source={require('../assets/images/calender.png')}
                style={styles.slotIcon}
              />
              <Text style={styles.slotText}>16 May 2026, Saturday</Text>
            </View>
            <View style={styles.slotRow}>
              <Image
                source={require('../assets/images/time.png')}
                style={styles.slotIcon}
              />
              <Text style={styles.slotText}>4:00 PM - 6:00 PM</Text>
            </View>
          </View>
        </GlassContainer>

        <TouchableOpacity activeOpacity={0.7} style={styles.btnWrap}>
          <GlassContainer style={styles.actionBtn} borderRadius={18}>
            <View style={styles.actionBtnInner}>
              <Text style={styles.actionBtnText}>Add to Calendar</Text>
            </View>
          </GlassContainer>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.btnWrap}>
          <GlassContainer style={styles.actionBtn} borderRadius={18}>
            <View style={styles.actionBtnInner}>
              <Text style={styles.actionBtnText}>View My Bookings</Text>
            </View>
          </GlassContainer>
        </TouchableOpacity>

        {/* GO TO HOME */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Services')}
        >
          <Text style={styles.homeBtnText}>Go to Home</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIconCard: {
    width: 140,
    height: 140,
  },
  successIconInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    top: 70,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
  },
  detailsCard: {
    width: '100%',
    marginBottom: 32,
  },
  detailsInner: {
    padding: 24,
  },
  roomTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  roomLoc: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 24,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  slotIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000',
    marginRight: 14,
  },
  slotText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  btnWrap: {
    marginBottom: 16,
  },
  actionBtn: {
    width: '100%',
  },
  actionBtnInner: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  homeBtn: {
    marginTop: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeBtnText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
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
    // let children dictate size
  },
});
