import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';

import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

/* ─────────────────────────────────────────────
   GLASS CARD
───────────────────────────────────────────── */

const GlassCard = ({ children, style }) => {
  return (
    <View style={[styles.glassCard, style]}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="rgba(255,255,255,0.7)"
      />

      <LinearGradient
        colors={['rgba(255,255,255,0.40)', 'rgba(255,255,255,0.10)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.topBorderGlow} />

      {children}
    </View>
  );
};

/* ─────────────────────────────────────────────
   TRACKING DATA
───────────────────────────────────────────── */

const trackingSteps = [
  {
    id: 1,
    title: 'Order Confirmed',
    time: '17 May, 10:20 AM',
    done: true,
  },
  {
    id: 2,
    title: 'Clothes Picked Up',
    time: '17 May, 10:20 AM',
    done: true,
  },
  {
    id: 3,
    title: 'In Laundry',
    time: '17 May, 10:20 AM',
    active: true,
  },
  {
    id: 4,
    title: 'Quality Check',
    time: 'Expected by 17 May',
  },
  {
    id: 5,
    title: 'Out For Delivery',
    time: 'Expected by 17 May',
  },
  {
    id: 6,
    title: 'Delivered',
    time: '--',
  },
];

/* ─────────────────────────────────────────────
   SCREEN
───────────────────────────────────────────── */

export default function OrderDetails({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ImageBackground
        source={require('../assets/images/backimg2.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* BLUR BG */}

        {/* LIGHT OVERLAY */}
        <View style={styles.overlay} />
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={8}
          reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mainWrapper}>
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={scale(28)} color="#111" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Order Details</Text>

              <View style={{ width: scale(28) }} />
            </View>

            <View style={styles.orderInfoCard}>
              <View>
                <Text style={styles.orderTitle}>
                  Order ID <Text style={styles.orderId}>#LDY245</Text>
                </Text>

                <Text style={styles.orderDate}>17 May 2025, 10:20 AM</Text>
              </View>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>In Process</Text>
              </View>
            </View>

            {/* HANDLE */}
            <View style={styles.handleWrapper}>
              <View style={styles.handle} />
            </View>

            <View style={styles.trackingContainer}>
              <Text style={styles.sectionTitle}>Order Tracking</Text>

              <View style={styles.timelineWrapper}>
                {trackingSteps.map((item, index) => (
                  <View key={item.id} style={styles.timelineRow}>
                    {/* LEFT LINE */}
                    <View style={styles.timelineLeft}>
                      {/* LINE */}
                      {index !== trackingSteps.length - 1 && (
                        <View
                          style={[
                            styles.line,
                            {
                              backgroundColor:
                                item.done || item.active
                                  ? '#5E4429'
                                  : 'rgba(0,0,0,0.15)',
                            },
                          ]}
                        />
                      )}

                      {/* DOT */}
                      <View
                        style={[
                          styles.dot,
                          item.done && styles.doneDot,
                          item.active && styles.activeDot,
                        ]}
                      >
                        {(item.done || item.active) && (
                          <Ionicons
                            name="checkmark"
                            size={scale(12)}
                            color="#fff"
                          />
                        )}
                      </View>
                    </View>

                    {/* RIGHT CONTENT */}
                    <View style={styles.timelineContent}>
                      <Text
                        style={[
                          styles.timelineTitle,
                          item.active && {
                            color: '#5E4429',
                          },
                        ]}
                      >
                        {item.title}
                      </Text>

                      <Text style={styles.timelineTime}>{item.time}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* SUMMARY */}
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    marginTop: verticalScale(14),
                  },
                ]}
              >
                Order Summary
              </Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Wash & Fold (1.5 kg)</Text>

                <Text style={styles.summaryValue}>₹73.50</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Convenience Fee</Text>

                <Text style={styles.summaryValue}>₹10.00</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>GST (5%)</Text>

                <Text style={styles.summaryValue}>₹4.18</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>

                <Text style={styles.totalValue}>₹87.68</Text>
              </View>

              {/* BUTTONS */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.buttonWrapper}
                >
                  <GlassCard style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancel Order</Text>
                  </GlassCard>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.buttonWrapper}
                >
                  <LinearGradient
                    colors={['rgba(120,120,120,0.75)', 'rgba(70,70,70,0.92)']}
                    style={styles.helpBtn}
                  >
                    <Text style={styles.helpText}>Need Help?</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },

  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  scrollContent: {
    paddingTop:
      Platform.OS === 'ios'
        ? verticalScale(52)
        : (StatusBar.currentHeight || 20) + verticalScale(15),

    paddingHorizontal: scale(8),
    paddingBottom: verticalScale(60),
  },

  
  mainWrapper: {
    borderRadius: scale(38),
    padding: scale(10),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: verticalScale(18),
    paddingHorizontal: scale(6),
  },

  headerTitle: {
    fontSize: moderateScale(22),
    fontWeight: '500',
    color: '#111',
  },

  orderInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: scale(24),

    padding: scale(12),

    marginBottom: verticalScale(10),
  },

  orderTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#111',
  },

  orderId: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#444',
  },

  orderDate: {
    fontSize: moderateScale(13),
    color: '#333',
    marginTop: verticalScale(5),
  },

  statusBadge: {
    backgroundColor: '#B7B06C',

    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),

    borderRadius: scale(14),

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  statusText: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#222',
  },

  /* HANDLE */

  handleWrapper: {
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },

  handle: {
    width: scale(120),
    height: verticalScale(7),

    borderRadius: scale(30),

    backgroundColor: 'rgba(120,120,120,0.65)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },

  /* TRACKING */

  trackingContainer: {
    borderRadius: scale(34),
    padding: scale(16),
  },

  sectionTitle: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#111',

    marginBottom: verticalScale(18),
  },

  /* TIMELINE */

  timelineWrapper: {
    marginBottom: verticalScale(8),
  },

  timelineRow: {
    flexDirection: 'row',
    minHeight: verticalScale(66),
  },

  timelineLeft: {
    width: scale(38),
    alignItems: 'center',
  },

  line: {
    position: 'absolute',
    top: verticalScale(18),
    width: 3,
    bottom: -verticalScale(10),

    borderRadius: 20,
  },

  dot: {
    width: scale(22),
    height: scale(22),

    borderRadius: scale(20),

    backgroundColor: 'rgba(0,0,0,0.18)',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: verticalScale(2),
  },

  doneDot: {
    backgroundColor: '#5E4429',
  },

  activeDot: {
    backgroundColor: '#7B5B39',

    transform: [{ scale: 1.15 }],
  },

  timelineContent: {
    flex: 1,
    paddingBottom: verticalScale(12),
  },

  timelineTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#222',

    marginBottom: verticalScale(4),
  },

  timelineTime: {
    fontSize: moderateScale(13),
    color: '#444',
  },

  /* SUMMARY */

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: verticalScale(12),
  },

  summaryLabel: {
    fontSize: moderateScale(16),
    color: '#222',
  },

  summaryValue: {
    fontSize: moderateScale(16),
    color: '#111',
    fontWeight: '600',
  },

  divider: {
    height: 1,

    backgroundColor: 'rgba(0,0,0,0.12)',

    marginVertical: verticalScale(14),
  },

  totalLabel: {
    fontSize: moderateScale(19),
    fontWeight: '700',
    color: '#111',
  },

  totalValue: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#111',
  },

  /* BUTTONS */

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: verticalScale(24),
  },

  buttonWrapper: {
    width: '48%',
  },

  cancelBtn: {
    height: verticalScale(56),

    borderRadius: scale(20),

    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#111',
  },

  helpBtn: {
    height: verticalScale(56),

    borderRadius: scale(20),

    justifyContent: 'center',
    alignItems: 'center',
  },

  helpText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#fff',
  },

  /* GLASS */

  glassCard: {
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',

    backgroundColor: 'rgba(255,255,255,0.06)',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.12,

    shadowRadius: 22,

    elevation: 8,
  },

  topBorderGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    height: 1.2,

    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const OrderDetails = () => {
//   return (
//     <View>
//       <Text>OrderDetails</Text>
//     </View>
//   )
// }

// export default OrderDetails

// const styles = StyleSheet.create({})
