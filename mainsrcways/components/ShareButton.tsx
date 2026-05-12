import { COLORS, SIZES, TYPOGRAPHY, SHADOWS } from '../designSystem';
import { ShareIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity, Text, StyleSheet, Share, View } from 'react-native';
import React, { memo } from 'react';

type Props = {
  title: string;
  message: string;
};

const ShareButtonComponent: React.FC<Props> = ({ title, message }) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${message}`,
        title: title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleShare}
      activeOpacity={0.7}
      style={styles.button}
    >
      <View style={styles.content}>
        <ShareIcon color={COLORS.background} size={SIZES.iconSmall} />
        <Text style={styles.label}>Share</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    justifyContent: 'center',
    minHeight: SIZES.buttonHeight,
    backgroundColor: COLORS.secondary,
    ...SHADOWS.soft,
  },
  content: {
    gap: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontWeight: '700',
    color: COLORS.background,
    lineHeight: SIZES.fontSize14 * TYPOGRAPHY.lineHeightNormal,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    letterSpacing: 0.3,
    fontSize: SIZES.fontSize14,
  },
});

export const ShareButton = memo(ShareButtonComponent);
