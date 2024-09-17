import { useEffect, useState } from 'react';
import { NBUStat } from '../types/NBUStatType';

const Header = () => {
  const [data, setData] = useState<NBUStat[]>([]);

  useEffect(() => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((resp) => resp.json())
      .then((resp) => setData(resp))
      .catch((error) => console.error('Помилка загрузки даних', error));
  }, []);

  const USD = data.find((el) => el.cc === 'USD');
  const EUR = data.find((el) => el.cc === 'EUR');

  return (
    <div>
      <p>
        Aктуальний курс валют на {USD?.exchangedate} по відношенню до гривні:
      </p>
      <div>
        <p>USD = {USD?.rate}</p>
        <p>EUR = {EUR?.rate}</p>
      </div>
    </div>
  );
};

export default Header;
