import React,{PureComponent} from 'react';

import moment from "moment/moment";

import { createForm } from 'rc-form';

import { List,TextareaItem,DatePicker,Button,InputItem,WhiteSpace } from 'antd-mobile';

import OrganizationSelector from "./../../components/project/OrganizationSelector";
import ProjectStaffSelector from "./../../components/project/ProjectStaffSelector";
import LabelListSelector from "./../../components/project/LabelListSelector";

import styles from "./ProjectIndex.less";

const Item=List.Item;

// @createForm()
class ProjectAddForm extends PureComponent{

  state={
    beginTime:new Date()
  }

  render(){

    const {
      getFieldProps,getFieldDecorator
    }=this.props;

    return(
        <div>

          <TextareaItem {...getFieldProps('name') } title={"项目名称"} placeholder={"请输入"} autoHeight></TextareaItem>

          {getFieldDecorator('orgIdList')(<OrganizationSelector />)}

          {getFieldDecorator('memberIdList')(<ProjectStaffSelector />)}

          <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

          <DatePicker mode={"date"} {...getFieldProps('beginTime')} >
            <List.Item arrow={"horizontal"}>请选择开始时间</List.Item>
          </DatePicker>

          <DatePicker {...getFieldProps('endTime')}  mode={"date"}>
            <List.Item arrow={"horizontal"} >请选择结束时间</List.Item>
          </DatePicker>

          <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

          {getFieldDecorator('label')(<LabelListSelector  />)}

          <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

          <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

          <TextareaItem {...getFieldProps('description') } title={"项目描述"} placeholder={"请输入"} autoHeight></TextareaItem>


        </div>
    );
  }
}

export default ProjectAddForm;
