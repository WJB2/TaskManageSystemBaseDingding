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
class ProjectEditForm extends PureComponent{

  state={

  }

  render(){

    const {
      getFieldProps,getFieldDecorator,project
    }=this.props;

    return(
      <div>

        <TextareaItem {...getFieldProps('name',{
          initialValue:project.name?project.name:null
        }) } title={"项目名称"} placeholder={"请输入"} autoHeight></TextareaItem>

        {getFieldDecorator('orgIdList',{
          initialValue:project.orgIdList?project.orgIdList:null
        })(<OrganizationSelector />)}

        {getFieldDecorator('memberIdList',{
          initialValue:project.memberIdList?project.memberIdList:null,
        })(<ProjectStaffSelector />)}

        <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

        <DatePicker mode={"date"} {...getFieldProps('beginTime',{
          initialValue:project.beginTime?new Date(moment(project.beginTime,"YYYYMMDDHHmmssSSS")):null
        })} >
          <List.Item arrow={"horizontal"}>请选择开始时间</List.Item>
        </DatePicker>

        <DatePicker {...getFieldProps('endTime',{
          initialValue:project.endTime?new Date(moment(project.endTime,"YYYYMMDDHHmmssSSS")):null
        })}  mode={"date"}>
          <List.Item arrow={"horizontal"} >请选择结束时间</List.Item>
        </DatePicker>

        <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

        {getFieldDecorator('label',{
          initialValue:project.label?project.label:null
        })(<LabelListSelector  />)}

        <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

        <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

        <TextareaItem {...getFieldProps('description',{
          initialValue:project.description?project.description:null
        }) } title={"项目描述"} placeholder={"请输入"} autoHeight></TextareaItem>


      </div>
    );
  }
}

export default ProjectEditForm;
