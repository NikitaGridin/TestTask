import React from 'react'
import axios from 'axios'
import { Result } from './Result';
import { Fibonacci } from './Fibonacci';

const App:React.FC = () => {
  const email:string = import.meta.env.VITE_EMAIL;
  const password = import.meta.env.VITE_PASSWORD;
  const login = import.meta.env.VITE_LOGIN;
  const appName = import.meta.env.VITE_APP_NAME;
  
  const auth = 'https://zont-online.ru/api/get_authtoken';
  const btn_count = 'https://lk.zont-online.ru/api/button_count';

  //Объект передаваемых заголовков для получения токена
  const headers = {
    'Content-Type': 'application/json',
    'X-ZONT-Client': email,
    'Authorization': 'Basic ' + btoa(login + ':' + password)
  };
  //Счётчик
  const [count, setCount] = React.useState<number>(0);

  //Таймер
  const [timer, setTimer] = React.useState<number | null>();

  //Токен для авторизации, получаемый с сервера
  const [token, setToken] = React.useState<string>('');

  //Ответ от сервера
  const [res, setRes] = React.useState<number | null>();

  //Состояние загрузки
  const [loading, setLoading] = React.useState<boolean>(false);

  const countRef = React.useRef<number | null>(0)
  
  //Функция увеличения счётчика, и запуска таймера, перед этим его очистки
  function handleClick(): void {
    setCount(count+1)
    countRef.current = count + 1;
    if(timer){
      clearTimeout(timer)
    }
    setTimer(setTimeout(()=>{
      sendApi();
      setTimer(null)
    }, 1000))
  }

  //Объект передаваемых заголовков для отправки значения счётчика на сервер
  const headers2= {
    'Content-Type': 'application/json',
    'X-ZONT-Client': email,
    'X-ZONT-Token': token,
  }

  //Отправка значения счётчика на сервер, и получение его
  const sendApi = ():void =>{
    setLoading(true)
    axios.post(btn_count, {count: countRef.current}, {headers: headers2})
    .then(res =>{
      if(res.status !== 200){
        throw new Error('Ошибка сервера')
      }
      return res
    }).then(res =>{
      return res.data;
    }).then(data =>{
    setRes(data.count)  
    //Если нужно что бы каждый последующий запрос начинался с нуля
    // setCount(0)
    setLoading(false)
    })
    }

  //Получение токена
  React.useEffect(() => {   
    axios.post(auth, {client_name: appName}, {headers:headers})
    .then(res =>{
      if(res.status !== 200){
        throw new Error('Ошибка сервера')
      }
      return res.data
    })
    .then(res =>{
      setToken(res.token)
    })
    .catch(error => {
      console.error('There was a problem with the axios operation:', error);
      });
  }, []);


  return (<>  
  <Fibonacci />
  <div className='w-1/5 mx-auto mt-20'>
  <div className={`rounded-lg text-2xl py-4 text-center font-bold cursor-pointer ${loading ? 'bg-yellow-200 pointer-events-none' : 'bg-yellow-400'}`} onClick={handleClick}>КЛИКНУТЬ</div>
  {loading && 
  <span>Загрузка...</span>
  }
  {res && 
  <Result message="По версии сервера" count={res}/>
  }
  </div>
  </>
  )
}

export default App
