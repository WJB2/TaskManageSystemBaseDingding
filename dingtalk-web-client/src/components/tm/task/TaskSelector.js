import React, {Component} from 'react';

import taskService from './../../../services/tm/TaskService';

class TaskSelector extends Component {

  state = {
    value : null,
    task : null,
  }

  async componentWillMount(){
    if(this.props.value){
      const task = await taskService.findTaskById({
        id: this.props.value
      });

      this.setState({
        task,
        value:this.props.value
      });
    }
  }

  async componentWillReceiveProps(nextProps){

    if(nextProps.value){
      if(nextProps.value!==this.state.value) {
        const task = await taskService.findTaskById({
          id: this.props.value
        });
        console.log(task);
        this.setState({
          task,
          value: nextProps.value
        });
      }
    }else{
      this.setState({
        task:null,
        value: null,
      })
    }
  }

  render(){

    console.log(this.state);

    return (
      <div {...this.props}>
        {this.state.task?this.state.task.title:''}
      </div>
    );
  }
}

export default TaskSelector;
