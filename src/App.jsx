import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Coin from './pages/Coin';
import NoPage from './pages/NoPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='watchlist' element={<Watchlist/>}></Route>
        <Route path= 'Coin' element={<Coin/>}></Route>
        <Route path= '*' element={<NoPage/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
