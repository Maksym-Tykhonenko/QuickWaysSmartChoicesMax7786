#!/bin/bash

# 🚀 Quick Ways Smart Choices - Build Verification Script

echo "========================================"
echo "📱 React Native App Verification"
echo "========================================"
echo ""

echo "✅ Checking Core Files..."
files_to_check=(
  "mainsrcways/designSystem.ts"
  "mainsrcways/constants.ts"
  "mainsrcways/laefontsems.ts"
  "mainsrcways/MainAppContainer.tsx"
  "mainsrcways/components/index.ts"
  "mainsrcways/screens/index.ts"
)

for file in "${files_to_check[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (MISSING!)"
  fi
done

echo ""
echo "✅ Checking Components..."
components=(
  "mainsrcways/components/PrimaryButton.tsx"
  "mainsrcways/components/SecondaryButton.tsx"
  "mainsrcways/components/CardContainer.tsx"
  "mainsrcways/components/BookmarkButton.tsx"
  "mainsrcways/components/ShareButton.tsx"
  "mainsrcways/components/EmptyStateCard.tsx"
  "mainsrcways/components/ReactionCard.tsx"
  "mainsrcways/components/BottomNavigation.tsx"
)

for comp in "${components[@]}"; do
  if [ -f "$comp" ]; then
    echo "  ✓ $(basename $comp)"
  else
    echo "  ✗ $(basename $comp) (MISSING!)"
  fi
done

echo ""
echo "✅ Checking Screens..."
screens=(
  "mainsrcways/screens/QuickSituationsScreen.tsx"
  "mainsrcways/screens/SmartReactionsScreen.tsx"
  "mainsrcways/screens/MindScenariosScreen.tsx"
  "mainsrcways/screens/NeonThoughtsScreen.tsx"
  "mainsrcways/screens/SavedScreen.tsx"
  "mainsrcways/screens/AboutAppScreen.tsx"
)

for screen in "${screens[@]}"; do
  if [ -f "$screen" ]; then
    echo "  ✓ $(basename $screen)"
  else
    echo "  ✗ $(basename $screen) (MISSING!)"
  fi
done

echo ""
echo "✅ Checking Data Files..."
data_files=(
  "mainsrcways/usabledata/quicksituations.ts"
  "mainsrcways/usabledata/smartreactions.ts"
  "mainsrcways/usabledata/mindScenarios.ts"
  "mainsrcways/usabledata/neonthought.ts"
)

for data in "${data_files[@]}"; do
  if [ -f "$data" ]; then
    echo "  ✓ $(basename $data)"
  else
    echo "  ✗ $(basename $data) (MISSING!)"
  fi
done

echo ""
echo "✅ Checking Assets..."
assets=(
  "mainsrcways/aysAseisst/qimages/loadback.png"
)

for asset in "${assets[@]}"; do
  if [ -f "$asset" ]; then
    echo "  ✓ $(basename $asset)"
  else
    echo "  ✗ $(basename $asset) (MISSING!)"
  fi
done

echo ""
echo "✅ Checking Documentation..."
docs=(
  "APP_ARCHITECTURE.md"
  "IMPLEMENTATION_SUMMARY.md"
  "QUICK_START.md"
  "FILE_MANIFEST.md"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "  ✓ $doc"
  else
    echo "  ✗ $doc (MISSING!)"
  fi
done

echo ""
echo "========================================"
echo "📊 File Count Summary"
echo "========================================"
echo "TypeScript/TSX Files: $(find mainsrcways -type f \( -name "*.tsx" -o -name "*.ts" \) | grep -E "(designSystem|constants|laefontsems|MainApp|screens|components)" | wc -l)"
echo ""
echo "✅ Verification Complete!"
echo ""
echo "Next Steps:"
echo "1. npm install"
echo "2. npx react-native-asset-link"
echo "3. npx react-native start --reset-cache"
echo "4. npx react-native run-ios (or run-android)"
