import { useEffect, useMemo, useState } from 'react';
import { getAllTokenPrice } from './api/tokenPrice';
import { Button, Form, InputNumber, Select, notification } from 'antd';
import { handleSwapPrice } from './utils/tool';
import { InputValue, SwapResult, TokenPriceItem } from './types';

function App() {
  const [tokenList, setTokenList] = useState<TokenPriceItem[]>();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [swapResult, setSwapResult] = useState<SwapResult>();

  const tokenSend = Form.useWatch('tokenSend', form);
  const tokenReceive = Form.useWatch('tokenReceive', form);
  const numberReceive = Form.useWatch('numberReceive', form);
  const numberSend = Form.useWatch('numberSend', form);

  const objectByCurrency = useMemo(
    () =>
      tokenList?.reduce(
        (obj: { [currency: string]: TokenPriceItem }, item: TokenPriceItem) => {
          obj[item?.currency] = {
            ...item,
          };
          return obj;
        },
        {}
      ),
    [tokenList]
  );

  useEffect(() => {
    (async () => {
      const { data } = await getAllTokenPrice();
      setTokenList(data);
      form.setFieldsValue({
        tokenSend: data?.[0]?.currency,
        tokenReceive: data?.[1]?.currency,
      });
    })();
  }, [form]);

  const OptionList = useMemo(
    () =>
      tokenList?.map((token) => ({
        value: token?.currency,
        label: token?.currency,
      })),
    [tokenList]
  );

  const handleFinish = (values: InputValue) => {
    if (!values?.numberSend && !values?.numberReceive) {
      api.error({
        message: 'You need to fill in one of two input',
        placement: 'topRight',
      });
    }

    const swapResponse = handleSwapPrice({
      ...values,
      tokenSend: objectByCurrency?.[values?.tokenSend],
      tokenReceive: objectByCurrency?.[values?.tokenReceive],
    });
    setSwapResult(swapResponse);
  };

  return (
    <div className="App flex items-center justify-center">
      <div className="relative bg-[#0000009e] px-6 py-8 w-[500px] border-solid border-2 border-[#ffffff47] rounded-2xl">
        <div className="font-semibold text-2xl mb-6 text-center text-white">
          Swap Currency
        </div>
        {contextHolder}
        <Form form={form} onFinish={handleFinish}>
          <div className="bg-[#ffffff69] p-6 rounded-md flex justify-between mb-3">
            <div className="flex">
              <img src={`/icons/${tokenSend}.svg`} alt={tokenSend} />
              <Form.Item name="tokenSend" className="m-0">
                <Select className="ml-2 text-white" options={OptionList} />
              </Form.Item>
            </div>
            <Form.Item className="m-0" name="numberSend">
              <InputNumber
                disabled={numberReceive}
                placeholder="0.00"
                className="w-32"
              />
            </Form.Item>
          </div>
          <div className="bg-white w-10 h-10 rounded-full  absolute right-[50%] top-[153px] transform translate-x-[50%]">
            <img className="p-2" src="/icons/swap.svg" alt="swap" />
          </div>

          <div className="bg-[#ffffff69] p-6 rounded-md flex justify-between">
            <div className="flex">
              <img src={`/icons/${tokenReceive}.svg`} alt={tokenReceive} />
              <Form.Item className="m-0" name="tokenReceive">
                <Select className=" ml-2 text-white" options={OptionList} />
              </Form.Item>
            </div>
            <Form.Item className="m-0" name="numberReceive">
              <InputNumber
                disabled={numberSend}
                placeholder="0.00"
                className="w-32"
              />
            </Form.Item>
          </div>

          {swapResult?.amountSend && (
            <div className="text-white p-2 flex justify-center border-solid border-y-[1px] border-[#ffffff47] mt-6">
              {swapResult?.amountSend} {tokenSend} = {swapResult?.amountReceive}{' '}
              {tokenReceive}
            </div>
          )}

          <Form.Item className="flex justify-center mb-0">
            <Button
              htmlType="submit"
              className="mt-10 font-medium px-10 py-5 flex items-center">
              Confirm Swap
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default App;
