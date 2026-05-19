// import React, { useState } from 'react';
// import {
//   BlurView,
// } from '@react-native-community/blur';

// import {
//   ImageBackground,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import apptheme from '../constants/appTheme'
// const services = [
//   {
//     title: 'Wash & Fold',
//     price: '₹87 / kg',
//   },
//   {
//     title: 'Wash & Iron',
//     price: '₹87 / kg',
//   },
//   {
//     title: 'Iron Only',
//     price: '₹87 / kg',
//   },
//   {
//     title: 'Dry Cleaning',
//     price: '₹87 / kg',
//   },
//   {
//     title: 'Express ',
//     price: '₹87 / kg',
//     premium: true,
//   },
// ];

// const dates = [
//   {
//     day: 'Today',
//     date: '16 May',
//   },
//   {
//     day: 'Tomorrow',
//     date: '17 May',
//   },
//   {
//     day: 'Saturday',
//     date: '18 May',
//   },
//   {
//     day: 'Sunday',
//     date: '19 May',
//   },
// ];

// const slots = [
//   '4:00 PM - 6:00 PM',
//   '6:00 PM - 8:00 PM',
//   '8:00 PM - 10:00 PM',
//   '10:00 PM - 12:00 AM',
// ];

// const HomeScreen = () => {
//   const [selectedDate, setSelectedDate] = useState('Tomorrow');

//   const [selectedSlot, setSelectedSlot] = useState(
//     '4:00 PM - 6:00 PM',
//   );

//   const [selectedService, setSelectedService] =
//     useState('Wash & Fold');

//   return (
//     <ImageBackground
//       source={require('../assets/images/backimg2.webp')}
//       style={styles.container}
//       blurRadius={8}
//       resizeMode="cover"
//     >
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />

//       {/* DARK OVERLAY */}
//       <LinearGradient
//         colors={[
//           'rgba(255,255,255,0.12)',
//           'rgba(255,255,255,0.06)',
//           'rgba(0,0,0,0.10)',
//         ]}
//         style={styles.overlay}
//       />

//       <SafeAreaView style={styles.safeArea}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* MAIN GLASS CARD */}
//           <View style={styles.glassContainer}>
//             <BlurView
//               style={StyleSheet.absoluteFill}
//               blurType="light"
//               blurAmount={22}
//               reducedTransparencyFallbackColor="rgba(255,255,255,0.12)"
//             />

//             {/* HEADER */}
//             <View style={styles.header}>
//               <TouchableOpacity style={styles.iconBtn}>
//                 <Ionicons
//                   name="arrow-back"
//                   size={22}
//                   color="#111"
//                 />
//               </TouchableOpacity>

//               <Text style={styles.headerTitle}>
//                 Book Laundry
//               </Text>

//               <TouchableOpacity style={styles.iconBtn}>

//               </TouchableOpacity>
//             </View>

//             {/* SERVICES */}
//             <Text style={styles.sectionTitle}>
//               Select Service
//             </Text>

//             <View style={styles.serviceGrid}>
//               {services.map((item, index) => {
//                 const active =
//                   selectedService === item.title;

//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     activeOpacity={0.9}
//                     onPress={() =>
//                       setSelectedService(item.title)
//                     }
//                     style={[
//                       styles.serviceCard,
//                       active &&
//                         styles.activeServiceCard,
//                     ]}
//                   >
//                     <BlurView
//                       style={StyleSheet.absoluteFill}
//                       blurType="light"
//                       blurAmount={16}
//                     />

//                     <LinearGradient
//                       colors={
//                         active
//                           ? [
//                               'rgba(55,55,55,0.80)',
//                               'rgba(20,20,20,0.72)',
//                             ]
//                           : [
//                               'rgba(255,255,255,0.32)',
//                               'rgba(255,255,255,0.10)',
//                             ]
//                       }
//                       style={styles.serviceGradient}
//                     >
//                       <View>
//                         <Text
//                           style={[
//                             styles.serviceTitle,
//                             active && {
//                               color: '#fff',
//                             },
//                           ]}
//                         >
//                           {item.title}
//                         </Text>

//                         <Text
//                           style={[
//                             styles.servicePrice,
//                             active && {
//                               color: '#fff',
//                             },
//                           ]}
//                         >
//                           {item.price}
//                         </Text>
//                       </View>

//                     </LinearGradient>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>

//             {/* DATE SECTION */}
//             <Text style={styles.sectionTitle}>
//               Select Date & Time
//             </Text>

//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={
//                 false
//               }
//               contentContainerStyle={
//                 styles.dateContainer
//               }
//             >
//               {dates.map((item, index) => {
//                 const active =
//                   selectedDate === item.day;

//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     activeOpacity={0.9}
//                     onPress={() =>
//                       setSelectedDate(item.day)
//                     }
//                     style={[
//                       styles.dateCard,
//                       active &&
//                         styles.activeDateCard,
//                     ]}
//                   >
//                     <BlurView
//                       style={StyleSheet.absoluteFill}
//                       blurType="light"
//                       blurAmount={14}
//                     />

//                     <LinearGradient
//                       colors={
//                         active
//                           ? [
//                               'rgba(60,60,60,0.85)',
//                               'rgba(25,25,25,0.80)',
//                             ]
//                           : [
//                               'rgba(255,255,255,0.30)',
//                               'rgba(255,255,255,0.08)',
//                             ]
//                       }
//                       style={styles.dateGradient}
//                     >
//                       <Text
//                         style={[
//                           styles.dayText,
//                           active && {
//                             color: '#fff',
//                           },
//                         ]}
//                       >
//                         {item.day}
//                       </Text>

//                       <Text
//                         style={[
//                           styles.dateText,
//                           active && {
//                             color: '#fff',
//                           },
//                         ]}
//                       >
//                         {item.date}
//                       </Text>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>

//             {/* SLOT GRID */}
//             <View style={styles.slotGrid}>
//               {slots.map((slot, index) => {
//                 const active =
//                   selectedSlot === slot;

//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     activeOpacity={0.9}
//                     onPress={() =>
//                       setSelectedSlot(slot)
//                     }
//                     style={[
//                       styles.slotCard,
//                       active &&
//                         styles.activeSlotCard,
//                     ]}
//                   >
//                     <BlurView
//                       style={StyleSheet.absoluteFill}
//                       blurType="light"
//                       blurAmount={12}
//                     />

//                     <LinearGradient
//                       colors={
//                         active
//                           ? [
//                               'rgba(55,55,55,0.85)',
//                               'rgba(20,20,20,0.80)',
//                             ]
//                           : [
//                               'rgba(255,255,255,0.30)',
//                               'rgba(255,255,255,0.08)',
//                             ]
//                       }
//                       style={styles.slotGradient}
//                     >
//                       <Text
//                         style={[
//                           styles.slotText,
//                           active && {
//                             color: '#fff',
//                           },
//                         ]}
//                       >
//                         {slot}
//                       </Text>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>

//             {/* INSTRUCTIONS */}
//             <Text style={styles.sectionTitle}>
//               Special Instructions
//             </Text>

//             <View style={styles.inputCard}>
//               <BlurView
//                 style={StyleSheet.absoluteFill}
//                 blurType="light"
//                 blurAmount={18}
//               />

//               <TextInput
//                 placeholder="Add any note for our team..."
//                 placeholderTextColor="rgba(0,0,0,0.45)"
//                 multiline
//                 style={styles.input}
//               />

//               <Text style={styles.counter}>
//                 0/200
//               </Text>
//             </View>

//             {/* INFO ROW */}
//             <View style={styles.infoRow}>
//               <View style={styles.infoCard}>
//                 <BlurView
//                   style={StyleSheet.absoluteFill}
//                   blurType="light"
//                   blurAmount={16}
//                 />

//                 <LinearGradient
//                   colors={[
//                     'rgba(255,255,255,0.32)',
//                     'rgba(255,255,255,0.10)',
//                   ]}
//                   style={styles.infoGradient}
//                 >
//                   <Ionicons
//                     name="cube-outline"
//                     size={28}
//                     color="#111"
//                   />

//                   <View
//                     style={{ marginLeft: 12 }}
//                   >
//                     <Text style={styles.infoTop}>
//                       1.5 kg
//                     </Text>

//                     <Text style={styles.infoBottom}>
//                       Est. Weight
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </View>

//               <View style={styles.infoCard}>
//                 <BlurView
//                   style={StyleSheet.absoluteFill}
//                   blurType="light"
//                   blurAmount={16}
//                 />

//                 <LinearGradient
//                   colors={[
//                     'rgba(255,255,255,0.32)',
//                     'rgba(255,255,255,0.10)',
//                   ]}
//                   style={styles.infoGradient}
//                 >
//                   <View>
//                     <Text style={styles.infoTop}>
//                       ₹87 / kg
//                     </Text>

//                     <Text style={styles.infoBottom}>
//                       Est. Amount
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* REQUEST BUTTON */}
//             <TouchableOpacity
//               activeOpacity={0.9}
//               style={styles.requestBtn}
//             >
//               <LinearGradient
//                 colors={[
//                   'rgba(70,70,70,0.92)',
//                   'rgba(30,30,30,0.95)',
//                 ]}
//                 style={styles.requestGradient}
//               >
//                 <Text style={styles.requestText}>
//                   Request Pickup
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//   },

//   safeArea: {
//     flex: 1,
//   },

//   scrollContent: {
//     paddingHorizontal: 18,
//     paddingTop: 50,
//     paddingBottom: 40,
//   },

//   glassContainer: {
//     overflow: 'hidden',

//     borderRadius: 34,

//     padding: 18,

//     backgroundColor: 'rgba(255,255,255,0.12)',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.22)',
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',

//     marginBottom: 28,
//   },

//   iconBtn: {

//   },

//   headerTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#111',
//   },

//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111',

//     marginBottom: 16,
//     marginTop: 10,
//   },

//   serviceGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },

//   serviceCard: {
//     width: '48%',
//     height: 65,

//     borderRadius: 24,

//     overflow: 'hidden',

//     marginBottom: 14,

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.28)',
//   },

//   activeServiceCard: {
//     transform: [{ scale: 1.02 }],
//   },

//   serviceGradient: {
//     flex: 1,

//     paddingHorizontal: 16,

//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   serviceTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#111',

//     marginBottom: 2,
//   },

//   servicePrice: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#111',
//   },

//   dateContainer: {
//     paddingBottom: 10,
//   },

//   dateCard: {
//     width: 96,
//     height: 70,

//     borderRadius: 24,

//     overflow: 'hidden',

//     marginRight: 12,

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.28)',
//   },

//   activeDateCard: {
//     transform: [{ scale: 1.03 }],
//   },

//   dateGradient: {
//     flex: 1,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   dayText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#111',

//     marginBottom: 4,
//   },

//   dateText: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: '#111',
//   },

//   slotGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',

//     marginTop: 10,
//   },

//   slotCard: {
//     width: '48%',
//     height: 58,

//     borderRadius: 18,

//     overflow: 'hidden',

//     marginBottom: 14,

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.28)',
//   },

//   activeSlotCard: {
//     transform: [{ scale: 1.02 }],
//   },

//   slotGradient: {
//     flex: 1,

//     justifyContent: 'center',
//     alignItems: 'center',

//     paddingHorizontal: 10,
//   },

//   slotText: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#111',
//   },

//   inputCard: {
//     height: 120,

//     borderRadius: 24,

//     overflow: 'hidden',

//     padding: 16,

//     justifyContent: 'space-between',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.28)',

//     backgroundColor: 'rgba(255,255,255,0.10)',
//   },

//   input: {
//     flex: 1,

//     color: '#111',

//     fontSize: 16,
//     textAlignVertical: 'top',
//   },

//   counter: {
//     alignSelf: 'flex-end',

//     color: '#333',

//     fontWeight: '600',
//   },

//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     marginTop: 20,
//   },

//   infoCard: {
//     width: '48%',
//     height: 90,

//     borderRadius: 24,

//     overflow: 'hidden',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.28)',
//   },

//   infoGradient: {
//     flex: 1,

//     flexDirection: 'row',
//     alignItems: 'center',

//     paddingHorizontal: 16,
//   },

//   infoTop: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111',

//     marginBottom: 6,
//   },

//   infoBottom: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },

//   requestBtn: {
//     height: 64,

//     borderRadius: 22,

//     overflow: 'hidden',

//     marginTop: 28,

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 18,

//     elevation: 10,
//   },

//   requestGradient: {
//     flex: 1,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   requestText: {
//     fontSize: 19,
//     fontWeight: '700',
//     color: '#fff',
//     letterSpacing: 0.4,
//   },
// });

// HomeScreen.js
import React, { useState } from 'react';

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import appTheme from '../constants/AppTheme';

const {
  COLORS,
  TYPOGRAPHY,
  FONT_FAMILY,
  SPACING,
  RADIUS,
  COMPONENT_SIZES,
  SHADOWS,
  scaleH,
  scaleV,
  wp,
  isTablet,
} = appTheme;

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const services = [
  {
    title: 'Wash & Fold',
    price: '₹87 / kg',
  },
  {
    title: 'Wash & Iron',
    price: '₹99 / kg',
  },
  {
    title: 'Iron Only',
    price: '₹65 / kg',
  },
  {
    title: 'Dry Cleaning',
    price: '₹149 / kg',
  },
  {
    title: 'Express Wash',
    price: '₹199 / kg',
    premium: true,
  },
];

const dates = [
  {
    day: 'Today',
    date: '16 May',
  },
  {
    day: 'Tomorrow',
    date: '17 May',
  },
  {
    day: 'Saturday',
    date: '18 May',
  },
  {
    day: 'Sunday',
    date: '19 May',
  },
];

const slots = [
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
  '8:00 PM - 10:00 PM',
  '10:00 PM - 12:00 AM',
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

const Thingsinfo = () => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');

  const [selectedSlot, setSelectedSlot] = useState('4:00 PM - 6:00 PM');

  const [selectedService, setSelectedService] = useState('Wash & Fold');

  return (
    <ImageBackground
      source={require('../assets/images/backimg2.webp')}
      style={styles.container}
      resizeMode="cover"
      blurRadius={3}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* OVERLAY */}
      <LinearGradient
        colors={[
          'rgba(255,255,255,0.10)',
          'rgba(255,255,255,0.05)',
          'rgba(0,0,0,0.08)',
        ]}
        style={styles.overlay}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* MAIN CARD */}
          <View style={styles.glassContainer}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={4}
              // reducedTransparencyFallbackColor="rgba(255,255,255,0.10)"
            />

            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerBtn}>
                <Ionicons name="arrow-back" size={26} color="#111" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Book Laundry</Text>

              <View style={styles.headerBtn} />
            </View>

            {/* SERVICE */}
            <Text style={styles.sectionTitle}>Select Service</Text>

            <View style={styles.serviceGrid}>
              {services.map((item, index) => {
                const active = selectedService === item.title;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => setSelectedService(item.title)}
                    style={[styles.serviceCard, active && styles.activeCard]}
                  >
                    <BlurView
                      style={StyleSheet.absoluteFill}
                      blurType="light"
                      blurAmount={15}
                    />

                    <LinearGradient
                      colors={
                        active
                          ? ['rgba(65,65,65,0.92)', 'rgba(20,20,20,0.92)']
                          : ['rgba(255,255,255,0.38)', 'rgba(255,255,255,0.12)']
                      }
                      style={styles.serviceGradient}
                    >
                      <View>
                        <Text
                          style={[
                            styles.serviceTitle,
                            active && {
                              color: '#fff',
                            },
                          ]}
                        >
                          {item.title}
                        </Text>

                        <Text
                          style={[
                            styles.servicePrice,
                            active && {
                              color: '#fff',
                            },
                          ]}
                        >
                          {item.price}
                        </Text>
                      </View>

                      {item.premium && (
                        <Ionicons
                          name="cafe"
                          size={20}
                          color={active ? '#fff' : '#111'}
                        />
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* DATE */}
            <Text style={styles.sectionTitle}>Select Date & Time</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateContainer}
            >
              {dates.map((item, index) => {
                const active = selectedDate === item.day;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => setSelectedDate(item.day)}
                    style={[styles.dateCard, active && styles.activeDateCard]}
                  >
                    <BlurView
                      style={StyleSheet.absoluteFill}
                      blurType="light"
                      blurAmount={12}
                    />

                    <LinearGradient
                      colors={
                        active
                          ? ['rgba(65,65,65,0.92)', 'rgba(20,20,20,0.92)']
                          : ['rgba(255,255,255,0.38)', 'rgba(255,255,255,0.12)']
                      }
                      style={styles.dateGradient}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          active && {
                            color: '#fff',
                          },
                        ]}
                      >
                        {item.day}
                      </Text>

                      <Text
                        style={[
                          styles.dateText,
                          active && {
                            color: '#fff',
                          },
                        ]}
                      >
                        {item.date}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* SLOT */}
            <View style={styles.slotGrid}>
              {slots.map((slot, index) => {
                const active = selectedSlot === slot;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => setSelectedSlot(slot)}
                    style={[styles.slotCard, active && styles.activeSlotCard]}
                  >
                    <BlurView
                      style={StyleSheet.absoluteFill}
                      blurType="light"
                      blurAmount={12}
                    />

                    <LinearGradient
                      colors={
                        active
                          ? ['rgba(65,65,65,0.92)', 'rgba(20,20,20,0.92)']
                          : ['rgba(255,255,255,0.38)', 'rgba(255,255,255,0.12)']
                      }
                      style={styles.slotGradient}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          active && {
                            color: '#fff',
                          },
                        ]}
                      >
                        {slot}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* INPUT */}
            <Text style={styles.sectionTitle}>
              Special Instructions
              <Text style={styles.optionalText}> (Optional)</Text>
            </Text>

            <View style={styles.inputCard}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={18}
              />

              <LinearGradient
                colors={['rgba(255,255,255,0.30)', 'rgba(255,255,255,0.08)']}
                style={styles.inputGradient}
              >
                <TextInput
                  placeholder="Add any note for our team..."
                  placeholderTextColor="rgba(0,0,0,0.45)"
                  multiline
                  style={styles.input}
                />

                <Text style={styles.counter}>0/200</Text>
              </LinearGradient>
            </View>

            {/* INFO */}
            <View style={styles.infoRow}>
              <View style={styles.infoCard}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="light"
                  blurAmount={12}
                />

                <LinearGradient
                  colors={['rgba(255,255,255,0.30)', 'rgba(255,255,255,0.08)']}
                  style={styles.infoGradient}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={28}
                    color="#111"
                  />

                  <View style={styles.infoTextBox}>
                    <Text style={styles.infoTitle}>1.5 kg</Text>

                    <Text style={styles.infoSubtitle}>Est. Weight</Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.infoCard}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="light"
                  blurAmount={12}
                />

                <LinearGradient
                  colors={['rgba(255,255,255,0.30)', 'rgba(255,255,255,0.08)']}
                  style={styles.infoGradient}
                >
                  <View>
                    <Text style={styles.infoTitle}>₹87 / kg</Text>

                    <Text style={styles.infoSubtitle}>Est. Amount</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity activeOpacity={0.9} style={styles.requestBtn}>
              <LinearGradient
                colors={['rgba(120,120,120,0.65)', 'rgba(70,70,70,0.78)']}
                style={styles.requestGradient}
              >
                <Text style={styles.requestText}>Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Thingsinfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: scaleH(12),
    paddingTop: scaleV(28),
    paddingBottom: scaleV(40),
  },

  glassContainer: {
    overflow: 'hidden',

    borderRadius: scaleH(34),

    padding: scaleH(12),

    backgroundColor: 'rgba(255,255,255,0.12)',

    borderWidth: 1.2,

    borderColor: 'rgba(255,255,255,0.28)',
  },

  // HEADER

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: scaleV(24),
  },

  headerBtn: {
    width: scaleH(42),

    height: scaleH(42),

    justifyContent: 'center',

    alignItems: 'center',
  },

  headerTitle: {
    fontSize: scaleH(22),

    fontFamily: FONT_FAMILY.bold,

    color: '#111',
  },

  // SECTION

  sectionTitle: {
    fontSize: scaleH(18),

    fontFamily: FONT_FAMILY.bold,

    color: '#111',

    marginBottom: scaleV(14),

    marginTop: scaleV(8),
  },

  optionalText: {
    fontSize: scaleH(15),

    color: 'rgba(0,0,0,0.60)',
  },

  // SERVICES

  serviceGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  serviceCard: {
    width: isTablet ? '49%' : '48%',

    height: scaleV(72),

    borderRadius: scaleH(22),

    overflow: 'hidden',

    marginBottom: scaleV(14),

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.45)',
  },

  activeCard: {
    transform: [{ scale: 1.02 }],
  },

  serviceGradient: {
    flex: 1,

    paddingHorizontal: scaleH(16),

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  serviceTitle: {
    fontSize: scaleH(15),

    fontFamily: FONT_FAMILY.semibold,

    color: '#111',

    marginBottom: scaleV(5),
  },

  servicePrice: {
    fontSize: scaleH(16),

    fontFamily: FONT_FAMILY.bold,

    color: '#111',
  },

  // DATE

  dateContainer: {
    paddingBottom: scaleV(8),
  },

  dateCard: {
    width: wp(22),

    height: scaleV(72),

    borderRadius: scaleH(18),

    overflow: 'hidden',

    marginRight: scaleH(10),

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.40)',
  },

  activeDateCard: {
    transform: [{ scale: 1.03 }],
  },

  dateGradient: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  dayText: {
    fontSize: scaleH(14),

    fontFamily: FONT_FAMILY.medium,

    color: '#111',

    marginBottom: scaleV(3),
  },

  dateText: {
    fontSize: scaleH(16),

    fontFamily: FONT_FAMILY.bold,

    color: '#111',
  },

  // SLOT

  slotGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',

    marginTop: scaleV(10),
  },

  slotCard: {
    width: '48%',

    height: scaleV(52),

    borderRadius: scaleH(16),

    overflow: 'hidden',

    marginBottom: scaleV(12),

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.40)',
  },

  activeSlotCard: {
    transform: [{ scale: 1.02 }],
  },

  slotGradient: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: scaleH(10),
  },

  slotText: {
    fontSize: scaleH(14),

    fontFamily: FONT_FAMILY.bold,

    color: '#111',

    textAlign: 'center',
  },

  // INPUT

  inputCard: {
    height: scaleV(88),

    borderRadius: scaleH(18),

    overflow: 'hidden',

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.40)',
  },

  inputGradient: {
    flex: 1,

    padding: scaleH(14),
  },
  input: {
    flex: 1,
    fontSize: scaleH(15),
    fontFamily: FONT_FAMILY.medium,

    color: '#111',

    textAlignVertical: 'top',
  },

  counter: {
    alignSelf: 'flex-end',
    fontSize: scaleH(13),
    fontFamily: FONT_FAMILY.medium,

    color: 'rgba(0,0,0,0.60)',
  },

  // INFO

  infoRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: scaleV(18),
  },

  infoCard: {
    width: '48%',
    height: scaleV(82),

    borderRadius: scaleH(18),

    overflow: 'hidden',

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.40)',
  },

  infoGradient: {
    flex: 1,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: scaleH(16),
  },

  infoTextBox: {
    marginLeft: scaleH(10),
  },

  infoTitle: {
    fontSize: scaleH(17),

    fontFamily: FONT_FAMILY.bold,

    color: '#111',

    marginBottom: scaleV(3),
  },

  infoSubtitle: {
    fontSize: scaleH(13),

    fontFamily: FONT_FAMILY.medium,

    color: 'rgba(0,0,0,0.65)',
  },

  requestBtn: {
    height: scaleV(47),

    borderRadius: scaleH(20),

    overflow: 'hidden',

    marginTop: scaleV(24),

    // ...SHADOWS.large,
  },

  requestGradient: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  requestText: {
    fontSize: scaleH(22),

    fontFamily: FONT_FAMILY.bold,

    color: '#fff',
  },
});
