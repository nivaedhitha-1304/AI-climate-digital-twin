import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, Platform, useWindowDimensions } from 'react-native';
import { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { CloudSun, Globe, BarChart2, Cpu, User } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { useApp } from '../../context/AppContext';

// Map tab names to corresponding Lucide icons
const getTabIcon = (name: string, isFocused: boolean) => {
  const color = isFocused ? COLORS.primary : COLORS.textSecondary;
  const size = 22;

  switch (name) {
    case 'twin':
      return <Globe size={size} color={color} />;
    case 'index':
      return <CloudSun size={size} color={color} />;
    case 'analytics':
      return <BarChart2 size={size} color={color} />;
    case 'assistant':
      return <Cpu size={size} color={color} />;
    case 'profile':
      return <User size={size} color={color} />;
    default:
      return <CloudSun size={size} color={color} />;
  }
};

interface TabButtonProps {
  name: string;
  isFocused: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ name, isFocused, onPress }) => {
  const { t } = useApp();
  const scale = useSharedValue(1);
  const dotScale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.15 : 1, { damping: 10, stiffness: 200 });
    dotScale.value = withSpring(isFocused ? 1 : 0, { damping: 10, stiffness: 200 });
  }, [isFocused]);

  const animIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animDotStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: dotScale.value }],
      opacity: dotScale.value,
    };
  });

  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      <Animated.View style={[styles.iconWrapper, animIconStyle]}>
        {getTabIcon(name, isFocused)}
      </Animated.View>
      <Text 
        style={[
          styles.label, 
          isFocused ? styles.activeLabel : styles.inactiveLabel
        ]}
        numberOfLines={0}
      >
        {t(`tab.${name}`)}
      </Text>
      
      {/* Animated active indicator dot */}
      <Animated.View style={[styles.activeDot, animDotStyle]} />
    </Pressable>
  );
};

export const TabCapsule: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { width } = useWindowDimensions();

  // Hide tab bar if screen options specify hiding (e.g. nested modal screens)
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const tabBarStyle = StyleSheet.flatten(focusedOptions.tabBarStyle) as any;
  if (tabBarStyle?.display === 'none') {
    return null;
  }

  const renderContent = () => {
    return (
      <View style={styles.capsuleInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          
          // Ignore layout helper routes like +not-found or similar
          if (route.name.startsWith('+') || route.name.startsWith('_')) {
            return null;
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabButton
              key={route.key}
              name={route.name}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    );
  };

  // Render container with BlurView on iOS/Web and translucent wrapper on Android
  if (Platform.OS === 'android') {
    return (
      <View style={styles.floatingWrapper}>
        <View style={styles.androidCapsule}>
          {renderContent()}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.floatingWrapper}>
      <BlurView intensity={80} tint="light" style={styles.iosCapsule}>
        {renderContent()}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: SPACING.tabBarBottomOffset,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  iosCapsule: {
    borderRadius: 99,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  androidCapsule: {
    borderRadius: 99,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 6,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  capsuleInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    height: SPACING.tabBarHeight,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginTop: 4,
  },
  activeLabel: {
    color: COLORS.primary,
  },
  inactiveLabel: {
    color: COLORS.textSecondary,
  },
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
});
