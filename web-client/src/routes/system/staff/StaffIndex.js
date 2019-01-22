import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';

import StaffPane from './StaffPane';
import StaffTable from './StaffTable';
import StaffForm from './StaffForm';
import  StaffPasswordForm from './StaffPasswordForm';

import styles from './StaffIndex.less';

@connect(models => ({
  staff: models['system/staff'],
  loading: models.loading.models.staff,
}))
class StaffIndex extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/staff/queryStaffPageAsync',
    });
  }

  handleStaffAdd() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/staff/updateState',
      payload: {
        formVisible: true,
        formType: 'ADD',
      },
    });
  }

  handleStaffSearch() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/staff/queryStaffPageAsync',
    });
  }

  handleStaffQueryParamsChange(values) {
    const { dispatch, staff } = this.props;

    dispatch({
      type: 'system/staff/updateState',
      payload: {
        params: { ...staff.params, ...values },
      },
    });
  }

  handleStaffEdit(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/staff/editStaffAction',
      payload: {
        id,
      },
    });
  }

  handleStaffDelete(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/staff/deleteStaffByIdAsync',
      payload: {
        id,
      },
    });
  }

  handleFormSubmit(formValues) {
    const { dispatch, staff } = this.props;

    if (staff.formType === 'ADD') {
      dispatch({
        type: 'system/staff/addStaffAsync',
        payload: formValues,
      });
    } else if (staff.formType === 'EDIT') {
      dispatch({
        type: 'system/staff/editStaffAsync',
        payload: formValues,
      });
    }
  }

  handleFormCancel() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/staff/updateState',
      payload: {
        formVisible: false,
        formType: null,
      },
    });
  }

  render() {
    const { dispatch, staff } = this.props;

    const { formType, formVisible, currentStaff, passwordFormVisible, data } = staff;

    const paneConfigs = {
      onAdd: this.handleStaffAdd.bind(this),
      onSearch: this.handleStaffSearch.bind(this),
      onParamsChange: this.handleStaffQueryParamsChange.bind(this),
    };

    const formConfigs = {
      onSubmit: this.handleFormSubmit.bind(this),
      onCancel: this.handleFormCancel.bind(this),
      formType,
      formVisible,
      currentStaff,
    };

    const tableConfigs = {
      dataSource: data.list,
      pagination: {
        ...data.pagination,
        onChange: page => {
          dispatch({
            type: 'system/staff/queryStaffPageAsync',
            payload: {
              page,
            },
          });
        },
      },
      onEdit: this.handleStaffEdit.bind(this),
      onDelete: this.handleStaffDelete.bind(this),
      onPasswordChange:(record)=>{
        dispatch({
          type : 'system/staff/updateState',
          payload : {
            passwordFormVisible: true,
            currentStaff: record,
          }
        });
      }
    };

    const staffPasswordFormConfigs = {
      onCancel:()=>{
        dispatch({
          type : 'system/staff/updateState',
          payload : {
            passwordFormVisible:false
          }
        });
      },
      onSubmit:(values)=>{
        dispatch({
          type : 'system/staff/changePasswordAsync',
          payload : values
        })
      }
    };

    return (
      <div>
        <Card>
          <div className={styles.staffIndex}>
            <StaffPane {...paneConfigs} />
            <StaffTable {...tableConfigs} />
          </div>
        </Card>

        {formVisible && <StaffForm {...formConfigs} />}
        {passwordFormVisible && <StaffPasswordForm {...staffPasswordFormConfigs}/>}
      </div>
    );
  }
}

export default StaffIndex;
