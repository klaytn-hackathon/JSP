import React from 'react';
import classNames from 'classnames/bind';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

const PageTemplate = () => (
  <div className={cx('page-template')}>
    <div className={cx('context')} />
  </div>
);

export default PageTemplate;
