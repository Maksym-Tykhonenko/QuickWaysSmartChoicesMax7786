import React, { useState, useEffect } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SIZES, TYPOGRAPHY, SPACING } from '../designSystem';
import { ShareButton } from '../components/ShareButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mindScenarios from '../usabledata/mindScenarios';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { BookmarkButton } from '../components/BookmarkButton';
import { ScenarioCard } from '../components/ScenarioCard';
import { CardContainer } from '../components/CardContainer';
import { STORAGE_KEYS } from '../constants';

type ScreenMode = 'list' | 'detail';
type SavedScenariosMap = Record<number, boolean>;

export const MindScenariosScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<ScreenMode>('list');
  const [selectedScenarioId, setSelectedScenarioId] = useState<number | null>(null);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenariosMap>({});
  const bottomPadding = SIZES.tabBarHeight + insets.bottom + SIZES.xl;

  useEffect(() => {
    loadSavedScenarios();
  }, []);

  const loadSavedScenarios = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEYS.savedScenarios);
      if (saved) {
        const ids = JSON.parse(saved) as number[];
        const map: SavedScenariosMap = {};
        ids.forEach(id => {
          map[id] = true;
        });
        setSavedScenarios(map);
      }
    } catch (error) {
      console.error('Error loading saved scenarios:', error);
    }
  };

  const toggleSave = async (id: number) => {
    try {
      const newMap = { ...savedScenarios };
      newMap[id] = !newMap[id];
      setSavedScenarios(newMap);

      const ids = Object.keys(newMap)
        .filter(key => newMap[Number(key)])
        .map(Number);
      await AsyncStorage.setItem(
        STORAGE_KEYS.savedScenarios,
        JSON.stringify(ids)
      );
    } catch (error) {
      console.error('Error saving scenario:', error);
    }
  };

  const selectedScenario =
    selectedScenarioId !== null
      ? mindScenarios.find(s => s.id === selectedScenarioId)
      : null;

  if (mode === 'detail' && selectedScenario) {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.detailHeader}>
            <Pressable
              onPress={() => {
                setMode('list');
                setSelectedScenarioId(null);
              }}
              style={styles.backIconButton}
            >
              <ArrowLeftIcon color={COLORS.background} size={SIZES.iconMedium} />
            </Pressable>

            <Text style={styles.pageTitle}>Mind Scenarios</Text>
          </View>

          <CardContainer padding={SPACING.cardPadding} gradient={false} style={styles.contentCard}>
            <Text style={styles.scenarioText}>{selectedScenario.text}</Text>
          </CardContainer>

          <View style={styles.actionRow}>
            <ShareButton
              title="Mind Scenario"
              message={selectedScenario.text}
            />
            <BookmarkButton
              saved={!!savedScenarios[selectedScenario.id]}
              onPress={() => toggleSave(selectedScenario.id)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Mind Scenarios</Text>

        <View style={styles.scenarioStack}>
          {mindScenarios.map(item => (
            <ScenarioCard
              key={`scenario-${item.id}`}
              text={`${item.text.substring(0, 150)}...`}
              saved={!!savedScenarios[item.id]}
              onOpenMore={() => {
                setSelectedScenarioId(item.id);
                setMode('detail');
              }}
              onToggleSave={() => toggleSave(item.id)}
            />
          ))}
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
    flexGrow: 1,
    paddingHorizontal: SPACING.screenHorizontal,
    paddingTop: SIZES.sm,
  },
  listContent: {
    paddingHorizontal: SPACING.screenHorizontal,
    flexGrow: 1,
    paddingTop: SIZES.sm,
  },
  scenarioStack: {
    gap: SIZES.lg,
    alignSelf: 'stretch',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  backIconButton: {
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    height: SIZES.iconXLarge,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    width: SIZES.iconXLarge,
    marginRight: SIZES.md,
  },
  contentCard: {
    marginBottom: SIZES.lg,
    backgroundColor: '#6F11D8',
    alignSelf: 'stretch',
  },
  scenarioText: {
    lineHeight: SIZES.fontSize16 * TYPOGRAPHY.lineHeightRelaxed,
    fontSize: SIZES.fontSize16,
    color: COLORS.white,
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  pageTitle: {
    fontSize: SIZES.fontSize28,
    fontWeight: '700',
    marginBottom: SIZES.lg,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    textAlign: 'center',
    color: COLORS.background,
  },
});
