import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';

import RolePane from './RolePane';
import RoleTable from './RoleTable';
import RoleForm from './RoleForm';
import PermissionAuthorizationForm from './../../../components/system/form/PermissionAuthorizationForm';

import styles from './RoleIndex.less';

@connect(models => ({
  role: models['system/role'],
  loading: models.loading.models.role,
}))
class RoleIndex extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/role/queryRolePageAsync',
    });
  }

  handleRoleAdd() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/role/updateState',
      payload: {
        formVisible: true,
        formType: 'ADD',
      },
    });
  }

  handleRoleSearch() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/role/queryRolePageAsync',
    });
  }

  handleRoleQueryParamsChange(values) {
    const { dispatch, role } = this.props;

    dispatch({
      type: 'system/role/updateState',
      payload: {
        params: { ...role.params, ...values },
      },
    });
  }

  handleRoleEdit(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/role/editRoleAction',
      payload: {
        id,
      },
    });
  }

  handleRoleDelete(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/role/deleteRoleByIdAsync',
      payload: {
        id,
      },
    });
  }

  handleRoleAuthorize(roleId) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/role/doRoleAuthorizeAction',
      payload: {
        roleId,
      },
    });
  }

  handleFormSubmit(formValues) {
    const { dispatch, role } = this.props;

    if (role.formType === 'ADD') {
      dispatch({
        type: 'system/role/addRoleAsync',
        payload: formValues,
      });
    } else if (role.formType === 'EDIT') {
      dispatch({
        type: 'system/role/editRoleAsync',
        payload: formValues,
      });
    }
  }

  handleFormCancel() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/role/updateState',
      payload: {
        formVisible: false,
        formType: null,
      },
    });
  }

  handleAutorizationFormCancel() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/role/updateState',
      payload: {
        authorizationFormVisible: false,
      },
    });
  }

  handleRoleAuthorizationFormSubmit(payload) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/role/doRoleAuthorizeAsync',
      payload,
    });
  }

  render() {
    const { dispatch, role } = this.props;

    const {
      formType,
      formVisible,
      currentRole,
      data,
      authorizationFormVisible,
      permissionData,
    } = role;

    const paneConfigs = {
      onAdd: this.handleRoleAdd.bind(this),
      onSearch: this.handleRoleSearch.bind(this),
      onParamsChange: this.handleRoleQueryParamsChange.bind(this),
    };

    const formConfigs = {
      onSubmit: this.handleFormSubmit.bind(this),
      onCancel: this.handleFormCancel.bind(this),
      formType,
      formVisible,
      currentRole,
    };

    const authorizationFormConfigs = {
      currentRole,
      permissionTree: permissionData,
      onCancel: this.handleAutorizationFormCancel.bind(this),
      onAuthorize: this.handleRoleAuthorizationFormSubmit.bind(this),
    };

    const tableConfigs = {
      dataSource: data.list,
      pagination: {
        ...data.pagination,
        onChange: page => {
          dispatch({
            type: 'system/role/queryRolePageAsync',
            payload: {
              page,
            },
          });
        },
      },
      onEdit: this.handleRoleEdit.bind(this),
      onDelete: this.handleRoleDelete.bind(this),
      onAuthorize: this.handleRoleAuthorize.bind(this),
    };

    return (
      <div>
        <Card>
          <div className={styles.roleIndex}>
            <RolePane {...paneConfigs} />
            <RoleTable {...tableConfigs} />
          </div>
        </Card>

        {formVisible && <RoleForm {...formConfigs} />}
        {authorizationFormVisible && <PermissionAuthorizationForm {...authorizationFormConfigs} />}
      </div>
    );
  }
}

export default RoleIndex;
