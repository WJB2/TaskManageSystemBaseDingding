import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';

import PositionPane from './PositionPane';
import PositionTable from './PositionTable';
import PositionForm from './PositionForm';

import styles from './PositionIndex.less';

@connect(models => ({
  position: models['system/position'],
  loading: models.loading.models.position,
}))
class PositionIndex extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/position/queryPositionPageAsync',
    });
  }

  handlePositionAdd() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/position/updateState',
      payload: {
        formVisible: true,
        formType: 'ADD',
      },
    });
  }

  handlePositionSearch() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/position/queryPositionPageAsync',
    });
  }

  handlePositionQueryParamsChange(values) {
    const { dispatch, position } = this.props;

    dispatch({
      type: 'system/position/updateState',
      payload: {
        params: { ...position.params, ...values },
      },
    });
  }

  handlePositionEdit(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/position/editPositionAction',
      payload: {
        id,
      },
    });
  }

  handlePositionDelete(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/position/deletePositionByIdAsync',
      payload: {
        id,
      },
    });
  }

  handleFormSubmit(formValues) {
    const { dispatch, position } = this.props;

    if (position.formType === 'ADD') {
      dispatch({
        type: 'system/position/addPositionAsync',
        payload: formValues,
      });
    } else if (position.formType === 'EDIT') {
      dispatch({
        type: 'system/position/editPositionAsync',
        payload: formValues,
      });
    }
  }

  handleFormCancel() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/position/updateState',
      payload: {
        formVisible: false,
        formType: null,
      },
    });
  }

  render() {
    const { dispatch, position } = this.props;

    const { formType, formVisible, currentPosition, data } = position;

    const paneConfigs = {
      onAdd: this.handlePositionAdd.bind(this),
      onSearch: this.handlePositionSearch.bind(this),
      onParamsChange: this.handlePositionQueryParamsChange.bind(this),
    };

    const formConfigs = {
      onSubmit: this.handleFormSubmit.bind(this),
      onCancel: this.handleFormCancel.bind(this),
      formType,
      formVisible,
      currentPosition,
    };

    const tableConfigs = {
      dataSource: data.list,
      pagination: {
        ...data.pagination,
        onChange: page => {
          dispatch({
            type: 'system/position/queryPositionPageAsync',
            payload: {
              page,
            },
          });
        },
      },
      onEdit: this.handlePositionEdit.bind(this),
      onDelete: this.handlePositionDelete.bind(this),
    };

    return (
      <div>
        <Card>
          <div className={styles.positionIndex}>
            <PositionPane {...paneConfigs} />
            <PositionTable {...tableConfigs} />
          </div>
        </Card>

        {formVisible && <PositionForm {...formConfigs} />}
      </div>
    );
  }
}

export default PositionIndex;
