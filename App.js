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
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import DownloadReceiptScreen from './screens/DownloadReceiptScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import WashroomRequestScreen from './screens/WashroomRequestScreen';
import RoomRequestScreen from './screens/RoomRequestScreen';
import GymScreen from './screens/GymScreen';
import GymViewPlansScreen from './screens/GymViewPlansScreen';
import VehicleRentScreen from './screens/services/vehicleRent/VehicleRentScreen';
import AllVehicleScreen from './screens/services/vehicleRent/AllVehicleScreen';
import VehicleProductDetailsScreen from './screens/services/vehicleRent/VehicleProductDetailsScreen';
import BookVehicleScreen from './screens/services/vehicleRent/BookVehicleScreen';

import CabBooking from './screens/CabBooking/CabBooking';
import BookRide from './screens/CabBooking/BookRide';
import MyRides from './screens/CabBooking/MyRides';
import RideTracking from './screens/CabBooking/RideTracking';
import RewardsTab from './screens/Rewards/RewardsTab';

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
        <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
        <Stack.Screen name="DownloadReceipt" component={DownloadReceiptScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="WashroomRequest" component={WashroomRequestScreen} />
        <Stack.Screen name="RoomRequest" component={RoomRequestScreen} />
        <Stack.Screen name="Gym" component={GymScreen} />
        <Stack.Screen name="GymViewPlans" component={GymViewPlansScreen} />
        <Stack.Screen name="VehicleRent" component={VehicleRentScreen} />
        <Stack.Screen name="AllVehicle" component={AllVehicleScreen} />
        <Stack.Screen name="VehicleProductDetails" component={VehicleProductDetailsScreen} />
        <Stack.Screen name="BookVehicle" component={BookVehicleScreen} />
        <Stack.Screen name="CabBooking" component={CabBooking} />
        <Stack.Screen name="BookRide" component={BookRide} />
        <Stack.Screen name="MyRides" component={MyRides} />
        <Stack.Screen name="RideTracking" component={RideTracking} />
        <Stack.Screen name="RewardsTab" component={RewardsTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
