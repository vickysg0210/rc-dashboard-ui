import React, {useEffect, useState} from 'react';
import {Row, Col, Typography, Input, Form, 
Radio, Switch, Slider, Select} from 'antd';

const CountrySelect = () =>{
  //data required
  let countries: Array<string> =["Total","SG","MY","ID","TH","VN","PH","TW","BR","CL","AR"]

  return(
    <div style={{height: "100%"}}>
      <Radio.Group defaultValue="Total" size="small" buttonStyle="solid">
        {countries.map((value) => {
          return <Radio.Button value={value}>{value}</Radio.Button>
        })}
      </Radio.Group>
    </div>
  )


}

export default CountrySelect;
