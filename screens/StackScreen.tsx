import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ModalScreen from './ModalScreen';

export type StackScreenProps = {
  HomeScreen: undefined;
  DetailsScreen: {score: string};
};

export type RootScreenProps = {
  Main: undefined;
  ModalScreen: {score: string};
};

const MainStack = createStackNavigator<StackScreenProps>();
const RootStack = createStackNavigator<RootScreenProps>();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      <MainStack.Screen name="DetailsScreen" component={DetailsScreen} />
    </MainStack.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ModalScreen"
        component={ModalScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
