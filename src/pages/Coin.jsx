import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle } from 'react-feather';
import Api from '../api/Api';
import {Sparklines, SparklinesCurve} from 'react-sparklines';
// import { LineChart, Line } from 'recharts';
import storage from '../utils/storage';

const Coin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [coins,setCoins] = useState(null);
  
  useEffect(()=>{ 
    (async function(){
      let coindata = await Api.getCoin(location.state.id);
      if(coindata){
        setCoins(coindata);
      }
    })();
  }, []);
  const addtoWatchlist =(id) => {
    let watchlist = storage.getStorage('watchlist');
    if (watchlist){
      watchlist.push(coins.id);
      let unique= [...new Set(watchlist)]
      storage.setStorage('watchlist',unique)
    }
    else{
      storage.setStorage('watchlist',[coins.id]);
    }
  }
  return (
    <div className='wrapper1'>
      <div className="content">
        <div className="header">
          <h4>Coin Details</h4>
          <button className='btn' onClick={() => navigate(-1)}>
            <ArrowLeft></ArrowLeft>&nbsp; Back
          </button>
        </div>
        <br />
        {coins && <div> 
          <div className="coindata">
            <div className="description">
              <div className="rank">
                <span>Rank #{coins.market_cap_rank}</span>
              </div>
              <h3 className='mt-4'>{coins.name} <small>({coins.symbol.toUpperCase()})</small></h3>
              <h2>${coins.market_data.current_price.usd} (USD)</h2>
            </div>
            <div className="icon">
              <img src={coins.image.large} width={100} alt="" />
            </div>
          </div>
          <div className="chart">
              <Sparklines data={coins.market_data.sparkline_7d.price} width={120} height={20} margin={5}>
                <SparklinesCurve color='#fff'></SparklinesCurve>
              </Sparklines>
          </div>
          <div className="marketdata">
            <span className="row">
              <span>Circulating Supply</span>
              <span>{coins.market_data.circulating_supply}</span>
            </span>
            <span className="row">
              <span>Total Supply</span>
              <span>{coins.market_data.total_supply}</span>
            </span>
            <span className="row">
              <span>max Supply</span>
              <span>{coins.market_data.max_supply}</span>
            </span>
          </div>
          <br />
          <h4>Price change in %</h4>
          <div className="pricechange mt-4">
            <span className="col">
              <span>24h</span>
              <span>{coins.market_data.price_change_percentage_24h.toFixed(2)}</span>
            </span>
            <span className="col">
              <span>7d</span>
              <span>{coins.market_data.price_change_percentage_7d.toFixed(2)}</span>
            </span>
            <span className="col">
              <span>14d</span>
              <span>{coins.market_data.price_change_percentage_14d.toFixed(2)}</span>
            </span>
            <span className="col">
              <span>30d</span>
              <span>{coins.market_data.price_change_percentage_30d.toFixed(2)}</span>
            </span>
            <span className="col">
              <span>1y</span>
              <span>{coins.market_data.price_change_percentage_1y.toFixed(2)}</span>
            </span>
          </div>

          <div className="btn mt-4" onClick={()=> addtoWatchlist()}>
            <PlusCircle></PlusCircle>&nbsp; Add to Watchlist
          </div>
        
        </div>}
      </div>
    </div>
  );  
}
export default Coin;