
/* ─────────────────────────────────────────────────────────
   WEEKLY MEAL MENU — PREMIUM GLASS UI
   Same background + color theme from MealScreen
───────────────────────────────────────────────────────── */

import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  Image,
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

const { width } = Dimensions.get('window');

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */

const MEAL_DATA = {
  Breakfast: {
    image: require('../assets/images/breakfast.webp'),

    days: {
      1: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
      2: ['Poha', 'Tea', 'Banana', 'Milk'],
      3: ['Idli', 'Tea', 'Sambhar', 'Chutney'],
      4: ['Paratha', 'Curd', 'Tea', 'Fruit'],
      5: ['Dosa', 'Tea', 'Sambhar', 'Juice'],
      6: ['Upma', 'Milk', 'Tea', 'Banana'],
      7: ['Pav Bhaji', 'Juice', 'Tea', 'Fruit'],
    },
  },

  Lunch: {
    image: require('../assets/images/lunch.webp'),

    days: {
      1: ['Dal', 'Rice', 'Chapati', 'Sabji'],
      2: ['Rajma', 'Rice', 'Salad', 'Papad'],
      3: ['Paneer', 'Rice', 'Chapati', 'Curd'],
      4: ['Dal Fry', 'Jeera Rice', 'Salad'],
      5: ['Mix Veg', 'Chapati', 'Rice'],
      6: ['Kadhi', 'Rice', 'Papad'],
      7: ['Chole', 'Rice', 'Chapati'],
    },
  },

  Dinner: {
    image: require('../assets/images/dinner.webp'),

    days: {
      1: ['Chapati', 'Dal', 'Rice', 'Raita'],
      2: ['Paneer', 'Rice', 'Salad'],
      3: ['Chapati', 'Sabji', 'Dal'],
      4: ['Khichdi', 'Curd', 'Papad'],
      5: ['Rice', 'Dal Tadka', 'Raita'],
      6: ['Mix Veg', 'Soup', 'Chapati'],
      7: ['Pulao', 'Curd', 'Salad'],
    },
  },
};

/* ─────────────────────────────────────────────────────────
   SCREEN
───────────────────────────────────────────────────────── */

export default function WeeklyMealMenuScreen({
  navigation,
  route,
}) {
  const { mealType = 'Breakfast' } = route.params || {};

  const [selectedDay, setSelectedDay] = useState(1);

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
  }));

  const mealInfo =
    MEAL_DATA[mealType] || MEAL_DATA.Breakfast;

  const items = mealInfo.days[selectedDay] || [];

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ImageBackground
        source={require('../assets/images/meal1.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* MAIN BLUR */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={25}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
        />

        {/* OVERLAY */}
        <View style={styles.overlay} />

        <Animated.View style={animatedStyle}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Icon
                name="arrow-left"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Menu
            </Text>

            <View style={{ width: 44 }} />
          </View>

          {/* CONTENT */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* DAYS ROW */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                styles.daysContainer
              }
            >
              {DAYS.map((dayName, index) => {
                const day = index + 1;

                const isActive =
                  selectedDay === day;

                return (
                  <TouchableOpacity
                    key={day}
                    activeOpacity={0.8}
                    onPress={() =>
                      setSelectedDay(day)
                    }
                    style={[
                      styles.dayBtn,
                      isActive &&
                        styles.dayBtnActive,
                    ]}
                  >
                    {isActive && (
                      <>
                        <BlurView
                          style={
                            StyleSheet.absoluteFill
                          }
                          blurType="dark"
                          blurAmount={20}
                          reducedTransparencyFallbackColor="rgba(50,50,50,0.8)"
                        />

                        <View
                          style={
                            styles.activeOverlay
                          }
                        />
                      </>
                    )}

                    <Text
                      style={[
                        styles.dayText,
                        isActive &&
                          styles.dayTextActive,
                      ]}
                    >
                      {dayName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* MAIN CARD */}
            <View style={styles.mainCardContainer}>
              {/* GLASS CARD */}
              <View style={styles.cardShell}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="light"
                  blurAmount={14}
                  reducedTransparencyFallbackColor="rgba(255,255,255,0.6)"
                />

                <View style={styles.glassBg} />

                <View style={styles.topInsetHighlight} />

                <View
                  style={styles.bottomInsetHighlight}
                />

                <LinearGradient
                  colors={[
                    'transparent',
                    'rgba(255,255,255,0.8)',
                    'transparent',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.topEdgeLine}
                />

                <LinearGradient
                  colors={[
                    'rgba(255,255,255,0.8)',
                    'transparent',
                    'rgba(255,255,255,0.3)',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.leftEdgeLine}
                />

                {/* CONTENT */}
                <View style={styles.cardContent}>
                  <Text style={styles.mealTitle}>
                    {mealType}
                  </Text>

                  <Text style={styles.mealSubTitle}>
                    Delicious meals prepared for your
                    hostel routine
                  </Text>

                  {/* FOOD CHIPS */}
                  <View style={styles.foodWrapper}>
                    {items.map((item, index) => (
                      <View
                        key={`${item}-${index}`}
                        style={styles.foodChip}
                      >
                        <BlurView
                          style={
                            StyleSheet.absoluteFill
                          }
                          blurType="light"
                          blurAmount={12}
                        />

                        <Text
                          style={styles.foodText}
                        >
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* FLOATING FOOD IMAGE */}
              <View style={styles.imageContainer}>
                <Image
                  source={mealInfo.image}
                  style={styles.foodImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

/* ─────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────── */

const imageSize = Math.min(width * 0.42, 170);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 28,

    paddingTop:
      Platform.OS === 'ios'
        ? 68
        : (StatusBar.currentHeight || 24) + 26,
  },

  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '400',
  },

  /* SCROLL */

  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 26,
    paddingBottom: 60,
  },

  /* DAYS */

  daysContainer: {
    paddingBottom: 18,
    paddingRight: 20,
  },

  dayBtn: {
    height: 46,

    paddingHorizontal: 22,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 30,

    overflow: 'hidden',

    marginRight: 12,

    backgroundColor: 'rgba(255,255,255,0.08)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },

  dayBtnActive: {
    borderColor: 'rgba(255,255,255,0.3)',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,

    elevation: 8,
  },

  activeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(40,40,40,0.35)',
  },

  dayText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'italic',
  },

  dayTextActive: {
    color: '#fff',
  },

  /* CARD */

  mainCardContainer: {
    position: 'relative',
    marginTop: 18,
    minHeight: 400,
    justifyContent: 'center',
  },

  cardShell: {
    borderRadius: 26,

    overflow: 'hidden',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowOpacity: 0.24,
    shadowRadius: 20,

    elevation: 10,

    paddingTop: 110,
    paddingBottom: 34,
    paddingHorizontal: 24,
  },

  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(130,112,92,0.35)',
  },

  topInsetHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  bottomInsetHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  topEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },

  leftEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: '100%',
  },

  /* FLOAT IMAGE */

  imageContainer: {
    position: 'absolute',

    top: -30,
    alignSelf: 'center',

    width: imageSize,
    height: imageSize,

    borderRadius: imageSize / 2,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowOpacity: 0.38,
    shadowRadius: 14,

    elevation: 14,

    zIndex: 20,
  },

  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: imageSize / 2,
  },

  /* CONTENT */

  cardContent: {
    alignItems: 'center',
  },

  mealTitle: {
    color: '#fff',

    fontSize: 34,
    fontWeight: '800',
    fontStyle: 'italic',

    marginBottom: 8,

    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },

  mealSubTitle: {
    color: '#fff',

    fontSize: 15,
    fontStyle: 'italic',

    textAlign: 'center',

    lineHeight: 22,

    opacity: 0.92,

    marginBottom: 26,

    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },

  /* FOOD CHIPS */

  foodWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  foodChip: {
    overflow: 'hidden',

    backgroundColor: 'rgba(255,255,255,0.08)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',

    borderRadius: 30,

    paddingHorizontal: 20,
    paddingVertical: 12,

    margin: 7,
  },

  foodText: {
    color: '#fff',

    fontSize: 14,
    fontWeight: '700',

    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 3,
  },
});

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   StatusBar,
//   Dimensions,
//   Platform,
//   ScrollView,
// } from 'react-native';

// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
// } from 'react-native-reanimated';

// const { width } = Dimensions.get('window');

// /* ─────────────────────────────────────────────────────────
//    MEAL DATA
// ───────────────────────────────────────────────────────── */

// const DAYS = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday',
// ];

// const MEAL_DATA = {
//   Breakfast: {
//     days: {
//       1: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
//       2: ['Tea', 'Poha', 'Banana', 'Milk'],
//       3: ['Tea', 'Idli', 'Sambhar', 'Coconut Chutney'],
//       4: ['Tea', 'Paratha', 'Curd', 'Pickle'],
//       5: ['Tea', 'Dosa', 'Sambhar', 'Chutney'],
//       6: ['Tea', 'Upma', 'Banana', 'Milk'],
//       7: ['Tea', 'Pav Bhaji', 'Juice', 'Fruit'],
//     },
//   },

//   Lunch: {
//     days: {
//       1: ['Dal', 'Rice', 'Chapati', 'Sabji'],
//       2: ['Rajma', 'Rice', 'Salad', 'Papad'],
//       3: ['Paneer Curry', 'Rice', 'Chapati'],
//       4: ['Dal Fry', 'Jeera Rice', 'Curd'],
//       5: ['Mix Veg', 'Rice', 'Chapati'],
//       6: ['Kadhi', 'Rice', 'Salad'],
//       7: ['Chole', 'Rice', 'Chapati'],
//     },
//   },

//   Dinner: {
//     days: {
//       1: ['Chapati', 'Dal', 'Rice', 'Raita'],
//       2: ['Rice', 'Paneer', 'Salad'],
//       3: ['Chapati', 'Sabji', 'Dal'],
//       4: ['Khichdi', 'Curd', 'Papad'],
//       5: ['Rice', 'Dal Tadka', 'Raita'],
//       6: ['Chapati', 'Mix Veg', 'Soup'],
//       7: ['Pulao', 'Curd', 'Salad'],
//     },
//   },
// };

// /* ─────────────────────────────────────────────────────────
//    GLASS CARD
// ───────────────────────────────────────────────────────── */

// const GlassCard = ({ children, style }) => (
//   <View style={[styles.glassShell, style]}>
//     <BlurView
//       style={StyleSheet.absoluteFill}
//       blurType="light"
//       blurAmount={18}
//       reducedTransparencyFallbackColor="rgba(255,255,255,0.3)"
//     />

//     <View style={styles.glassBg} />

//     <LinearGradient
//       colors={[
//         'rgba(255,255,255,0.18)',
//         'rgba(255,255,255,0.03)',
//       ]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={StyleSheet.absoluteFill}
//     />

//     {children}
//   </View>
// );

// /* ─────────────────────────────────────────────────────────
//    SCREEN
// ───────────────────────────────────────────────────────── */

// export default function WeeklyMealMenuScreen({
//   navigation,
//   route,
// }) {
//   const { mealType = 'Breakfast' } = route.params || {};

//   const [selectedDay, setSelectedDay] = useState(1);

//   const opacity = useSharedValue(0);
//   const translateY = useSharedValue(20);

//   useEffect(() => {
//     opacity.value = withTiming(1, {
//       duration: 500,
//       easing: Easing.out(Easing.ease),
//     });

//     translateY.value = withTiming(0, {
//       duration: 500,
//       easing: Easing.out(Easing.ease),
//     });
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     flex: 1,
//     opacity: opacity.value,
//     transform: [{ translateY: translateY.value }],
//   }));

//   const mealInfo =
//     MEAL_DATA[mealType] || MEAL_DATA.Breakfast;

//   const items = mealInfo.days[selectedDay] || [];

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="light-content"
//       />

//       <ImageBackground
//         source={require('../assets/images/meal1.webp')}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         {/* BACKGROUND BLUR */}
//         <BlurView
//           style={StyleSheet.absoluteFill}
//           blurType="light"
//           blurAmount={24}
//           reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
//         />

//         {/* DARK OVERLAY */}
//         <View style={styles.overlay} />

//         <Animated.View style={animatedStyle}>
//           {/* HEADER */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.backBtn}
//               activeOpacity={0.7}
//             >
//               <Icon
//                 name="arrow-left"
//                 size={28}
//                 color="#fff"
//               />
//             </TouchableOpacity>

//             <Text style={styles.headerTitle}>
//               Menu
//             </Text>

//             <View style={{ width: 44 }} />
//           </View>

//           {/* CONTENT */}
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContent}
//           >
//             {/* DAYS SCROLLER */}
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={
//                 styles.daysScrollContainer
//               }
//             >
//               {DAYS.map((dayName, index) => {
//                 const day = index + 1;

//                 const isActive =
//                   selectedDay === day;

//                 return (
//                   <TouchableOpacity
//                     key={day}
//                     activeOpacity={0.8}
//                     onPress={() =>
//                       setSelectedDay(day)
//                     }
//                     style={[
//                       styles.dayPill,
//                       isActive &&
//                         styles.dayPillActive,
//                     ]}
//                   >
//                     {isActive && (
//                       <>
//                         <BlurView
//                           style={
//                             StyleSheet.absoluteFill
//                           }
//                           blurType="dark"
//                           blurAmount={18}
//                           reducedTransparencyFallbackColor="rgba(50,50,50,0.8)"
//                         />

//                         <LinearGradient
//                           colors={[
//                             'rgba(255,255,255,0.18)',
//                             'rgba(255,255,255,0.04)',
//                           ]}
//                           style={
//                             StyleSheet.absoluteFill
//                           }
//                         />
//                       </>
//                     )}

//                     <Text
//                       style={[
//                         styles.dayPillText,
//                         isActive &&
//                           styles.dayPillTextActive,
//                       ]}
//                     >
//                       {dayName}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>

//             {/* MEAL TITLE */}
//             <GlassCard style={styles.mealCard}>
//               <Text style={styles.mealTitle}>
//                 {mealType}
//               </Text>
//             </GlassCard>

//             {/* FOOD ITEMS */}
//             <View style={styles.chipsWrapper}>
//               {items.map((item, index) => (
//                 <GlassCard
//                   key={`${item}-${index}`}
//                   style={styles.foodChip}
//                 >
//                   <Text style={styles.foodChipText}>
//                     {item}
//                   </Text>
//                 </GlassCard>
//               ))}
//             </View>
//           </ScrollView>
//         </Animated.View>
//       </ImageBackground>
//     </View>
//   );
// }

// /* ─────────────────────────────────────────────────────────
//    STYLES
// ───────────────────────────────────────────────────────── */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },

//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.42)',
//   },

//   /* HEADER */

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     paddingHorizontal: 20,

//     paddingTop:
//       Platform.OS === 'ios'
//         ? 60
//         : (StatusBar.currentHeight || 24) + 16,

//     paddingBottom: 20,
//   },

//   backBtn: {
//     width: 44,
//     height: 44,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },

//   headerTitle: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: '700',
//     fontStyle: 'italic',

//     textShadowColor: 'rgba(0,0,0,0.4)',
//     textShadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     textShadowRadius: 4,
//   },

//   /* CONTENT */

//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 50,
//   },

//   /* DAYS */

//   daysScrollContainer: {
//     paddingVertical: 10,
//     paddingRight: 20,
//   },

//   dayPill: {
//     paddingHorizontal: 22,
//     paddingVertical: 12,

//     borderRadius: 40,
//     overflow: 'hidden',

//     marginRight: 12,

//     backgroundColor: 'rgba(255,255,255,0.08)',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//   },

//   dayPillActive: {
//     backgroundColor: 'rgba(255,255,255,0.12)',

//     borderColor: 'rgba(255,255,255,0.25)',

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 14,

//     elevation: 10,
//   },

//   dayPillText: {
//     color: 'rgba(255,255,255,0.7)',

//     fontSize: 14,
//     fontWeight: '700',
//     fontStyle: 'italic',
//   },

//   dayPillTextActive: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '800',
//   },

//   /* MEAL CARD */

//   mealCard: {
//     borderRadius: 28,

//     paddingVertical: 24,
//     marginTop: 18,
//     marginBottom: 22,

//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   mealTitle: {
//     color: '#fff',

//     fontSize: 34,
//     fontWeight: '800',
//     fontStyle: 'italic',

//     letterSpacing: 0.4,

//     textShadowColor: 'rgba(0,0,0,0.45)',
//     textShadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     textShadowRadius: 4,
//   },

//   /* FOOD CHIPS */

//   chipsWrapper: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },

//   foodChip: {
//     borderRadius: 50,

//     paddingHorizontal: 22,
//     paddingVertical: 14,

//     marginRight: 12,
//     marginBottom: 14,
//   },

//   foodChipText: {
//     color: '#fff',

//     fontSize: 15,
//     fontWeight: '700',

//     textShadowColor: 'rgba(0,0,0,0.35)',
//     textShadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     textShadowRadius: 3,
//   },

//   /* GLASS */

//   glassShell: {
//     overflow: 'hidden',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.18)',

//     shadowColor: '#000',

//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },

//     shadowOpacity: 0.18,
//     shadowRadius: 20,

//     elevation: 8,
//   },

//   glassBg: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.08)',
//   },
// });

// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ImageBackground,
// //   TouchableOpacity,
// //   StatusBar,
// //   Dimensions,
// //   Platform,
// //   ScrollView,
// // } from 'react-native';
// // import { BlurView } from '@react-native-community/blur';
// // import LinearGradient from 'react-native-linear-gradient';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // import Animated, {
// //   useSharedValue,
// //   useAnimatedStyle,
// //   withTiming,
// //   Easing,
// // } from 'react-native-reanimated';

// // const { width, height } = Dimensions.get('window');

// // /* ─────────────────────────────────────────────────────────
// //    MEAL DATA  (same items every day – user can edit later)
// // ───────────────────────────────────────────────────────── */
// // const MEAL_DATA = {
// //   Breakfast: {
// //     image: require('../assets/images/breakfast.webp'),
// //     days: {
// //       1: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
// //       2: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
// //       3: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
// //       4: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
// //       5: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
// //       6: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
// //       7: ['Tea', 'Sambhar', 'Uttapam', 'Vada'],
// //     },
// //   },
// //   Lunch: {
// //     image: require('../assets/images/lunch.webp'),
// //     days: {
// //       1: ['Dal', 'Curry', 'Chapati', 'Rice'],
// //       2: ['Dal', 'Curry', 'Chapati', 'Rice'],
// //       3: ['Dal', 'Curry', 'Chapati', 'Rice'],
// //       4: ['Dal', 'Curry', 'Chapati', 'Rice'],
// //       5: ['Dal', 'Curry', 'Chapati', 'Rice'],
// //       6: ['Dal', 'Curry', 'Chapati', 'Rice'],
// //       7: ['Dal', 'Curry', 'Chapati', 'Rice'],
// //     },
// //   },
// //   Dinner: {
// //     image: require('../assets/images/dinner.webp'),
// //     days: {
// //       1: ['Chapati', 'Dal', 'Raita', 'Rice'],
// //       2: ['Chapati', 'Dal', 'Raita', 'Rice'],
// //       3: ['Chapati', 'Dal', 'Raita', 'Rice'],
// //       4: ['Chapati', 'Dal', 'Raita', 'Rice'],
// //       5: ['Chapati', 'Dal', 'Raita', 'Rice'],
// //       6: ['Chapati', 'Dal', 'Raita', 'Rice'],
// //       7: ['Chapati', 'Dal', 'Raita', 'Rice'],
// //     },
// //   },
// // };

// // /* ─────────────────────────────────────────────────────────
// //    REUSABLE GLASS CARD
// // ───────────────────────────────────────────────────────── */
// // const GlassCard = ({ children, style }) => (
// //   <View style={[styles.glassShell, style]}>
// //     <BlurView
// //       style={StyleSheet.absoluteFill}
// //       blurType="light"
// //       blurAmount={14}
// //       reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
// //     />
// //     <View style={styles.glassBg} />
// //     <View style={styles.topInsetHighlight} />
// //     <View style={styles.bottomInsetHighlight} />
// //     <LinearGradient
// //       colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
// //       start={{ x: 0, y: 0 }}
// //       end={{ x: 1, y: 0 }}
// //       style={styles.topEdgeLine}
// //     />
// //     <LinearGradient
// //       colors={['rgba(255,255,255,0.8)', 'transparent', 'rgba(255,255,255,0.3)']}
// //       start={{ x: 0, y: 0 }}
// //       end={{ x: 0, y: 1 }}
// //       style={styles.leftEdgeLine}
// //     />
// //     {children}
// //   </View>
// // );

// // /* ─────────────────────────────────────────────────────────
// //    SCREEN
// // ───────────────────────────────────────────────────────── */
// // export default function WeeklyMealMenuScreen({ navigation, route }) {
// //   const { mealType = 'Breakfast' } = route.params || {};
// //   const [selectedDay, setSelectedDay] = useState(1);
// //   const opacity = useSharedValue(0);
// //   const translateY = useSharedValue(18);

// //   useEffect(() => {
// //     opacity.value = withTiming(1, { duration: 420, easing: Easing.out(Easing.ease) });
// //     translateY.value = withTiming(0, { duration: 420, easing: Easing.out(Easing.ease) });
// //   }, []);

// //   const animatedStyle = useAnimatedStyle(() => ({
// //     flex: 1,
// //     opacity: opacity.value,
// //     transform: [{ translateY: translateY.value }],
// //   }));

// //   const mealInfo = MEAL_DATA[mealType] || MEAL_DATA.Breakfast;
// //   const items = mealInfo.days[selectedDay] || [];

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

// //       <ImageBackground
// //         source={require('../assets/images/meal1.webp')}
// //         style={styles.background}
// //         resizeMode="cover"
// //       >
        
// //         <BlurView
// //           style={StyleSheet.absoluteFill}
// //           blurType="light"
// //           blurAmount={20}
// //           reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
// //         />
// //         {/* Dark overlay */}
// //         <View style={styles.overlay} />

// //         <Animated.View style={animatedStyle}>
// //           {/* ── HEADER ────────────────────────────────── */}
// //           <View style={styles.header}>
// //             <TouchableOpacity
// //               onPress={() => navigation.goBack()}
// //               style={styles.backBtn}
// //               activeOpacity={0.7}
// //             >
// //               <Icon name="arrow-left" size={28} color="#fff" />
// //             </TouchableOpacity>

// //             <Text style={styles.headerTitle}>Menu</Text>

// //             <View style={styles.headerSpacer} />
// //           </View>

// //           {/* ── BODY  ─────────────────────────────────── */}
// //           <View style={styles.body}>
// //             {/* LEFT: meal content */}
// //             <ScrollView
// //               style={styles.leftPanel}
// //               showsVerticalScrollIndicator={false}
// //               contentContainerStyle={styles.leftContent}
// //             >
// //             <View style={styles.rightPanel}>
// //               <GlassCard style={styles.daySelectorPanel}>
// //                 {[1, 2, 3, 4, 5, 6, 7].map((day) => {
// //                   const isActive = selectedDay === day;
// //                   return (
// //                     <TouchableOpacity
// //                       key={day}
// //                       activeOpacity={0.75}
// //                       onPress={() => setSelectedDay(day)}
// //                       style={[styles.dayBtn, isActive && styles.dayBtnActive]}
// //                     >
// //                       {isActive && (
// //                         <>
// //                           <BlurView
// //                             style={StyleSheet.absoluteFill}
// //                             blurType="dark"
// //                             blurAmount={20}
// //                             reducedTransparencyFallbackColor="rgba(58, 55, 55, 0.9)"
// //                           />
// //                           <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(40, 40, 40, 0.45)' }]} />
// //                         </>
// //                       )}
// //                       <Text style={[styles.dayText, isActive && styles.dayTextActive]}>
// //                         Day {day}
// //                       </Text>
// //                     </TouchableOpacity>
// //                   );
// //                 })}
// //               </GlassCard>
// //             </View>
// //               {/* Meal heading */}
// //               <GlassCard style={styles.mealHeadingCard}>
// //                 <Text style={styles.mealHeadingText}>{mealType}</Text>
// //               </GlassCard>

// //               {/* Meal item chips  */}
// //               <View style={styles.chipsGrid}>
// //                 {items.map((item, index) => (
// //                   <GlassCard key={`${item}-${index}`} style={styles.chipCard}>
// //                     <Text style={styles.chipText}>{item}</Text>
// //                   </GlassCard>
// //                 ))}
// //               </View>
// //             </ScrollView>

// //             {/* RIGHT: day selector */}
            
// //           </View>
// //         </Animated.View>
// //       </ImageBackground>
// //     </View>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────────
// //    STYLES
// // ───────────────────────────────────────────────────────── */
// // const RADIUS = 20;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //   },
// //   background: {
// //     flex: 1,
// //     width: '100%',
// //     height: '100%',
// //   },
// //   overlay: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: 'rgba(0, 0, 0, 0.45)', // Slightly dark overlay to maintain warm aesthetic
// //   },

// //   /* ── Header ── */
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingTop: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
// //     paddingBottom: 16,
// //   },
// //   backBtn: {
// //     width: 44,
// //     height: 44,
// //     justifyContent: 'center',
// //     alignItems: 'flex-start',
// //   },
// //   headerTitle: {
// //     flex: 1,
// //     textAlign: 'center',
// //     color: '#fff',
// //     fontSize: 24,
// //     fontWeight: '700',
// //     fontStyle: 'italic',
// //     letterSpacing: 0.5,
// //     textShadowColor: 'rgba(0,0,0,0.4)',
// //     textShadowOffset: { width: 0, height: 1 },
// //     textShadowRadius: 4,
// //   },
// //   headerSpacer: {
// //     width: 44,
// //   },

// //   /* ── Body ── */
// //   body: {
// //     flex: 1,
// //     flexDirection: 'row',
// //     paddingBottom: 20,
// //   },

// //   /* LEFT PANEL */
// //   leftPanel: {
// //     flex: 1,
// //     paddingLeft: 16,
// //     paddingRight: 8,
// //   },
// //   leftContent: {
// //     paddingTop: 4,
// //     paddingBottom: 24,
// //   },

// //   /* Meal heading card */
// //   mealHeadingCard: {
// //     borderRadius: RADIUS,
// //     paddingVertical: 14,
// //     paddingHorizontal: 20,
// //     marginBottom: 14,
// //     alignItems: 'center',
// //   },
// //   mealHeadingText: {
// //     color: '#fff',
// //     fontSize: 22,
// //     fontWeight: '700',
// //     fontStyle: 'italic',
// //     letterSpacing: 0.3,
// //     textShadowColor: 'rgba(0,0,0,0.35)',
// //     textShadowOffset: { width: 0, height: 1 },
// //     textShadowRadius: 4,
// //   },

// //   /* Chips */
// //   chipsGrid: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     gap: 10,
// //   },
// //   chipCard: {
// //     borderRadius: 50,
// //     paddingVertical: 10,
// //     paddingHorizontal: 18,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   chipText: {
// //     color: '#fff',
// //     fontSize: 14,
// //     fontWeight: '600',
// //     textShadowColor: 'rgba(0,0,0,0.3)',
// //     textShadowOffset: { width: 0, height: 1 },
// //     textShadowRadius: 2,
// //   },

// //   /* RIGHT PANEL */
// //   rightPanel: {
// //     width: 88,
// //     paddingRight: 14,
// //     paddingLeft: 4,
// //     alignItems: 'stretch',
// //     height: '100%',
// //   },
// //   daySelectorPanel: {
// //     flex: 1,
// //     borderRadius: RADIUS,
// //     overflow: 'hidden',
// //     paddingVertical: 6,
// //     paddingHorizontal: 0,
// //     alignItems: 'stretch',
// //     justifyContent: 'space-around',
// //   },

// //   /* Day button */
// //   dayBtn: {
// //     flex: 1,
// //     marginHorizontal: 6,
// //     marginVertical: 3,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     overflow: 'hidden',
// //     minHeight: 36,
// //   },
// //   dayBtnActive: {
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.25)',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.15,
// //     shadowRadius: 8,
// //     elevation: 4,
// //   },
// //   dayText: {
// //     color: 'rgba(255,255,255,0.75)',
// //     fontSize: 13,
// //     fontWeight: '700',
// //     fontStyle: 'italic',
// //     letterSpacing: 0.2,
// //     textShadowColor: 'rgba(0,0,0,0.4)',
// //     textShadowOffset: { width: 0, height: 1 },
// //     textShadowRadius: 3,
// //   },
// //   dayTextActive: {
// //     color: '#fff',
// //     fontSize: 14,
// //     fontWeight: '800',
// //     textShadowColor: 'rgba(0,0,0,0.6)',
// //     textShadowOffset: { width: 0, height: 1 },
// //     textShadowRadius: 4,
// //   },

// //   /* ── Glass base ── */
// //   glassShell: {
// //     overflow: 'hidden',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.3)',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.12,
// //     shadowRadius: 20,
// //     elevation: 8,
// //   },
// //   glassBg: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: 'rgba(255,255,255,0.46)',
// //   },
// //   topInsetHighlight: {
// //     position: 'absolute',
// //     top: 0, left: 0, right: 0,
// //     height: 1,
// //     backgroundColor: 'rgba(255,255,255,0.5)',
// //     zIndex: 1,
// //   },
// //   bottomInsetHighlight: {
// //     position: 'absolute',
// //     bottom: 0, left: 0, right: 0,
// //     height: 1,
// //     backgroundColor: 'rgba(255,255,255,0.1)',
// //     zIndex: 1,
// //   },
// //   topEdgeLine: {
// //     position: 'absolute',
// //     top: 0, left: 0, right: 0,
// //     height: 1,
// //     zIndex: 2,
// //   },
// //   leftEdgeLine: {
// //     position: 'absolute',
// //     top: 0, left: 0,
// //     width: 1,
// //     height: '100%',
// //     zIndex: 2,
// //   },
// // });
