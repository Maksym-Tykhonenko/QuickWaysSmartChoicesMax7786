import { BookmarkButton } from './BookmarkButton';
import { View, Text, StyleSheet } from 'react-native';
import { CardContainer } from './CardContainer';
import React, { memo } from 'react';
import { COLORS,  TYPOGRAPHY,SIZES, SPACING } from '../designSystem';
import { ShareButton } from './ShareButton';

type Props = {
  text: string;
  saved: boolean;
  onToggleSave: () => void;
};

const ReactionCardComponent: React.FC<Props> = ({
  text,
  saved,
  onToggleSave,
}) => {
  return (
    <CardContainer padding={SPACING.cardPadding} gradient={false} style={styles.card}>
      <Text style={styles.text}>{text}</Text>
      
      <View style={styles.actionRow}>
        <ShareButton title="Smart Reaction" message={text} />
        <BookmarkButton saved={saved} onPress={onToggleSave} />
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
  },
  text: {
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    color: COLORS.background,
    marginBottom: SIZES.lg,
    flexWrap: 'wrap',
    fontSize: SIZES.fontSize16,
    lineHeight: SIZES.fontSize16 * TYPOGRAPHY.lineHeightRelaxed,
  },
  actionRow: {
    justifyContent: 'center',
    marginTop: SIZES.md,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    gap: SIZES.sm,
    alignItems: 'center',
  },
});

export const ReactionCard = memo(ReactionCardComponent);
