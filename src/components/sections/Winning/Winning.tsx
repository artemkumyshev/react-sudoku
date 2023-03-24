import cn from 'classnames';
import React from 'react';
import Confetti from 'react-confetti';

// Images
import partyFlag1Image from '@/assets/images/party-flag-1.png';
import partyFlag2Image from '@/assets/images/party-flag-2.png';

// Styles
import styles from './Winning.module.scss';

interface Props {
  title: string;
  description: string;
}

const Winning: React.FC<Props> = ({ title, description }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className={styles.winning}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div className={styles.confetti}>
          {[partyFlag1Image, partyFlag2Image].map((item, i) => (
            <img key={i} alt={`Party flag ${i + 1}`} className={cn(styles.confetti__item, styles[`confetti__item_${i + 1}`])} src={item} />
          ))}
        </div>
        <div className={styles.main}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <Confetti height={wrapperRef.current?.offsetHeight} width={wrapperRef.current?.offsetWidth} />
      </div>
    </div>
  );
};

export default Winning;
