import React,{PureComponent} from 'react';
import { Toast,Slider } from 'antd-mobile';
import styles from './TaskIndex.less';

class SliderSelector extends React.Component{
  state={
    status:null,
  }

  async componentWillMount(){

    if(this.props.value){
      console.log(this.props.value)
      this.setState({
        status:this.props.value
      })
    }
    console.log("进度条")

  }

  handleChange(values){//进度条改变时触

    if(this.props.isChange){
      Toast.info('进度条已不能选择',1);
    }else{
      this.setState({
        status:values
      })

      this.props.onChange(values)
    }

  }

  render(){

    const { status }=this.state;

    return(
      <div className={styles.sliderSelector}>
        <div className={"iconfont"}>&#xe642;</div>
        <div className={styles.sliderSelectorName}>进度</div>
        <div className={styles.sliderSelectorMain}>
          <Slider
                  style={{margin:'0 0.1rem'}}
                  defaultValue={status}
                  handleStyle={{border:'1px solid #7ABBFC',marginLeft:'-0.2rem'}}
                  trackStyle={{height:'10px',color:'#7ABBFC',borderRadius:'10px',position:'absolute',top:'-0.1rem'}}
                  railStyle={{height:'10px',borderRadius:'10px',position:'absolute',top:'-0.1rem'}}
                  onChange={this.handleChange.bind(this)}
          >

          </Slider>
        </div>
        <div className={styles.sliderSelectorRight}>{status?status:0}%</div>
      </div>
    )
  }
}

export default SliderSelector;
