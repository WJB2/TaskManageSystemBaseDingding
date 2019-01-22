import React,{PureComponent} from 'react';

import styles from './HandlerIndex.less';

class ButtonHandler extends React.Component{

  render(){

    const { color,onAdd,uniqueLabel,zIndex }=this.props;

    console.log(color)

    return(
      <div className={styles.mainCircle}
        style={{backgroundColor:`${color}`,boxShadow:`${color} 0px 0px 10px`,zIndex:`${zIndex}`}}
        onClick={()=>{
          onAdd()
        }}>
        {uniqueLabel?<div style={{fontSize:'0.5rem',color:'#FFFFFF'}} className={`iconfont ${uniqueLabel}`}></div>:<div className={styles.mainplus}></div>}
      </div>
    )
  }
}

export default ButtonHandler;
