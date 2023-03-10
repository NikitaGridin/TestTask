import React from 'react';
import axios from 'axios';
import { Result } from './Result';
import { Fibonacci } from './Fibonacci';

const headers2 = {
  'Content-Type': 'application/json',
  'X-ZONT-Client': import.meta.env.VITE_EMAIL,
};

const App: React.FC = () => {
  const btn_count = 'https://lk.zont-online.ru/api/button_count';

  const [count, setCount] = React.useState<number>(0);
  const [timer, setTimer] = React.useState<number | null>(null);
  const [token, setToken] = React.useState<string>('');
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string>('');

  const [loading, setLoading] = React.useState<boolean>(false);

  const countRef = React.useRef<number>(0);

  const handleClick = () => {
    setCount((count) => {
      countRef.current = count + 1;
      return count + 1;
    });

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        sendApi();
        setTimer(null);
      }, 1000)
    );
  };


  const sendApi = (): void => {
    setLoading(true);
    axios
      .post(btn_count, { count: countRef.current }, { headers: headers2 })
      .then((res) => {
        if (res.status !== 200) {
          setRes(null)
          throw new Error('Ошибка сервера');
        }
        return res;
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setCount(0)
        setRes(data.count);
        setLoading(false);
        setError('');
      })
      .catch((error) => {
        setCount(0);
        setError('Произошла ошибка, попробуйте еще раз');
        setLoading(false);
      });
  };

  return (
    <>
      <Fibonacci />
      <div className='w-1/5 mx-auto mt-20'>
        <div
          className={`rounded-lg text-2xl py-4 text-center font-bold cursor-pointer active:bg-yellow-500 ${
            loading ? 'bg-yellow-200 pointer-events-none' : 'bg-yellow-400'
          }`}
          onClick={handleClick}
        >
          КЛИКНУТЬ
        </div>
        {loading && <span>Загрузка...</span>}
        {res && <Result message='Кол-во кликов по версии сервера' count={res} border="border-yellow-400"/>}
        {error && <Result message={error} border="border-red-400"/>}
      </div>
    </>
  );
};

export default App;
