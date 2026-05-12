import React, { useState } from 'react';
import { SecondaryButton } from '../components/SecondaryButton';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BoltIcon } from 'react-native-heroicons/solid';
import quickSituations from '../usabledata/quicksituations';
import { COLORS, SIZES, TYPOGRAPHY, SPACING } from '../designSystem';
import { PrimaryButton } from '../components/PrimaryButton';
import { View, Text, StyleSheet, ScrollView, Share } from 'react-native';

type ScreenState = 'questions' | 'result';

export const QuickSituationsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenState, setScreenState] = useState<ScreenState>('questions');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const bottomPadding = SIZES.tabBarHeight + insets.bottom + SIZES.xl;

  const currentSituation = quickSituations[currentIndex];
  const isLastQuestion = currentIndex === quickSituations.length - 1;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswerIndex(index);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setScreenState('result');
      return;
    }

    setCurrentIndex(prev => prev + 1);
    setSelectedAnswerIndex(null);
  };

  const handleAgain = () => {
    setCurrentIndex(0);
    setSelectedAnswerIndex(null);
    setScreenState('questions');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I've completed all ${quickSituations.length} Quick Situations challenges!`,
        title: 'Scenarios Completed',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (screenState === 'result') {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
        <ScrollView contentContainerStyle={[styles.resultScrollContent, { paddingBottom: bottomPadding }]} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Quick Situations</Text>

          <View style={styles.resultCard}>
            <View style={styles.resultIconWrap}>
              <BoltIcon color={COLORS.primary} size={SIZES.iconXLarge * 1.05} />
            </View>

            <Text style={styles.resultTitle}>Scenarios Completed</Text>

            <Text style={styles.resultDescription}>
              You have gone through all the situations and made choices in different circumstances.
              Each decision shows your approach and how you react in the moment.
            </Text>

            <View style={styles.resultActions}>
              <PrimaryButton label="Go through again" onPress={handleAgain} />
              <SecondaryButton label="Share with friend" onPress={handleShare} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Quick Situations</Text>

        <View style={styles.questionCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepText}>{currentIndex + 1}</Text>
          </View>

          <Text style={styles.situationText}>{currentSituation.situation}</Text>
        </View>

        <View style={styles.answersContainer}>
          {currentSituation.options.map((option, index) => {
            const isSelected = selectedAnswerIndex === index;

            return (
              <PrimaryButton
                key={option}
                label={`${String.fromCharCode(65 + index)}. ${option}`}
                onPress={() => handleAnswerSelect(index)}
                style={isSelected ? styles.answerButtonSelected : styles.answerButton}
              />
            );
          })}
        </View>

        <SecondaryButton
          label={isLastQuestion ? 'See Result' : 'Next'}
          onPress={handleNext}
          disabled={selectedAnswerIndex === null}
          style={styles.nextButton}
        />
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
  resultScrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.screenHorizontal,
    paddingTop: SIZES.sm,
    justifyContent: 'center',
  },
  pageTitle: {
    color: COLORS.background,
    fontSize: SIZES.fontSize28,
    textAlign: 'center',
    marginBottom: SIZES.lg,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamilyBold,
  },
  questionCard: {
    shadowOpacity: 0.12,
    backgroundColor: '#760FDD',
    paddingHorizontal: SIZES.xl,
    shadowColor: '#000',
    paddingVertical: SIZES.xxl,
    marginBottom: SIZES.xl,
    shadowOffset: { width: 0, height: 8 },
    borderRadius: SIZES.radiusLg,
    shadowRadius: 16,
    elevation: 6,
    alignItems: 'center',
  },
  stepNumber: {
    width: SIZES.iconXLarge,
    alignItems: 'center',
    height: SIZES.iconXLarge,
    borderRadius: SIZES.iconXLarge / 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    marginBottom: SIZES.xl,
  },
  stepText: {
    fontSize: SIZES.fontSize18,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    color: COLORS.background,
    fontWeight: '700',
  },
  situationText: {
    fontSize: SIZES.fontSize18,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    color: COLORS.white,
    lineHeight: SIZES.fontSize18 * TYPOGRAPHY.lineHeightRelaxed,
    textAlign: 'center',
  },
  answersContainer: {
    gap: SIZES.md,
    marginBottom: SIZES.xl,
  },
  answerButton: {
    backgroundColor: COLORS.primary,
  },
  answerButtonSelected: {
    backgroundColor: '#B9FF0A',
    opacity: 0.92,
  },
  nextButton: {
    marginTop: SIZES.sm,
  },
  resultCard: {
    backgroundColor: '#6F11D8',
    shadowOffset: { width: 0, height: 8 },
    shadowColor: '#000',
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.xxl,
    alignItems: 'center',
    shadowOpacity: 0.14,
    shadowRadius: 16,
    paddingHorizontal: SIZES.xl,
    elevation: 6,
  },
  resultIconWrap: {
    marginBottom: SIZES.lg,
  },
  resultTitle: {
    textDecorationLine: 'underline',
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.lg,
    fontSize: SIZES.fontSize18,
    fontWeight: '700',
  },
  resultDescription: {
    fontSize: SIZES.fontSize14,
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    color: COLORS.white,
    lineHeight: SIZES.fontSize14 * TYPOGRAPHY.lineHeightRelaxed,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  resultActions: {
    gap: SIZES.md,
    width: '100%',
  },
});
