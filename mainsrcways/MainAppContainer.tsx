import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { QuickSituationsScreen } from './screens/QuickSituationsScreen';
import { SmartReactionsScreen } from './screens/SmartReactionsScreen';
import { MindScenariosScreen } from './screens/MindScenariosScreen';
import { NeonThoughtsScreen } from './screens/NeonThoughtsScreen';
import { SavedScreen } from './screens/SavedScreen';
import { AboutAppScreen } from './screens/AboutAppScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { COLORS } from './designSystem';
import { MainTabKey } from './constants';
import { IMAGES } from './aysAseisst';

type Props = {
  onNavigationChange?: (tab: MainTabKey) => void;
};

export const MainAppContainer: React.FC<Props> = ({ onNavigationChange }) => {
  const [activeTab, setActiveTab] = useState<MainTabKey>('Quick');
  const currentTabRef = useRef<MainTabKey>('Quick');
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const isTransitioningRef = useRef(false);
  const pendingTabRef = useRef<MainTabKey | null>(null);

  const runTransitionToTab = (targetTab: MainTabKey) => {
    if (targetTab === currentTabRef.current) {
      return;
    }

    isTransitioningRef.current = true;

    // Exit phase: smooth fade and subtle scale down
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 120,
        easing: Easing.bezier(0.4, 0, 1, 1), // Custom smooth deceleration
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 120,
        easing: Easing.bezier(0.4, 0, 1, 1),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) {
        isTransitioningRef.current = false;
        return;
      }

      setActiveTab(targetTab);
      currentTabRef.current = targetTab;
      onNavigationChange?.(targetTab);

      opacity.setValue(0);
      scale.setValue(0.96);

      // Enter phase: smooth fade and scale up with slightly longer duration for elegance
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 160,
          easing: Easing.bezier(0, 0.55, 0.45, 1), // Smooth acceleration curve
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 160,
          easing: Easing.bezier(0, 0.55, 0.45, 1),
          useNativeDriver: true,
        }),
      ]).start(() => {
        isTransitioningRef.current = false;

        if (pendingTabRef.current && pendingTabRef.current !== targetTab) {
          const queuedTab = pendingTabRef.current;
          pendingTabRef.current = null;
          runTransitionToTab(queuedTab);
        }
      });
    });
  };

  const handleTabPress = (tab: MainTabKey) => {
    if (tab === currentTabRef.current && !isTransitioningRef.current) {
      return;
    }

    if (isTransitioningRef.current) {
      pendingTabRef.current = tab;
      return;
    }

    runTransitionToTab(tab);
  };

  const renderScreen = (tab: MainTabKey) => {
    switch (tab) {
      case 'Quick':
        return <QuickSituationsScreen />;
      case 'Reactions':
        return <SmartReactionsScreen />;
      case 'Scenarios':
        return <MindScenariosScreen />;
      case 'Thoughts':
        return <NeonThoughtsScreen />;
      case 'Saved':
        return <SavedScreen />;
      case 'About':
        return <AboutAppScreen />;
      default:
        return <QuickSituationsScreen />;
    }
  };

  return (
    <ImageBackground
      source={IMAGES.background}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        
        <Animated.View
          style={[
            styles.screenContainer,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          {renderScreen(activeTab)}
        </Animated.View>

        <BottomNavigation
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  screenContainer: {
    flex: 1,
  },
});
