export type CurrencyRate = {
  [key: string]: number;
};

export type CurrencyType = {
  name: string;
  fullName: string;
  rates: CurrencyRate;
};
