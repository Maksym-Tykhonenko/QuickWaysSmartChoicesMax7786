import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Share,
  View,
  Platform,
} from 'react-native';
import { COLORS, SIZES, TYPOGRAPHY, SPACING } from '../designSystem';
import { CardContainer } from '../components/CardContainer';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { IMAGES } from '../aysAseisst';
import { PrimaryButton } from '../components/PrimaryButton';

export const AboutAppScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const bottomPadding = SIZES.tabBarHeight + insets.bottom + SIZES.xl;
  const handleShare = async () => {
    try {
      await Share.share({
        message: `This app offers different situations, reactions, and thoughts to help you look at your decisions from a different perspective. Choose options, read scenarios, and save what resonates.`,
        title: 'Check out this app!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.appTitle}>About the app</Text>

        {/* Main content card */}
        <CardContainer padding={SPACING.cardPadding} gradient={false} style={styles.contentCard}>
          {Platform.OS !== 'android' && (
            <View style={styles.logoWrap}>
              <Image source={IMAGES.loadingLogo} style={styles.logoImage} resizeMode="contain" />
            </View>
          )}

          <Text style={styles.sectionTitle}>Information:</Text>

          <Text style={styles.description}>
            This app offers different situations, reactions, and thoughts to help you look at your decisions from a different perspective.
          </Text>

          <Text style={styles.footer}>
            Choose options, read scenarios, and save what resonates.
          </Text>

          <PrimaryButton label="Share app" onPress={handleShare} style={styles.shareButton} />
        </CardContainer>
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
  logoWrap: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    height: SIZES.fontSize40 * 3,
    borderRadius: SIZES.radiusXl * 1.7,
    marginBottom: SIZES.lg,
    justifyContent: 'center',
    width: SIZES.fontSize40 * 3,
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  appTitle: {
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    fontWeight: '700',
    color: COLORS.background,
    marginBottom: SIZES.lg,
    fontSize: SIZES.fontSize28,
  },
  contentCard: {
    marginBottom: SIZES.xl,
    backgroundColor: '#6F11D8',
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamilyBold,
    color: COLORS.white,
    fontWeight: '700',
    marginBottom: SIZES.md,
    fontSize: SIZES.fontSize18,
  },
  description: {
    fontSize: SIZES.fontSize16,
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.white,
    marginBottom: SIZES.lg,
    lineHeight: SIZES.fontSize16 * TYPOGRAPHY.lineHeightNormal,
  },
  footer: {
    fontStyle: 'italic',
    fontSize: SIZES.fontSize14,
    marginTop: SIZES.lg,
    fontFamily: TYPOGRAPHY.fontFamily,
    lineHeight: SIZES.fontSize14 * TYPOGRAPHY.lineHeightNormal,
    color: COLORS.white,
  },
  shareButton: {
    marginTop: SIZES.xl,
  },
});
