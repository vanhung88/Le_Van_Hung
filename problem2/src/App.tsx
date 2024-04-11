import { useEffect, useState } from 'react';
import { getAllTokenPrice } from './api/request';

function App() {
  const [tokenList, setTokenList] = useState();
  useEffect(() => {
    (async () => {
      const response: any = await getAllTokenPrice();
      setTokenList(response?.data);
    })();
  }, []);

  console.log(tokenList);
  return (
    <div className="App flex items-center justify-center">
      <div className="bg-[#0000009e] p-4 w-[500px] h-[400px] text-white border-solid border-2 border-white rounded-lg">
        <div className="font-semibold text-2xl text-center">Currency Swap</div>
      </div>
    </div>
  );
}

export default App;
