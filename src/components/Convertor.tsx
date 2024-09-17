import React, { useState, useEffect } from 'react';
import { CurrencyType } from '../types/CurrencyType';

const Converter = () => {
  const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
  const [input1, setInput1] = useState(1);
  const [input2, setInput2] = useState(0);
  const [select1, setSelect1] = useState('USD');
  const [select2, setSelect2] = useState('UAH');

  useEffect(() => {
    fetch('/currencies.json')
      .then((resp) => resp.json())
      .then((data) => setCurrencies(data.currencies));
  }, []);

  useEffect(() => {
    const fromCurrency = currencies.find((c) => c.name === select1);
    const toCurrency = currencies.find((c) => c.name === select2)?.name;
    if (fromCurrency && toCurrency) {
      const rate = fromCurrency.rates[toCurrency];
      setInput2(input1 * rate);
    }
  }, [input1, select1, select2, currencies]);

  // useEffect(() => {
  //   const fromCurrency = currencies.find(c => c.name === select2);
  //   const toCurrency = currencies.find(c => c.name === select1)?.name;
  //   if (fromCurrency && toCurrency) {
  //     const rate = fromCurrency.rates[toCurrency];
  //     setInput1(input2 * rate);
  //   }
  // }, [input2, select1, select2, currencies]);

  return (
    <div>
      <div>
        <select value={select1} onChange={(e) => setSelect1(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency.name} value={currency.name}>
              {currency.fullName}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={0}
          value={input1}
          onChange={(e) => setInput1(+e.target.value)}
        />
      </div>

      <div>
        <select value={select2} onChange={(e) => setSelect2(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency.name} value={currency.name}>
              {currency.fullName}
            </option>
          ))}
        </select>
        <input
          value={input2}
          type="number"
          min={0}
          onChange={(e) => setInput2(+e.target.value)}
        />
      </div>
    </div>
  );
};

export default Converter;
