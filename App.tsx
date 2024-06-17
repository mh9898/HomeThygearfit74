import React from 'react';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackScreen from './screens/StackScreen';
import {Provider} from 'react-redux';

import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
