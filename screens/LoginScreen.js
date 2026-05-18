import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/images/room1.jpg')}
        style={styles.background}
        resizeMode="cover"

        imageStyle={{
          transform: [{ scale: 1.1 }],
        }}>

        <View style={styles.overlay} />

        {/* Menu button */}
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.navigate('Sidebar')}
        >
          <Icon name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        {/* ========== GLASS CARD ========== */}
        <View style={styles.cardShell}>

          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={12}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.65)"
          />

          {/* background: rgba(255, 255, 255, 0.16) */}
          <View style={styles.glassBg} />





          {/* inset 0 1px 0 rgba(255,255,255,0.5) → top highlight */}
          <View style={styles.topInsetHighlight} />

          {/* inset 0 -1px 0 rgba(255,255,255,0.1) → bottom highlight */}
          <View style={styles.bottomInsetHighlight} />

          {/* ::before → top edge horizontal gradient line */}
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

          {/* ::after → left edge vertical gradient line */}
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

          {/* ---- Content ---- */}
          <View style={styles.content}>

            <Text style={styles.title}>
              Log into{'\n'}your account
            </Text>

            {/* Username / Email */}
            <Text style={styles.label}>Username/Email</Text>
            <TextInput
              placeholder=""
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={styles.input}
            />

            {/* Password */}
            <View style={styles.passwordRow}>
              <Text style={styles.label}>password</Text>
              <TouchableOpacity>
                <Text style={styles.label}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              secureTextEntry
              style={styles.input}
            />

            {/* Remember me */}
            <View style={styles.rememberRow}>
              <View style={styles.checkbox} />
              <Text style={styles.rememberText}>Remember me?</Text>
            </View>

            {/* Log in button */}
            <TouchableOpacity
              style={styles.loginBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Services')}
            >
              <Text style={styles.loginBtnText}>Log in</Text>
            </TouchableOpacity>

            {/* Google button */}
            <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.googleBtnText}>Log in with Google</Text>
            </TouchableOpacity>

            {/* Bottom link */}
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}> Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ImageBackground>
    </>
  );
}

/*
  CSS → React Native mapping:
  ─────────────────────────────────────────────────
  background: rgba(255,255,255,0.37)         → glassBg
  backdrop-filter: blur(17px)                → BlurView blurAmount=17
  border-radius: 20px                        → borderRadius: 20
  border: 1px solid rgba(255,255,255,0.3)    → borderWidth: 1, borderColor
  box-shadow: 0 8px 32px rgba(0,0,0,0.1)    → shadow props
  inset 0 1px 0 rgba(255,255,255,0.5)       → topInsetHighlight
  inset 0 -1px 0 rgba(255,255,255,0.1)      → bottomInsetHighlight
  inset 0 0 40px 20px rgba(255,255,255,2)   → innerGlow
  ::before                                   → topEdgeLine (horizontal gradient)
  ::after                                    → leftEdgeLine (vertical gradient)
  ─────────────────────────────────────────────────
*/

const RADIUS = 20;

const styles = StyleSheet.create({

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  menuBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 24) + 16,
    left: 24,
    zIndex: 10,
  },

  /* ───── Glass card shell ─────
     border-radius: 20px
     border: 1px solid rgba(255,255,255,0.3)
     box-shadow: 0 8px 32px rgba(0,0,0,0.1)
  */
  cardShell: {
    width: width * 0.84,
    borderRadius: RADIUS,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',

    /* box-shadow: 0 8px 32px rgba(0,0,0,0.1) */
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 32,
    elevation: 8,
  },

  /* background: rgba(255, 255, 255, 0.46) */
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.46)',
  },





  /* inset 0 1px 0 rgba(255,255,255,0.5) → thin top highlight */
  topInsetHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  /* inset 0 -1px 0 rgba(255,255,255,0.1) → thin bottom highlight */
  bottomInsetHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  /* ::before → top edge horizontal gradient line */
  topEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    zIndex: 1,
  },

  /* ::after → left edge vertical gradient line */
  leftEdgeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: '100%',
    zIndex: 1,
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 34,
  },

  /* ───── Title ───── */
  title: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 46,
    marginBottom: 48,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  /* ───── Form ───── */
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.55)',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 24,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* ───── Remember me ───── */
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.75)',
    marginRight: 10,
  },

  rememberText: {
    color: '#fff',
    fontSize: 13,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  /* ───── Buttons ───── */
  loginBtn: {
    height: 54,
    backgroundColor: '#000',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  loginBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  googleBtn: {
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleIcon: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginRight: 10,
  },

  googleBtnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },

  /* ───── Bottom ───── */
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },

  bottomText: {
    color: '#fff',
    fontSize: 13,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  signupLink: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});