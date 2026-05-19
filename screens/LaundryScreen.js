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
   PREMIUM GLASS CARD
───────────────────────────────────────────── */

const GlassCard = ({ children, style }) => {
  return (
    <View style={[styles.glassContainer, style]}>
      {/* REAL BLUR */}
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="rgba(255,255,255,0.06)"
      />

      {/* SOFT GLASS GRADIENT */}
      <LinearGradient
        colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.03)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* TOP SHINE */}
      <LinearGradient
        colors={['rgba(255,255,255,0.18)', 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topHighlight}
      />

      {children}
    </View>
  );
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const orders = [
  {
    id: 1,
    status: 'In Process',
    bg: '#B8B06C',
    icon: 'time-outline',
  },
  {
    id: 2,
    status: 'Completed',
    bg: '#B7D58F',
    icon: 'checkmark-circle-outline',
  },
  {
    id: 3,
    status: 'Completed',
    bg: '#B7D58F',
    icon: 'checkmark-circle-outline',
  },
  {
    id: 4,
    status: 'Cancelled',
    bg: '#D39B9B',
    icon: 'close-circle-outline',
  },
];

/* ─────────────────────────────────────────────
   SCREEN
───────────────────────────────────────────── */

export default function LaundryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ImageBackground
        source={require('../assets/images/study.jpeg')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* SOFT BACKGROUND BLUR */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={2}
        />

        {/* DARK OVERLAY */}
        <View style={styles.overlay} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* MAIN CONTAINER */}
          <GlassCard style={styles.mainContainer}>
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.8}>
                <Ionicons name="arrow-back" size={scale(28)} color="#111" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Laundry</Text>

              <View style={{ width: scale(28) }} />
            </View>

            {/* TOP BUTTONS */}
            <View style={styles.topButtonRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.buttonWrapper}
                onPress={() => navigation.navigate('Thingsinfo')}
              >
                <GlassCard style={styles.topButton}>
                  <Ionicons
                    name="shirt-outline"
                    size={scale(24)}
                    color="#111"
                    style={styles.topIcon}
                  />

                  <Text style={styles.topButtonText}>Book{'\n'}Laundry</Text>
                </GlassCard>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.buttonWrapper}
                onPress={() => navigation.navigate('OrderDetails')}
              >
                <GlassCard style={styles.topButton}>
                  <Ionicons
                    name="cube-outline"
                    size={scale(24)}
                    color="#111"
                    style={styles.topIcon}
                  />

                  <Text style={styles.topButtonText}>Order{'\n'}Status</Text>
                </GlassCard>
              </TouchableOpacity>
            </View>

            {/* HANDLE */}
            <View style={styles.handleWrapper}>
              <View style={styles.handle} />
            </View>

            {/* HISTORY */}
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>History</Text>

              {orders.map(item => (
                <GlassCard key={item.id} style={styles.orderCard}>
                  {/* LEFT SIDE */}
                  <View style={styles.leftContent}>
                    <Text style={styles.orderId}>#LDY23345</Text>

                    <Text style={styles.dateText}>17 May 2025, 10:20 AM</Text>

                    <Text style={styles.detailText}>Wash & Fold • 1.5 kg</Text>

                    <Text style={styles.detailText}>Expected by 18 May</Text>

                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={styles.trackText}>Track Order</Text>
                    </TouchableOpacity>
                  </View>

                  {/* RIGHT SIDE */}
                  <View style={styles.rightContent}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: item.bg,
                        },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={scale(14)}
                        color="#222"
                      />

                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>

                    <Text style={styles.price}>₹87.88</Text>
                  </View>
                </GlassCard>
              ))}
            </View>
          </GlassCard>
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
    backgroundColor: 'rgba(0,0,0,0.10)',
  },

  scrollContent: {
    paddingTop:
      Platform.OS === 'ios'
        ? verticalScale(55)
        : (StatusBar.currentHeight || 20) + verticalScale(18),

    paddingHorizontal: scale(14),
    paddingBottom: verticalScale(60),
  },

  /* MAIN CONTAINER */

  mainContainer: {
    borderRadius: scale(38),
    padding: scale(14),
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: verticalScale(18),
    paddingHorizontal: scale(8),
  },

  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: '#111',
    letterSpacing: 0.3,
  },

  /* TOP BUTTONS */

  topButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: verticalScale(14),
  },

  buttonWrapper: {
    width: '48%',
  },

  topButton: {
    height: verticalScale(82),
    borderRadius: scale(22),

    justifyContent: 'center',
    alignItems: 'center',
  },

  topIcon: {
    marginBottom: verticalScale(6),
  },

  topButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    lineHeight: verticalScale(20),
  },

  /* HANDLE */

  handleWrapper: {
    alignItems: 'center',
    marginBottom: verticalScale(14),
  },

  handle: {
    width: scale(120),
    height: verticalScale(7),

    borderRadius: scale(20),

    backgroundColor: 'rgba(90,90,90,0.55)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },

  /* HISTORY */

  historyContainer: {
    borderRadius: scale(36),
    paddingTop: scale(4),
  },

  historyTitle: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    color: '#111',

    textAlign: 'center',
    marginBottom: verticalScale(18),
  },

  /* ORDER CARD */

  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: scale(16),

    borderRadius: scale(24),

    marginBottom: verticalScale(14),
  },

  leftContent: {
    flex: 1,
  },

  orderId: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: '#111',

    marginBottom: verticalScale(5),
  },

  dateText: {
    fontSize: moderateScale(12),
    color: '#333',

    marginBottom: verticalScale(5),
  },

  detailText: {
    fontSize: moderateScale(13),
    color: '#222',

    marginBottom: verticalScale(2),
  },

  trackText: {
    marginTop: verticalScale(8),

    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#111',
  },

  /* RIGHT SIDE */

  rightContent: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    marginLeft: scale(12),
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(7),

    borderRadius: scale(14),
  },

  statusText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#222',

    marginLeft: scale(4),
  },

  price: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#111',
  },

  /* GLASS CARD */

  glassContainer: {
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',

    backgroundColor: 'rgba(255,255,255,0.03)',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.08,
    shadowRadius: 20,

    elevation: 6,
  },

  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    height: 1,
  },
});

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   Platform,
// } from 'react-native';

// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// const { width } = Dimensions.get('window');

// /* ─────────────────────────────────────────────
//    PREMIUM GLASS CARD
// ───────────────────────────────────────────── */
// const GlassCard = ({ children, style }) => {
//   return (
//     <View style={[styles.glassContainer, style]}>
//       <BlurView
//         style={StyleSheet.absoluteFill}
//         blurType="light"
//         blurAmount={18}
//         reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
//       />

//       {/* MAIN GLASS */}
//       <LinearGradient
//         colors={['rgba(255,255,255,0.38)', 'rgba(255,255,255,0.12)']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={StyleSheet.absoluteFill}
//       />

//       {/* TOP SHINE */}
//       <LinearGradient
//         colors={['rgba(255,255,255,0.85)', 'transparent']}
//         start={{ x: 0.5, y: 0 }}
//         end={{ x: 0.5, y: 1 }}
//         style={styles.topHighlight}
//       />

//       {children}
//     </View>
//   );
// };

// /* ─────────────────────────────────────────────
//    DATA
// ───────────────────────────────────────────── */

// const orders = [
//   {
//     id: 1,
//     status: 'In Process',
//     bg: '#B8B06C',
//     icon: 'time-outline',
//   },
//   {
//     id: 2,
//     status: 'Completed',
//     bg: '#B7D58F',
//     icon: 'checkmark-circle-outline',
//   },
//   {
//     id: 3,
//     status: 'Completed',
//     bg: '#B7D58F',
//     icon: 'checkmark-circle-outline',
//   },
//   {
//     id: 4,
//     status: 'Cancelled',
//     bg: '#D39B9B',
//     icon: 'close-circle-outline',
//   },
// ];

// /* ─────────────────────────────────────────────
//    SCREEN
// ───────────────────────────────────────────── */

// export default function LaundryScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />

//       <ImageBackground
//         source={require('../assets/images/study.jpeg')}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         {/* BLUR OVERLAY */}
//         <BlurView
//           style={StyleSheet.absoluteFill}
//           blurType="light"
//           blurAmount={3}
//         />

//         {/* LIGHT OVERLAY */}
//         <View style={styles.overlay} />

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* MAIN WRAPPER */}
//           <GlassCard style={styles.mainContainer}>
//             {/* HEADER */}
//             <View style={styles.header}>
//               <TouchableOpacity activeOpacity={0.8}>
//                 <Ionicons name="arrow-back" size={scale(28)} color="#111" />
//               </TouchableOpacity>

//               <Text style={styles.headerTitle}>Laundry</Text>

//               <View style={{ width: scale(28) }} />
//             </View>

//             {/* TOP BUTTONS */}
//             <View style={styles.topButtonRow}>
//               <TouchableOpacity
//                 activeOpacity={0.85}
//                 style={styles.buttonWrapper}
//                 onPress={() => navigation.navigate('Thingsinfo')}
//               >
//                 <GlassCard style={styles.topButton}>
//                   <Text style={styles.topButtonText}>Book{'\n'}Laundry</Text>
//                 </GlassCard>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.85}
//                 style={styles.buttonWrapper}
//                 onPress={() => navigation.navigate('OrderDetails')}
//               >
//                 <GlassCard style={styles.topButton}>
//                   <Text style={styles.topButtonText}>Order{'\n'}Status</Text>
//                 </GlassCard>
//               </TouchableOpacity>
//             </View>

//             {/* HANDLE */}
//             <View style={styles.handleWrapper}>
//               <View style={styles.handle} />
//             </View>

//             {/* HISTORY */}
//             <View style={styles.historyContainer}>
//               <Text style={styles.historyTitle}>History</Text>

//               {orders.map(item => (
//                 <GlassCard key={item.id} style={styles.orderCard}>
//                   {/* LEFT */}
//                   <View style={styles.leftContent}>
//                     <Text style={styles.orderId}>#LDY23345</Text>

//                     <Text style={styles.dateText}>17 May 2025, 10:20 AM</Text>

//                     <Text style={styles.detailText}>Wash & Fold . 1.5 kg</Text>

//                     <Text style={styles.detailText}>Expected by 18 May</Text>

//                     <TouchableOpacity>
//                       <Text style={styles.trackText}>Track Order</Text>
//                     </TouchableOpacity>
//                   </View>

//                   {/* RIGHT */}
//                   <View style={styles.rightContent}>
//                     <View
//                       style={[
//                         styles.statusBadge,
//                         {
//                           backgroundColor: item.bg,
//                         },
//                       ]}
//                     >
//                       <Ionicons
//                         name={item.icon}
//                         size={scale(14)}
//                         color="#222"
//                       />

//                       <Text style={styles.statusText}>{item.status}</Text>
//                     </View>

//                     <Text style={styles.price}>₹87.88</Text>
//                   </View>
//                 </GlassCard>
//               ))}
//             </View>
//           </GlassCard>
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// }

// /* ─────────────────────────────────────────────
//    STYLES
// ───────────────────────────────────────────── */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#111',
//   },

//   background: {
//     flex: 1,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },

//   scrollContent: {
//     paddingTop: 50,

//     paddingHorizontal: scale(14),
//     paddingBottom: verticalScale(60),
//   },

//   /* MAIN CONTAINER */
//   mainContainer: {
//     borderRadius: scale(38),
//     padding: scale(14),
//   },

//   /* HEADER */
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',

//     marginBottom: verticalScale(18),
//     paddingHorizontal: scale(8),
//   },

//   headerTitle: {
//     fontSize: moderateScale(22),
//     fontWeight: '500',
//     color: '#111',
//   },

//   /* TOP BUTTONS */
//   topButtonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     marginBottom: verticalScale(12),
//   },

//   buttonWrapper: {
//     width: '48%',
//   },

//   topButton: {
//     height: verticalScale(72),
//     borderRadius: scale(22),

//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   topButtonText: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#111',
//     textAlign: 'center',
//     lineHeight: verticalScale(22),
//   },

//   /* HANDLE */
//   handleWrapper: {
//     alignItems: 'center',
//     marginBottom: verticalScale(10),
//   },

//   handle: {
//     width: scale(120),
//     height: verticalScale(7),

//     borderRadius: scale(20),

//     backgroundColor: 'rgba(120,120,120,0.65)',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.5)',
//   },

//   /* HISTORY */
//   historyContainer: {
//     borderRadius: scale(36),
//     padding: scale(14),
//   },

//   historyTitle: {
//     fontSize: moderateScale(20),
//     fontWeight: '500',
//     color: '#111',

//     textAlign: 'center',
//     marginBottom: verticalScale(18),
//   },

//   /* ORDER CARD */
//   orderCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     padding: scale(16),

//     borderRadius: scale(24),

//     marginBottom: verticalScale(14),
//   },

//   leftContent: {
//     flex: 1,
//   },

//   orderId: {
//     fontSize: moderateScale(17),
//     fontWeight: '700',
//     color: '#111',

//     marginBottom: verticalScale(5),
//   },

//   dateText: {
//     fontSize: moderateScale(12),
//     color: '#333',

//     marginBottom: verticalScale(4),
//   },

//   detailText: {
//     fontSize: moderateScale(13),
//     color: '#222',

//     marginBottom: verticalScale(2),
//   },

//   trackText: {
//     marginTop: verticalScale(6),

//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#111',
//   },

//   /* RIGHT */
//   rightContent: {
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',

//     marginLeft: scale(12),
//   },

//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',

//     paddingHorizontal: scale(12),
//     paddingVertical: verticalScale(7),

//     borderRadius: scale(14),
//   },

//   statusText: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#222',

//     marginLeft: scale(4),
//   },

//   price: {
//     fontSize: moderateScale(22),
//     fontWeight: '700',
//     color: '#111',
//   },

//   /* GLASS */
//   glassContainer: {
//     overflow: 'hidden',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.28)',

//     backgroundColor: 'rgba(255,255,255,0.08)',

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },

//     shadowOpacity: 0.12,
//     shadowRadius: 24,

//     elevation: 10,
//   },

//   topHighlight: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,

//     height: 1.2,
//   },
// });

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   Platform,
// } from 'react-native';

// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import HeaderTitle from '../components/Headertitle';
// const { width } = Dimensions.get('window');

// /* ─────────────────────────────────────────────
//    PREMIUM GLASS CARD
// ───────────────────────────────────────────── */
// const GlassCard = ({ children, style }) => {
//   return (
//     <View style={[styles.glassContainer, style]}>
//       <BlurView
//         style={StyleSheet.absoluteFill}
//         blurType="light"
//         blurAmount={2}
//         reducedTransparencyFallbackColor="#EBE5DF"
//       />

//       {/* Smooth Glass Gradient */}
//       <LinearGradient
//         colors={['rgba(255,255,255,0.20)', 'rgba(255,255,255,0.08)']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={StyleSheet.absoluteFill}
//       />

//       {/* Top Highlight */}
//       <LinearGradient
//         colors={['rgba(255,255,255,0.6)', 'transparent']}
//         start={{ x: 0.5, y: 0 }}
//         end={{ x: 0.5, y: 1 }}
//         style={styles.topHighlight}
//       />

//       {children}
//     </View>
//   );
// };

// /* ─────────────────────────────────────────────
//    DATA
// ───────────────────────────────────────────── */
// const orders = [
//   {
//     id: 1,
//     status: 'In Process',
//     bg: '#C5BE79',
//     icon: 'time-outline',
//   },
//   {
//     id: 2,
//     status: 'Completed',
//     bg: '#B9D89C',
//     icon: 'checkmark-circle',
//   },
//   {
//     id: 3,
//     status: 'Completed',
//     bg: '#B9D89C',
//     icon: 'checkmark-circle',
//   },
//   {
//     id: 4,
//     status: 'Cancelled',
//     bg: '#D7A2A2',
//     icon: 'close-circle',
//   },
// ];

// /* ─────────────────────────────────────────────
//    SCREEN
// ───────────────────────────────────────────── */
// export default function LaundryScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />
//       {/* <HeaderTitle title="Laundry" /> */}

//       <ImageBackground
//         source={require('../assets/images/study.jpeg')}
//         style={styles.background}
//         resizeMode="cover"
//         imageStyle={{
//           transform: [{ scale: 1.1 }],
//         }}
//       >
//         <View style={styles.overlay} />
//         {/* SOFT OVERLAY */}

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* HEADER */}
//           <View style={styles.header}>
//             <TouchableOpacity activeOpacity={0.8}>
//               <GlassCard style={styles.backButton}>
//                 <Ionicons name="arrow-back" size={22} color="#111" />
//               </GlassCard>
//             </TouchableOpacity>

//             <Text style={styles.headerTitle}>Laundry</Text>

//             <View style={{ width: 46 }} />
//           </View>

//           {/* ACTION BUTTONS */}
//           <View style={styles.topButtonRow}>
//             <TouchableOpacity
//               activeOpacity={0.85}
//               style={styles.buttonWrapper}
//               onPress={() => navigation.navigate('Thingsinfo')}
//             >
//               <GlassCard style={styles.topButton}>
//                 <Ionicons
//                   name="shirt-outline"
//                   size={26}
//                   color="#111"
//                   style={styles.buttonIcon}
//                 />

//                 <Text style={styles.topButtonText}>Book Laundry</Text>
//               </GlassCard>
//             </TouchableOpacity>

//             <TouchableOpacity
//               activeOpacity={0.85}
//               style={styles.buttonWrapper}
//               onPress={() => navigation.navigate('OrderStatus')}
//             >
//               <GlassCard style={styles.topButton}>
//                 <Ionicons
//                   name="cube-outline"
//                   size={26}
//                   color="#111"
//                   style={styles.buttonIcon}
//                 />

//                 <Text style={styles.topButtonText}>Order Status</Text>
//               </GlassCard>
//             </TouchableOpacity>
//           </View>

//           {/* HISTORY */}
//           <GlassCard style={styles.historyContainer}>
//             <Text style={styles.historyTitle}>Recent Orders</Text>

//             {orders.map(item => (
//               <GlassCard key={item.id} style={styles.orderCard}>
//                 {/* LEFT */}
//                 <View style={styles.leftContent}>
//                   <Text style={styles.orderId}>#LDY23345</Text>

//                   <Text style={styles.dateText}>17 May 2025 • 10:20 AM</Text>

//                   <Text style={styles.detailText}>Wash & Fold • 1.5 kg</Text>

//                   <Text style={styles.detailText}>Expected by 18 May</Text>

//                   <TouchableOpacity activeOpacity={0.7}>
//                     <Text style={styles.trackText}>Track Order</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* RIGHT */}
//                 <View style={styles.rightContent}>
//                   <View
//                     style={[
//                       styles.statusBadge,
//                       {
//                         backgroundColor: item.bg,
//                       },
//                     ]}
//                   >
//                     <Ionicons name={item.icon} size={14} color="#222" />

//                     <Text style={styles.statusText}>{item.status}</Text>
//                   </View>

//                   <Text style={styles.price}>₹87.88</Text>
//                 </View>
//               </GlassCard>
//             ))}
//           </GlassCard>
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// }

// /* ─────────────────────────────────────────────
//    STYLES
// ───────────────────────────────────────────── */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D9CFC8',
//   },

//   background: {
//     flex: 1,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//   },

//   scrollContent: {
//     paddingTop:
//       Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 20) + 18,

//     paddingHorizontal: 18,
//     paddingBottom: 120,
//   },

//   /* HEADER */
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     marginBottom: 24,
//   },

//   backButton: {
//     width: 46,
//     height: 46,
//     borderRadius: 16,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   headerTitle: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#111',
//     letterSpacing: 0.5,
//   },

//   /* TOP BUTTONS */
//   topButtonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     marginBottom: 22,
//   },

//   buttonWrapper: {
//     width: '48%',
//   },

//   topButton: {
//     height: 110,
//     borderRadius: 28,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   buttonIcon: {
//     marginBottom: 10,
//   },

//   topButtonText: {
//     fontSize: 16,
//     color: '#111',
//     fontWeight: '700',
//     letterSpacing: 0.3,
//   },

//   /* HISTORY */
//   historyContainer: {
//     borderRadius: 36,
//     padding: 16,
//   },

//   historyTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 18,
//     textAlign: 'center',
//   },

//   /* ORDER CARD */
//   orderCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     padding: 18,
//     borderRadius: 28,

//     marginBottom: 16,
//   },

//   leftContent: {
//     flex: 1,
//   },

//   orderId: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 6,
//   },

//   dateText: {
//     fontSize: 13,
//     color: '#333',
//     marginBottom: 6,
//   },

//   detailText: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 3,
//   },

//   trackText: {
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#111',
//   },

//   /* RIGHT */
//   rightContent: {
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     marginLeft: 10,
//   },

//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',

//     paddingHorizontal: 14,
//     paddingVertical: 8,

//     borderRadius: 14,
//     gap: 6,
//   },

//   statusText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#222',
//   },

//   price: {
//     fontSize: 20,
//     fontWeight: '800',
//     color: '#111',
//   },

//   /* GLASS */
//   glassContainer: {
//     overflow: 'hidden',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.22)',

//     backgroundColor: 'rgba(255,255,255,0.06)',

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },

//     shadowOpacity: 0.08,
//     shadowRadius: 20,

//     elevation: 10,
//   },

//   topHighlight: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 1.5,
//   },
// });

// make it more attractive and professioanal

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   Platform,
// } from 'react-native';

// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const { width, height } = Dimensions.get('window');

// /* ─────────────────────────────────────────────
//    PERFECT GLASS CARD
// ───────────────────────────────────────────── */
// const GlassCard = ({ children, style }) => {
//   return (
//     <View style={[styles.glassContainer, style]}>
//       {/* MAIN BLUR */}
//       <BlurView
//         style={StyleSheet.absoluteFill}
//         blurType="light"
//         blurAmount={4}
//        reducedTransparencyFallbackColor="rgba(255,255,255,0.7)"
//       />

//       {/* GLASS GRADIENT */}
//       <LinearGradient
//         colors={[
//           'rgba(255,255,255,0.42)',
//           'rgba(255,255,255,0.18)',
//         ]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={StyleSheet.absoluteFill}
//       />

//       {/* TOP SHINE */}
//       <LinearGradient
//         colors={[
//           'rgba(255,255,255,0.95)',
//           'transparent',
//         ]}
//         start={{ x: 0.5, y: 0 }}
//         end={{ x: 0.5, y: 1 }}
//         style={styles.topShine}
//       />

//       {/* LEFT LIGHT */}
//       <LinearGradient
//         colors={[
//           'rgba(255,255,255,0.8)',
//           'transparent',
//         ]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.leftGlow}
//       />

//       {children}
//     </View>
//   );
// };

// /* ─────────────────────────────────────────────
//    DATA
// ───────────────────────────────────────────── */
// const orders = [
//   {
//     id: 1,
//     status: 'In Process',
//     bg: '#C9C07B',
//   },
//   {
//     id: 2,
//     status: 'Completed',
//     bg: '#C7E2A7',
//   },
//   {
//     id: 3,
//     status: 'Completed',
//     bg: '#C7E2A7',
//   },
//   {
//     id: 4,
//     status: 'Cancelled',
//     bg: '#D7A0A0',
//   },
// ];

// /* ─────────────────────────────────────────────
//    SCREEN
// ───────────────────────────────────────────── */
// export default function LaundryScreen() {
//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />

//       {/* BACKGROUND */}
//       <ImageBackground
//         source={require('../assets/images/laundry.jpg')}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         {/* LIGHT OVERLAY */}
//         <View style={styles.overlay} />

//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* HEADER */}
//           <View style={styles.header}>
//             <TouchableOpacity activeOpacity={0.7}>
//               <Ionicons
//                 name="arrow-back"
//                 size={30}
//                 color="#111"
//               />
//             </TouchableOpacity>

//             <Text style={styles.headerTitle}>
//               Laundry
//             </Text>

//             <View style={{ width: 30 }} />
//           </View>

//           {/* TOP BUTTONS */}
//           {/* <View style={styles.topButtonRow}>
//             <GlassCard style={styles.topButton}>
//               <Text style={styles.topButtonText}>
//                 Book{'\n'}Laundry
//               </Text>
//             </GlassCard>

//             <GlassCard style={styles.topButton}>
//               <Text style={styles.topButtonText}>
//                 Order{'\n'}Status
//               </Text>
//             </GlassCard>
//           </View> */}

//           <View style={styles.topButtonRow}>

//   <TouchableOpacity
//     activeOpacity={0.8}
//    style={styles.topButtonRow}
//     onPress={() => navigation.navigate('BookLaundry')}
//   >
//     <GlassCard style={styles.topButton}>
//       <Text style={styles.topButtonText}>
//         Book{'\n'}Laundry
//       </Text>
//     </GlassCard>
//   </TouchableOpacity>

//   <TouchableOpacity
//     activeOpacity={0.8}
//    style={styles.topButtonRow}
//     onPress={() => navigation.navigate('OrderStatus')}
//   >
//     <GlassCard style={styles.topButton}>
//       <Text style={styles.topButtonText}>
//         Order{'\n'}Status
//       </Text>
//     </GlassCard>
//   </TouchableOpacity>

// </View>

//           {/* HISTORY CONTAINER */}
//           <GlassCard style={styles.historyContainer}>
//             <Text style={styles.historyTitle}>
//               History
//             </Text>

//             {orders.map(item => (
//               <GlassCard
//                 key={item.id}
//                 style={styles.orderCard}
//               >
//                 {/* LEFT SIDE */}
//                 <View style={styles.leftContent}>
//                   <Text style={styles.orderId}>
//                     #LDY23345
//                   </Text>

//                   <Text style={styles.dateText}>
//                     17 May 2025, 10:20 AM
//                   </Text>

//                   <Text style={styles.detailText}>
//                     Wash & Fold . 1.5 kg
//                   </Text>

//                   <Text style={styles.detailText}>
//                     Expected by 18 May
//                   </Text>

//                   <TouchableOpacity activeOpacity={0.7}>
//                     <Text style={styles.trackText}>
//                       Track Order
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* RIGHT SIDE */}
//                 <View style={styles.rightContent}>
//                   <View
//                     style={[
//                       styles.statusBadge,
//                       {
//                         backgroundColor: item.bg,
//                       },
//                     ]}
//                   >
//                     <Text style={styles.statusText}>
//                       {item.status}
//                     </Text>
//                   </View>

//                   <Text style={styles.price}>
//                     ₹87.88
//                   </Text>
//                 </View>
//               </GlassCard>
//             ))}
//           </GlassCard>
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// }

// /* ─────────────────────────────────────────────
//    STYLES
// ───────────────────────────────────────────── */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E4DBD4',
//   },

//   background: {
//     flex: 1,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },

//   scrollContent: {
//     paddingTop:
//       Platform.OS === 'ios'
//         ? 58
//         : (StatusBar.currentHeight || 20) + 18,

//     paddingHorizontal: 18,
//     paddingBottom: 120,
//   },

//   /* HEADER */
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     marginBottom: 22,
//   },

//   headerTitle: {
//     fontSize: 24,
//     fontWeight: '500',
//     color: '#111',
//     letterSpacing: 0.5,
//   },

//   /* TOP BUTTONS */
//   topButtonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     marginBottom: 14,
//   },

//   topButton: {
//     width: '47.5%',
//     height: 92,
//     borderRadius: 24,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   topButtonText: {
//     fontSize: 17,
//     lineHeight: 26,
//     textAlign: 'center',
//     color: '#111',
//     fontWeight: '500',
//   },

//   /* HISTORY */
//   historyContainer: {
//     borderRadius: 38,
//     paddingHorizontal: 12,
//     paddingVertical: 18,
//   },

//   historyTitle: {
//     fontSize: 22,
//     fontWeight: '500',
//     color: '#111',
//     textAlign: 'center',
//     marginBottom: 18,
//   },

//   /* ORDER CARD */
//   orderCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     paddingHorizontal: 18,
//     paddingVertical: 18,

//     borderRadius: 28,
//     marginBottom: 16,
//   },

//   leftContent: {
//     flex: 1,
//   },

//   orderId: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 4,
//   },

//   dateText: {
//     fontSize: 14,
//     color: '#2B2B2B',
//     marginBottom: 5,
//   },

//   detailText: {
//     fontSize: 15,
//     color: '#2B2B2B',
//     marginBottom: 3,
//   },

//   trackText: {
//     marginTop: 4,
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#111',
//   },

//   /* RIGHT */
//   rightContent: {
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     marginLeft: 12,
//   },

//   statusBadge: {
//     paddingHorizontal: 16,
//     paddingVertical: 9,
//     borderRadius: 14,
//   },

//   statusText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#2B2B2B',
//   },

//   price: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111',
//   },

//   /* GLASS */
//   glassContainer: {
//     overflow: 'hidden',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.35)',

//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 10,
//     // },

//     // shadowOpacity: 0.12,
//     // shadowRadius: 22,

//     elevation: 8,
//   },

//   topShine: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 1.3,
//   },

//   leftGlow: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: 1,
//     height: '100%',
//   },
// });

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';
// import BottomNavbar from '../components/BottomNavbar';

// const { width, height } = Dimensions.get('window');

// /* ─────────────────────────────────────────────────────────
//    GlassCard — identical glassmorphism to LoginScreen cardShell
//    BlurView blurAmount=12 + glassBg rgba(255,255,255,0.46)
//    + inset highlights + ::before + ::after edge lines
// ───────────────────────────────────────────────────────── */
// const GlassCard = ({ style, children }) => (
//   <View
//     style={[
//       {
//         overflow: 'hidden',
//         borderWidth: 1,
//         borderColor: 'rgba(255,255,255,0.3)',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 8 },
//         shadowOpacity: 0.10,
//         shadowRadius: 32,
//         elevation: 8,
//       },
//       style,
//     ]}
//   >
//     {/* backdrop-filter: blur(12px) */}
//     <BlurView
//       style={StyleSheet.absoluteFill}
//       blurType="light"
//       blurAmount={12}
//       reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
//     />
//     {/* background: rgba(255,255,255,0.46) */}
//     <View style={glass.glassBg} />
//     {/* inset top highlight */}
//     <View style={glass.topInsetHighlight} />
//     {/* inset bottom highlight */}
//     <View style={glass.bottomInsetHighlight} />
//     {/* ::before — horizontal top edge gradient */}
//     <LinearGradient
//       colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={glass.topEdgeLine}
//     />
//     {/* ::after — vertical left edge gradient */}
//     <LinearGradient
//       colors={['rgba(255,255,255,0.8)', 'transparent', 'rgba(255,255,255,0.3)']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 0, y: 1 }}
//       style={glass.leftEdgeLine}
//     />
//     {children}
//   </View>
// );

// const glass = StyleSheet.create({
//   glassBg: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.46)',
//   },
//   topInsetHighlight: {
//     position: 'absolute', top: 0, left: 0, right: 0,
//     height: 1, backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 1,
//   },
//   bottomInsetHighlight: {
//     position: 'absolute', bottom: 0, left: 0, right: 0,
//     height: 1, backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 1,
//   },
//   topEdgeLine: {
//     position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
//   },
//   leftEdgeLine: {
//     position: 'absolute', top: 0, left: 0, width: 1, height: '100%', zIndex: 2,
//   },
// });

// /* ─────────────────────────────────────────────────────────
//    LaundryScreen
// ───────────────────────────────────────────────────────── */
// export default function LaundryScreen() {
//   return (
//     <View style={styles.container}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

//       {/* FULLSCREEN BACKGROUND */}
//       <View style={StyleSheet.absoluteFill}>
//         <Image
//           source={require('../assets/images/laundry.jpg')}
//           style={styles.backgroundImage}
//           resizeMode="cover"
//         />
//         {/* Slight blur — image stays clearly visible */}
//         <BlurView
//           style={StyleSheet.absoluteFill}
//           blurType="light"
//           blurAmount={2}
//           reducedTransparencyFallbackColor="#EBE5DF"
//         />
//         {/* Very light warm tint */}
//         <View style={styles.backgroundOverlay} />
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* ── TITLE ── */}
//         <Text style={styles.screenTitle}>Laundry</Text>

//         {/* ── ACTION BUTTONS ── */}
//         <View style={styles.actionRow}>
//           <TouchableOpacity style={styles.actionButtonWrap} activeOpacity={0.75}>
//             <GlassCard style={styles.actionButton}>
//               <Text style={styles.actionButtonText}>{'Laundry\nRequest'}</Text>
//             </GlassCard>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButtonWrap} activeOpacity={0.75}>
//             <GlassCard style={styles.actionButton}>
//               <Text style={styles.actionButtonText}>{'Status\nTracker'}</Text>
//             </GlassCard>
//           </TouchableOpacity>
//         </View>

//         {/* ── HISTORY GLASS CONTAINER ── */}
//         <GlassCard style={styles.historyContainer}>
//           <Text style={styles.historyTitle}>History</Text>

//           {/* Card 1 — large horizontal */}
//           <GlassCard style={styles.cardLarge} />

//           {/* Card 2 — thin strip */}
//           <GlassCard style={styles.cardThinStrip} />

//           {/* Card 3 — medium */}
//           <GlassCard style={styles.cardMedium} />

//           {/* Cards 4 & 5 — two stacked medium side by side */}
//           <View style={styles.cardDuoRow}>
//             <GlassCard style={styles.cardDuoItem} />
//             <GlassCard style={styles.cardDuoItem} />
//           </View>

//           {/* Card 6 — wide bottom */}
//           <GlassCard style={styles.cardWideFull} />
//         </GlassCard>
//       </ScrollView>

//       {/* BOTTOM NAVBAR */}
//       <BottomNavbar />
//     </View>
//   );
// }

// /* ─────────────────────────────────────────────────────────
//    STYLES
// ───────────────────────────────────────────────────────── */
// const CARD_RADIUS = 22;
// const SPACING = 12;
// const H_PAD = 16;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D9CFC8',
//   },
//   backgroundImage: {
//     width: '100%',
//     height: '100%',
//   },
//   backgroundOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(210, 200, 190, 0.05)',
//   },

//   scrollContent: {
//     paddingTop: Platform.OS === 'ios' ? 65 : (StatusBar.currentHeight || 24) + 22,
//     paddingBottom: 130,
//     paddingHorizontal: H_PAD,
//   },

//   /* Title */
//   screenTitle: {
//     fontSize: 28,
//     fontWeight: '600',
//     color: '#111',
//     textAlign: 'center',
//     marginBottom: 28,
//     letterSpacing: 0.4,
//   },

//   /* Action buttons */
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 22,
//   },
//   actionButtonWrap: {
//     width: '47.5%',
//   },
//   actionButton: {
//     borderRadius: CARD_RADIUS,
//     height: 90,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   actionButtonText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#111',
//     textAlign: 'center',
//     lineHeight: 22,
//   },

//   /* Big history glass container */
//   historyContainer: {
//     borderRadius: 36,
//     paddingTop: 26,
//     paddingBottom: 26,
//     paddingHorizontal: SPACING,
//   },
//   historyTitle: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: '#111',
//     textAlign: 'center',
//     marginBottom: 20,
//     letterSpacing: 0.3,
//   },
//   /* Card 1 — large */
//   cardLarge: {
//     borderRadius: CARD_RADIUS,
//     height: 110,
//     marginBottom: SPACING,
//   },

//   /* Card 2 — thin strip */
//   cardThinStrip: {
//     borderRadius: CARD_RADIUS,
//     height: 44,
//     marginBottom: SPACING,
//   },

//   /* Card 3 — medium */
//   cardMedium: {
//     borderRadius: CARD_RADIUS,
//     height: 75,
//     marginBottom: SPACING,
//   },

//   /* Cards 4 & 5 — side by side duo */
//   cardDuoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: SPACING,
//   },
//   cardDuoItem: {
//     borderRadius: CARD_RADIUS,
//     width: '48.5%',
//     height: 75,
//   },

//   cardWideFull: {
//     borderRadius: CARD_RADIUS,
//     height: 75,
//   },
// });
