export interface InputValue {
  tokenSend: string;
  tokenReceive: string;
  numberSend?: number;
  numberReceive?: number;
}

export interface TokenPriceItem {
  currency: string;
  date: string;
  price: string;
}

export interface SwapResult {
  amountSend: number;
  amountReceive: number;
}
