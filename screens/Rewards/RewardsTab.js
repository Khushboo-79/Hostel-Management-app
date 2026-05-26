import React from 'react';
import {
    ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomNavbar from '../../components/BottomNavbar';
import {
  COLORS,
  FONT_FAMILY,
  RADIUS,
  REWARDS_COLORS,
  SHADOWS,
  SPACING,
  scaleH,
  scaleM,
  scaleV,
} from '../../constants/AppTheme';
import { BlurView } from '@react-native-community/blur';

const C = REWARDS_COLORS;

const QUICK_ACTIONS = [
  { id: 'earn', label: 'Earn Points', icon: 'lightbulb-on-outline' },
  { id: 'refer', label: 'Refer', icon: 'account-group-outline' },
  { id: 'rewards', label: 'My Rewards', icon: 'gift-open-outline' },
  { id: 'offers', label: 'Offers', icon: 'gift-outline' },
];

const DecorativeIcon = ({ name, style, size = 20 }) => (
  <Icon
    name={name}
    size={scaleM(size)}
    color={C.gold}
    style={[styles.decorIcon, style]}
  />
);

const RewardsTab = ({ navigation }) => {
  return (
    // <View style={styles.screen}>
    <ImageBackground
          source={require('../../assets/BackgroundImages/rewardsback.webp')}
          style={styles.screen}
        
        >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={COLORS.transparent}
      />

      <DecorativeIcon name="star-four-points" size={19} style={styles.decorTopLeft} />
      <DecorativeIcon name="star-four-points" size={22} style={styles.decorRightMid} />
      <DecorativeIcon name="star-four-points" size={20} style={styles.decorBottomLeft} />
      <DecorativeIcon name="butterfly-outline" size={16} style={styles.decorButterfly} />
      <View style={styles.softOrbOne} />
      <View style={styles.softOrbTwo} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
         <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={12}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
          />
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation?.goBack()}
              style={styles.headerBtn}
            >
              <Icon name="arrow-left" size={scaleM(28)} color={C.textDark} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.bellBtn}>
              <Icon name="bell-outline" size={scaleM(23)} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Rewards</Text>
          <Text style={styles.subtitle}>
            Stay active, earn points &{'\n'}Unlock amazing rewards!
          </Text>

          <View style={styles.pointsCard}>
            <Text style={styles.cardLabel}>My Points</Text>
            <Text style={styles.pointsValue}>2,450</Text>
            <Text style={styles.cardCaption}>Available Balance</Text>
          </View>

          <View style={styles.tierCard}>
            <View style={styles.tierTop}>
              <View>
                <Text style={styles.cardLabel}>Tier</Text>
                <Text style={styles.tierTitle}>Gold Member</Text>
                <Text style={styles.cardCaption}>Next Tier Platinum</Text>
              </View>
            </View>

            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressText}>70%</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.quickGrid}>
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity
                key={action.id}
                activeOpacity={0.85}
                style={styles.actionCard}
              >
                <View style={styles.actionIconWrap}>
                  <Icon name={action.icon} size={scaleM(25)} color={C.textDark} />
                </View>
                <Text style={styles.actionText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.checkCard}>
            <Text style={styles.checkTitle}>Daily Check-in</Text>
            <Text style={styles.checkText}>Check-in daily and earn 10 points</Text>

            <TouchableOpacity activeOpacity={0.88} style={styles.checkButton}>
              <Text style={styles.checkButtonText}>Check-in Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNavbar activeTab="RewardsTab" />
   </ImageBackground>
  );
};

export default RewardsTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.background,
    // overflow: 'hidden',
  },

  safeArea: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? scaleV(28)
        : 0,
  },

  content: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: scaleV(128),
  },

  header: {
    minHeight: scaleV(58),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerBtn: {
    width: scaleH(40),
    height: scaleH(40),
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bellBtn: {
    width: scaleH(42),
    height: scaleH(42),
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(54,51,48,0.82)',
    ...SHADOWS.small,
  },

  title: {
    marginTop: scaleV(12),
    fontSize: scaleM(24),
    lineHeight: scaleV(30),
    fontFamily: FONT_FAMILY.semibold,
    color: C.textDark,
  },

  subtitle: {
    marginTop: scaleV(2),
    fontSize: scaleM(14),
    lineHeight: scaleV(20),
    fontFamily: FONT_FAMILY.medium,
    color: C.textDark,
  },

  pointsCard: {
    minHeight: scaleV(66),
    marginTop: scaleV(13),
    borderRadius: scaleH(16),
    paddingHorizontal: scaleH(15),
    paddingVertical: scaleV(9),
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
  },

  cardLabel: {
    fontSize: scaleM(11),
    lineHeight: scaleV(15),
    fontFamily: FONT_FAMILY.medium,
    color: C.textMuted,
  },

  pointsValue: {
    fontSize: scaleM(20),
    lineHeight: scaleV(25),
    fontFamily: FONT_FAMILY.bold,
    color: C.textDark,
  },

  cardCaption: {
    fontSize: scaleM(10),
    lineHeight: scaleV(14),
    fontFamily: FONT_FAMILY.medium,
    color: C.textDark,
  },

  tierCard: {
    minHeight: scaleV(73),
    marginTop: scaleV(10),
    borderRadius: scaleH(16),
    paddingHorizontal: scaleH(15),
    paddingTop: scaleV(8),
    paddingBottom: scaleV(7),
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
  },

  tierTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  tierTitle: {
    marginTop: scaleV(-1),
    fontSize: scaleM(15),
    lineHeight: scaleV(18),
    fontFamily: FONT_FAMILY.bold,
    color: C.textDark,
  },

  progressRow: {
    marginTop: scaleV(5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleH(9),
  },

  progressTrack: {
    flex: 1,
    height: scaleV(5),
    borderRadius: RADIUS.full,
    backgroundColor: C.progressTrack,
    overflow: 'hidden',
  },

  progressFill: {
    width: '70%',
    height: '100%',
    borderRadius: RADIUS.full,
    backgroundColor: C.progressFill,
  },

  progressText: {
    minWidth: scaleH(35),
    fontSize: scaleM(11),
    lineHeight: scaleV(14),
    fontFamily: FONT_FAMILY.medium,
    color: C.textDark,
  },

  sectionTitle: {
    marginTop: scaleV(11),
    marginLeft: scaleH(2),
    fontSize: scaleM(14),
    lineHeight: scaleV(19),
    fontFamily: FONT_FAMILY.semibold,
    color: C.textDark,
  },

  quickGrid: {
    marginTop: scaleV(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleH(8),
  },

  actionCard: {
    flex: 1,
    minHeight: scaleV(59),
    borderRadius: scaleH(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surfaceStrong,
  },

  actionIconWrap: {
    height: scaleV(27),
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    marginTop: scaleV(1),
    fontSize: scaleM(9),
    lineHeight: scaleV(13),
    fontFamily: FONT_FAMILY.medium,
    color: C.textDark,
    textAlign: 'center',
  },

  checkCard: {
    minHeight: scaleV(95),
    marginTop: scaleV(17),
    borderRadius: scaleH(16),
    paddingHorizontal: scaleH(13),
    paddingTop: scaleV(15),
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
  },

  checkTitle: {
    fontSize: scaleM(15),
    lineHeight: scaleV(20),
    fontFamily: FONT_FAMILY.bold,
    color: C.textDark,
  },

  checkText: {
    marginTop: scaleV(1),
    fontSize: scaleM(11),
    lineHeight: scaleV(16),
    fontFamily: FONT_FAMILY.medium,
    color: C.textDark,
  },

  checkButton: {
    marginTop: scaleV(4),
    width: scaleH(112),
    height: scaleV(34),
    borderRadius: scaleH(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(115,112,108,0.82)',
    ...SHADOWS.small,
  },

  checkButtonText: {
    fontSize: scaleM(14),
    lineHeight: scaleV(18),
    fontFamily: FONT_FAMILY.semibold,
    color: COLORS.white,
  },

  softOrbOne: {
    position: 'absolute',
    right: scaleH(-35),
    top: scaleV(38),
    width: scaleH(188),
    height: scaleH(188),
    borderRadius: scaleH(94),
    backgroundColor: 'rgba(255,255,255,0.30)',
  },

  softOrbTwo: {
    position: 'absolute',
    left: scaleH(38),
    top: scaleV(96),
    width: scaleH(156),
    height: scaleH(156),
    borderRadius: scaleH(78),
    backgroundColor: 'rgba(255,255,255,0.14)',
  },

  decorIcon: {
    position: 'absolute',
    opacity: 0.65,
  },

  decorTopLeft: {
    left: scaleH(12),
    top: scaleV(10),
    transform: [{ rotate: '18deg' }],
  },

  decorRightMid: {
    right: scaleH(7),
    top: scaleV(221),
    transform: [{ rotate: '-22deg' }],
  },

  decorBottomLeft: {
    left: scaleH(128),
    bottom: scaleV(20),
    transform: [{ rotate: '22deg' }],
  },

  decorButterfly: {
    right: scaleH(54),
    top: scaleV(166),
    opacity: 0.45,
  },
});
