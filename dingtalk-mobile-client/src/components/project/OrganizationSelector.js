import React,{PureComponent} from 'react';

import organizationService from '../../services/system/OrganizationService';

import ComponentUtils from '../../utils/ComponentUtils';

import styles from './ProjectIndex.less';

import { List,InputItem,Checkbox,SearchBar } from 'antd-mobile';

import OrganizationPane from '../pane/OrganizationPane';

const Item = List.Item;

class OrganizationSelector extends PureComponent{

  state={
    organizationList:[],//组织列表
    paneVisible:false,//pane面板是否显示
    values:[],//选择组织id数组
  }

  async componentWillMount(){
    if(this.props.value){
      const organizationList=await organizationService.findOrganizationList({
        id:this.props.value
      })
      this.setState({
        organizationList:organizationList,
      })
    }
  }

  handleCancel(){//点击取消隐藏选择面板
    this.setState({
      paneVisible:false,
    })
  }

  async handleSubmit(values){//点击确定传递Id数组
    const idArray=ComponentUtils.getIdArrayOfNumberOrString(values);

    if(values && values.length>0){
      const organizationList=await organizationService.findOrganizationList({
        id:idArray
      })

      this.setState({
        organizationList:organizationList
      })

      this.props.onChange(idArray);
    }

    this.setState({
      paneVisible:false,
    })
  }

  handleClick(){

    this.setState({
      paneVisible:true,
    })
  }

  render(){

    const {
      paneVisible,
      organizationList
    }=this.state;

    const paneConfig={
      onHandleCancel:this.handleCancel.bind(this),
      onHandleSubmit:this.handleSubmit.bind(this),
    }

    return(
      <div className={styles.organizationSelector}>
        <Item
          extra={ComponentUtils.isEmpty(organizationList)?"请选择":<div className={styles.organizationSelectorBlock}>
            {
              organizationList.map((item,index)=>{
                return <div key={index} className={styles.organizationSelectorList}>
                  {item.name}
                </div>
              })
            }
          </div>}
          arrow={"horizontal"}
          onClick={()=>{
            this.handleClick()
          }}
        >所属部门</Item>
        {paneVisible && <OrganizationPane {...paneConfig} />}
      </div>
    )
  }
}


export default OrganizationSelector;
