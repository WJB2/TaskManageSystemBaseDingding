import React,{PureComponent} from 'react';

import { TabBar } from 'antd-mobile';

import TabBarConfig from '../../config/TabBarConfig';

import styles from './HandlerIndex.less';

class TabBarHandler extends React.Component{

  render(){

    const {  value,currentLoadingTabBar ,handleSkip, onPress}=this.props;

    return(

      <div className={styles.mainTabbar}>
      <TabBar>
        {
          TabBarConfig[currentLoadingTabBar].map((item,index)=>{
            return(
              <TabBar.Item
                title={<span style={{color:(item.key === value?'#3A4479':currentLoadingTabBar!=="tabBarMainList"?'#5B88CB':null)}}>{item.title}</span>}
                key={item.key}
                icon={<span style={{fontSize:('20px'),color:(item.key === value?'#3A4479':currentLoadingTabBar!=="tabBarMainList"?'#5B88CB':null)}} className={`iconfont ${item.icon}`}></span>}
                onPress={()=>{currentLoadingTabBar==="tabBarMainList"?
                handleSkip(item.to) : onPress(item.title)}}
              >
              </TabBar.Item>
            )
          })
        }
      </TabBar>
      </div>

    )
  }
}

export default TabBarHandler;
