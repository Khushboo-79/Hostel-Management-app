import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavbar from '../components/BottomNavbar';

const { width, height } = Dimensions.get('window');

const HISTORY_DATA = [
  { id: '1', type: 'Room Cleaning', date: 'Oct 24', status: 'Completed', statusColor: '#4CAF50' },
  { id: '2', type: 'Washroom Request', date: 'Oct 21', status: 'Pending', statusColor: '#FF9800' },
  { id: '3', type: 'Room Cleaning', date: 'Oct 15', status: 'Completed', statusColor: '#4CAF50' },
  { id: '4', type: 'Room Cleaning', date: 'Oct 02', status: 'Completed', statusColor: '#4CAF50' },
  { id: '5', type: 'Washroom Request', date: 'Sep 28', status: 'In Progress', statusColor: '#2196F3' },
];

/* ─────────────────────────────────────────────────────────
   GlassPanel — identical glassmorphism to LoginScreen's cardShell
   
   BlurView         blurAmount={12}, blurType="light"
   glassBg          rgba(255,255,255,0.46)
   border           1px solid rgba(255,255,255,0.3)
   box-shadow       0 8px 32px rgba(0,0,0,0.1)
   topInsetHighlight    rgba(255,255,255,0.5)
   bottomInsetHighlight rgba(255,255,255,0.1)
   topEdgeLine      transparent → white → transparent  (horizontal)
   leftEdgeLine     white → transparent → white         (vertical)
───────────────────────────────────────────────────────── */
const GlassPanel = ({ style, children }) => (
  <View
    style={[
      {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        // box-shadow: 0 8px 32px rgba(0,0,0,0.1)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.10,
        shadowRadius: 32,
        elevation: 8,
      },
      style,
    ]}
  >
    {/* backdrop-filter: blur(12px) — matches LoginScreen exactly */}
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={12}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
    />

    {/* background: rgba(255,255,255,0.46) — matches LoginScreen's glassBg */}
    <View style={glassStyles.glassBg} />

    {/* inset 0 1px 0 rgba(255,255,255,0.5) — top highlight */}
    <View style={glassStyles.topInsetHighlight} />

    {/* inset 0 -1px 0 rgba(255,255,255,0.1) — bottom highlight */}
    <View style={glassStyles.bottomInsetHighlight} />

    {/* ::before — top edge horizontal gradient: transparent → white → transparent */}
    <LinearGradient
      colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={glassStyles.topEdgeLine}
    />

    {/* ::after — left edge vertical gradient: white → transparent → white */}
    <LinearGradient
      colors={[
        'rgba(255,255,255,0.8)',
        'transparent',
        'rgba(255,255,255,0.3)',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={glassStyles.leftEdgeLine}
    />

    {children}
  </View>
);

const glassStyles = StyleSheet.create({
  // background: rgba(255,255,255,0.46)
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.46)',
  },
  // inset top highlight
  topInsetHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 1,
  },
  // inset bottom highlight
  bottomInsetHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 1,
  },
  // ::before horizontal gradient at top
  topEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    zIndex: 2,
  },
  // ::after vertical gradient on left
  leftEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: '100%',
    zIndex: 2,
  },
});

/* ─────────────────────────────────────────────────────────
   Main Screen
───────────────────────────────────────────────────────── */
export default function RoomCleaningScreen({ navigation }) {
  return (
    <View style={styles.container}>
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
          blurAmount={2}
          reducedTransparencyFallbackColor="#EBE5DF"
        />
        {/* Warm beige tint — barely there, just for warmth */}
        <View style={styles.backgroundOverlay} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER ─────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Services')}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Icon name="arrow-left" size={28} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Room Cleaning</Text>
        </View>

        {/* ── ACTION BUTTONS ─────────────────────────── */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButtonWrap}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('RoomRequest')}
          >
            <GlassPanel style={styles.actionButton} intensity={30}>
              <Text style={styles.actionButtonText}>{'Room\nRequest'}</Text>
            </GlassPanel>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonWrap}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('WashroomRequest')}
          >
            <GlassPanel style={styles.actionButton} intensity={30}>
              <Text style={styles.actionButtonText}>{'Washroom\nRequest'}</Text>
            </GlassPanel>
          </TouchableOpacity>
        </View>

        {/* ── HISTORY GLASS CONTAINER ────────────────── */}
        <GlassPanel style={styles.historyContainer} intensity={40}>
          <Text style={styles.historyHeading}>History</Text>

          {/* Nested slim glass pill cards */}
          <View style={styles.pillStack}>
            {HISTORY_DATA.map((item) => (
              <GlassPanel key={item.id} style={styles.pill} intensity={18}>
                <View style={styles.pillInner}>
                  {/* Service + date */}
                  <View style={styles.pillLeft}>
                    <Text style={styles.pillType} numberOfLines={1}>{item.type}</Text>
                    <Text style={styles.pillDate}>{item.date}</Text>
                  </View>
                  {/* Status badge */}
                  <View
                    style={[
                      styles.badge,
                      { borderColor: item.statusColor + '55' },
                    ]}
                  >
                    <View
                      style={[styles.badgeDot, { backgroundColor: item.statusColor }]}
                    />
                    <Text style={[styles.badgeText, { color: item.statusColor }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </GlassPanel>
            ))}
          </View>
        </GlassPanel>
      </ScrollView>

      {/* ── BOTTOM NAVBAR ──────────────────────────────── */}
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE8E2',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(238, 232, 225, 0.05)',
  },

  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 65 : (StatusBar.currentHeight || 24) + 22,
    paddingBottom: 130,
    paddingHorizontal: 18,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
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
    letterSpacing: 0.4,
    marginLeft: 4,
  },

  /* Action buttons */
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  actionButtonWrap: {
    width: '47.5%',
  },
  actionButton: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    // Soft shadow for depth
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },

  /* Big history glass container */
  historyContainer: {
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    paddingTop: 28,
    paddingBottom: 30,
    paddingHorizontal: 14,
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  historyHeading: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.3,
  },

  /* Nested slim pills */
  pillStack: {
    gap: 10,
  },
  pill: {
    borderRadius: 999,   // perfect pill shape
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    height: 58,
    justifyContent: 'center',
    shadowColor: '#8A7D72',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  pillInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    height: '100%',
  },
  pillLeft: {
    flex: 1,
    marginRight: 12,
  },
  pillType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    letterSpacing: 0.1,
  },
  pillDate: {
    fontSize: 12,
    fontWeight: '400',
    color: '#555',
    marginTop: 2,
  },

  /* Status badge */
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
