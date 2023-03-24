import React from 'react';
import { HiPause, HiPlay } from 'react-icons/hi2';

import { getPadTime } from '@/utils/helpers/getPadTime';

// Styles
import styles from './Timer.module.scss';

export enum Variants {
  PLAY = 'play',
  PAUSE = 'pause',
  RESTART = 'restart',
  ENDTIME = 'endTime'
}

interface Props {
  time?: number;
  variant?: Variants;
  getVariant?: (variant: Variants) => void;
}

const Timer: React.FC<Props> = ({ time = 5 * 60, variant = Variants.PLAY, getVariant = () => {} }) => {
  const [timeLeft, setTimeLeft] = React.useState(time);

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - Number(minutes) * 60);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (variant === 'play') setTimeLeft((prev) => (prev >= 1 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      getVariant(Variants.ENDTIME);
    }

    if (variant === 'restart') {
      setTimeLeft(time);
      getVariant(Variants.PLAY);
    }

    return () => {
      clearInterval(interval);
    };
  }, [variant, timeLeft, time]);

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(time);
    }

    getVariant(Variants.PLAY);
  };

  const handleStop = () => {
    getVariant(Variants.PAUSE);
  };

  return (
    <button
      className={styles.timer}
      onClick={() => {
        if (variant === 'play') {
          handleStop();
        } else {
          handleStart();
        }
      }}
    >
      <span className={styles.value}>
        {minutes}:{seconds}
      </span>
      {variant === 'play' ? <HiPause /> : <HiPlay />}
    </button>
  );
};

export default Timer;
