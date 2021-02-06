import { LayoutAnimation } from 'react-native';

export const applyAnimation = (property = 'scaleXY') => {
  LayoutAnimation.configureNext({
    duration: 700,
    create: { duration: 300, type: 'easeOut', property: property },
    update: { type: 'spring', springDamping: 10 },
    delete: { duration: 300, type: 'easeOut', property: property },
  });
};
