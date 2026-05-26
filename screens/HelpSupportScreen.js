import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
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

// ─── Reusable glass card component ───────────────────────────────────────────
const GlassCard = ({ children, style, borderRadius = 16, glassBgColor }) => (
  <View style={[styles.glassShell, { borderRadius }, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={12}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
    />
    <View
      style={[
        styles.glassBg,
        { borderRadius },
        glassBgColor && { backgroundColor: glassBgColor },
      ]}
    />
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
    {children}
  </View>
);

// ─── Screen Component ─────────────────────────────────────────────────────────
export default function HelpSupportScreen({ navigation }) {
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

  const handleQueryPress = (query) => {
    Alert.alert('Query Info', `Selected query: "${query}"`);
  };

  const handleContactSupport = () => {
    Alert.alert('Support Helpline', 'Connecting to support via call/chat...');
  };

  const commonQueries = [
    'How to make a payment?',
    'How to download invoice?',
    'When is the due date?',
    'How to get a receipt?',
    'What payment methods are Availaible?',
  ];

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={require('../assets/images/paymentimg.webp')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Dim overlay */}
        <View style={styles.bgOverlay} />

        <Animated.View style={animStyle}>

          {/* ══════════════ FIXED TOP HEADER ══════════════ */}
          <View style={styles.fixedTop}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DownloadReceipt')}
                style={styles.backBtn}
                activeOpacity={0.7}
              >
                <Icon name="arrow-left" size={28} color="#111" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Help & Support</Text>
            </View>
          </View>

          {/* ══════════════ SCROLLABLE CONTENT ══════════════ */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Common Queries Heading */}
            <Text style={styles.sectionTitle}>Common Queries</Text>

            {/* Queries Translucent Card */}
            <GlassCard style={styles.queriesCard} borderRadius={24}>
              {commonQueries.map((query, index) => (
                <View key={query}>
                  {index > 0 && <View style={styles.rowDivider} />}
                  <TouchableOpacity
                    onPress={() => handleQueryPress(query)}
                    activeOpacity={0.7}
                    style={styles.queryRow}
                  >
                    <Text style={styles.queryText}>{query}</Text>
                    <Icon name="chevron-right" size={24} color="rgba(0,0,0,0.4)" />
                  </TouchableOpacity>
                </View>
              ))}
            </GlassCard>

            {/* Bottom Support Contact Card */}
            <GlassCard
              style={styles.supportCard}
              borderRadius={24}
              glassBgColor="rgba(255, 166, 0, 0.15)"
            >
              <View style={styles.supportHeaderRow}>
                <View style={styles.supportIconWrapper}>
                  <Icon name="headset" size={40} color="#111" />
                </View>
                <View style={styles.supportTextContainer}>
                  <Text style={styles.supportTitle}>Still need help?</Text>
                  <Text style={styles.supportSubtitle}>Our support team is here to help you.</Text>
                </View>
              </View>

              {/* Large Rounded Contact Support Button */}
              <TouchableOpacity
                onPress={handleContactSupport}
                activeOpacity={0.85}
                style={styles.contactBtn}
              >
                <Text style={styles.contactBtnText}>Contact Support</Text>
              </TouchableOpacity>
            </GlassCard>
          </ScrollView>

        </Animated.View>
      </ImageBackground>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const TOP_PAD = Platform.OS === 'android'
  ? (StatusBar.currentHeight || 24) + 12
  : 60;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#C8C0B8' },
  bg: { flex: 1, width: '100%', height: '100%' },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
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
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
    marginLeft: 4,
  },

  // ── Scrollable Middle ──
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 44 : 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginTop: 10,
    marginBottom: 16,
    letterSpacing: 0.2,
  },

  // ── Queries Card ──
  queriesCard: {
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
    marginBottom: 20,
  },
  queryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 22,
  },
  queryText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111',
    flex: 1,
    paddingRight: 12,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginHorizontal: 22,
  },

  // ── Bottom Support Card ──
  supportCard: {
    borderColor: 'rgba(255, 166, 0, 0.88)',
    backgroundColor: 'rgba(255, 166, 0, 0.15)', // orange glass
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 22,
    marginTop: 8,
  },
  supportHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  supportIconWrapper: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  supportTextContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  supportTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.60)',
    lineHeight: 18,
  },

  // ── Contact Support Button ──
  contactBtn: {
    backgroundColor: '#6B6560', // grey background
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  contactBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.4,
  },

  // ── Glass Base Styles ──
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
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
  },
  topInsetHighlight: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255, 255, 255, 0.60)', zIndex: 1,
  },
  bottomInsetHighlight: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 1, backgroundColor: 'rgba(255, 255, 255, 0.12)', zIndex: 1,
  },
  topEdgeLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
  },
  leftEdgeLine: {
    position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
  },
});
