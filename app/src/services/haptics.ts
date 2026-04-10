import * as Haptics from 'expo-haptics';

export function triggerHaptic(type: 'impactLight' | 'impactMedium' | 'impactHeavy') {
  const styleMap = {
    impactLight: Haptics.ImpactFeedbackStyle.Light,
    impactMedium: Haptics.ImpactFeedbackStyle.Medium,
    impactHeavy: Haptics.ImpactFeedbackStyle.Heavy,
  };

  Haptics.impactAsync(styleMap[type]).catch(() => undefined);
}
