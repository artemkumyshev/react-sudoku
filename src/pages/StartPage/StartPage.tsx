import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

import styles from './StartPage.module.scss';

const StartPage: React.FC = () => (
  <div className={styles.page}>
    <Typography as='h1' className='mb-4 uppercase text-blue-500' display='1' weight='bold'>
      Sudoku
    </Typography>
    <Typography as='p' className='mb-12 text-center' text='large'>
      To&nbsp;place a&nbsp;number in&nbsp;a&nbsp;square&nbsp;&mdash; type the number on&nbsp;your keyboard whilst hovering over the&nbsp;square, or&nbsp;after clicking on&nbsp;it
    </Typography>
    <Link className='w-full max-w-xs' to='/game'>
      <Button isRoundedFull appearance='primary' className='w-full' size='extraLarge' type='button'>
        <Typography as='span' className='uppercase ' text='large'>
          Play
        </Typography>
      </Button>
    </Link>
  </div>
);

export default StartPage;
