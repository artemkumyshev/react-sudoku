import React from 'react';

// Styles
import styles from './MainLayout.module.scss';

interface Props extends React.PropsWithChildren {}

const MainLayout: React.FC<Props> = ({ children }) => <div className={styles.layout}>{children}</div>;

export default MainLayout;
