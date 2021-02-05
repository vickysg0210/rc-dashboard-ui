import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
  Annotation,
  Guide,
  Coord,
  View
} from 'bizcharts';
import { worldGeo } from '../../data/worldgeo';
import { idc_total } from '../../data/idc_total'
import DataSet from '@antv/data-set';

const DCMap = () =>{
  const mapData = worldGeo;
  const ds = new DataSet();

  const dv = ds.createView('back')
  .source(mapData, {
    type: 'GeoJSON',
  })
  .transform({
    type: 'geo.projection',
    projection: 'geoMercator',
    as: ['x', 'y', 'centroidX', 'centroidY']
  });

  const bgView = new DataSet.View().source(dv);
  const scale = {
    x: { sync: true },
    y: { sync: true },
  };

  const f = bgView.rows.filter(
    (row) =>
    row.name == "Singapore" ||
    row.name == "Thailand" ||
    row.name == "Malaysia" ||
    row.name == "Indonesia" ||
    row.name == "Vietnam" ||
    row. name == "Phillipines" ||
    row.name == "Taiwan" ||
    row.name == "Brazil" ||
    row.name == "Chile" ||
    row.name == "Argentina"
    );
  const centerData = f.map(
    (item) => {
      return {
        name: item.name,
        x: item.centroidX,
        y: item.centroidY
      }
    }
  )
  const merged = centerData.map(item => {
    const obj = idc_total.find(o => o.name === item.name);
    return {...item, ...obj};
  })


  return (
    <Chart pure scale={scale} height={500} width={800} padding={[0, 0]} >
      <Coord reflect='y'/>
      <Legend visible ={false}/>
      <View data={bgView? bgView.rows: bgView}>
        <Geom type="polygon"
        tooltip={false}
        position="x*y"
        shape='polygon'
        style={{
          fill: '#DDDDDD',
          stroke: '#b1b1b1',
          lineWidth: 1,
          fillOpacity: 0.5
        }} />
      </View>
      <Tooltip shared  g2-tooltip={{
        position: 'absolute',
        visibility: 'hidden',
        border : '1px solid #efefef',
        backgroundColor: 'black',
        color: '#000',
        opacity: '0.8',
        padding: '5px 15px',
        transition: 'top 200ms,left 200ms'
      }}
/>
      <View data={merged}>
        <Geom
          type = "point"
          position = "x*y"
          color='#FF958C'
          size = {5}
          shape="circle"
          label = 'code'
          active = {true}
          tooltip={[
            "name*total_racks",
            (n,t) => {
              return {
                title : n,
                name: "Total Racks",
                value: t + " Racks"
              }
            }
          ]}
          ></Geom>
          <Geom
            type = "point"
            position = "x*y"
            color='#FF958C'
            size = {5}
            shape="circle"
            active = {true}
            tooltip={[
              "name*total_servers",
              (n,t) => {
                return {
                  name: "Total Servers",
                  value: t + " Servers"
                }
              }
            ]}
            ></Geom>
            <Geom
              type = "point"
              position = "x*y"
              color='#FF958C'
              size = {5}
              shape="circle"
              active = {true}
              tooltip={[
                "name*total_avai_su",
                (n,t) => {
                  return {
                    name: "Available Server Units",
                    value: t + " U"
                  }
                }
              ]}
              ></Geom>
      </View>
    </Chart>
  );
}

export default DCMap;
