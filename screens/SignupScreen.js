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
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
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





          {/* inset 0 1px 0 → top highlight */}
          <View style={styles.topInsetHighlight} />

          {/* inset 0 -1px 0 → bottom highlight */}
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
              Create{'\n'}your account
            </Text>

            {/* Name */}
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={styles.input}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={styles.input}
            />

            {/* Password */}
            <Text style={styles.label}>password</Text>
            <TextInput
              secureTextEntry
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={styles.input}
            />

            {/* Terms */}
            <View style={styles.termsRow}>
              <View style={styles.checkbox} />
              <Text style={styles.termsText}>
                by signing up you agree to the terms{'\n'}of service and privacy policy
              </Text>
            </View>

            {/* Sign Up button */}
            <TouchableOpacity
              style={styles.signupBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.signupBtnText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.orLine} />
            </View>

            {/* Social buttons */}
            <View style={styles.socialRow}>

              {/* GOOGLE */}
              <TouchableOpacity style={styles.socialCircle}>
                <Image
                  source={require('../assets/images/google1.png')}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* FACEBOOK */}
              <TouchableOpacity style={styles.socialCircle}>
                <Image
                  source={require('../assets/images/instagram1.png')}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* APPLE */}
              {/* APPLE */}
              <TouchableOpacity style={styles.socialCircle}>
                <Image
                  source={require('../assets/images/apple1.png')}
                  style={styles.appleIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

            </View>

            {/* Bottom */}
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}> Log In</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const RADIUS = 20;

const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  cardShell: {
    width: width * 0.84,
    borderRadius: RADIUS,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 32,
    elevation: 8,
  },

  /* background: rgba(255, 255, 255, 0.65) */
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },





  topInsetHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  socialIcon: {
    width: 24,
    height: 24,
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
    zIndex: 1,
  },

  appleIcon: {
    width: 26,
    height: 26,

    marginLeft: 1,
    marginTop: -1,
  },

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
    paddingTop: 36,
    paddingBottom: 30,
  },

  title: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 46,
    marginBottom: 36,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

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
    marginBottom: 22,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.75)',
    marginRight: 10,
    marginTop: 2,
  },

  termsText: {
    color: '#fff',
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  signupBtn: {
    height: 54,
    backgroundColor: '#000',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },

  orLine: {
    flex: 1,
    height: 0.8,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  orText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 16,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 22,
  },

  socialCircle: {
    width: 52,
    height: 52,

    backgroundColor: 'rgba(0,0,0,0.88)',

    borderRadius: 26,

    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 12,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  socialText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  bottomText: {
    color: '#fff',
    fontSize: 13,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  loginLink: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});