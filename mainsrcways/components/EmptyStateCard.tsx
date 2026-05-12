import React from 'react';
import { Text,View,  StyleSheet } from 'react-native';
import {  SPACING, SIZES,COLORS, TYPOGRAPHY,  } from '../designSystem';

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const EmptyStateCard: React.FC<Props> = ({
  icon,
  title,
  description,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6F11D8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.cardPadding,
    width: '100%',
    borderRadius: SIZES.radiusLg,
    paddingVertical: SPACING.cardPadding,
  },
  iconContainer: {
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.fontSize20,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    color: COLORS.white,
    marginBottom: SIZES.md,
    textAlign: 'center',
    fontWeight: '700',
  },
  description: {
    fontSize: SIZES.fontSize14,
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: SIZES.fontSize14 * TYPOGRAPHY.lineHeightNormal,
  },
});
