import React from 'react';
import { HiPause, HiPlay } from 'react-icons/hi2';

import { getPadTime } from '@/utils/helpers/getPadTime';

import Typography from '@/components/ui/Typography';

// Styles
import styles from './Timer.module.scss';

export enum Variants {
  PLAY = 'play',
  PAUSE = 'pause',
  RESTART = 'restart'
}

interface Props {
  variant?: Variants;
  getVariant?: (variant: Variants) => void;
}

const Timer: React.FC<Props> = ({ variant = Variants.PLAY, getVariant = () => {} }) => {
  const [timeLeft, setTimeLeft] = React.useState(0);

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - Number(minutes) * 60);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (variant === 'play') setTimeLeft((prev) => prev + 1);
    }, 1000);

    if (variant === 'restart') {
      setTimeLeft(0);
      getVariant(Variants.PLAY);
    }

    return () => {
      clearInterval(interval);
    };
  }, [variant, timeLeft]);

  return (
    <Typography
      as='button'
      className={styles.timer}
      text='large'
      onClick={() => {
        if (variant === 'play') {
          getVariant(Variants.PAUSE);
        } else {
          getVariant(Variants.PLAY);
        }
      }}
    >
      <span>
        {minutes}:{seconds}
      </span>
      {variant === 'play' ? <HiPause /> : <HiPlay />}
    </Typography>
  );
};

export default Timer;
