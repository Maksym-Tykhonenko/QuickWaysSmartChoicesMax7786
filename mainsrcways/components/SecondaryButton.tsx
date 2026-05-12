import { COLORS, SIZES, TYPOGRAPHY, SHADOWS } from '../designSystem';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export const SecondaryButton: React.FC<Props> = ({
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
    justifyContent: 'center',
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    minHeight: SIZES.buttonHeight,
    ...SHADOWS.soft,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    color: COLORS.background,
    fontSize: SIZES.fontSize16,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.5,
  },
});
