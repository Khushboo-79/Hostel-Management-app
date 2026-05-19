// src/constants/theme.js

import {
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

// ───────────────────────────────────────────────────────────
// SCREEN
// ───────────────────────────────────────────────────────────

const { width, height } =
  Dimensions.get('window');

export const SCREEN_WIDTH = width;

export const SCREEN_HEIGHT = height;

export const isTablet =
  SCREEN_WIDTH >= 768;

export const isSmallPhone =
  SCREEN_WIDTH <= 360;

// ───────────────────────────────────────────────────────────
// SCALING
// ───────────────────────────────────────────────────────────

export const wp = percentage =>
  PixelRatio.roundToNearestPixel(
    (SCREEN_WIDTH * percentage) / 100,
  );

export const hp = percentage =>
  PixelRatio.roundToNearestPixel(
    (SCREEN_HEIGHT * percentage) / 100,
  );

export const scaleH = size => scale(size);

export const scaleV = size =>
  verticalScale(size);

export const scaleM = (
  size,
  factor = 0.5,
) => moderateScale(size, factor);

export const scaleMV = (
  size,
  factor = 0.5,
) =>
  moderateVerticalScale(size, factor);

// ───────────────────────────────────────────────────────────
// COLORS
// ───────────────────────────────────────────────────────────

export const COLORS = {
  // Brand
  primary: '#085BFF',

  primaryLight: '#EAF2FF',

  primaryDark: '#003EB3',

  secondary: '#363795',

  accent: '#3398FF',

  // Luxury
  luxuryGold: '#D4AF37',

  luxuryGoldLight: '#FFF6D8',

  luxuryDark: '#1E1E2D',

  luxuryBlack: '#111111',

  // Status
  success: '#00BF5F',

  successDark: '#187618',

  warning: '#FFC107',

  error: '#EF4444',

  info: '#1080E9',

  // Ratings
  ratingStarFill: '#FFC107',

  ratingStarEmpty: '#E5E7EB',

  // Background
  background: '#F9FAFB',

  surface: '#FFFFFF',

  inputBackground: '#F2F2F2',

  overlay: 'rgba(0,0,0,0.45)',

  overlayLight: 'rgba(0,0,0,0.18)',

  // Text
  textPrimary: '#111111',

  textSecondary: '#444444',

  textMuted: '#666666',

  textLight: '#9CA3AF',

  textWhite: '#FFFFFF',

  // Border
  border: '#E5E7EB',

  borderLight: '#F1F1F1',

  glassBorder:
    'rgba(255,255,255,0.24)',

  // Gray
  gray100: '#F3F4F6',

  gray200: '#E5E7EB',

  gray300: '#D1D5DB',

  gray400: '#9CA3AF',

  gray500: '#6B7280',

  gray600: '#4B5563',

  gray700: '#374151',

  gray800: '#1F2937',

  gray900: '#111827',

  // Utility
  white: '#FFFFFF',

  black: '#000000',

  transparent: 'transparent',
};

// ───────────────────────────────────────────────────────────
// GRADIENTS
// ───────────────────────────────────────────────────────────

export const GRADIENTS = {
  // Primary
  primary: [
    '#085BFF',
    '#3398FF',
  ],

  primaryDark: [
    '#2F2F2F',
    '#111111',
  ],

  primaryGlass: [
    'rgba(8,91,255,0.85)',
    'rgba(51,152,255,0.75)',
  ],

  // Luxury
  luxuryDark: [
    '#2C2C2E',
    '#111111',
  ],

  luxuryGold: [
    '#D4AF37',
    '#F4D03F',
  ],

  premiumCard: [
    '#2D1B00',
    '#111111',
  ],

  // Glassmorphism
  glassLight: [
    'rgba(255,255,255,0.32)',
    'rgba(255,255,255,0.10)',
  ],

  glassDark: [
    'rgba(60,60,60,0.85)',
    'rgba(25,25,25,0.80)',
  ],

  glassUltraLight: [
    'rgba(255,255,255,0.45)',
    'rgba(255,255,255,0.12)',
  ],

  // Overlay
  overlayLight: [
    'rgba(255,255,255,0.12)',
    'rgba(255,255,255,0.06)',
    'rgba(0,0,0,0.10)',
  ],

  overlayDark: [
    'rgba(0,0,0,0.10)',
    'rgba(0,0,0,0.55)',
  ],

  // Buttons
  buttonPrimary: [
    '#085BFF',
    '#0061F2',
  ],

  buttonDark: [
    '#3A3A3A',
    '#111111',
  ],

  buttonSuccess: [
    '#00BF5F',
    '#187618',
  ],

  // Status
  success: [
    '#00BF5F',
    '#187618',
  ],

  warning: [
    '#FFC107',
    '#FF9800',
  ],

  error: [
    '#EF4444',
    '#B91C1C',
  ],

  // Cards
  cardLuxury: [
    'rgba(255,255,255,0.20)',
    'rgba(255,255,255,0.08)',
  ],

  cardDark: [
    '#2B2B2B',
    '#151515',
  ],

  // Shimmer
  shimmer: [
    '#F3F4F6',
    '#E5E7EB',
    '#F3F4F6',
  ],
};

// ───────────────────────────────────────────────────────────
// FONT FAMILY
// ───────────────────────────────────────────────────────────

export const FONT_FAMILY = {
  thin: 'Poppins-Thin',

  light: 'Poppins-Light',

  regular: 'Poppins-Regular',

  medium: 'Poppins-Medium',

  semibold: 'Poppins-SemiBold',

  bold: 'Poppins-Bold',

  extrabold: 'Poppins-ExtraBold',

  black: 'Poppins-Black',

  // Spread styles
  w400: {
    fontFamily: 'Poppins-Regular',
  },

  w500: {
    fontFamily: 'Poppins-Medium',
  },

  w600: {
    fontFamily: 'Poppins-SemiBold',
  },

  w700: {
    fontFamily: 'Poppins-Bold',
  },

  w800: {
    fontFamily: 'Poppins-ExtraBold',
  },

  w900: {
    fontFamily: 'Poppins-Black',
  },
};

// ───────────────────────────────────────────────────────────
// TYPOGRAPHY
// ───────────────────────────────────────────────────────────

export const TYPOGRAPHY = {
  tiny: scaleM(10),

  small: scaleM(12),

  body: scaleM(14),

  default: scaleM(16),

  title: scaleM(20),

  heading: scaleM(24),

  hero: scaleM(30),

  display: scaleM(40),

  // Line Heights
  lineHeightSmall: scaleV(18),

  lineHeightBody: scaleV(22),

  lineHeightTitle: scaleV(28),

  lineHeightHeading: scaleV(34),

  // Presets
  bodyText: {
    fontSize: scaleM(14),

    lineHeight: scaleV(22),

    fontFamily:
      'Poppins-Regular',
  },

  titleText: {
    fontSize: scaleM(20),

    lineHeight: scaleV(28),

    fontFamily:
      'Poppins-SemiBold',
  },

  headingText: {
    fontSize: scaleM(24),

    lineHeight: scaleV(34),

    fontFamily:
      'Poppins-Bold',
  },

  captionText: {
    fontSize: scaleM(12),

    lineHeight: scaleV(18),

    fontFamily:
      'Poppins-Regular',
  },

  priceText: {
    fontSize: scaleM(22),

    lineHeight: scaleV(30),

    fontFamily:
      'Poppins-Bold',
  },
};

// ───────────────────────────────────────────────────────────
// SPACING
// ───────────────────────────────────────────────────────────

export const SPACING = {
  xs: scaleH(4),

  sm: scaleH(8),

  md: scaleH(12),

  lg: scaleH(16),

  xl: scaleH(24),

  xxl: scaleH(32),

  xxxl: scaleH(40),

  screenHorizontal: isTablet
    ? scaleH(32)
    : scaleH(20),

  screenVertical: scaleV(24),

  cardGap: scaleH(12),

  sectionGap: scaleV(32),
};

// ───────────────────────────────────────────────────────────
// RADIUS
// ───────────────────────────────────────────────────────────

export const RADIUS = {
  xs: scaleH(4),

  sm: scaleH(8),

  md: scaleH(12),

  lg: scaleH(20),

  xl: scaleH(28),

  full: 9999,
};

// ───────────────────────────────────────────────────────────
// COMPONENT SIZES
// ───────────────────────────────────────────────────────────

export const COMPONENT_SIZES = {
  buttonSmall: scaleV(36),

  buttonMedium: scaleV(48),

  buttonLarge: scaleV(58),

  inputSmall: scaleV(44),

  inputMedium: scaleV(52),

  iconSmall: scaleH(16),

  iconMedium: scaleH(24),

  iconLarge: scaleH(32),

  iconXLarge: scaleH(40),

  avatarSmall: scaleH(36),

  avatarMedium: scaleH(48),

  avatarLarge: scaleH(64),

  avatarXLarge: scaleH(96),

  cardRadius: scaleH(18),

  cardPadding: scaleH(16),

  headerHeight: scaleV(60),

  tabBarHeight: scaleV(64),
};

// ───────────────────────────────────────────────────────────
// SHADOWS
// ───────────────────────────────────────────────────────────

export const SHADOWS = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: scaleV(1),
      },

      shadowOpacity: 0.08,

      shadowRadius: scaleH(4),
    },

    android: {
      elevation: 2,
    },
  }),

  medium: Platform.select({
    ios: {
      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: scaleV(2),
      },

      shadowOpacity: 0.1,

      shadowRadius: scaleH(8),
    },

    android: {
      elevation: 4,
    },
  }),

  large: Platform.select({
    ios: {
      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: scaleV(4),
      },

      shadowOpacity: 0.15,

      shadowRadius: scaleH(12),
    },

    android: {
      elevation: 8,
    },
  }),
};

// ───────────────────────────────────────────────────────────
// Z INDEX
// ───────────────────────────────────────────────────────────

export const Z_INDEX = {
  dropdown: 1000,

  stickyHeader: 1100,

  modal: 2000,

  toast: 3000,

  loader: 4000,
};

// ───────────────────────────────────────────────────────────
// ANIMATION
// ───────────────────────────────────────────────────────────

export const ANIMATION = {
  fast: 200,

  normal: 300,

  slow: 500,
};

// ───────────────────────────────────────────────────────────
// THEMES
// ───────────────────────────────────────────────────────────

export const lightTheme = {
  background: COLORS.background,

  surface: COLORS.surface,

  textPrimary:
    COLORS.textPrimary,

  textSecondary:
    COLORS.textSecondary,

  border: COLORS.border,
};

export const darkTheme = {
  background: COLORS.gray900,

  surface: COLORS.gray800,

  textPrimary: COLORS.white,

  textSecondary:
    COLORS.gray300,

  border: COLORS.gray700,
};

// ───────────────────────────────────────────────────────────
// DEFAULT EXPORT
// ───────────────────────────────────────────────────────────

const appTheme = {
  COLORS,

  GRADIENTS,

  FONT_FAMILY,

  TYPOGRAPHY,

  SPACING,

  RADIUS,

  COMPONENT_SIZES,

  SHADOWS,

  Z_INDEX,

  ANIMATION,

  lightTheme,

  darkTheme,

  wp,

  hp,

  scaleH,

  scaleV,

  scaleM,

  scaleMV,

  SCREEN_WIDTH,

  SCREEN_HEIGHT,

  isTablet,

  isSmallPhone,
};

export default appTheme;


// // src/constants/theme.js
// import { Dimensions, PixelRatio, Platform } from 'react-native';
// import {
//   scale,
//   verticalScale,
//   moderateScale,
//   moderateVerticalScale,
// } from 'react-native-size-matters';

// // ─── Screen ───────────────────────────────────────────────
// const { width, height } = Dimensions.get('window');
// export const SCREEN_WIDTH  = width;
// export const SCREEN_HEIGHT = height;
// export const isTablet      = SCREEN_WIDTH >= 768;
// export const isSmallPhone  = SCREEN_WIDTH <= 360;

// // ─── Scaling ──────────────────────────────────────────────
// export const wp    = p  => PixelRatio.roundToNearestPixel((SCREEN_WIDTH  * p) / 100);
// export const hp    = p  => PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * p) / 100);
// export const scaleH  = s       => scale(s);
// export const scaleV  = s       => verticalScale(s);
// export const scaleM  = (s, f=0.5) => moderateScale(s, f);
// export const scaleMV = (s, f=0.5) => moderateVerticalScale(s, f);

// // ─── Colors ───────────────────────────────────────────────
// export const COLORS = {
//   // Brand
//   primary:          '#085BFF',
//   primaryLight:     '#085BFF1A',
//   primaryDark:      'rgba(40,40,40,0.4)',
//   secondary:        '#363795',
//   accent:           '#3398FF',

//   // Hotel Luxury
//   luxuryGold:       '#D4AF37',
//   luxuryGoldLight:  '#D4AF3720',
//   luxuryDark:       '#1E1E2D',

//   // Booking Status
//   statusConfirmed:  '#00BF5F',
//   statusPending:    '#FFC107',
//   statusCancelled:  '#EF4444',
//   statusCheckedIn:  '#085BFF',

//   // Semantic
//   success:          '#00BF5F',
//   successDark:      '#187618',
//   warning:          '#FFC107',
//   error:            '#EF4444',
//   info:             '#1080E9',

//   // Hotel UI Specific
//   ratingStarFill:   '#FFC107',
//   ratingStarEmpty:  '#E5E7EB',
//   priceTag:         '#085BFF',
//   discountBadge:    '#EF4444',
//   amenityIconBg:    '#F0F4FF',

//   // Backgrounds
//   background:       '#F9FAFB',
//   surface:          '#FFFFFF',
//   inputBackground:  '#F2F2F2',
//   overlay:          'rgba(0,0,0,0.4)',
//   overlayLight:     'rgba(0,0,0,0.2)',

//   // Text
//   textPrimary:      '#111111',
//   textSecondary:    '#444444',
//   textMuted:        '#616161',
//   textLight:        '#9496A1',
//   textWhite:        '#FFFFFF',

//   // Borders
//   border:           '#E5E7EB',
//   borderLight:      '#DDDDDD',

//   // Grayscale
//   gray100:          '#F3F4F6',
//   gray200:          '#E5E7EB',
//   gray300:          '#D1D5DB',
//   gray400:          '#9CA3AF',
//   gray500:          '#6B7280',
//   gray600:          '#4B5563',
//   gray700:          '#374151',
//   gray800:          '#1F2937',
//   gray900:          '#111827',

//   // Utility
//   white:            '#FFFFFF',
//   black:            '#000000',
//   transparent:      'transparent',
// };

// // ─── Font Family ──────────────────────────────────────────
// export const FONT_FAMILY = {
//   thin:      'Poppins-Thin',
//   light:     'Poppins-Light',
//   regular:   'Poppins-Regular',
//   medium:    'Poppins-Medium',
//   semibold:  'Poppins-SemiBold',
//   bold:      'Poppins-Bold',
//   extrabold: 'Poppins-ExtraBold',
//   black:     'Poppins-Black',

//   // Object spreads — use directly in StyleSheet
//   w400: { fontFamily: 'Poppins-Regular'   },
//   w500: { fontFamily: 'Poppins-Medium'    },
//   w600: { fontFamily: 'Poppins-SemiBold'  },
//   w700: { fontFamily: 'Poppins-Bold'      },
//   w800: { fontFamily: 'Poppins-ExtraBold' },
//   w900: { fontFamily: 'Poppins-Black'     },
// };

// // ─── Typography ───────────────────────────────────────────
// export const TYPOGRAPHY = {
//   // Font sizes
//   tiny:    scaleM(10),
//   small:   scaleM(12),
//   body:    scaleM(14),
//   default: scaleM(16),
//   title:   scaleM(20),
//   heading: scaleM(24),
//   hero:    scaleM(30),
//   display: scaleM(40),

//   // Line heights
//   lineHeightSmall:   scaleV(18),
//   lineHeightBody:    scaleV(22),
//   lineHeightTitle:   scaleV(28),
//   lineHeightHeading: scaleV(34),

//   // Paired text styles — spread directly into StyleSheet
//   bodyText: {
//     fontSize:   scaleM(14),
//     lineHeight: scaleV(22),
//     fontFamily: 'Poppins-Regular',
//   },
//   titleText: {
//     fontSize:   scaleM(20),
//     lineHeight: scaleV(28),
//     fontFamily: 'Poppins-SemiBold',
//   },
//   headingText: {
//     fontSize:   scaleM(24),
//     lineHeight: scaleV(34),
//     fontFamily: 'Poppins-Bold',
//   },
//   captionText: {
//     fontSize:   scaleM(12),
//     lineHeight: scaleV(18),
//     fontFamily: 'Poppins-Regular',
//   },
//   priceText: {
//     fontSize:   scaleM(22),
//     lineHeight: scaleV(30),
//     fontFamily: 'Poppins-Bold',
//   },
// };

// // ─── Spacing ──────────────────────────────────────────────
// export const SPACING = {
//   xs:   scaleH(4),
//   sm:   scaleH(8),
//   md:   scaleH(12),
//   lg:   scaleH(16),
//   xl:   scaleH(24),
//   xxl:  scaleH(32),
//   xxxl: scaleH(40),

//   screenHorizontal: isTablet ? scaleH(32) : scaleH(20),
//   screenVertical:   scaleV(24),

//   // Hotel specific
//   cardGap:         scaleH(12),
//   sectionGap:      scaleV(32),
//   listItemPadding: scaleH(16),
//   badgePaddingH:   scaleH(10),
//   badgePaddingV:   scaleV(4),
// };

// // ─── Radius ───────────────────────────────────────────────
// export const RADIUS = {
//   xs:   scaleH(4),
//   sm:   scaleH(8),
//   md:   scaleH(12),
//   lg:   scaleH(20),
//   xl:   scaleH(28),
//   full: 9999,
// };

// // ─── Component Sizes ──────────────────────────────────────
// export const COMPONENT_SIZES = {
//   buttonSmall:  scaleV(36),
//   buttonMedium: scaleV(48),
//   buttonLarge:  scaleV(56),

//   inputSmall:  scaleV(44),
//   inputMedium: scaleV(52),

//   iconSmall:  scaleH(16),
//   iconMedium: scaleH(24),
//   iconLarge:  scaleH(32),
//   iconXLarge: scaleH(40),

//   avatarSmall:  scaleH(36),
//   avatarMedium: scaleH(48),
//   avatarLarge:  scaleH(64),
//   avatarXLarge: scaleH(96),

//   cardRadius:   scaleH(18),
//   cardPadding:  scaleH(16),

//   hotelCardHeight:  scaleV(260),
//   hotelImageHeight: scaleV(200),
//   roomCardHeight:   scaleV(220),
//   roomImageHeight:  scaleV(160),
//   amenityIcon:      scaleH(28),

//   headerHeight: scaleV(60),
//   tabBarHeight: scaleV(64),
//   modalRadius:  scaleH(24),
// };

// // ─── Shadows (scaled) ─────────────────────────────────────
// export const SHADOWS = {
//   small: Platform.select({
//     ios: {
//       shadowColor:   '#000',
//       shadowOffset:  { width: 0, height: scaleV(1) },
//       shadowOpacity: 0.08,
//       shadowRadius:  scaleH(4),
//     },
//     android: { elevation: 2 },
//   }),
//   medium: Platform.select({
//     ios: {
//       shadowColor:   '#000',
//       shadowOffset:  { width: 0, height: scaleV(2) },
//       shadowOpacity: 0.10,
//       shadowRadius:  scaleH(8),
//     },
//     android: { elevation: 4 },
//   }),
//   large: Platform.select({
//     ios: {
//       shadowColor:   '#000',
//       shadowOffset:  { width: 0, height: scaleV(4) },
//       shadowOpacity: 0.15,
//       shadowRadius:  scaleH(12),
//     },
//     android: { elevation: 8 },
//   }),
// };

// // ─── Z Index ──────────────────────────────────────────────
// export const Z_INDEX = {
//   dropdown:     1000,
//   stickyHeader: 1100,
//   modal:        2000,
//   toast:        3000,
//   loader:       4000,
// };

// // ─── Animation ────────────────────────────────────────────
// export const ANIMATION = {
//   fast:   200,
//   normal: 300,
//   slow:   500,
// };

// // ─── Themes ───────────────────────────────────────────────
// export const lightTheme = {
//   background:    COLORS.background,
//   surface:       COLORS.surface,
//   textPrimary:   COLORS.textPrimary,
//   textSecondary: COLORS.textSecondary,
//   border:        COLORS.border,
// };

// export const darkTheme = {
//   background:    COLORS.gray900,
//   surface:       COLORS.gray800,
//   textPrimary:   COLORS.white,
//   textSecondary: COLORS.gray300,
//   border:        COLORS.gray700,
// };

// // ─── Default Export ───────────────────────────────────────
// const appTheme = {
//   COLORS, FONT_FAMILY, TYPOGRAPHY,
//   SPACING, RADIUS, COMPONENT_SIZES,
//   SHADOWS, Z_INDEX, ANIMATION,
//   lightTheme, darkTheme,
//   wp, hp, scaleH, scaleV, scaleM, scaleMV,
//   SCREEN_WIDTH, SCREEN_HEIGHT, isTablet, isSmallPhone,
// };

// export default appTheme;