import React,{ PureComponent } from 'react';

import { TextareaItem,Toast } from 'antd-mobile';

import styles from './TaskIndex.less';

class TextareaCustom extends PureComponent{

  state={

  }

  componentWillMount(){

    if(this.props.value){
      console.log(this.props.value)
      this.setState({
        title:this.props.value
      })
    }

    console.log("textareaCustom");

  }

  handleChange(e){//当函数触发
    this.setState({
      value:e,
      title:e,
    })
  }

  handleBlur(value){
    this.props.onChange(value)
  }

  handleClick(){
    if(this.props.isChange){
      Toast.info('标题不能被修改',1)
    }
  }

  render(){

    const {

      isChange
    }=this.props;

    const {
      title,
      value
    }=this.state;

    return(
      <div className={styles.textareaCustom} onClick={()=>this.handleClick()}>
        <TextareaItem
          placeholder={"请输入任务标题"}
          editable={isChange?false:true}
          rows={3}
          value={title}
          onChange={(e)=>{
            this.handleChange(e);
          }}
          onBlur={()=>{
            this.handleBlur(value)
          }}
        ></TextareaItem>

      </div>
    )
  }
}

export default TextareaCustom;
