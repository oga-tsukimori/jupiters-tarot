
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, buttonStyles } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'glass' | 'rounded';
  size?: 'small' | 'medium' | 'large';
}

export default function Button({ 
  text, 
  onPress, 
  style, 
  textStyle, 
  variant = 'primary',
  size = 'medium'
}: ButtonProps) {
  
  const getButtonStyle = () => {
    const baseStyle = buttonStyles[variant] || buttonStyles.primary;
    const sizeStyle = styles[size];
    return [baseStyle, sizeStyle, style];
  };

  const getTextStyle = () => {
    const baseTextStyle = variant === 'secondary' ? styles.secondaryText : styles.primaryText;
    const sizeTextStyle = styles[`${size}Text`];
    return [baseTextStyle, sizeTextStyle, textStyle];
  };

  return (
    <TouchableOpacity 
      style={getButtonStyle()} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Size variants
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  
  // Text styles
  primaryText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  secondaryText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  
  // Size-specific text styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
