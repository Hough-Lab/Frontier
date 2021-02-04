import { LayoutAnimation } from 'react-native';

export const applyAnimation = () => {
  LayoutAnimation.configureNext({
    duration: 700,
    create: { duration: 300, type: 'easeOut', property: 'scaleXY' },
    update: { type: 'spring', springDamping: 10 },
    delete: { duration: 300, type: 'easeOut', property: 'scaleXY' },
  });
};