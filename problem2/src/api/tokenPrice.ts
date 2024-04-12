import axios from 'axios';
import { TokenPriceItem } from '../types';

const request = axios.create({
  baseURL: 'https://interview.switcheo.com/',
  headers: {
    'content-type': 'application/json',
  },
});

export const getAllTokenPrice = () => {
  const url = `/prices.json`;
  return request.get<TokenPriceItem[]>(url);
};
