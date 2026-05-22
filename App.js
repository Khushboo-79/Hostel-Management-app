import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SidebarScreen from './screens/SidebarScreen';
import ServicesScreen from './screens/ServicesScreen';
import RoomCleaningScreen from './screens/RoomCleaningScreen';
import LaundryScreen from './screens/LaundryScreen';
import StudyRoomScreen from './screens/StudyRoomScreen';
import RoomDetailsScreen from './screens/RoomDetailsScreen';
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
import DashboardScreen from './screens/DashboardScreen';
import RoomsScreen from './screens/RoomsScreen';
import RoomSelectionScreen from './screens/RoomSelectionScreen';
import BookingSlots from './screens/BookingSlots';
import Thingsinfo from './screens/Thingsinfo';
import OrderDetails from './screens/OrderDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="RoomCleaning" component={RoomCleaningScreen} />
        <Stack.Screen name="Laundry" component={LaundryScreen} />
        <Stack.Screen name="StudyRoom" component={StudyRoomScreen} />
        <Stack.Screen name="RoomDetails" component={RoomDetailsScreen} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Sidebar" component={SidebarScreen} />
        <Stack.Screen name="Rooms" component={RoomsScreen} />
        <Stack.Screen name="RoomSelection" component={RoomSelectionScreen} />
        <Stack.Screen name="BookingSlots" component={BookingSlots} />
        <Stack.Screen name="Thingsinfo" component={Thingsinfo} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}