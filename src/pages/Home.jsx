import React from 'react';
import data from '../assets/data.json';
import {ArrowUp, ArrowDown} from 'react-feather';
import {Sparklines, SparklinesCurve} from 'react-sparklines';

export default function Home() {
  return (
    <div>
      <div className="wrapper1">
        <div className="content1">
          {data.map((x)=>{
            return<div className="coinwrapper">
              <div className="left">
                <div className="icon">
                  <img src={x.image} width={70} alt="" />
                </div>
                <div className="description">
                  <h4>{x.name}</h4>
                  <p>Current Price : ${x.current_price} (USD)</p>
                  <div className="highlow">
                    <span> <ArrowUp size={16} color='green'></ArrowUp> ${x.high_24h}</span>
                    <span> <ArrowDown size={16} color='red'></ArrowDown> ${x.low_24h} </span>
                    <span><small>(24h High-Low)</small></span>
                  </div>
                </div>
                <div className="chart">
                  <Sparklines data={x.sparkline_in_7d.price} width={120} height={20} margin={5}>
                    <SparklinesCurve color='#fff'></SparklinesCurve>
                  </Sparklines>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
