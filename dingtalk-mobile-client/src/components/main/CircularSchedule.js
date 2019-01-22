import React,{ PureComponent } from 'react';
import F2 from '@antv/f2';
import Tooltip from '@antv/f2/lib/plugin/tooltip';

class CircularSchedule extends PureComponent{


  componentDidMount(){

    const {
      id,
      currentSums,
      dataArray,//展示的数据数组
      sideLength,//圆的长度和高度
      borderWidth,//圆的宽度
      colorArray//圆的颜色数组
    }=this.props;

    this.canvas.setAttribute("id",id)

    let data=dataArray.map((item,index)=>{
      return {name:`${item.name}`,percent:item.percent,a:`${item.a}`}
    })


    var map = {};
    data.map(function(obj) {
      map[obj.name] = obj.percent + '%';
    });

    var chart = new F2.Chart({
      id: id,
      pixelRatio: window.devicePixelRatio,
      padding: ['0'],
      plugins: Tooltip,
      width:sideLength,
      height:sideLength
    });

    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val + '%';
        }
      }
    });

    chart.tooltip(false);

    chart.coord('polar', {
      transposed: true,
      innerRadius: borderWidth,
      radius: 0.85
    });
    chart.legend(false);

    chart.axis(false);

    chart.interval().position('a*percent').color('name', colorArray).adjust('stack');

    chart.guide().html({
      position: ['52%', '50%'],
      html: `<div style="font-size:0.5rem">${currentSums}</div>`
    });

    chart.animate({
      interval:{
        appear:{
          duration:1000
        }
      }
    })

    chart.render();

  }

  render(){

    const {sideLength}=this.props;

    return(
      <div>
        <canvas ref={ref=>this.canvas=ref}></canvas>
      </div>
    )
  }
}
export default CircularSchedule;
