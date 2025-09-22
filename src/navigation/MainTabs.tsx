import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Players from '../screens/Players';
import Leaderboard from '../screens/Leaderboard';
import Social from '../screens/Social';
import Settings from '../screens/Settings';
import { Brand } from '../theme/brand';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: () => (
          <Image source={Brand.wordmark} style={{ width: 160, height: 28, resizeMode: 'contain' }} />
        ),
        headerTitleAlign: 'center',
        tabBarActiveTintColor: Brand.navy,
      }}
    >
      <Tab.Screen name="Players" component={Players} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Social" component={Social} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
