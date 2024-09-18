import React, { useState, useEffect, useRef, FC } from 'react';
import { CurrencyType } from '../types/CurrencyType';
import '../styles/Convertor.scss';

type Props = {
  currencies: CurrencyType[];
};

const Converter: FC<Props> = ({ currencies }) => {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [select1, setSelect1] = useState('USD');
  const [select2, setSelect2] = useState('UAH');

  const activeInput = useRef<'input1' | 'input2' | null>(null);

  const convert = (count: number, from: string, to: string) => {
    const fromCurrency = currencies?.find((c) => c.name === from);
    const toCurrency = currencies?.find((c) => c.name === to)?.name;

    if (fromCurrency && toCurrency) {
      const rate = fromCurrency.rates[toCurrency];
      return (count * rate).toFixed(2);
    }
    return 0;
  };

  useEffect(() => {
    if (activeInput.current === 'input1') {
      const newValue = convert(input1, select1, select2);
      if (newValue !== input2) {
        setInput2(+newValue);
      }
    }
  }, [input1, select1, select2, currencies]);

  useEffect(() => {
    if (activeInput.current === 'input2') {
      const newValue = convert(input2, select2, select1);
      if (newValue !== input1) {
        setInput1(+newValue);
      }
    }
  }, [input2, select1, select2, currencies]);

  const handleInput1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    activeInput.current = 'input1';
    setInput1(+e.target.value);
  };

  const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    activeInput.current = 'input2';
    setInput2(+e.target.value);
  };

  if (!currencies || currencies.length === 0) {
    return <div>Загрузка конвертера...</div>;
  }

  return (
    <div className="convertor">
      <div className="convertor__container">
        <select
          className="convertor__field"
          value={select1}
          onChange={(e) => setSelect1(e.target.value)}
        >
          {currencies.map((currency) => (
            <option
              className="convertor__field-option"
              key={currency.name}
              value={currency.name}
            >
              {currency.fullName}
            </option>
          ))}
        </select>
        <input
          className="convertor__field"
          type="number"
          min={0}
          value={input1}
          onChange={handleInput1Change}
        />
      </div>

      <div className="convertor__container">
        <select
          className="convertor__field"
          value={select2}
          onChange={(e) => setSelect2(e.target.value)}
        >
          {currencies.map((currency) => (
            <option
              className="convertor__field-option"
              key={currency.name}
              value={currency.name}
            >
              {currency.fullName}
            </option>
          ))}
        </select>
        <input
          className="convertor__field"
          type="number"
          value={input2}
          min={0}
          onChange={handleInput2Change}
        />
      </div>
    </div>
  );
};

export default Converter;
