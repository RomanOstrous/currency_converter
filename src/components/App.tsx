import { useEffect, useState } from 'react';
import Header from './Header';
import Convertor from './Convertor';
import { CurrencyType } from '../types/CurrencyType';
import { NBUStat } from '../types/NBUStatType';
import '../styles/App.scss';

const App = () => {
  const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
  const [data, setData] = useState<NBUStat[]>([]);
  // для конвертора роблю свій json бо на всіх api функціонал з квейрі параметрами платний тому дані можуть відрізнятись від свіжих

  useEffect(() => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((resp) => resp.json())
      .then((resp) => setData(resp))
      .catch((error) => console.error('Помилка загрузки даних', error));
  }, []);

  useEffect(() => {
    fetch('currency_converter/currencies.json')
      .then((resp) => resp.json())
      .then((data) => setCurrencies(data.currencies));
  }, []);

  return (
    <div className="app">
      <Header data={data} />
      <Convertor currencies={currencies} />
    </div>
  );
};

export default App;
