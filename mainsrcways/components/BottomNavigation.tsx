import React, { memo } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../designSystem';
import { scale } from '../utils/scale';
import { MainTabKey } from '../constants';

type Props = {
  activeTab: MainTabKey;
  onTabPress: (tab: MainTabKey) => void;
};

type TabConfig = {
  key: MainTabKey;
  imgicon: ReturnType<typeof require>;
};

const TABS: TabConfig[] = [
  {
    key: 'Quick',
    imgicon: require('../aysAseisst/qimages/niboticns/quiqsituations.png'),
  },
  {
    key: 'Reactions',
    imgicon: require('../aysAseisst/qimages/niboticns/smartreactions.png'),
  },
  {
    key: 'Scenarios',
    imgicon: require('../aysAseisst/qimages/niboticns/mindscenarious.png'),
  },
  {
    key: 'Thoughts',
    imgicon: require('../aysAseisst/qimages/niboticns/neonthought.png'),
  },
  {
    key: 'Saved',
    imgicon: require('../aysAseisst/qimages/niboticns/saved.png'),
  },
  {
    key: 'About',
    imgicon: require('../aysAseisst/qimages/niboticns/about.png'),
  },
];

const BottomNavigationComponent: React.FC<Props> = ({ activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: Math.max(insets.bottom, scale(8)),
        },
      ]}
    >
      <View style={styles.tabsRow}>
        {TABS.map(tab => {
          const isActive = tab.key === activeTab;

          return (
            <Pressable
              key={tab.key}
              onPress={() => onTabPress(tab.key)}
              style={({ pressed }) => [
                styles.tab,
                isActive && styles.activeTab,
                pressed && styles.pressed,
              ]}
            >
              <Image source={tab.imgicon} style={{ width: SIZES.xxl, height: SIZES.xxl, opacity: isActive ? 1 : 0.5 }} />
              {/* <View style={[styles.indicator, isActive && styles.indicatorActive]} /> */}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 20,
    paddingTop: scale(10),
    paddingHorizontal: scale(16),
    position: 'absolute',
  },
  tabsRow: {
    shadowOffset: { width: 0, height: 8 },
    shadowColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: scale(16),
    paddingHorizontal: scale(10),
    shadowOpacity: 0.12,
    shadowRadius: 18,
    paddingVertical: scale(10),
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(16),
    gap: scale(4),
  },
  activeTab: {
    transform: [{ scale: 1.06 }],
  },
  pressed: {
    opacity: 0.78,
  },
  indicator: {
    width: scale(5),
    height: scale(5),
    borderRadius: scale(2),
    backgroundColor: 'transparent',
  },
  indicatorActive: {
    backgroundColor: '#04F7C6',
  },
});

export const BottomNavigation = memo(BottomNavigationComponent);
