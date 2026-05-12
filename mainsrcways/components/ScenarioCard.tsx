import { PrimaryButton } from './PrimaryButton';
import { 
  SIZES,
  COLORS, 
   TYPOGRAPHY, 
   SPACING } from '../designSystem';
import React, { memo } from 'react';
import { CardContainer } from './CardContainer';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { BookmarkButton } from './BookmarkButton';

type Props = {
  text: string;
  saved: boolean;
  onToggleSave: () => void;
  onOpenMore?: () => void;
  style?: ViewStyle;
};

const ScenarioCardComponent: React.FC<Props> = ({
  text,
  saved,
  onToggleSave,
  onOpenMore,
  style,
}) => {
  return (
    <CardContainer padding={SPACING.cardPadding} gradient={false} style={[styles.card, style]}>
      <Text style={styles.text}>{text}</Text>

      <View style={styles.actionRow}>
        {onOpenMore ? (
          <PrimaryButton
            label="Open more"
            onPress={onOpenMore}
            fullWidth={false}
            style={styles.openButton}
          />
        ) : null}
        <BookmarkButton saved={saved} onPress={onToggleSave} />
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6F11D8',
    alignSelf: 'stretch',
  },
  text: {
    fontSize: SIZES.fontSize14,
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.white,
    lineHeight: SIZES.fontSize14 * TYPOGRAPHY.lineHeightRelaxed,
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
    marginTop: SIZES.lg,
  },
  openButton: {
    flex: 1,
  },
});

export const ScenarioCard = memo(ScenarioCardComponent);