import { SHADOWS, COLORS, SIZES,  } from '../designSystem';
import React from 'react';
import {
  ViewStyle,
  StyleSheet,
  View,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  gradient?: boolean;
  style?: ViewStyle;
  padding?: number;
};

export const CardContainer: React.FC<Props> = ({
  children,
  gradient = true,
  style,
  padding = SIZES.lg,
}) => {
  if (gradient) {
    return (
      <View style={[styles.containerGradient, { padding }, style]}>
        {children}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerGradient: {
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    ...SHADOWS.soft,
    backgroundColor: '#6B02D6'
  },
  container: {
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    ...SHADOWS.soft,
  },
});
