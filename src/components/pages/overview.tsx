import React from 'react';
import {Row, Col, Statistic, Tabs} from 'antd';
import { TableOutlined, DatabaseOutlined, NumberOutlined, PoweroffOutlined} from '@ant-design/icons';
import { LiquidChart, GroupedColumnChart } from 'bizcharts';
import DCMap from '../../components/parts/map'
import List from '../../components/parts/list'
import { occupancy } from '../../data/occupancy'
import { usageByCompany } from '../../data/usageByCompany'

const {TabPane} = Tabs;

class Overview extends React.Component{
  render(){
    return(
      <div >
        <Row gutter={[16,20]} justify="center">
          <Col span={12} >
            <Row gutter={[32,64]}>
              <Col span={12} id= "test"><Statistic title="Total Racks" 
              value={1128} 
              prefix={<TableOutlined />}
              style = {{width: "100%", textAlign: "center"}} /></Col>
              <Col span={12} ><Statistic 
              title="Total Servers" 
              value={1128} 
              prefix={<DatabaseOutlined />}
              style = {{width: "100%", textAlign: "center"}} /></Col>
            </Row>
            <Row gutter={[16,16]}>
              <Col span={12} ><Statistic 
              title="Total Available Standard Server Units" 
              value={1128} 
              prefix={<NumberOutlined />}
              style = {{width: "100%", textAlign: "center"}} /></Col>
              <Col span={12} ><Statistic 
              title="Total Power" 
              value={'36,180 W'} 
              prefix={<PoweroffOutlined />} 
              style = {{width: "100%", textAlign: "center"}} /></Col>
            </Row>        
          </Col>
          <Col span={4}><LiquidChart
                  title={{
                    visible: true,
                    alignTo: 'middle',
                    text: 'Active Racks'
                  }}
                  description={{
                    visible: true,
                    alignTo: 'middle',
                    text: 'Active Racks / Total'
                  }}
                  statistic = {{
                    visible: true,
                    adjustColor: true,
                    formatter: ({percent}) => {
                      return Math.round((occupancy.activatedRacks / occupancy.totalRacks )*100) + " %" + 
                      "\n" +
                      " \n" + occupancy.activatedRacks + " R"
                    },
                    style : {
                      fontSize: 20,
                      fontWeight: 500
                    }
                  }}
                  min={0}
                  max={occupancy.totalRacks}
                  value={occupancy.activatedRacks}
                  liquidStyle = {{
                    lineWidth: 4,
                    fill:'#7DB59E',
                  }}
                  color = "#7DB59E"
                />
              </Col>
              <Col span={4}><LiquidChart
                  title={{
                    visible: true,
                    alignTo: 'middle',
                    text: 'Active Power'
                  }}
                  description={{
                    visible: true,
                    alignTo: 'middle',
                    text: 'Active Power / Total'
                  }}
                  statistic = {{
                    visible: true,
                    adjustColor: true,
                    formatter: ({percent}) => {
                      return Math.round((occupancy.activatedRacks / occupancy.totalRacks )*100) + " %" + 
                      "\n" +
                      " \n" + occupancy.activatedRacks + " W"
                    },
                    style : {
                      fontSize: 20,
                      fontWeight: 500
                    }
                  }}
                  min={0}
                  max={occupancy.totalRacks}
                  value={occupancy.activatedRacks}
                  liquidStyle = {{
                    lineWidth: 4,
                    fill:'#7DB59E',
                  }}
                  color = "#7DB59E"
                />
              </Col>
          <Col span={4}>
            <LiquidChart
                  title={{
                    visible: true,
                    alignTo: 'middle',
                    text: 'Server Units Taken',
                  }}
                  description={{
                    visible: true,
                    alignTo: 'middle',
                    text: 'Available Standard Server Units / Total'
                  }}
                  statistic = {{
                    visible: true,
                    adjustColor: true,
                    formatter: ({percent}) => {
                      return Math.round((occupancy.avaiServerUnits / occupancy.totalServerUnits )*100) + " %" + 
                      "\n" +
                      " \n" + occupancy.avaiServerUnits + " U"
                    },
                    style : {
                      fontSize: 20,
                      fontWeight: 500
                    }
                  }}
                  min={0}
                  max={occupancy.totalServerUnits}
                  value={occupancy.avaiServerUnits}
                  liquidStyle = {{
                    lineWidth: 4,
                    fill:'#6EB5E2',
                  }}
                  color = "#6EB5E2"
            />
          </Col>
        </Row>
        <Row gutter={[32,16]}>
          <Col span={12}>
          <GroupedColumnChart
            data={usageByCompany}
            title={{
              visible: true,
              text: 'Usage By Entity',
            }}          
            xField='company'
            yField='value'
            yAxis={{
              min: 0,
            }}
            label={{
              visible: true,
            }}
            groupField='name'
            color={['#7DB59E', '#6EB5E2']}
          />
          </Col>
          <Col span={12}>
            <Tabs tabPosition={'top'}>
              <TabPane tab="List" key="list">
                <List/>
              </TabPane>
              <TabPane tab="Map" key="map">
                <DCMap />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Overview;
