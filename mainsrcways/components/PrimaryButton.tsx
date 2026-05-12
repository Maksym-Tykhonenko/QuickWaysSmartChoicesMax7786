import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

import React from 'react';

import { COLORS, SIZES, TYPOGRAPHY, SHADOWS } from '../designSystem';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  label,
  onPress,
  disabled = false,
  style,
  fullWidth = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: SIZES.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    ...SHADOWS.soft,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.background,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    fontSize: SIZES.fontSize16,
  },
  disabled: {
    opacity: 0.5,
  },
});
