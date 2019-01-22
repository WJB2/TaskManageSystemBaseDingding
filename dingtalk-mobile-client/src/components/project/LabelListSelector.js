import React,{PureComponent} from 'react';

import styles from './ProjectIndex.less';

class LabelListSelector extends PureComponent{

  state={
    color:null,//初始化clicked
  }

  async componentWillMount(){
    if(this.props.value){
      this.setState({
        color:this.props.value
      })
    }
  }

  handleClick(color){

    if(color===this.state.color){
      this.setState({
        color:null,
      })
      this.props.onChange(color)
    }else{
      this.setState({
        color:color,
      })
      this.props.onChange(color);
    }
  }

  render(){

    const {
      color,
    }=this.state;

    return(
      <div className={styles.labelSelector}>
        <span className={styles.labelSelectorText}>标记</span>
        <div className={styles.labelSelectorContainer}>
          <div className={styles.labelSelectorBall} style={{backgroundColor:'#FF665C',border:(color==="RED"?'1px solid hsla(0,0%,100%,.5)':null),boxShadow:(color==="RED"?'0 0 0 1px #FF665C':null)}}
               onClick={()=>{this.handleClick('RED');}}></div>

          <div className={styles.labelSelectorBall} style={{backgroundColor:'#F9A64C',border:(color==="ORANGE"?'1px solid hsla(0,0%,100%,.5)':null),boxShadow:(color==="ORANGE"?'0 0 0 1px #F9A64C':null)}}
               onClick={()=>{this.handleClick('ORANGE');}}></div>

          <div className={styles.labelSelectorBall} style={{backgroundColor:'#F5CF51',border:(color==="YELLOW"?'1px solid hsla(0,0%,100%,.5)':null),boxShadow:(color==="YELLOW"?'0 0 0 1px #F5CF51':null)}}
               onClick={()=>{this.handleClick('YELLOW');}}></div>

          <div className={styles.labelSelectorBall} style={{backgroundColor:'#72CB56',border:(color==="GREEN"?'1px solid hsla(0,0%,100%,.5)':null),boxShadow:(color==="GREEN"?'0 0 0 1px #72CB56':null)}}
               onClick={()=>{this.handleClick('GREEN');}}></div>

          <div className={styles.labelSelectorBall} style={{backgroundColor:'#57B8F4',border:(color==="BLUE"?'1px solid hsla(0,0%,100%,.5)':null),boxShadow:(color==="BLUE"?'0 0 0 1px #57B8F4':null)}}
               onClick={()=>{this.handleClick('BLUE');}}></div>

          <div className={styles.labelSelectorBall} style={{backgroundColor:'#D491E3',border:(color==="PURPLE"?'1px solid hsla(0,0%,100%,.5)':null),boxShadow:(color==="PURPLE"?'0 0 0 1px #D491E3':null)}}
               onClick={()=>{this.handleClick('PURPLE');}}></div>

          <div className={styles.labelSelectorBall} style={{backgroundColor:'#A4A4A7',border:(color==="GREY"?'1px solid hsla(0,0%,100%,.5)':null),boxShadow:(color==="GREY"?'0 0 0 1px #A4A4A7':null)}}
               onClick={()=>{this.handleClick('GREY');}}></div>
        </div>
      </div>
    )
  }
}

export default LabelListSelector;
