import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import screens
import HomeScreen  from '~/screens/home/HomeScreen';
import FilterScreen from '~/screens/home/FilterScreen';
import PlannerScreen from '~/screens/home/PlannerScreen';
import CreateEventScreen from '~/screens/home/CreateEventScreen';
import EventDetailScreen from '~/screens/home/EventDetailScreen';


const HomeStack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home" >
      <HomeStack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Filter" component={FilterScreen} />
      <HomeStack.Screen name="Planner" component={PlannerScreen} />
      <HomeStack.Screen name="Create" component={CreateEventScreen} />
      <HomeStack.Screen name="EventDetail" component={EventDetailScreen} />      
    </HomeStack.Navigator>
  );
}