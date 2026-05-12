/**
 * Responsive Scaling Utility
 * All dimension scaling centralized here
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions (iPhone 12: 390x844)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

/**
 * Scale size proportionally based on device width
 * @param size - Size in pixels (based on iPhone 12 width)
 * @returns Scaled size for current device
 */
export const scale = (size: number): number => {
  return Math.round((width / BASE_WIDTH) * size);
};

/**
 * Scale size proportionally based on device height
 * @param size - Size in pixels (based on iPhone 12 height)
 * @returns Scaled size for current device
 */
export const verticalScale = (size: number): number => {
  return Math.round((height / BASE_HEIGHT) * size);
};

/**
 * Get screen dimensions
 */
export const SCREEN = {
  width,
  height,
  isLandscape: width > height,
  isTablet: width > 600,
};
