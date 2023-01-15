
 interface Query {
  from: string;
  to: string;
  amount: number;
}

 interface Info {
  timestamp: number;
  rate: number;
}

 export interface outputItem {
  success: boolean;
  query: Query;
  info: Info;
  date: string;
  result: number;
}
export interface Currency {
  code: string;
  country: string;
}
export interface Messages {
  //code: string;
  message: string;
}
export interface graphDate {
currencyDate:string
}


// export interface graphData {
//   cod: string;
//   price: number;
// }

export interface ExchangeState{
  apiKey:string;
  baseUrl:string;
}