import { View, Text, StyleSheet } from 'react-native';
import { ShareButton } from './ShareButton';
import { COLORS, SIZES, TYPOGRAPHY, SPACING } from '../designSystem';
import { BookmarkButton } from './BookmarkButton';
import React, { memo } from 'react';

type Props = {
    index: number;
    text: string;
    saved: boolean;
    onToggleSave: () => void;
    onShare?: () => void;
};

const NeonThoughtCardComponent: React.FC<Props> = ({ index, text, saved, onToggleSave }) => {
    return (
        <View style={styles.card}>
            <View style={styles.inner}>
                <View style={styles.numberContainer}>
                    <View style={styles.numberCircle}>
                        <Text style={styles.numberText}>{index + 1}</Text>
                    </View>
                </View>

                <View style={styles.textWrap}>
                    <Text style={styles.text}>{text}</Text>
                </View>

                <View style={styles.actionsRow}>
                    <ShareButton title={`Thought ${index + 1}`} message={text} />
                    <BookmarkButton saved={saved} onPress={onToggleSave} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: SIZES.lg,
        borderColor: 'rgba(199, 255, 0, 0.12)',
        borderRadius: SIZES.radiusXl,
        alignSelf: 'stretch',
        backgroundColor: '#6F11D8',
        borderWidth: 1,
        padding: SPACING.cardPadding,
    },
    inner: {
        alignSelf: 'stretch',
    },
    numberContainer: {
        alignItems: 'center',
        marginBottom: SIZES.md,
    },
    numberCircle: {
        justifyContent: 'center',
        height: SIZES.iconXLarge,
        borderRadius: SIZES.iconXLarge / 2,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        width: SIZES.iconXLarge,
    },
    numberText: {
        fontSize: SIZES.fontSize18,
        fontFamily: TYPOGRAPHY.fontFamilyBold,
        color: COLORS.background,
        fontWeight: '700',
    },
    textWrap: {
        alignSelf: 'stretch',
        paddingVertical: SIZES.sm,
    },
    text: {
        color: COLORS.white,
        fontFamily: TYPOGRAPHY.fontFamily,
        lineHeight: SIZES.fontSize16 * TYPOGRAPHY.lineHeightRelaxed,
        textAlign: 'center',
        fontSize: SIZES.fontSize16,
    },
    actionsRow: {
        marginTop: SIZES.md,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SIZES.md,
        flexDirection: 'row',
    },
});

export const NeonThoughtCard = memo(NeonThoughtCardComponent);
