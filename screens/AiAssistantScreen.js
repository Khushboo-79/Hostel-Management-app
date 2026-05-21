import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

// ─── Subtle Faded Pink Heart Patterns ──────────────────────────────────────────
const HEARTS = [
  { id: '1', top: '12%', left: '8%', size: 14, opacity: 0.12, rotate: '15deg' },
  { id: '2', top: '22%', left: '82%', size: 18, opacity: 0.10, rotate: '-20deg' },
  { id: '3', top: '38%', left: '32%', size: 13, opacity: 0.14, rotate: '10deg' },
  { id: '4', top: '52%', left: '78%', size: 20, opacity: 0.08, rotate: '25deg' },
  { id: '5', top: '68%', left: '12%', size: 16, opacity: 0.12, rotate: '-15deg' },
  { id: '6', top: '80%', left: '55%', size: 15, opacity: 0.09, rotate: '30deg' },
  { id: '7', top: '7%', left: '60%', size: 12, opacity: 0.11, rotate: '-5deg' },
  { id: '8', top: '46%', left: '88%', size: 17, opacity: 0.10, rotate: '18deg' },
  { id: '9', top: '62%', left: '85%', size: 14, opacity: 0.13, rotate: '-12deg' },
  { id: '10', top: '30%', left: '10%', size: 19, opacity: 0.09, rotate: '22deg' },
];

export default function AiAssistantScreen({ navigation }) {
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Scattered background hearts */}
      {HEARTS.map((heart) => (
        <Text
          key={heart.id}
          style={[
            styles.heart,
            {
              top: heart.top,
              left: heart.left,
              fontSize: heart.size,
              opacity: heart.opacity,
              transform: [{ rotate: heart.rotate }],
            },
          ]}
        >
          ❤
        </Text>
      ))}

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            
            {/* ── HEADER AREA (Back Button) ─────────────────────────────────── */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.6}
                style={styles.backBtn}
              >
                <Icon name="arrow-left" size={28} color="#2D2D2D" />
              </TouchableOpacity>
            </View>

            {/* ── CHAT SCREEN AREA ──────────────────────────────────────────── */}
            <View style={styles.chatArea}>
              <View style={styles.chatBubble}>
                <Text style={styles.bubbleTitle}>Hi Sarah!</Text>
                <Text style={styles.bubbleSubtitle}>How can i help you today?</Text>
              </View>
            </View>

            {/* ── WHATSAPP-LIKE BOTTOM INPUT BAR ───────────────────────────── */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type a message..."
                  placeholderTextColor="#A0A0A0"
                  value={message}
                  onChangeText={setMessage}
                  multiline={false}
                />
                <TouchableOpacity 
                  activeOpacity={0.7} 
                  style={[
                    styles.sendBtn, 
                    { backgroundColor: message.trim() ? '#FF8FA3' : '#FFA6B9' }
                  ]}
                >
                  <Icon name="send" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FCFAF6', // Soft cream/off-white background
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heart: {
    position: 'absolute',
    color: '#FFA6B9', // Soft pastel pink heart color
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 12 : (StatusBar.currentHeight || 0) + 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  chatArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16, // places bubble beautifully above input
  },
  chatBubble: {
    backgroundColor: '#FFE3E8', // Soft pastel pink chat bubble background
    borderWidth: 1.5,
    borderColor: '#FFC8D4', // Subtle pink border matching the pink shade
    borderRadius: 24,
    borderBottomLeftRadius: 6, // Cute elegant speech bubble style
    paddingHorizontal: 22,
    paddingVertical: 16,
    alignSelf: 'flex-start', // keeps it bottom-left aligned
    maxWidth: '82%',
    elevation: 2, // very minimal soft shadow depth
    shadowColor: '#FFC8D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  bubbleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000', // black text for header
    marginBottom: 5,
    letterSpacing: 0.3,
  },
  bubbleSubtitle: {
    fontSize: 14,
    color: '#4A4A4A', // clean charcoal-black text
    lineHeight: 18,
    fontWeight: '500',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // clean white input background
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#FFE3E8', // soft cute pink input border
    paddingLeft: 18,
    paddingRight: 6,
    height: 54,
    shadowColor: '#FFC8D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#333333',
    paddingVertical: 8,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
