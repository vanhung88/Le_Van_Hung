import { useEffect, useMemo, useState } from 'react';
import { TokenPriceItem, getAllTokenPrice } from './api/request';
import { Button, Form, InputNumber, Select, notification } from 'antd';
import { handleSwapPrice } from './utils/tool';

export interface InputValue {
  tokenSend: string;
  tokenReceive: string;
  numberSend: string;
  numberReceive: string;
}

function App() {
  const [tokenList, setTokenList] = useState<TokenPriceItem[]>();
  const [form] = Form.useForm();
  const tokenSend = Form.useWatch('tokenSend', form);
  const tokenReceive = Form.useWatch('tokenReceive', form);
  const [api, contextHolder] = notification.useNotification();

  const [result, setResult] = useState({
    tokenSend: '',
    tokenReceive: '',
    amountSend: '',
    amountReceive: '',
  });

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
  console.log(tokenList);
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

  const OptionList = tokenList?.map((token) => ({
    value: token?.currency,
    label: token?.currency,
  }));

  const handleFinish = (values: InputValue) => {
    if (!values?.numberSend && !values?.numberReceive) {
      api.error({
        message: 'You need to fill in one of two input',
        placement: 'topRight',
      });
    }
    // calculate
    const swap: any = handleSwapPrice({
      ...values,
      tokenSend: objectByCurrency?.[values?.tokenSend],
      tokenReceive: objectByCurrency?.[values?.tokenReceive],
    });
    setResult(swap);
  };
  console.log(result);
  return (
    <div className="App flex items-center justify-center">
      <div className="relative bg-[#0000009e] p-4 w-[500px] text-white border-solid border-2 border-white rounded-xl">
        <div className="font-semibold text-2xl mb-4 text-center">Swap</div>
        {contextHolder}
        <Form form={form} onFinish={handleFinish}>
          <div className="bg-[#ffffff69] p-6 rounded-md flex justify-between mb-4">
            <div className="flex">
              <img src={`/icons/${tokenSend}.svg`} alt={tokenSend} />
              <Form.Item name="tokenSend" className="m-0">
                <Select className="ml-2 text-white" options={OptionList} />
              </Form.Item>
            </div>
            <Form.Item className="m-0" name="numberSend">
              <InputNumber placeholder="0.00" className="w-32" />
            </Form.Item>
          </div>

          <div className="bg-white w-10 h-10 rounded-full  absolute right-[50%] top-[132px] transform translate-x-[50%]">
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
              <InputNumber placeholder="0.00" className="w-32" />
            </Form.Item>
          </div>

          <Form.Item className="flex justify-center">
            <Button
              htmlType="submit"
              className="mt-10 font-medium p-5 flex items-center">
              CONFIRM SWAP
            </Button>
          </Form.Item>
          <div className="bg-[#e5e7e8] p-4 rounded-md flex justify-between mt-4">
            {result?.amountSend} {result?.tokenSend} = {result?.amountReceive}{' '}
            {result?.tokenReceive}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default App;
