import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShareButton } from '../components/ShareButton';
import { CheckCircleIcon } from 'react-native-heroicons/outline';
import mindScenarios from '../usabledata/mindScenarios';
import neonThoughts from '../usabledata/neonthought';
import React, { useState, useEffect } from 'react';
import smartReactions from '../usabledata/smartreactions';
import { CardContainer } from '../components/CardContainer';
import { NeonThoughtCard } from '../components/NeonThoughtCard';
import { BookmarkButton } from '../components/BookmarkButton';
import { ScenarioCard } from '../components/ScenarioCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { EmptyStateCard } from '../components/EmptyStateCard';
import { COLORS, SIZES, TYPOGRAPHY, SPACING } from '../designSystem';
import { STORAGE_KEYS } from '../constants';

type SavedItem = {
  type: 'reaction' | 'scenario' | 'thought';
  id: number;
  text: string;
};

export const SavedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const bottomPadding = SIZES.tabBarHeight + insets.bottom + SIZES.xl;

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = async () => {
    try {
      setLoading(true);
      const items: SavedItem[] = [];

      // Load saved reactions
      const savedReactionsRaw = await AsyncStorage.getItem(
        STORAGE_KEYS.savedReactions
      );
      if (savedReactionsRaw) {
        const ids = JSON.parse(savedReactionsRaw) as number[];
        ids.forEach(id => {
          if (id < smartReactions.length) {
            items.push({
              type: 'reaction',
              id,
              text: smartReactions[id],
            });
          }
        });
      }

      // Load saved scenarios
      const savedScenariosRaw = await AsyncStorage.getItem(
        STORAGE_KEYS.savedScenarios
      );
      if (savedScenariosRaw) {
        const ids = JSON.parse(savedScenariosRaw) as number[];
        ids.forEach(id => {
          const scenario = mindScenarios.find(s => s.id === id);
          if (scenario) {
            items.push({
              type: 'scenario',
              id,
              text: scenario.text.substring(0, 150) + '...',
            });
          }
        });
      }

      // Load saved thoughts
      const savedThoughtsRaw = await AsyncStorage.getItem(
        STORAGE_KEYS.savedThoughts
      );
      if (savedThoughtsRaw) {
        const ids = JSON.parse(savedThoughtsRaw) as number[];
        ids.forEach(id => {
          if (id < neonThoughts.length) {
            items.push({
              type: 'thought',
              id,
              text: neonThoughts[id],
            });
          }
        });
      }

      setSavedItems(items);
    } catch (error) {
      console.error('Error loading saved items:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = async (item: SavedItem) => {
    try {
      let storageKey = '';
      if (item.type === 'reaction') {
        storageKey = STORAGE_KEYS.savedReactions;
      } else if (item.type === 'scenario') {
        storageKey = STORAGE_KEYS.savedScenarios;
      } else {
        storageKey = STORAGE_KEYS.savedThoughts;
      }

      const raw = await AsyncStorage.getItem(storageKey);
      const ids = raw ? JSON.parse(raw) : [];
      const index = ids.indexOf(item.id);
      if (index > -1) {
        ids.splice(index, 1);
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify(ids));

      // Reload
      loadSavedItems();
    } catch (error) {
      console.error('Error removing saved item:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (savedItems.length === 0) {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>Saved</Text>
          <View style={styles.emptyContainer}>
            <EmptyStateCard
              icon={<CheckCircleIcon color={COLORS.primary} size={SIZES.iconXLarge} />}
              title="Nothing has been saved yet"
              description="Save situations or thoughts to return to later. This may come in handy."
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Saved</Text>

        <View style={styles.stack}>
          {savedItems.map(item => {
            if (item.type === 'scenario') {
              return (
                <ScenarioCard
                onOpenMore={() => {}}
                text={item.text}
                onToggleSave={() => toggleSave(item)}
                saved={true}
                key={`saved-${item.type}-${item.id}`}
                />
              );
            }

            if (item.type === 'thought') {
              return (
                <NeonThoughtCard
                  key={`saved-${item.type}-${item.id}`}
                  index={item.id}
                  text={item.text}
                  saved={true}
                  onToggleSave={() => toggleSave(item)}
                />
              );
            }

            // reaction fallback
            return (
              <CardContainer key={`saved-${item.type}-${item.id}`} padding={SPACING.cardPadding} style={styles.savedCard}>
                <Text style={styles.itemType}>
                  {item.type === 'reaction'
                    ? '💭 Reaction'
                    : '✨ Thought'}
                </Text>
                <Text style={styles.itemText}>{item.text}</Text>

                <View style={styles.itemFooter}>
                  <ShareButton
                    title={`Saved ${item.type}`}
                    message={item.text}
                  />
                  <BookmarkButton
                    saved={true}
                    onPress={() => toggleSave(item)}
                  />
                </View>
              </CardContainer>
            );
          })}
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
  loadingContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: SIZES.fontSize16,
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.textMuted,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.screenHorizontal,
    paddingTop: SIZES.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stack: {
    gap: SIZES.lg,
    alignSelf: 'stretch',
  },
  savedCard: {
    alignSelf: 'stretch',
  },
  itemType: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    marginBottom: SIZES.sm,
    letterSpacing: 0.5,
    fontWeight: '700',
    fontSize: SIZES.fontSize12,
    textTransform: 'uppercase',
  },
  itemText: {
    alignSelf: 'stretch',
    fontSize: SIZES.fontSize14,
    lineHeight: SIZES.fontSize14 * TYPOGRAPHY.lineHeightNormal,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: SIZES.lg,
    color: COLORS.text,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  pageTitle: {
    fontWeight: '700',
    fontSize: SIZES.fontSize28,
    marginBottom: SIZES.lg,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    textAlign: 'center',
    color: COLORS.background,
  },
});
