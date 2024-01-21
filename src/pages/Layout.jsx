import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
        <h1 className='appName'>Crypto Planet</h1>
        <nav>
          <ul className='tabs'>
            <li> <Link to="/" className='active'>Top Coins </Link></li>
            <li> <Link to="/watchlist" className=''>Watchlist </Link></li>
          </ul> 
        </nav>
        <Outlet></Outlet>
    </div>
  )
}
