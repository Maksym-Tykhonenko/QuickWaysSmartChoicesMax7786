import { BookmarkIcon as BookmarkOutlineIcon } from 'react-native-heroicons/outline';
import React, { memo } from 'react';
import { COLORS, TYPOGRAPHY,  SIZES, SHADOWS } from '../designSystem';
import { BookmarkIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type Props = {
  saved: boolean;
  onPress: () => void;
};

const BookmarkButtonComponent: React.FC<Props> = ({ saved, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, saved ? styles.savedButton : styles.unsavedButton]}
    >
      <View style={styles.content}>
        {saved ? (
          <BookmarkIcon color={COLORS.white} size={SIZES.iconSmall} />
        ) : (
          <BookmarkOutlineIcon color={COLORS.background} size={SIZES.iconSmall} />
        )}
        <Text style={[styles.label, saved ? styles.savedLabel : styles.unsavedLabel]}>
          {saved ? 'Saved' : 'Save'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    borderRadius: SIZES.radiusMd,
    paddingVertical: SIZES.sm,
    justifyContent: 'center',
    minHeight: SIZES.buttonHeight,
    ...SHADOWS.soft,
  },
  unsavedButton: {
    backgroundColor: COLORS.secondary,
  },
  savedButton: {
    elevation: 0,
    borderColor: COLORS.white,
    borderWidth: 1,
    shadowOpacity: 0,
    backgroundColor: 'rgba(43, 134, 0, 0.5)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.sm,
  },
  label: {
    fontSize: SIZES.fontSize14,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: SIZES.fontSize14 * TYPOGRAPHY.lineHeightNormal,
  },
  unsavedLabel: {
    color: COLORS.background,
  },
  savedLabel: {
    color: COLORS.white,
  },
});

export const BookmarkButton = memo(BookmarkButtonComponent);
