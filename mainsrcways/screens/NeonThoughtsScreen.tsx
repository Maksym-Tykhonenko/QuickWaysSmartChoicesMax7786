import neonThoughts from '../usabledata/neonthought';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { BookmarkButton } from '../components/BookmarkButton';
import { ShareButton } from '../components/ShareButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS,TYPOGRAPHY, SIZES,  SPACING } from '../designSystem';
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { STORAGE_KEYS } from '../constants';

type SavedThoughtsMap = Record<number, boolean>;

export const NeonThoughtsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedThoughts, setSavedThoughts] = useState<SavedThoughtsMap>({});
  const bottomPadding = SIZES.tabBarHeight + insets.bottom + SIZES.xl;

  useEffect(() => {
    loadSavedThoughts();
  }, []);

  const loadSavedThoughts = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEYS.savedThoughts);
      if (saved) {
        const ids = JSON.parse(saved) as number[];
        const map: SavedThoughtsMap = {};
        ids.forEach(id => {
          map[id] = true;
        });
        setSavedThoughts(map);
      }
    } catch (error) {
      console.error('Error loading saved thoughts:', error);
    }
  };

  const toggleSave = async (id: number) => {
    try {
      const newMap = { ...savedThoughts };
      newMap[id] = !newMap[id];
      setSavedThoughts(newMap);

      const ids = Object.keys(newMap)
        .filter(key => newMap[Number(key)])
        .map(Number);
      await AsyncStorage.setItem(
        STORAGE_KEYS.savedThoughts,
        JSON.stringify(ids)
      );
    } catch (error) {
      console.error('Error saving thought:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < neonThoughts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentThought = neonThoughts[currentIndex];
  const isSaved = !!savedThoughts[currentIndex];

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrap}>
          <Text style={styles.neonTitle}>Neon Thoughts</Text>

          {/* Main content with neon glow */}
          <View style={styles.contentCard}>
              <View style={styles.numberContainer}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>{currentIndex + 1}</Text>
                </View>
              </View>

              <View style={styles.glowContainer}>
                <Text style={styles.thoughtText}>{currentThought}</Text>
              </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <ShareButton
              title="Neon Thought"
              message={currentThought}
            />
            <BookmarkButton
              saved={isSaved}
              onPress={() => toggleSave(currentIndex)}
            />
          </View>

          {/* Navigation buttons */}
          <View style={styles.buttonGroup}>
            <PrimaryButton
              label="Next Thoughts"
              onPress={handleNext}
            />

            <SecondaryButton
              label={`${currentIndex + 1} / ${neonThoughts.length}`}
              onPress={() => { }}
              disabled
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingTop: SIZES.sm,
    paddingHorizontal: SPACING.screenHorizontal,
    flexGrow: 1,
  },
  contentWrap: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: SIZES.md,
  },
  neonTitle: {
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: '#B9FF0A',
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    textAlign: 'center',
    marginBottom: SIZES.xl,
    color: '#B9FF0A',
    textShadowRadius: 10,
    fontSize: SIZES.fontSize32,
  },
  numberContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  numberCircle: {
    width: SIZES.iconXLarge,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.iconXLarge / 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.iconXLarge,
  },
  numberText: {
    fontSize: SIZES.fontSize32,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    color: COLORS.background,
    fontWeight: '700',
  },
  contentCard: {
    borderColor: 'rgba(199, 255, 0, 0.3)',
    borderRadius: SIZES.radiusXl,
    padding: SPACING.cardPadding * 1.2,
    alignSelf: 'stretch',
    marginBottom: SIZES.lg,
    backgroundColor: '#6F11D8',
    borderWidth: 1.5,
  },
  glowContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: SIZES.sm,
    paddingBottom: SIZES.sm,
  },
  thoughtText: {
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
    flexWrap: 'wrap',
    color: COLORS.white,
    textAlign: 'center',
    flexShrink: 1,
    lineHeight: SIZES.fontSize18 * TYPOGRAPHY.lineHeightRelaxed,
    alignSelf: 'stretch',
    fontSize: SIZES.fontSize18,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  buttonGroup: {
    gap: SIZES.lg,
  },
});
