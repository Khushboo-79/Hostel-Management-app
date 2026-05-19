import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HeaderTitle = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons
          name="chevron-back"
          size={28}
          color="#111"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>

      {/* Empty view for center alignment */}
      <View style={styles.rightSpace} />
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + 10
        : 55,

    paddingHorizontal: 18,
    marginBottom: 10,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  title: {
    flex: 1,
    textAlign: 'center',

    fontSize: 26,
    fontWeight: '700',
    color: '#111',

    marginRight: 42,
  },

  rightSpace: {
    width: 42,
  },
});

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   StatusBar,
// } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';

// const HeaderTitle = ({ title }) => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* LEFT BUTTON */}
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={() => navigation.goBack()}
//       >
//         <View style={styles.iconWrapper}>
//           <BlurView
//             style={StyleSheet.absoluteFill}
//             blurType="light"
//             blurAmount={12}
//             reducedTransparencyFallbackColor="rgba(255,255,255,0.2)"
//           />

//           <LinearGradient
//             colors={[
//               'rgba(255,255,255,0.22)',
//               'rgba(255,255,255,0.08)',
//             ]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={StyleSheet.absoluteFill}
//           />

//           <Ionicons
//             name="chevron-back"
//             size={24}
//             color="#111"
//           />
//         </View>
//       </TouchableOpacity>

//       {/* TITLE */}
//       <Text numberOfLines={1} style={styles.title}>
//         {title}
//       </Text>

//       {/* EMPTY RIGHT */}
//       <View style={styles.rightSpace} />
//     </View>
//   );
// };

// export default HeaderTitle;

// const styles = StyleSheet.create({
//   container: {
//     marginTop:
//       Platform.OS === 'ios'
//         ? 55
//         : (StatusBar.currentHeight || 20) + 12,

//     paddingHorizontal: 18,

//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     marginBottom: 24,
//   },

//   iconWrapper: {
//     width: 46,
//     height: 46,

//     borderRadius: 16,
//     overflow: 'hidden',

//     justifyContent: 'center',
//     alignItems: 'center',

//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.25)',

//     backgroundColor: 'rgba(255,255,255,0.08)',

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },

//     shadowOpacity: 0.08,
//     shadowRadius: 18,

//     elevation: 10,
//   },

//   title: {
//     flex: 1,

//     textAlign: 'center',

//     fontSize: 28,
//     fontWeight: '700',

//     color: '#111',

//     letterSpacing: 0.4,
//   },

//   rightSpace: {
//     width: 46,
//   },
// });
