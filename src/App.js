import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Product from './product.js';


function App() {


  const [firstName, setFirstName] = useState('Taha')
  const [names, setNames] = useState(['isim 1', 'isim 2', 'isim 3'])
  const [userInfo, setUserInfo] = useState({username: 'tahakcy', password: '123123'})
  const [count, setCount] = useState(0);
  const [productName, setProductName] = useState('');
  const [productPrice, setPrice] = useState('');

    const nameChange = () => {
    setFirstName("İsim değişti")
  }

  const changeNames = () => {
    setNames([
      'yeni 1', 'yeni 2', 'yeni 3'
    ])
  }

  const newInfo = () => {
    setUserInfo({
      username:'yeni username',
      password:'1111111'
    })
  }

  const increase = () => {
    setCount(count+1)
  }

  const decrease = () => {
    if(count > 0){
    setCount(count-1)
    }
  }

  useEffect(() => {
    console.log('Her zaman çalışır.')
  })

  useEffect(() => {
    console.log('İlk render edilişte çalışır.')
  }, [])

  useEffect(() =>{
    console.log('ilk render ve firstname değiştiğinde')
  },[firstName])

   useEffect(() =>{
    console.log('ilk render ve name list değiştiğinde')
  },[names])

   useEffect(() =>{
    console.log('ilk render ve user info değiştiğinde')
  },[userInfo])

  useEffect(() => {
    console.log('ilk render ve count değişince çalışır')
  },[count])

   useEffect(() => {
    console.log('İlk render ve product propsu değiştiğinde.')
  },[productName])

  useEffect(() => {
    console.log('İlk render ve product propsu değiştiğinde.')
  },[productPrice])

    return (
    <div>
      {firstName}
      <button onClick={nameChange}>isim değiştir 1</button>
      <button onClick={()=> setFirstName("yeni isim")}>isim değiştir 2</button>
      {names.map((name ,index) => (
        <div key = {index}>{name}</div>
      ))}
      {userInfo.username} {userInfo.password}
      <p>Count: {count}</p>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
      <button onClick={changeNames}>isim dizisini değiş</button>
      <button onClick={newInfo}>info değiş</button>
      <Product name={productName} price ={productPrice}/>
      <button onClick={() => setProductName('ürün ismi')}>product name</button>
      <button onClick={() => setPrice('6444 TL')}> product price</button>
    </div>
  );
}

export default App;
