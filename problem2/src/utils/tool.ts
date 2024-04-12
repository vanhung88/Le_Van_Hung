import { TokenPriceItem } from '../types';

export const handleSwapPrice = ({
  tokenSend,
  tokenReceive,
  numberSend,
  numberReceive,
}: {
  tokenSend?: TokenPriceItem;
  tokenReceive?: TokenPriceItem;
  numberSend?: number;
  numberReceive?: number;
}) => {
  const getPriceRatio = (priceA: number, priceB: number): number => {
    return priceB !== 0 ? priceA / priceB : 0;
  };

  if (numberSend) {
    const amountReceiveCal =
      numberSend *
      getPriceRatio(Number(tokenSend?.price), Number(tokenReceive?.price));
    return {
      amountSend: numberSend,
      amountReceive: amountReceiveCal,
    };
  }

  if (numberReceive) {
    const amountSendCal =
      numberReceive *
      getPriceRatio(Number(tokenReceive?.price), Number(tokenSend?.price));

    return {
      amountSend: amountSendCal,
      amountReceive: numberReceive,
    };
  }
  return undefined;
};
