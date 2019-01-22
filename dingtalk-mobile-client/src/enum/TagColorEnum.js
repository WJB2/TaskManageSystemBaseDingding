const GREY='GREY';//灰色小球
const GREEN='GREEN';//绿色小球
const BLUE='BLUE';//蓝色小球
const YELLOW='YELLOW';//黄色小球
const RED='RED';//红色小球

function getDisplayText(value){
  if(value === 'GREY'){
    return '灰色';
  }
  if(value === 'GREEN'){
    return '绿色';
  }
  if(value === 'BLUE'){
    return '蓝色';
  }
  if(value === 'YELLOW'){
    return '黄色';
  }
  if(value === 'RED'){
    return '红色';
  }

}

function getDisplayColor(value){
  if(value === 'GREY'){
    return '#B5BECF';
  }
  if(value === 'GREEN'){
    return '#80DAAF';
  }
  if(value === 'BLUE'){
    return '#55ABE9';
  }
  if(value === 'YELLOW'){
    return '#F99F27';
  }
  if(value === 'RED'){
    return '#F45C5C';
  }
}

export default{
  GREY,
  GREEN,
  BLUE,
  YELLOW,
  RED,
  getDisplayText,
  getDisplayColor
};
