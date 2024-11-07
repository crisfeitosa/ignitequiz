import { useEffect } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import {
  BlurMask,
  Canvas,
  Path,
  Skia,
} from '@shopify/react-native-skia';

import { styles } from './styles';
import { THEME } from '../../styles/theme';

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
};

const CHECK_SIZE = 28;
const CHECK_STROKE = 2;

export function Option({ checked, title, ...rest }: Props) {
  const percentage = useSharedValue(0);

  const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;

  const path = Skia.Path.Make();
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS);

  useEffect(() => {
    if(checked) {
      percentage.value = withTiming(1, { duration: 700});
    } else {
      percentage.value = withTiming(0, { duration: 700});
    }
  }, [checked]);

  return (
    <TouchableOpacity
      style={
        [
          styles.container,
          checked && styles.checked
        ]
      }
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style='stroke'
          strokeWidth={CHECK_STROKE}
        />

        <Path 
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={1} style="solid" />
        </Path>
      </Canvas>
    </TouchableOpacity>
  );
}