import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  TextInput,
  Alert,
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

// ─── Reusable glass panel component ─────────────────────────────────────────
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

// ─── Screen Component ─────────────────────────────────────────────────────────
export default function WashroomRequestScreen({ navigation }) {
  const [selectedService, setSelectedService] = useState('basic');
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(0);
  const [notes, setNotes] = useState('');

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 420, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 420, easing: Easing.out(Easing.ease) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleRequest = () => {
    Alert.alert('Request Submitted', 'Washroom cleaning request submitted successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('RoomCleaning') }
    ]);
  };

  const dates = [
    { key: 'today', day: 'Today', date: '16 May' },
    { key: 'tomorrow', day: 'Tomorrow', date: '16 May' },
    { key: 'saturday', day: 'Saturday', date: '16 May' },
    { key: 'sunday', day: 'Sunday', date: '16 May' },
  ];

  const timeSlots = [
    '4:00 PM - 6:00 PM',
    '4:00 PM - 6:00 PM',
    '4:00 PM - 6:00 PM',
    '4:00 PM - 6:00 PM',
    '4:00 PM - 6:00 PM',
  ];

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* ── FULL SCREEN BACKGROUND ────────────────────── */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../assets/images/roomCleaning.webp')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* Slight blur — image clearly visible, just softened */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        {/* Warm beige tint — barely there, just for warmth */}
        <View style={styles.backgroundOverlay} />
      </View>

      <Animated.View style={animStyle}>
        {/* ══════════════ FIXED HEADER ══════════════ */}
        <View style={styles.fixedTop}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('RoomCleaning')}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={28} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Washroom Request</Text>
          </View>
        </View>

        {/* ══════════════ SCROLLABLE CONTENT ══════════════ */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Service Selection */}
          <Text style={styles.sectionTitle}>Select Service</Text>
          <View style={styles.serviceRow}>
            {/* Basic Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedService('basic')}
              style={styles.serviceCardWrap}
            >
              <GlassPanel
                style={[
                  styles.serviceCard,
                  selectedService === 'basic' && styles.activeCard,
                ]}
                intensity={12}
              >
                <Text style={styles.serviceCardTitle}>Basic Washroom Cleaning</Text>
                <Text style={styles.serviceCardSubtitle}>{'Floor & Surface\nCleaning .'}</Text>
              </GlassPanel>
            </TouchableOpacity>

            {/* Standard Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedService('standard')}
              style={styles.serviceCardWrap}
            >
              <GlassPanel
                style={[
                  styles.serviceCard,
                  selectedService === 'standard' && styles.activeCard,
                ]}
                intensity={12}
              >
                <Text style={styles.serviceCardTitle}>Standard Washroom Cleaning</Text>
                <Text style={styles.serviceCardSubtitle}>{'Deep Cleaning ,\nMirror, Basin,\netc.'}</Text>
              </GlassPanel>
            </TouchableOpacity>
          </View>

          {/* Date & Time Selection */}
          <Text style={styles.sectionTitle}>Select Date & Time</Text>

          {/* Horizontally aligned Date Buttons */}
          <View style={styles.dateRow}>
            {dates.map((d) => {
              const isActive = selectedDate === d.key;
              return (
                <TouchableOpacity
                  key={d.key}
                  onPress={() => setSelectedDate(d.key)}
                  activeOpacity={0.8}
                  style={styles.dateButtonWrap}
                >
                  <GlassPanel
                    style={[
                      styles.dateButton,
                      isActive && styles.activeDateButton,
                    ]}
                    intensity={12}
                  >
                    <Text style={[styles.dateDayText, isActive && styles.activeDayText]}>{d.day}</Text>
                    <Text style={[styles.dateValText, isActive && styles.activeValText]}>{d.date}</Text>
                  </GlassPanel>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Time Slots Grid (2-2-1 layout) */}
          <View style={styles.timeSlotGrid}>
            {timeSlots.map((slot, index) => {
              const isActive = selectedTimeSlot === index;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTimeSlot(index)}
                  activeOpacity={0.8}
                  style={styles.timeSlotWrap}
                >
                  <GlassPanel
                    style={[
                      styles.timeSlotPill,
                      isActive && styles.activeTimeSlot,
                    ]}
                    intensity={12}
                  >
                    <Text style={[styles.timeSlotText, isActive && styles.activeTimeSlotText]}>{slot}</Text>
                  </GlassPanel>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Special Instructions Input */}
          <Text style={styles.sectionTitle}>Special Instructions (Optional)</Text>
          <GlassPanel style={styles.inputPanel} intensity={12}>
            <TextInput
              style={styles.textInput}
              placeholder="Add any role for our team..."
              placeholderTextColor="rgba(0,0,0,0.4)"
              multiline
              maxLength={200}
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />
            <Text style={styles.charCounter}>{notes.length}/200</Text>
          </GlassPanel>

          {/* Request Button */}
          <TouchableOpacity
            onPress={handleRequest}
            activeOpacity={0.85}
            style={styles.requestBtn}
          >
            <Text style={styles.requestText}>Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const TOP_PAD = Platform.OS === 'android'
  ? (StatusBar.currentHeight || 24) + 12
  : 60;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#EDE8E2' },
  bg: { flex: 1 },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(238, 232, 225, 0.05)',
  },

  // ── Fixed Top Header ──
  fixedTop: {
    paddingTop: TOP_PAD,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '500',
    color: '#1A1A1A',
    letterSpacing: 0.2,
    marginLeft: 4,
  },

  // ── Scrollable Middle ──
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 44 : 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 14,
    marginTop: 18,
    letterSpacing: 0.2,
  },

  // ── Service Cards ──
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceCardWrap: {
    width: '48.5%',
  },
  serviceCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    height: 140,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  serviceCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    lineHeight: 20,
  },
  serviceCardSubtitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.55)',
    lineHeight: 16,
  },
  activeCard: {
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },

  // ── Date Row ──
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateButtonWrap: {
    width: '23.5%',
  },
  dateButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDayText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.55)',
    marginBottom: 2,
  },
  dateValText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  activeDateButton: {
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  activeDayText: {
    color: '#1A1A1A',
  },
  activeValText: {
    color: '#1A1A1A',
  },

  // ── Time Slots Grid ──
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  timeSlotWrap: {
    width: '48.5%',
  },
  timeSlotPill: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.65)',
  },
  activeTimeSlot: {
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  activeTimeSlotText: {
    color: '#1A1A1A',
  },

  // ── Input Panel ──
  inputPanel: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    height: 100,
    padding: 14,
    position: 'relative',
    marginBottom: 24,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    padding: 0,
    lineHeight: 18,
  },
  charCounter: {
    position: 'absolute',
    bottom: 10,
    right: 14,
    fontSize: 11,
    color: 'rgba(0,0,0,0.45)',
  },

  // ── Request Button ──
  requestBtn: {
    backgroundColor: '#7E7771', // grey color from reference
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 6,
  },
  requestText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.4,
  },

  // ── Glass Panel Base Styles ──
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
    height: 1, backgroundColor: 'rgba(255, 255, 255, 0.50)', zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
  },
});
