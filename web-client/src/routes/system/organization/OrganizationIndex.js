import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';

import OrganizationPane from './OrganizationPane';
import OrganizationTable from './OrganizationTable';
import OrganizationTree from './OrganizationTree';
import OrganizationForm from './OrganizationForm';

import styles from './OrganizationIndex.less';

@connect(models => ({
  organization: models['system/organization'],
  loading: models.loading.models.organization,
}))
class OrganizationIndex extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/organization/queryOrganizationPageAsync',
    });

    dispatch({
      type: 'system/organization/queryOrganizationTreeAsync',
    });
  }

  handleOrganizationAdd() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/organization/updateState',
      payload: {
        formVisible: true,
        formType: 'ADD',
      },
    });
  }

  handleOrganizationSearch() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/organization/queryOrganizationPageAsync',
    });
  }

  handleOrganizationQueryParamsChange(values) {
    const { dispatch, organization } = this.props;

    dispatch({
      type: 'system/organization/updateState',
      payload: {
        params: { ...organization.params, ...values },
      },
    });
  }

  handleOrganizationEdit(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/organization/editOrganizationAction',
      payload: {
        id,
      },
    });
  }

  handleOrganizationDelete(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/organization/deleteOrganizationByIdAsync',
      payload: {
        id,
      },
    });
  }

  handleOrganizationTreeNodeSelect(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/organization/changeOrganizationRootNode',
      payload: {
        id:id[0],
      },
    });
  }

  handleFormSubmit(formValues) {
    const { dispatch, organization } = this.props;

    if (organization.formType === 'ADD') {
      dispatch({
        type: 'system/organization/addOrganizationAsync',
        payload: formValues,
      });
    } else if (organization.formType === 'EDIT') {
      dispatch({
        type: 'system/organization/editOrganizationAsync',
        payload: formValues,
      });
    }
  }

  handleFormCancel() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/organization/updateState',
      payload: {
        formVisible: false,
        formType: null,
      },
    });
  }

  render() {
    const { dispatch, organization } = this.props;

    const { formType, formVisible, currentOrganization, data, treeData } = organization;

    const paneConfigs = {
      onAdd: this.handleOrganizationAdd.bind(this),
      onSearch: this.handleOrganizationSearch.bind(this),
      onParamsChange: this.handleOrganizationQueryParamsChange.bind(this),
    };

    const formConfigs = {
      onSubmit: this.handleFormSubmit.bind(this),
      onCancel: this.handleFormCancel.bind(this),
      formType,
      formVisible,
      currentOrganization,
    };

    const treeConfigs = {
      dataSource: treeData,
      onSelect: this.handleOrganizationTreeNodeSelect.bind(this),
    };

    const tableConfigs = {
      dataSource: data.list,
      pagination: {
        ...data.pagination,
        onChange: page => {
          dispatch({
            type: 'system/organization/queryOrganizationPageAsync',
            payload: {
              page,
            },
          });
        },
      },
      onEdit: this.handleOrganizationEdit.bind(this),
      onDelete: this.handleOrganizationDelete.bind(this),
    };

    return (
      <div>
        <Card>
          <div className={styles.organization_index}>
            <OrganizationPane {...paneConfigs} />
            <div style={{ display: 'flex' }}>
              <div style={{ width: 256 }}>
                <OrganizationTree {...treeConfigs} />
              </div>
              <div style={{ flex: 1, marginLeft: 16 }}>
                <OrganizationTable {...tableConfigs} />
              </div>
            </div>
          </div>
        </Card>

        {formVisible && <OrganizationForm {...formConfigs} />}
      </div>
    );
  }
}

export default OrganizationIndex;
