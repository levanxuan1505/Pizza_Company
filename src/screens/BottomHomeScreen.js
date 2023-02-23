/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {View, Platform} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import {Colors} from '../constants';
import CartScreen from './CartScreen';
import Search from './Search';
import BookmarkScreen from './BookmarkScreen';
import ProfileScreen from './ProfileScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'News Home';
    case 'Search':
      return 'My Search';
    case 'Card':
      return 'My Card';
    case 'Bookmark':
      return 'My Bookmark';
    case 'Profile':
      return 'My Profile';
  }
}
export default function BottomHomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.DEFAULT_GREEN,
        tabBarShowLabel: false,
        tabBarStyle: [{display: 'flex'}, null],
      }}
      // bản cũ sẽ dùng tabBarOptions
      // tabBarOptions={{
      //   style: {
      //     height: 55,
      //     borderTopWidth: 0,
      //     elevation: 0,
      //   },
      //   showLabel: false,
      //   activeTintColor: Colors.DEFAULT_GREEN,
      // }}
    >
      <Tab.Screen
        name="ButtonHome"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: 3,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <View
              style={{
                height: 70,
                width: 70,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 4,
                borderRadius: 40,
                backgroundColor: Colors.DEFAULT_WHITE,
                borderColor: {color} ? color : Colors.DEFAULT_WHITE,
                top: Platform.OS === 'ios' ? -10 : -16,
                elevation: 5,
              }}>
              <Icon name="search" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          tabBarBadge: 10,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="bookmarks" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="supervised-user-circle" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
