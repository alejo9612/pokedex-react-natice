import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { Navigation } from './src/navigator/Navigation';
import { Tabs } from './src/navigator/Tabs';

export default function App() {
  return (
    <NavigationContainer>
      {/* <Navigation /> */}
      <Tabs/>
    </NavigationContainer>
  );
}