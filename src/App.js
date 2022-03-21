import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Api } from './services';

function App() {

  const [data, setData] = useState([]);

  const initData = async () => {
    await Api.get('pokemon?limit=100&offset=200')
    .then((response) => {
      const {data} = response;
      setData(data.results);
    })
    .catch((error) => {
      console.log('Error exception : ', error);
    });
  };

  useEffect(() => {
    initData();
  }, [])

  return (
    <div className="App">
      {
        data.length > 0 && data.map((item, index) => {
          return <p key={index.toString()}>{item.name}</p>
        })
      }
    </div>
  );
}

export default App;
