import React,{PureComponent} from 'react';

import styles from './PaneIndex.less';

class TemplatePane extends PureComponent{

  state={
    clicked1:false,//第一个卡片
    clicked2:false,//第二个卡片
    description:null,//选择哪个
  }

  handleClick(description){//点击卡片
    if(description==="默认描述"){
      this.setState({
        clicked1:true,
        clicked2:false,
      })
    }else if(description){
      this.setState({
        clicked1:false,
        clicked2:true,
      })
    }
    this.setState({
      description:description,
    })
  }

  handleSubmit(description){//点击保存
    const {onHandleSubmit} =this.props;

    if(onHandleSubmit){
      onHandleSubmit(description)
    }

  }

  render(){

    const {
      clicked1,
      clicked2,
      description,
    }=this.state;

    return(
      <div className={styles.templatePane}>
        <div className={styles.templatePaneCardOne}
             style={ clicked1 ? {border:'2px solid #5B88CB'}:{border:'2px solid #EDEFF3'}}
             onClick={()=>{
                this.handleClick("默认描述")
             }}>
          <div><div>默认描述</div></div>
        </div>
        <div className={styles.templatePaneCardTwo}
             style={ clicked2 ? {border:'2px solid #5B88CB'}:{border:'2px solid #EDEFF3'}}
             onClick={()=>{
               this.handleClick("售后服务")
             }}
        >
          <div><div>售后服务</div></div>
        </div>
        <div className={styles.templatePaneCardThree}>
          <div>更多模板</div>
          <div>敬请期待</div>
        </div>
        <div className={styles.templatePaneButton}
            onClick={()=>{
              this.handleSubmit(description)
            }}>
          保存
        </div>
      </div>
    )
  }
}

export default TemplatePane;
