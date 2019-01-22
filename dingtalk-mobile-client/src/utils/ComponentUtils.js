

function getIdArray(Object){//传入对象或者数组得出id数组
  if(Object instanceof Array){
    let IdArray=[];
    Object.map((item,index)=>{
      IdArray.push({
        id:item[id]
      })
    })
    return IdArray;
  }
  if(Object){
    let IdArray=[];
    IdArray.push(
      Object.id
    );
    return IdArray;
  }
}

function getDateFormat(time){//传入日期得到指定格式日期

  let timetemp=new Date(time);

  let Month=(timetemp.getMonth()+1).toString().length===2?timetemp.getMonth()+1:`0${timetemp.getMonth()+1}`

  let newdate=timetemp.getFullYear()+'-'+Month+'-'+timetemp.getDate();

  return newdate;
}

function getIdArrayOfNumberOrString(number){//传入数字或者字符串变成数组
  if(typeof(number)=="number"){
    let str=number+"";
    let arr=[];
    arr.push(str);
  }
  if(typeof(number)=="string"){
    const arr=[];
    arr.push(number);
    return arr;
  }
}

function getObjectArray(Object){//传入单个对象变成数组
  if(Object){
     let arr=[]
     arr.push(Object)
     return arr;
  }
}

function removeItem(ObjectArray,id){//传入数组和元素从数组里面移除元素
  for(let i=0;i<ObjectArray.length;i++){
    if(ObjectArray[i]==id) {

      ObjectArray.splice(i,1);

      return ObjectArray;
    }
  }
}

function isEmpty(Object){//判断是否为空数组或者空对象
  if(Array.prototype.isPrototypeOf(Object)&&Object.length===0){
    return true;
  }
}

function isEmptyNumber(Object){//判断一个数是否为null或者空

}

function getRandomColor(){//获得随机颜色
  let obj='0123456789ABCDEF';
  return  '#' +
    (function getColor(color){
      return (color +=  obj[Math.floor(Math.random()*16)])
      && (color.length == 6) ?  color : getColor(color);
    })("");
}

function isInArray(arr,value){//数组是否存在该元素
  for(var i=0;i<arr.length;i++){
    if(value===arr[i]){
      return true;
    }
  }
  return false;
}

function transformTime(time){
  const str=time.substr(0,time.length-9);
  const str2=str.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3");
  return str2;
}

export default{
  getIdArray,
  isEmpty,
  removeItem,
  getIdArrayOfNumberOrString,
  getDateFormat,
  getRandomColor,
  isInArray,
  transformTime
};
