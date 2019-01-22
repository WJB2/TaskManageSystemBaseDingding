import React, {PureComponent} from 'react';

import {Tag, Icon, Modal} from 'antd';

import projectService from './../../../services/tm/ProjectService';
import _ from 'lodash';

class _ProjectSelectorModel extends PureComponent {

  state = {
    projectId:null,
  }

  componentWillMount(){

    this.setState({
      projectId:this.props.projectId
    })
  }

  handleProjectSelect(projectId){

    this.setState({
      projectId: projectId!==this.state.projectId?projectId:null
    });
  }

  render(){
    const {projectList, onCancel, onSelect} = this.props;

    return (
      <Modal onCancel={onCancel} visible={true} onOk={()=>{
        if(onSelect){
          onSelect(this.state.projectId);
        }
      }} title={'选择项目'}>
        <div style={{padding:16, backgroundColor:'rgb(242, 245, 247)', borderRadius:5}}>

          <div style={{marginTop:16}}>
            {
              projectList&&projectList.map((item)=>{
                return <Tag key={item.id}
                            onClick={()=>{
                  this.handleProjectSelect(item.id);
                }}
                color={this.state.projectId===item.id?'#2db7f5':''}
                >{item.name}</Tag>
              })
            }
          </div>
        </div>

      </Modal>
    );
  }
}

class ProjectSelector extends PureComponent {

  state = {
    value : null,
    projectList : null,
    visible:false,
  }

  async componentWillMount(){
    const projectList = await projectService.findProjectList({});

    this.setState({
      projectList,
      value:this.props.value
    });
  }

  handleProjectSelect(val){

    if(this.props.onChange){
      this.props.onChange(val);
    }

    this.setState({
      value : val,
      visible:false
    });
  }

  render(){

    const {disabled} = this.props;

    const prjIdx = _.findIndex(this.state.projectList||[], (prj)=>{return prj.id===this.state.value});
    const project = prjIdx>=0?this.state.projectList[prjIdx]:null;

    return (
      <div style={{display:'inline-block'}}>
        <div style={{cursor:'pointer'}} onClick={()=>{
          if(disabled){
            return;
          }
          this.setState({
            visible:true
          });
        }}>{project?project.name:'请选择项目'}</div>

        {this.state.visible&&<_ProjectSelectorModel onSelect={this.handleProjectSelect.bind(this)} onCancel={()=>{
          this.setState({
            visible:false
          })
        }} projectId={this.state.value} projectList={this.state.projectList} />}
      </div>
    );
  }
}

export default ProjectSelector;
