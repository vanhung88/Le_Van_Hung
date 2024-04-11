import { InputValue } from '../App';

export const handleSwapPrice = ({
  tokenSend,
  tokenReceive,
  numberSend,
  numberReceive,
}: any) => {
  if (numberSend) {
    const cal = Number(tokenSend?.price) / Number(tokenReceive?.price);
    const result = numberSend * cal;
    return {
      amountSend: numberSend,
      tokenSend: tokenSend?.currency,
      amountReceive: result,
      tokenReceive: tokenReceive?.currency,
    };
  }

  //   if(numberReceive)
  return {};
};
