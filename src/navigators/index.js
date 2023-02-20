import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen, Options, SignInScreen} from '../screens';
import BottomHomeScreen from '../screens/BottomHomeScreen';
import DetailCardScreen from '../screens/DetailCardScreen';
import CartScreen from '../screens/CartScreen';
import Search from '../screens/Search';
import RegisterScreen from '../screens/RegisterScreen';
const Stack = createStackNavigator();

const Navigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Options" component={Options} />
        <Stack.Screen name="ButtonHome" component={BottomHomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="DetailCardScreen" component={DetailCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
