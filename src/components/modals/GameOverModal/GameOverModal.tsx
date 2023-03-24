import React from 'react';

import BaseModal from '@/components/modals/BaseModal';
import Button from '@/components/ui/Button';

import styles from './GameOverModal.module.scss';

interface Props {
  title: string;
  description: string;
  onClickButtonChance: () => void;
  onClickButtonNewGame: () => void;
}

const GameOverModal: React.FC<Props> = ({ title, description, onClickButtonChance, onClickButtonNewGame }) => (
  <BaseModal classNameModal={styles.modal}>
    <div className={styles.body}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.buttons}>
        <Button appearance='primary' onClick={onClickButtonChance}>
          Another chance
        </Button>
        <Button onClick={onClickButtonNewGame}>New Game</Button>
      </div>
    </div>
  </BaseModal>
);
export default GameOverModal;
