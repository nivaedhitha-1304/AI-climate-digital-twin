import React, { useEffect, useState, useRef } from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  style?: StyleProp<TextStyle>;
  decimals?: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 800,
  suffix = '',
  style,
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const startValueRef = useRef<number>(0);
  const endValueRef = useRef<number>(value);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    startValueRef.current = displayValue;
    endValueRef.current = value;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutQuad
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      const currentValue = 
        startValueRef.current + (endValueRef.current - startValueRef.current) * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValueRef.current);
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [value, duration]);

  return (
    <Text style={style}>
      {displayValue.toFixed(decimals)}
      {suffix}
    </Text>
  );
};
