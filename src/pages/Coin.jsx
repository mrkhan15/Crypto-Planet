import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import Api from '../api/Api';
import {Sparklines, SparklinesCurve} from 'react-sparklines';

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
  }, [])
  return (
    <div className='wrapper1'>
      <div className="content">
        <div className="header">
          <h4>Coin Details</h4>
          <button className='btn'>
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
            <span className="row"></span>
          </div>
        
        </div>}
      </div>
    </div>
  );  
}
export default Coin;