import React from 'react';
import { Tabs } from 'expo-router';
import { TabCapsule } from '../../src/components/navigation/TabCapsule';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabCapsule {...props} />}
      screenOptions={{
        headerShown: false, // We render premium headers per-screen
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="twin"
        options={{
          title: 'Twin',
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'AI',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
