import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigation } from './Navigation';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { TabSearch } from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {

    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white',
            }}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#438896',
                tabBarLabelStyle: {
                    marginBottom: (Platform.OS === 'ios') ? 0 : 10
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.88)',
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios') ? 0 : 60
                }
            })}

        >
            <Tab.Screen name="HomeScreen" component={Navigation}
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="list" size={25} color={color} />
                    )
                }}
            />
            <Tab.Screen name="SearchScreen" component={TabSearch}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="search-outline" size={25} color={color} />
                    )
                }} />
        </Tab.Navigator >
    );
}