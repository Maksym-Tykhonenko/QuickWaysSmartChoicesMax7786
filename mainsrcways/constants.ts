/**
 * Storage keys and configuration
 */
export const STORAGE_KEYS = {
  savedReactions: 'saved_reactions',
  savedScenarios: 'saved_scenarios',
  savedThoughts: 'saved_thoughts',
  onboardingComplete: 'onboarding_complete',
};

/**
 * Tab keys for navigation
 */
export type MainTabKey = 'Quick' | 'Reactions' | 'Scenarios' | 'Thoughts' | 'Saved' | 'About';

export const TABS: MainTabKey[] = ['Quick', 'Reactions', 'Scenarios', 'Thoughts', 'Saved', 'About'];

/**
 * Animation durations (ms)
 */
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};
