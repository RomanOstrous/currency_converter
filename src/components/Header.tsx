import { FC } from 'react';
import { NBUStat } from '../types/NBUStatType';
import '../styles/Header.scss';

type Props = {
  data: NBUStat[];
};

const Header: FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Загрузка актуальних даних...</div>;
  }

  const USD = data.find((el) => el.cc === 'USD');
  const EUR = data.find((el) => el.cc === 'EUR');

  return (
    <div className="header">
      <p className="header__title">
        Aктуальний курс валют на {USD?.exchangedate} по відношенню до гривні:
      </p>
      <div className="header__container">
        <p className="header__container-text">
          USD ={' '}
          <span className="header__container-text-color">
            {USD?.rate.toFixed(2)}
          </span>
        </p>
        <p className="header__container-text">
          EUR ={' '}
          <span className="header__container-text-color">
            {EUR?.rate.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Header;
