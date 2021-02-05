import React, {useEffect, useState, Component} from 'react';
import {Row, Col, Card, List} from 'antd';
import { Select } from "antd";
import { GroupedColumnChart, ColumnChart, DonutChart } from 'bizcharts';
import {
	Chart,
	Tooltip,
	Legend,
	Point,
	Line,
	Interval
} from "bizcharts";
import DataSet from '@antv/data-set';
import { countsByRegion, countsByBrand, countsByStatus, countsByEntity, countsByOS } from '../../data/servers'

const { Option } = Select;

class Server extends React.Component{

  render(){
    return(
    <Row>
      <Row gutter={[32,32]} style={{width: "100%"}}>
        <GroupedColumnChart
        data = {countsByRegion}
        title={{
          visible: true,
          text: 'Inventory By Region'
        }}
        xField='region'
        yField='count'
        yAxis={{
          min:0,
          title:{
            text : "Number of Servers"
          }
        }}
        xAxis={{
          title:{
            text: "Region"
          }
        }}
        label={{
          visible: true
        }}
        legend = {{
          position: 'right-top'
        }}
        groupField = 'type'
        color={['#6EB5E2', '#090C9B']}   
        />
      </Row>

      <Row gutter={[32,32]} style={{width: "100%"}}>
        <Col span={12} style={{height: "400px"}}>
          <ColumnChart
            data = {countsByBrand}
            title={{
              visible: true,
              text: "Server Counts By Brand"
            }}
            yAxis={{
              min:0,
              title:{
                text : "Number of Servers"
              }
            }}
            xAxis={{
              title:{
                text: "Vendor Brand"
              }
            }}
            forceFit
            xField = 'brand'
            yField = 'count'
            color = '#2276AA'
            label={{
              visible: true
            }}
          />
        </Col>
        <Col span={12} style={{height: "400px"}}>
          <ColumnChart
            data = {countsByOS}
            title={{
              visible: true,
              text: "Server Counts By OS"
            }}
            forceFit
            yAxis={{
              min:0,
              title:{
                text : "Number of Servers"
              }
            }}
            xAxis={{
              title:{
                text: "OS Version"
              }
            }}
            xField = 'os'
            yField = 'count'
            color = '#9EA0FA'
            label={{
              visible: true
            }}
          />
        </Col>
      </Row>
      <Row gutter={[32,32]} style={{width: "100%"}}>
        <Col span={12} style={{height: "600px"}}>
          <DonutChart
            data={countsByStatus}
            title={{
              visible: true,
              text: 'Server Counts By Status'
            }}
            forceFit
            radius = {0.8}
            padding= 'auto'
            angleField= 'value'
            colorField = "status"
          />

        </Col>
        <Col span={12} style={{height: "600px"}}>
        <DonutChart
            data={countsByEntity}
            title={{
              visible: true,
              text: 'Server Counts By Entity'
            }}
            forceFit
            radius = {0.8}
            padding= 'auto'
            angleField= 'value'
            colorField = "entity"
          />
        </Col>
      </Row>
    </Row>

    )
  }
}

export default Server;
