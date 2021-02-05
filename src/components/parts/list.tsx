import { idc_total } from '../../data/idc_total'
import React, {useEffect, useState} from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
  Annotation,
  Guide,
  Coord,
  View,
  Facet
} from 'bizcharts';


const List =() =>  {

    const getTypeColor = (type : any) => {
      if (type === 'Total Racks') { return '#7DB59E'; }
      if (type === 'Total Servers') { return '#6EB5E2'; }
      if (type === 'Total Available Server Units') { return '#C2B5E2'; }
    }
    const facets = [];
    for (let i = idc_total.length; i--; i<0){
      const o = idc_total[i];
      const t = {
        class : "Total Racks",
        name : o["name"],
        value: o["total_racks"]
      }
      const t2 = {
        class : "Total Servers",
        name: o["name"],
        value: o["total_servers"]
      }
      const t3 = {
        class : "Total Available Server Units",
        name: o["name"],
        value: o["total_avai_su"]
      }
      facets.push(t, t2, t3);
    }
    console.log("this is the list");
  return(
    <Chart autoFit
    data={facets}
    height={400}
    padding={[20, 20, 20, 70]}
    tooltip={false}>
        <Legend visible={false} />
        <Facet
          fields={['class']}
          type="rect"
          columnTitle={{
            style: {
              fontSize: 14,
              fontWeight: 300,
              fill: '#8d8d8d'
            }
          }}
          eachView={(view, facet) => {
            view.coordinate().transpose();

            if (facet.columnIndex === 0) {
              view.axis('name', {
                tickLine: null,
                line: null,
              });
              view.axis('value', false);
            } else {
              view.axis(false);
            }
            const color = getTypeColor(facet.columnValue);
            view
              .interval()
              .adjust('stack')
              .position('name*value')
              .color('value', [color, '#ebedf0'])
              .size(20)
              .label('value', (value: any) => {
                const offset = (value < 1000) ? 10 : -4;
                return {
                  offset,
                };
              });
            view.interaction('element-active');
          }}
        />
      </Chart>
  )
}


export default List;
