import React, { useRef, useState } from 'react';

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
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const BACKGROUND_ICONS = [
  { id: '1', name: 'heart', top: '9%', left: '7%', size: 15, opacity: 0.08, rotate: '15deg' },
  { id: '2', name: 'sparkles', top: '17%', left: '84%', size: 20, opacity: 0.08, rotate: '-12deg' },
  { id: '3', name: 'silverware-fork-knife', top: '38%', left: '13%', size: 19, opacity: 0.06, rotate: '10deg' },
  { id: '4', name: 'heart', top: '51%', left: '86%', size: 22, opacity: 0.07, rotate: '22deg' },
  { id: '5', name: 'leaf', top: '70%', left: '8%', size: 20, opacity: 0.07, rotate: '-10deg' },
  { id: '6', name: 'sparkles', top: '82%', left: '58%', size: 16, opacity: 0.07, rotate: '25deg' },
];

const QUICK_PROMPTS = [
  'Plan my week',
  'Healthy dinner',
  'Breakfast ideas',
];

export default function AiAssistantScreen({ navigation }) {
  const scrollRef = useRef(null);
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'ai',
      text: 'Hi Sarah',
      subText: 'I can help with meal plans, food timings, healthy swaps, and hostel menu ideas.',
      time: '09:41 AM',
    },
    {
      id: '2',
      type: 'aiResponse',
      text:
        'Tell me what you want to plan today. I can build a simple weekly menu, suggest balanced combinations, or organize breakfast, lunch, and dinner.',
      time: '09:42 AM',
    },
  ]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  const handleSend = (draft = message) => {
    const cleanMessage = draft.trim();

    if (!cleanMessage) {
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: cleanMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    scrollToBottom();

    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        type: 'aiResponse',
        text:
          'Great. I can turn that into a clean hostel-friendly plan with balanced meals and easy daily variety.',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages(prev => [...prev, aiReply]);
      scrollToBottom();
    }, 850);
  };

  const hasMessage = message.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <LinearGradient
        colors={['#FFF8F5', '#F8F0FF', '#F3FBF8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {BACKGROUND_ICONS.map(item => (
        <Icon
          key={item.id}
          name={item.name}
          size={item.size}
          color="#D65A78"
          style={[
            styles.backgroundIcon,
            {
              top: item.top,
              left: item.left,
              opacity: item.opacity,
              transform: [{ rotate: item.rotate }],
            },
          ]}
        />
      ))}

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => navigation.goBack()}
                style={styles.iconButton}
              >
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="light"
                  blurAmount={18}
                  reducedTransparencyFallbackColor="#FFFFFF"
                />
                <View style={styles.buttonTint} />
                <Icon name="arrow-left" size={24} color="#2A2730" />
              </TouchableOpacity>

              <View style={styles.headerProfile}>
                <View style={styles.avatar}>
                  <LinearGradient
                    colors={['#FF6F91', '#7C5CFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.avatarGradient}
                  >
                    <Icon name="robot-love-outline" size={24} color="#fff" />
                  </LinearGradient>
                </View>

                <View style={styles.headerTextWrap}>
                  <Text style={styles.headerTitle}>Sarah AI</Text>
                  <View style={styles.statusRow}>
                    <View style={styles.statusDot} />
                    <Text style={styles.headerSubTitle}>Online now</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="light"
                  blurAmount={18}
                  reducedTransparencyFallbackColor="#FFFFFF"
                />
                <View style={styles.buttonTint} />
                <Icon name="dots-horizontal" size={24} color="#2A2730" />
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollRef}
              style={styles.chatWrapper}
              contentContainerStyle={styles.chatContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={scrollToBottom}
            >
              <View style={styles.datePill}>
                <Icon name="calendar-heart" size={14} color="#8A5870" />
                <Text style={styles.dateText}>Today</Text>
              </View>

              {messages.map(item => {
                if (item.type === 'user') {
                  return (
                    <View key={item.id} style={styles.userMessageWrapper}>
                      <LinearGradient
                        colors={['#FF7F9A', '#EC4D78']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.userMessageContainer}
                      >
                        <Text style={styles.userMessageText}>{item.text}</Text>

                        <View style={styles.userTimeRow}>
                          <Text style={styles.userTime}>{item.time}</Text>
                          <Icon
                            name="check-all"
                            size={15}
                            color="rgba(255,255,255,0.86)"
                          />
                        </View>
                      </LinearGradient>
                    </View>
                  );
                }

                if (item.type === 'ai') {
                  return (
                    <View key={item.id} style={styles.aiIntroCard}>
                      <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="#FFFFFF"
                      />
                      <LinearGradient
                        colors={['rgba(255,255,255,0.92)', 'rgba(255,255,255,0.56)']}
                        style={StyleSheet.absoluteFill}
                      />

                      <View style={styles.introTopRow}>
                        <View style={styles.introIcon}>
                          <Icon name="sparkles" size={18} color="#EC4D78" />
                        </View>
                        <Text style={styles.aiTitle}>{item.text}</Text>
                      </View>

                      <Text style={styles.aiMessage}>{item.subText}</Text>

                      <View style={styles.aiTimeRow}>
                        <Text style={styles.messageTime}>{item.time}</Text>
                      </View>
                    </View>
                  );
                }

                return (
                  <View key={item.id} style={styles.aiResponseCard}>
                    <BlurView
                      style={StyleSheet.absoluteFill}
                      blurType="light"
                      blurAmount={20}
                      reducedTransparencyFallbackColor="#FFFFFF"
                    />
                    <LinearGradient
                      colors={['rgba(255,255,255,0.88)', 'rgba(255,255,255,0.52)']}
                      style={StyleSheet.absoluteFill}
                    />

                    <View style={styles.aiResponseHeader}>
                      <View style={styles.aiMiniAvatar}>
                        <Icon name="robot-love-outline" size={16} color="#fff" />
                      </View>
                      <Text style={styles.aiResponseTitle}>Sarah AI</Text>
                    </View>

                    <Text style={styles.aiResponseText}>{item.text}</Text>

                    <View style={styles.aiTimeRow}>
                      <Text style={styles.messageTime}>{item.time}</Text>
                    </View>
                  </View>
                );
              })}

             
            </ScrollView>

            <View style={styles.inputContainer}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={15}
                reducedTransparencyFallbackColor="#FFFFFF"
              />
              <View style={styles.inputTint} />

              <View style={styles.inputWrapper}>
                <TouchableOpacity activeOpacity={0.75} style={styles.attachBtn}>
                  <Icon name="paperclip" size={22} color="#7C7480" />
                </TouchableOpacity>

                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Ask about meals, timing, or nutrition..."
                  placeholderTextColor="#9A929B"
                  style={styles.textInput}
                  multiline
                  maxLength={240}
                  returnKeyType="send"
                  onSubmitEditing={() => handleSend()}
                />

                <TouchableOpacity
                  activeOpacity={0.82}
                  style={[styles.sendBtn, !hasMessage && styles.sendBtnDisabled]}
                  onPress={() => handleSend()}
                >
                  <LinearGradient
                    colors={hasMessage ? ['#FF7F9A', '#EC4D78'] : ['#D9D4DA', '#C9C4CC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.sendGradient}
                  >
                    <Icon name="send" size={19} color="#fff" />
                  </LinearGradient>
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
    backgroundColor: '#FFF8F5',
  },

  keyboardAvoid: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  backgroundIcon: {
    position: 'absolute',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop:
      Platform.OS === 'ios'
        ? 10
        : (StatusBar.currentHeight || 0) + 12,
    paddingBottom: 12,
  },

  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
    shadowColor: '#6C5261',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },

  buttonTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.48)',
  },

  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    shadowColor: '#EC4D78',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 8,
  },

  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTextWrap: {
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#24212A',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#32C27A',
    marginRight: 6,
  },

  headerSubTitle: {
    fontSize: 12,
    color: '#716A76',
    fontWeight: '700',
  },

  chatWrapper: {
    flex: 1,
  },

  chatContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
  },

  datePill: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 14,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
    marginBottom: 18,
  },

  dateText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#8A5870',
    fontWeight: '800',
  },

  aiIntroCard: {
    overflow: 'hidden',
    borderRadius: 26,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignSelf: 'flex-start',
    maxWidth: width * 0.82,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    marginBottom: 18,
    shadowColor: '#755A6D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },

  introTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  introIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE7EE',
    marginRight: 10,
  },

  aiTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#24212A',
  },

  aiMessage: {
    fontSize: 15,
    lineHeight: 23,
    color: '#45404A',
    fontWeight: '600',
  },

  userMessageWrapper: {
    alignItems: 'flex-end',
    marginBottom: 18,
  },

  userMessageContainer: {
    maxWidth: width * 0.78,
    borderRadius: 24,
    borderBottomRightRadius: 8,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 10,
    shadowColor: '#EC4D78',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 8,
  },

  userMessageText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },

  userTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },

  aiTimeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },

  messageTime: {
    fontSize: 11,
    color: '#7B7480',
    fontWeight: '700',
  },

  userTime: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.86)',
    fontWeight: '700',
    marginRight: 4,
  },

  aiResponseCard: {
    overflow: 'hidden',
    alignSelf: 'flex-start',
    maxWidth: width * 0.86,
    borderRadius: 26,
    borderBottomLeftRadius: 8,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    marginBottom: 18,
    shadowColor: '#755A6D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.09,
    shadowRadius: 16,
    elevation: 5,
  },

  aiResponseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  aiMiniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7C5CFF',
    marginRight: 9,
  },

  aiResponseTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#24212A',
  },

  aiResponseText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#45404A',
    fontWeight: '600',
  },

  quickPromptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
    marginBottom: 6,
  },

  quickPrompt: {
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.64)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.78)',
    marginRight: 9,
    marginBottom: 9,
  },

  quickPromptText: {
    color: '#6E5362',
    fontSize: 13,
    fontWeight: '800',
  },

  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 16 : 18,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.68)',
  },

  inputTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.36)',
  },

  inputWrapper: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 29,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.92)',
    paddingLeft: 12,
    paddingRight: 7,
    paddingVertical: 5,
    shadowColor: '#6C5261',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },

  attachBtn: {
    width: 42,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    maxHeight: 96,
    minHeight: 46,
    paddingTop: Platform.OS === 'ios' ? 13 : 10,
    paddingBottom: Platform.OS === 'ios' ? 10 : 8,
    paddingHorizontal: 4,
    fontSize: 15,
    color: '#24212A',
    fontWeight: '600',
  },

  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    marginLeft: 6,
  },

  sendBtnDisabled: {
    opacity: 0.78,
  },

  sendGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
