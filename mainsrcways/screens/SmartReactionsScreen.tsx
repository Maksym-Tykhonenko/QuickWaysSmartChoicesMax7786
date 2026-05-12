import AsyncStorage from '@react-native-async-storage/async-storage';

import smartReactions from '../usabledata/smartreactions';

import { ReactionCard } from '../components/ReactionCard';

import React, { useState, useEffect } from 'react';

import { COLORS, SIZES, SPACING } from '../designSystem';

import { STORAGE_KEYS } from '../constants';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Text,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

type SavedReactionsMap = Record<number, boolean>;

export const SmartReactionsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [savedReactions, setSavedReactions] = useState<SavedReactionsMap>({});
  const bottomPadding = SIZES.tabBarHeight + insets.bottom + SIZES.xl;

  // Load saved reactions on mount
  useEffect(() => {
    loadSavedReactions();
  }, []);

  const loadSavedReactions = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEYS.savedReactions);
      if (saved) {
        const ids = JSON.parse(saved) as number[];
        const map: SavedReactionsMap = {};
        ids.forEach(id => {
          map[id] = true;
        });
        setSavedReactions(map);
      }
    } catch (error) {
      console.error('Error loading saved reactions:', error);
    }
  };

  const toggleSave = async (index: number) => {
    try {
      const newMap = { ...savedReactions };
      newMap[index] = !newMap[index];
      setSavedReactions(newMap);

      // Save to AsyncStorage
      const ids = Object.keys(newMap)
        .filter(key => newMap[Number(key)])
        .map(Number);
      await AsyncStorage.setItem(
        STORAGE_KEYS.savedReactions,
        JSON.stringify(ids)
      );
    } catch (error) {
      console.error('Error saving reaction:', error);
    }
  };

  const renderReaction = ({ item, index }: { item: string; index: number }) => (
    <ReactionCard
      text={item}
      saved={!!savedReactions[index]}
      onToggleSave={() => toggleSave(index)}
    />
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <Text style={styles.pageTitle}>Smart Reactions</Text>
      <FlatList
        data={smartReactions}
        renderItem={renderReaction}
        keyExtractor={(_, index) => `reaction-${index}`}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingBottom: bottomPadding }]}
        ItemSeparatorComponent={() => <View style={{ height: SIZES.lg }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.screenHorizontal,
    paddingTop: SIZES.sm,
  },
  pageTitle: {
    fontSize: SIZES.fontSize28,
    fontFamily: 'Manrope-Bold',
    color: COLORS.background,
    textAlign: 'center',
    marginBottom: SIZES.lg,
    fontWeight: '700',
  },
});
