import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const slots = [
  '4:00 PM - 6:00 PM',
  '10:00 PM - 12:00 AM',
  '2:00 PM - 4:00 PM',
  '6:00 PM - 8:00 PM',
];

const weekDays = ['M', 'TU', 'W', 'TH', 'F', 'SA', 'SU'];

const BookingSlots = ({ navigation }) => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // MONTH NAME
  const monthName = useMemo(() => {
    return new Date(currentYear, currentMonth).toLocaleString('default', {
      month: 'long',
    });
  }, [currentMonth, currentYear]);

  // TOTAL DAYS
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // FIRST DAY
  let firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // convert Sunday=0 → Monday start
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  const calendarDays = [];

  // EMPTY SPACES
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // REAL DAYS
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // NEXT MONTH
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // PREVIOUS MONTH
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ImageBackground
        source={require('../assets/images/backimg.webp')}
        style={styles.container}
        resizeMode="cover"
        blurRadius={5}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          //   contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* OVERLAY */}
          <View style={styles.overlay} />

          {/* MAIN GLASS CARD */}
          <View style={styles.glassContainer}>
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.8} style={styles.iconCircle}>
                <Ionicons name="arrow-back" size={22} color="#111827" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Select Date & Time</Text>

              <TouchableOpacity activeOpacity={0.8} style={styles.iconCircle}>
                <Ionicons name="calendar-outline" size={21} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* MONTH ROW */}
            <View style={styles.monthRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.smallIcon}
                onPress={goToPreviousMonth}
              >
                <Ionicons name="chevron-back" size={22} color="#111827" />
              </TouchableOpacity>

              <View style={{ alignItems: 'center' }}>
                <Text style={styles.monthText}>{monthName}</Text>

                <Text style={styles.yearText}>{currentYear}</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.smallIcon}
                onPress={goToNextMonth}
              >
                <Ionicons name="chevron-forward" size={22} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* DIVIDER */}
            <View style={styles.divider} />

            {/* WEEK DAYS */}
            <View style={styles.weekRow}>
              {weekDays.map(day => (
                <Text key={day} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>

            {/* CALENDAR */}
            <View style={styles.calendarContainer}>
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <View key={index} style={styles.emptyDate} />;
                }

                const isSelected = selectedDate === day;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.85}
                    onPress={() => setSelectedDate(day)}
                    style={[styles.dateCircle, isSelected && styles.activeDate]}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        isSelected && styles.activeDateText,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* DIVIDER */}
            <View style={styles.divider} />

            {/* SLOT TITLE */}
            <Text style={styles.slotTitle}>Available Slots</Text>

            {/* SLOT GRID */}
            <View style={styles.slotGrid}>
              {slots.map((slot, index) => {
                const isSelected = selectedSlot === slot;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => setSelectedSlot(slot)}
                    style={[
                      styles.slotBtnWrapper,
                      isSelected && styles.activeSlotWrapper,
                    ]}
                  >
                    <BlurView
                      style={StyleSheet.absoluteFill}
                      blurType="light"
                      blurAmount={10}
                      reducedTransparencyFallbackColor="rgba(255,255,255,0.10)"
                    />

                    <LinearGradient
                      colors={
                        isSelected
                          ? ['rgba(40,40,40,0.4)', 'rgba(40,40,40,0.4)']
                          : ['rgba(255,255,255,0.30)', 'rgba(255,255,255,0.08)']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.slotBtn}
                    >
                      {/* <Ionicons
                        name="time-outline"
                        size={18}
                        color={isSelected ? '#fff' : '#111827'}
                      /> */}

                      <Text
                        style={[
                          styles.slotText,
                          isSelected && {
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

            {/* <TouchableOpacity   style={styles.continueBtn}>
  <View style={styles.continueInner}>
    <Text style={styles.continueText}>Continue</Text>

    <Ionicons
      name="arrow-forward"
      size={20}
      color="#fff"
      style={{ marginLeft: 8 }}
    />
  </View>
</TouchableOpacity> */}

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.continueBtn}
              onPress={() => navigation.navigate('BookingConfirmation')}
            >
              <LinearGradient
                colors={['rgba(40,40,40,0.4)', 'rgba(40,40,40,0.4)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.continueInner}
              >
                <Text style={styles.continueText}>Continue</Text>

                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default BookingSlots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  glassContainer: {
    flex: 1,

    marginTop: 24,

    // marginHorizontal: 10,
    marginBottom: 10,

    borderRadius: 34,
    overflow: 'hidden',

    paddingHorizontal: 18,
    paddingTop: 10,

    backgroundColor: 'rgba(255,255,255,0.16)',

    borderWidth: 0.1,
    // borderColor: 'rgba(255,255,255,0.22)',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 4,
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.35)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 4,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.4,
  },

  monthRow: {
    marginTop: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.28)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  monthText: {
    fontSize: 38,
    fontWeight: '300',
    color: '#0F172A',
    letterSpacing: 1,
  },

  yearText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: -4,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(15,23,42,0.08)',
    marginVertical: 16,
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    width: '92%',
  },

  weekDay: {
    textAlign: 'center',

    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
    // letterSpacing: 0.6,
  },

  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginHorizontal: 14,
  },

  emptyDate: {
    width: width / 7 - 10,
    height: 50,
  },

  dateCircle: {
    width: width / 7 - 10,
    height: 38,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 4,

    borderRadius: 16,
  },

  activeDate: {
    backgroundColor: 'rgba(40,40,40,0.5)',

    shadowColor: '#111827',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,

    elevation: 5,
  },

  dateText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },

  activeDateText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  slotTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 18,
    letterSpacing: 0.3,
  },

  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  slotBtnWrapper: {
    width: '48%',
    height: 62,

    borderRadius: 22,
    overflow: 'hidden',

    marginBottom: 16,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',

    backgroundColor: 'rgba(255,255,255,0.10)',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 4,
  },

  activeSlotWrapper: {
    borderColor: 'rgba(40,40,40,0.4)',
    // borderColor: 'red',
    backgroundColor: 'rgba(40,40,40,0.4)',
    transform: [{ scale: 1.02 }],
  },

  slotBtn: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 12,
  },

  slotText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 8,
    letterSpacing: 0.2,
  },

  //  continueBtn: {
  //   height: 60,
  //   borderRadius: 18,

  //   marginTop: 14,
  //   marginBottom: 26,

  // //   backgroundColor: 'rgba(0,0,0,0.72)',
  //  backgroundColor: 'rgba(40,40,40,0.4)',

  //   borderWidth: 1,
  //   borderColor: 'rgba(255,255,255,0.08)',

  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 10,
  //   },

  //   shadowOpacity: 0.25,
  //   shadowRadius: 14,

  //   elevation: 10,

  //   overflow: 'hidden',
  // },

  // continueInner: {
  //   flex: 1,

  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',

  // },

  // continueText: {
  //   color: '#FFFFFF',

  //   fontSize: 18,
  //   fontWeight: '700',
  //   letterSpacing: 0.5,
  // },

  continueBtn: {
    height: 60,
    borderRadius: 18,

    marginTop: 14,
    marginBottom: 26,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.25,
    shadowRadius: 14,
    overflow: 'hidden',
  },

  continueInner: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  continueText: {
    color: '#FFFFFF',

    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

// // // screens/BookingSlots.js

// // // add real calender when use rcan set data mont nd years ui keep same

// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ImageBackground,
// //   TouchableOpacity,
// //   Dimensions,
// //   StatusBar,
// //   ScrollView,
// //   Platform,
// // } from 'react-native';

// // import LinearGradient from 'react-native-linear-gradient';
// // import { BlurView } from '@react-native-community/blur';
// // import Ionicons from 'react-native-vector-icons/Ionicons';

// // const { width } = Dimensions.get('window');

// // const slots = [
// //   '4:00 PM - 6:00 PM',
// //   '10:00 PM - 12:00 AM',
// //   '2:00 PM - 4:00 PM',
// //   '6:00 PM - 8:00 PM',
// //   '8:00 PM - 10:00 PM',
// //   '12:00 AM - 2:00 AM',
// // ];

// // const BookingSlots = () => {
// //   return (
// //     <>
// //       <StatusBar
// //         translucent
// //         backgroundColor="transparent"
// //         barStyle="dark-content"
// //       />

// //       <ImageBackground
// //         source={require('../assets/images/backimg.webp')}
// //         style={styles.container}
// //         resizeMode="cover"
// //         blurRadius={3}
// //       >
// //         {/* Overlay */}
// //         <View style={styles.overlay} />

// //         {/* Main Glass Card */}
// //         <View style={styles.glassContainer}>
// //           <BlurView
// //             style={StyleSheet.absoluteFill}
// //             blurType="light"
// //             blurAmount={15}
// //             reducedTransparencyFallbackColor="rgba(255,255,255,0.15)"
// //           />

// //           {/* HEADER */}
// //           <View style={styles.header}>
// //             <TouchableOpacity style={styles.iconCircle}>
// //               <Ionicons
// //                 name="arrow-back"
// //                 size={22}
// //                 color="#111"
// //               />
// //             </TouchableOpacity>

// //             <Text style={styles.headerTitle}>
// //               Select Date & Time
// //             </Text>

// //             <TouchableOpacity style={styles.iconCircle}>
// //               <Ionicons
// //                 name="calendar-outline"
// //                 size={20}
// //                 color="#111"
// //               />
// //             </TouchableOpacity>
// //           </View>

// //           {/* MONTH */}
// //           <View style={styles.monthRow}>
// //             <TouchableOpacity style={styles.smallIcon}>
// //               <Ionicons
// //                 name="chevron-back"
// //                 size={22}
// //                 color="#111"
// //               />
// //             </TouchableOpacity>

// //             <Text style={styles.monthText}>May</Text>

// //             <TouchableOpacity style={styles.smallIcon}>
// //               <Ionicons
// //                 name="chevron-forward"
// //                 size={22}
// //                 color="#111"
// //               />
// //             </TouchableOpacity>
// //           </View>

// //           {/* DIVIDER */}
// //           <View style={styles.divider} />

// //           {/* WEEK DAYS */}
// //           <View style={styles.weekRow}>
// //             {['M', 'TU', 'W', 'TH', 'F', 'SA', 'SU'].map((day) => (
// //               <Text key={day} style={styles.weekDay}>
// //                 {day}
// //               </Text>
// //             ))}
// //           </View>

// //           {/* CALENDAR */}
// //           <View style={styles.calendarContainer}>
// //             {Array.from({ length: 31 }, (_, i) => (
// //               <TouchableOpacity
// //                 key={i}
// //                 activeOpacity={0.85}
// //                 style={[
// //                   styles.dateCircle,
// //                   i + 1 === 20 && styles.activeDate,
// //                 ]}
// //               >
// //                 <Text
// //                   style={[
// //                     styles.dateText,
// //                     i + 1 === 20 && styles.activeDateText,
// //                   ]}
// //                 >
// //                   {i + 1}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>

// //           {/* DIVIDER */}
// //           <View style={styles.divider} />

// //           {/* SLOT TITLE */}
// //           <Text style={styles.slotTitle}>
// //             Available Slots
// //           </Text>

// //           {/* SLOT LIST */}
// //           <ScrollView
// //             showsVerticalScrollIndicator={false}
// //             contentContainerStyle={styles.slotContainer}
// //           >
// //             <View style={styles.slotGrid}>
// //               {slots.map((slot, index) => (
// //                 <TouchableOpacity
// //                   key={index}
// //                   activeOpacity={0.9}
// //                   style={styles.slotBtnWrapper}
// //                 >
// //                   <BlurView
// //                     style={StyleSheet.absoluteFill}
// //                     blurType="light"
// //                     blurAmount={10}
// //                     reducedTransparencyFallbackColor="rgba(255,255,255,0.15)"
// //                   />

// //                   <LinearGradient
// //                     colors={[
// //                       'rgba(255,255,255,0.28)',
// //                       'rgba(255,255,255,0.06)',
// //                     ]}
// //                     start={{ x: 0, y: 0 }}
// //                     end={{ x: 1, y: 1 }}
// //                     style={styles.slotBtn}
// //                   >
// //                     <Ionicons
// //                       name="time-outline"
// //                       size={18}
// //                       color="#111"
// //                     />

// //                     <Text style={styles.slotText}>
// //                       {slot}
// //                     </Text>
// //                   </LinearGradient>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //           </ScrollView>

// //           {/* CONTINUE BUTTON */}
// //           <TouchableOpacity activeOpacity={0.9}>
// //             <LinearGradient
// //               colors={['#2E221C', '#5C4335']}
// //               start={{ x: 0, y: 0 }}
// //               end={{ x: 1, y: 1 }}
// //               style={styles.continueBtn}
// //             >
// //               <Text style={styles.continueText}>
// //                 Continue
// //               </Text>

// //               <Ionicons
// //                 name="arrow-forward"
// //                 size={22}
// //                 color="#fff"
// //                 style={{ marginLeft: 8 }}
// //               />
// //             </LinearGradient>
// //           </TouchableOpacity>
// //         </View>
// //       </ImageBackground>
// //     </>
// //   );
// // };

// // export default BookingSlots;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },

// //   overlay: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: 'rgba(255,255,255,0.08)',
// //   },

// //   glassContainer: {
// //     flex: 1,

// //     marginTop:
// //       Platform.OS === 'ios'
// //         ? 50
// //         : (StatusBar.currentHeight || 0) + 18,

// //     marginHorizontal: 18,
// //     marginBottom: 18,

// //     borderRadius: 36,
// //     overflow: 'hidden',

// //     paddingHorizontal: 20,
// //     paddingTop: 20,

// //     backgroundColor: 'rgba(255,255,255,0.10)',

// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.22)',
// //   },

// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },

// //   iconCircle: {
// //     width: 42,
// //     height: 42,
// //     borderRadius: 21,

// //     justifyContent: 'center',
// //     alignItems: 'center',

// //     backgroundColor: 'rgba(255,255,255,0.25)',
// //   },

// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     color: '#111',
// //     letterSpacing: 0.3,
// //   },

// //   monthRow: {
// //     marginTop: 24,

// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },

// //   smallIcon: {
// //     width: 38,
// //     height: 38,
// //     borderRadius: 19,

// //     justifyContent: 'center',
// //     alignItems: 'center',

// //     backgroundColor: 'rgba(255,255,255,0.20)',
// //   },

// //   monthText: {
// //     fontSize: 56,
// //     fontWeight: '300',
// //     color: '#111',
// //     letterSpacing: 1,
// //   },

// //   divider: {
// //     height: 1,
// //     backgroundColor: 'rgba(0,0,0,0.10)',
// //     marginVertical: 18,
// //   },

// //   weekRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },

// //   weekDay: {
// //     width: 34,
// //     textAlign: 'center',

// //     fontSize: 13,
// //     fontWeight: '600',
// //     color: '#444',
// //   },

// //   calendarContainer: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'space-between',

// //     marginTop: 14,
// //   },

// //   dateCircle: {
// //     width: 44,
// //     height: 44,
// //     borderRadius: 22,

// //     justifyContent: 'center',
// //     alignItems: 'center',

// //     marginBottom: 12,
// //   },

// //   activeDate: {
// //     backgroundColor: '#1E1E1E',
// //   },

// //   dateText: {
// //     color: '#111',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },

// //   activeDateText: {
// //     color: '#fff',
// //   },

// //   slotTitle: {
// //     fontSize: 26,
// //     fontWeight: '700',
// //     color: '#111',
// //     marginBottom: 18,
// //   },

// //   slotContainer: {
// //     paddingBottom: 10,
// //   },

// //   slotGrid: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'space-between',
// //   },

// //   slotBtnWrapper: {
// //     width: '48%',
// //     height: 72,

// //     borderRadius: 20,
// //     overflow: 'hidden',

// //     marginBottom: 16,

// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.35)',
// //   },

// //   slotBtn: {
// //     flex: 1,

// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',

// //     paddingHorizontal: 10,
// //   },

// //   slotText: {
// //     fontSize: 13,
// //     fontWeight: '700',
// //     color: '#111',
// //     marginLeft: 6,
// //   },

// //   continueBtn: {
// //     height: 64,
// //     borderRadius: 22,

// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',

// //     marginTop: 10,
// //     marginBottom: 24,

// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 10,
// //     },

// //     shadowOpacity: 0.25,
// //     shadowRadius: 12,

// //     elevation: 8,
// //   },

// //   continueText: {
// //     color: '#fff',
// //     fontSize: 20,
// //     fontWeight: '700',
// //     letterSpacing: 0.5,
// //   },
// // });

// // screens/BookingSlots.js

// import React, { useMemo, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   Dimensions,
//   StatusBar,
//   ScrollView,
//   Platform,
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import { BlurView } from '@react-native-community/blur';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const { width } = Dimensions.get('window');

// const slots = [
//   '4:00 PM - 6:00 PM',
//   '10:00 PM - 12:00 AM',
//   '2:00 PM - 4:00 PM',
//   '6:00 PM - 8:00 PM',

// ];

// const weekDays = ['M', 'TU', 'W', 'TH', 'F', 'SA', 'SU'];

// const BookingSlots = () => {
//   const today = new Date();

//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());

//   const [currentYear, setCurrentYear] = useState(today.getFullYear());

//   const [selectedDate, setSelectedDate] = useState(today.getDate());

//   // MONTH NAME
//   const monthName = useMemo(() => {
//     return new Date(currentYear, currentMonth).toLocaleString('default', {
//       month: 'long',
//     });
//   }, [currentMonth, currentYear]);

//   // TOTAL DAYS
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//   // FIRST DAY
//   let firstDay = new Date(currentYear, currentMonth, 1).getDay();

//   // convert Sunday=0 → Monday start
//   firstDay = firstDay === 0 ? 6 : firstDay - 1;

//   const calendarDays = [];

//   // EMPTY SPACES
//   for (let i = 0; i < firstDay; i++) {
//     calendarDays.push(null);
//   }

//   // REAL DAYS
//   for (let i = 1; i <= daysInMonth; i++) {
//     calendarDays.push(i);
//   }

//   // NEXT MONTH
//   const goToNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(prev => prev + 1);
//     } else {
//       setCurrentMonth(prev => prev + 1);
//     }
//   };

//   // PREVIOUS MONTH
//   const goToPreviousMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(prev => prev - 1);
//     } else {
//       setCurrentMonth(prev => prev - 1);
//     }
//   };

//   return (
//     <>
//       <StatusBar
//         // translucent
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />
//       <BlurView
//         style={StyleSheet.absoluteFill}
//         blurType="light"
//         blurAmount={15}
//         reducedTransparencyFallbackColor="rgba(255,255,255,0.15)"
//       />

//       <ImageBackground
//         source={require('../assets/images/backimg.webp')}
//         style={styles.container}
//         resizeMode="cover"
//         blurRadius={3}
//       >
//         <ScrollView>
//           {/* OVERLAY */}
//           <View style={styles.overlay} />

//           {/* GLASS CARD */}
//           <View style={styles.glassContainer}>
//             {/* HEADER */}
//             <View style={styles.header}>
//               <TouchableOpacity style={styles.iconCircle}>
//                 <Ionicons name="arrow-back" size={22} color="#111" />
//               </TouchableOpacity>

//               <Text style={styles.headerTitle}>Select Date & Time</Text>

//               <TouchableOpacity style={styles.iconCircle}>
//                 <Ionicons name="calendar-outline" size={20} color="#111" />
//               </TouchableOpacity>
//             </View>

//             {/* MONTH */}
//             <View style={styles.monthRow}>
//               <TouchableOpacity
//                 style={styles.smallIcon}
//                 onPress={goToPreviousMonth}
//               >
//                 <Ionicons name="chevron-back" size={22} color="#111" />
//               </TouchableOpacity>

//               <View style={{ alignItems: 'center' }}>
//                 <Text style={styles.monthText}>{monthName}</Text>

//                 {/* <Text style={styles.yearText}>
//                 {currentYear}
//               </Text> */}
//               </View>

//               <TouchableOpacity
//                 style={styles.smallIcon}
//                 onPress={goToNextMonth}
//               >
//                 <Ionicons name="chevron-forward" size={22} color="#111" />
//               </TouchableOpacity>
//             </View>

//             {/* DIVIDER */}
//             <View style={styles.divider} />

//             {/* WEEK DAYS */}
//             <View style={styles.weekRow}>
//               {weekDays.map(day => (
//                 <Text key={day} style={styles.weekDay}>
//                   {day}
//                 </Text>
//               ))}
//             </View>

//             {/* REAL CALENDAR */}
//             <View style={styles.calendarContainer}>
//               {calendarDays.map((day, index) => {
//                 if (!day) {
//                   return <View key={index} style={styles.emptyDate} />;
//                 }

//                 const isSelected = selectedDate === day;

//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     activeOpacity={0.85}
//                     onPress={() => setSelectedDate(day)}
//                     style={[styles.dateCircle, isSelected && styles.activeDate]}
//                   >
//                     <Text
//                       style={[
//                         styles.dateText,
//                         isSelected && styles.activeDateText,
//                       ]}
//                     >
//                       {day}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>

//             {/* DIVIDER */}
//             <View style={styles.divider} />

//             {/* SLOT TITLE */}
//             <Text style={styles.slotTitle}>Available Slots</Text>

//             {/* SLOT LIST */}
//             <ScrollView
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={styles.slotContainer}
//             >
//               <View style={styles.slotGrid}>
//                 {slots.map((slot, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     activeOpacity={0.9}
//                     style={styles.slotBtnWrapper}
//                   >
//                     <BlurView
//                       style={StyleSheet.absoluteFill}
//                       blurType="light"
//                       blurAmount={10}
//                       reducedTransparencyFallbackColor="rgba(255,255,255,0.15)"
//                     />

//                     <LinearGradient
//                       colors={[
//                         'rgba(255,255,255,0.28)',
//                         'rgba(255,255,255,0.06)',
//                       ]}
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 1 }}
//                       style={styles.slotBtn}
//                     >
//                       <Ionicons name="time-outline" size={18} color="#111" />

//                       <Text style={styles.slotText}>{slot}</Text>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </ScrollView>

//             {/* CONTINUE */}
//             <TouchableOpacity activeOpacity={0.9} style={styles.continueBtn}>
//               {/* <LinearGradient
//                 // colors={['#2E221C', '#5C4335']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}

//               > */}
//                 <Text style={styles.continueText}>Continue</Text>

//                 <Ionicons
//                   name="arrow-forward"
//                   size={22}
//                   color="#fff"
//                   style={{ marginLeft: 8 }}
//                 />
//               {/* </LinearGradient> */}
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </ImageBackground>
//     </>
//   );
// };

// export default BookingSlots;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.08)',
//   },

//   glassContainer: {
//     flex: 1,

//     marginTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 18,

//     marginHorizontal: 8,
//     marginBottom: 8,

//     borderRadius: 36,
//     overflow: 'hidden',

//     paddingHorizontal: 20,
//     paddingTop: 20,

//     backgroundColor: 'rgba(255,255,255,0.10)',

//     borderWidth: 0.1,
//     borderColor: 'rgba(255,255,255,0.22)',
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   iconCircle: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,

//     justifyContent: 'center',
//     alignItems: 'center',

//     backgroundColor: 'rgba(255,255,255,0.25)',
//   },

//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111',
//     letterSpacing: 0.3,
//   },

//   monthRow: {
//     marginTop: 10,

//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   smallIcon: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,

//     justifyContent: 'center',
//     alignItems: 'center',

//     backgroundColor: 'rgba(255,255,255,0.20)',
//   },

//   monthText: {
//     fontSize: 42,
//     fontWeight: '300',
//     color: '#111',
//     letterSpacing: 1,
//   },

//   yearText: {
//     fontSize: 15,
//     color: '#444',
//     marginTop: -5,
//     fontWeight: '600',
//   },

//   divider: {
//     height: 1,
//     backgroundColor: 'rgba(0,0,0,0.10)',
//     marginVertical: 12,
//   },

//   weekRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   weekDay: {
//     width: 44,
//     textAlign: 'center',

//     fontSize: 13,
//     fontWeight: '700',
//     color: '#444',
//   },

//   calendarContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 8,
//   },

//   emptyDate: {
//     width: width / 7 - 10,
//     height: 50,
//   },

//   dateCircle: {
//     width: width / 7 - 10,
//     height: 32,

//     justifyContent: 'center',
//     alignItems: 'center',

//     marginBottom: 10,
//   },

//   activeDate: {
//     backgroundColor: '#1E1E1E',
//     borderRadius: 18,
//   },

//   dateText: {
//     color: '#111',
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   activeDateText: {
//     color: '#fff',
//   },

//   slotTitle: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 15,
//   },

//   slotContainer: {
//     paddingBottom: 10,
//   },

//   slotGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },

//   slotBtnWrapper: {
//     width: '48%',
//     height: 60,

//     borderRadius: 20,
//     overflow: 'hidden',

//     marginBottom: 16,

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.35)',
//   },

//   slotBtn: {
//     flex: 1,

//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',

//     paddingHorizontal: 10,
//   },

//   slotText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#111',
//     marginLeft: 6,
//   },

//   continueBtn: {
//     height: 64,
//     borderRadius: 22,

//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',

//     marginTop: 10,
//     marginBottom: 24,

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },

//     shadowOpacity: 0.25,
//     shadowRadius: 12,

//     elevation: 8,
//   },

//   continueText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
// });
