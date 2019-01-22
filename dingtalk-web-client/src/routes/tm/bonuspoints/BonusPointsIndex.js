import React, {PureComponent} from 'react';

import {Table, InputNumber, Input, Form, Popconfirm} from 'antd';

import TaskQueryPane from './../../../components/tm/task/TaskQueryPane';
import {connect} from "dva/index";

const FormItem = Form.Item;
const EditableContext = React.createContext();


const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

@connect(models => ({
  globalModel: models.global,
  bonusPointsModel: models['tm/bonusPoints'],
}))
class BonusPointsIndex extends PureComponent{

  state = {
    editingKey: null,
  }

  constructor(props){
    super(props);

    this.columns = [{
      title: '序号',
      dataIndex: 'rowNo',
      key: 'rowNo'
    }, {
      title: '任务名称',
      dataIndex: 'title',
      key: 'title',
      render:(val, record)=>{
        return (
          <div style={{cursor:'pointer'}} onClick={()=>{
            this.editActionHandler(record);
          }}>{val}</div>
        );
      }
    }, {
      title: '创建人积分',
      dataIndex: 'ownerBonusPoints',
      key: 'ownerBonusPoints',
      editable: true,
    }, {
      title: '责任人积分',
      dataIndex: 'assigneeBonusPoints',
      key: 'assigneeBonusPoints',
      editable: true,
    }, {
      title: '参与人积分',
      dataIndex: 'participatorBonusPoints',
      key: 'participatorBonusPoints',
      editable: true,
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.id)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="确定取消吗？"
                    onConfirm={() => this.cancel(record.id)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
            ) : (
              <a onClick={() => this.edit(record.id)}>修改积分</a>
            )}
          </div>
        );
      },
    }];
  }

  isEditing = (record) => {
    return record.id === this.state.editingKey;
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  cancel(){
    this.setState({ editingKey: null });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      const {dispatch} = this.props;

      dispatch({
        type: 'tm/bonusPoints/saveBonusPointsAsync',
        payload: {...row, id:key}
      });

      this.cancel();
    });
  }

  componentWillMount(){
    const {dispatch} = this.props;

    dispatch({
      type: 'tm/bonusPoints/queryTaskPageAsync',
      payload:{}
    });
  }

  editActionHandler(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/editTaskAction',
      payload,
    });
  }

  searchTask(params){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/bonusPoints/queryTaskPageAsync',
      payload : params,
    });
  }

  changeParams(params){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/bonusPoints/mergeState',
      payload : {
        params,
      },
    });
  }

  changeQueryConditions(values){
    const {dispatch, bonusPointsModel} = this.props;

    const {params} = bonusPointsModel;

    if(values.indexOf('beginTime')<0){
      delete params.beginTimeStart;
      delete params.beginTimeEnd;
    }

    dispatch({
      type : 'tm/bonusPoints/mergeState',
      payload : {
        queryConditions:values,
        params,
      },
    });
  }


  render(){

    const {globalModel, bonusPointsModel, dispatch} = this.props;

    const {data, params, queryConditions} = bonusPointsModel;

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    const tableConfig = {
      components:components,
      dataSource: data.list,
      pagination : {
        ...data.pagination,
        onChange: page => {
          dispatch({
            type: 'tm/bonusPoints/queryTaskPageAsync',
            payload: {
              page,
            },
          });
        }},
    }

    const paneConfigs = {
      queryConditions,
      onSearch: this.searchTask.bind(this),
      onParamsChange: this.changeParams.bind(this),
      onQueryConditionsChange: this.changeQueryConditions.bind(this),
      params: params||{}
    }

    return (
      <div>
        <TaskQueryPane {...paneConfigs} />
        <div style={{padding:16}}>
          <Table {...tableConfig} columns={columns}></Table>
        </div>
      </div>
    );
  }
}

export default BonusPointsIndex;
