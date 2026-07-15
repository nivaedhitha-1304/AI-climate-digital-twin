import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  PanResponder, 
  Dimensions, 
  Pressable 
} from 'react-native';
import { X } from 'lucide-react-native';
import { COLORS, SPACING } from '../../theme';

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.78;

export const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title = 'Information Details',
}) => {
  // Animated value for vertical position
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Track drawer state using listener to prevent stale state in pan responder
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) {
      // Slide up
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 120,
      }).start();
    } else {
      // Slide down
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  // PanResponder to handle drag gestures on the top handle bar
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond if drag is mostly vertical
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        // Drag downwards only
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120 || gestureState.vy > 0.5) {
          // Close sheet if dragged down significantly
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onClose();
          });
        } else {
          // Snap back open
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 15,
          }).start();
        }
      },
    })
  ).current;

  if (!isOpen) return null;

  return (
    <View style={styles.overlayContainer}>
      {/* Semi-transparent Backdrop click-to-dismiss */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Drawer content box */}
      <Animated.View 
        style={[
          styles.drawer, 
          { transform: [{ translateY }] }
        ]}
      >
        {/* Drag Handle Row */}
        <View {...panResponder.panHandlers} style={styles.handleWrapper}>
          <View style={styles.handle} />
        </View>

        {/* Header Title Row */}
        <View style={styles.header}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <X size={18} color={COLORS.textSecondary} />
          </Pressable>
        </View>

        {/* Inner Container */}
        <View style={styles.body}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 99999,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
  },
  drawer: {
    height: DRAWER_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 24,
    overflow: 'hidden',
  },
  handleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
});
