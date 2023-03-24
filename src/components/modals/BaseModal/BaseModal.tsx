import cn from 'classnames';
import React from 'react';

// Styles
import styles from './BaseModal.module.scss';

interface Props extends React.PropsWithChildren {
  classNameModal?: string;
  classNameInner?: string;
}

const BaseModal: React.FC<Props> = ({ classNameModal, classNameInner, children }) => (
  <div className={styles.wrapper}>
    <div className={styles.overlay} />
    <div className={cn(styles.modal, classNameModal)}>
      <div className={cn(styles.modal__inner, classNameInner)}>{children}</div>
    </div>
  </div>
);
export default BaseModal;
