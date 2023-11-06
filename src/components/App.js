import { useEffect, useState } from "react";
import Web3 from "web3";

const initialInfoState = {
  web3: null,
};

function App() {

  const [info, setInfo] = useState(initialInfoState);

  const init = async () => {
    if (!window.ethereum) {
      return;
    }
    let web3 = new Web3(window.ethereum);

    setInfo((prevState) => ({
      ...prevState,
      web3: web3,
    }));
  };

  const initListeners = () => {
    init();
  };

  const clickHandler = async () => {
    const batch = new info.web3.BatchRequest();
    const request1 = {
      jsonrpc: '2.0',
      id: 10,
      method: 'eth_getBalance',
      params: ['0xf4ffff492596ac13fee6126846350433bf9a5021', 'latest'],
    };
    const request2 = {
      jsonrpc: '2.0',
      id: 12,
      method: 'eth_getBalance',
      params: ['0xdc6bad79dab7ea733098f66f6c6f9dd008da3258', 'latest'],
    };
    batch.add(request1);
    const request2Promise = batch.add(request2);
    request2Promise.then(response => {
      console.log(response);
    });
    const responses = await batch.execute();
    console.log(responses);
  }

  useEffect(() => {
    initListeners();
  }, []);

  return (
    <div className="page">
        <button onClick={clickHandler} type="button" className="btn btn-secondary">
          Test Batch Request
        </button>
    </div>
  );
}

export default App;
