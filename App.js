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
import AiAssistantScreen from './screens/AiAssistantScreen';
import MealScreen from './screens/MealScreen';
import WeeklyMealMenuScreen from './screens/WeeklyMealMenuScreen';
import PaymentBillingScreen from './screens/PaymentBillingScreen';
import MyInvoicesScreen from './screens/MyInvoicesScreen';
import InvoiceDetailScreen from './screens/InvoiceDetailScreen';
import BillingSummaryScreen from './screens/BillingSummaryScreen';
import PayScreen from './screens/PayScreen';
import PaymentFailedScreen from './screens/PaymentFailedScreen';

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
        <Stack.Screen name="AiAssistant" component={AiAssistantScreen} />
        <Stack.Screen name="Meal" component={MealScreen} />
        <Stack.Screen name="WeeklyMealMenu" component={WeeklyMealMenuScreen} />
        <Stack.Screen name="PaymentBilling" component={PaymentBillingScreen} />
        <Stack.Screen name="MyInvoices" component={MyInvoicesScreen} />
        <Stack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
        <Stack.Screen name="BillingSummary" component={BillingSummaryScreen} />
        <Stack.Screen name="PayScreen" component={PayScreen} />
        <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}