import React, {useEffect, useState, Component} from 'react';
import {Row, Col, Card, TreeSelect} from 'antd';
import { Select } from "antd";
import StackedColumnChart from 'bizcharts/lib/plots/StackedColumnChart';
import {
	Chart,
	Tooltip,
	Legend,
	Point,
	Line,
	Interval
} from "bizcharts";
import DataSet from '@antv/data-set';
import { capacityByRegion, slotsByRegion, slotsBySuite, puBySuite } from '../../data/racks'

const { Option } = Select;

const treeData = [
  {
    title: 'DC-West',
    value: 'DC-West',
    children: [
      {
        title: 'Data Hall',
        value: 'Data Hall',
      },
      {
        title: 'DH10',
        value: 'DH10',
      },
      {
        title: 'DH3',
        value: 'DH3'
      }
    ],
  },
  {
    title: 'CPTL',
    value: 'CPTL',
    children:[
      {
        title: 'Hall 302',
        value: 'Hall 302'
      }
    ]
  },
];

class Rack extends React.Component{
  state = {
    puBySuite : puBySuite,
    suiteSel: "CPTL"
  }

  handleChange = (value: any) => {
    this.setState({
      suiteSel : value
    })
  }

  render(){
    return(
    <Row gutter={[16,16]} style={{width: "100%"}}>
      <Row gutter={[32,32]} style={{width: "100%"}}>
        <Col span={12} style={{width: "100%"}}>
          <StackedColumnChart 
            data={capacityByRegion}
            title={{
              visible : true,
              text : "Floor Space Activated"
            }}
            // legend ={{
            //   // marker: {
            //   //   symbol : 'hexagon'
            //   // }
            //   value: 'people',
            //   marker: {symbol: 'hyphen'}
            // }}
            xField='region'
            yField='count'
            yAxis={{
              min:0,
              title:{
                text : "Number of Racks"
              }
            }}
            xAxis={{
              title:{
                text: "Region"
              }
            }}
            color={['#437560', '#BEDACE']}
            stackField='type'
            label={{
              visible: true
            }}

            />  
        </Col>
        <Col span={12} style={{width: "100%"}}>
          <StackedColumnChart 
              data={slotsByRegion}
              title={{
                visible : true,
                text : "Floor Space Remaining"
              }}
              xField='region'
              yField='count'
              yAxis={{
                min:0,
                title:{
                  text : "Logical Server Units"
                }
              }}
              xAxis={{
                title:{
                  text: "Region"
                }
              }}
              color={['#288ECC', '#BBDDF2']}
              stackField='type'
              label={{
                visible: true
              }}
              />  
        </Col>
      </Row>
      <Row gutter={[32,32]} style={{width: "100%"}}>
        <Col span={12} style={{width: "100%"}}>
          <StackedColumnChart 
            data={slotsByRegion}
            title={{
              visible : true,
              text : "Power Usage Status Across Regions"
            }}
            // legend ={{
            //   // marker: {
            //   //   symbol : 'hexagon'
            //   // }
            //   value: 'people',
            //   marker: {symbol: 'hyphen'}
            // }}
            xField='region'
            yField='count'
            yAxis={{
              min:0,
              title:{
                text : "Number of Racks"
              }
            }}
            xAxis={{
              title:{
                text: "Region"
              }
            }}
            color={['#D3CB5F', '#A0982C']}
            stackField='type'
            label={{
              visible: true
            }}

            />  
        </Col>
      </Row>
      <Row style={{width: "100%"}}>
        
        <StackedColumnChart 
            data={slotsBySuite}
            title={{
              visible : true,
              text : "Suite Space Capacity"
            }}
            xField='suite'
            yField='count'
            yAxis={{
              min:0,
              title:{
                text : "Logical Server Units"
              }
            }}
            xAxis={{
              title:{
                text: "IDC"
              }
            }}
            color={['#288ECC', '#BBDDF2']}
            stackField='type'
            label={{
              visible: true
            }}
        />  
      </Row>
      <Row gutter={[16,8]} style={{marginLeft: "2%", fontSize: "18px", color: "rgba(0, 0, 0, 0.85)", lineHeight :"1.571", marginTop: "2%"}}>
        IDC Summary
      </Row>
      <Row gutter ={[32,32]} style={{marginLeft:"90%"}}>
        <TreeSelect   
        placeholder="Select IDC/Suite" 
        treeDefaultExpandAll
        style={{width:"150px"}} 
        treeData={treeData}
        onChange={this.handleChange}>
        </TreeSelect>
      </Row>  
      {
        puBySuite.filter(object => object.suite == this.state.suiteSel).map((item, index) => {
          return (
          <Row>
            <Row gutter={[32,32]} style={{width: "100%", margin: "10px"}}>
              <Col span={6}>
              <Card title="Power Usage">
                {item.usedP} KW Consumed
              </Card>    
              </Col>
              <Col span={6}>       
              <Card title="Racks Usage">
                {item.total_racks} Racks Used
              </Card> 
              </Col> 
              <Col span={6}>
              <Card title="Slots Usage">
                {item.total_slots} Logical Slots Used
              </Card>  
              </Col> 
              <Col span={6}>
              <Card title="Available Space">
                {item.total_slots} Logical Slots Available
              </Card>  
              </Col> 
            </Row>
            <Row gutter={[16,16]} style={{width: "100%", margin: "10px"}}>
              <Col span={6}>
              <Card title="Power Usage">
                {item.usedP} KW Capacity
              </Card>    
              </Col>
              <Col span={6}>       
              <Card title="Racks Usage">
                {item.total_racks} Racks in Total
              </Card> 
              </Col> 
              <Col span={6}>
              <Card title="Slots Usage">
                {item.total_slots} Logical Slots in Total
              </Card>  
              </Col>
              <Col span={6}>
              <Card title="Available Space">
                {item.total_slots} Logical Slots Available
              </Card>  
              </Col>  
            </Row>
          </Row>
          )

        })
      }
    </Row>

    )
  }
}

export default Rack;
