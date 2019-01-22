import React, { PureComponent, Fragment } from 'react';
import { Table, Divider } from 'antd';

import StaffStatusEnum from './../../../enum/system/StaffStatusEnum';

import styles from './StaffIndex.less';

class StaffTable extends PureComponent {
  state = {};

  render() {
    const { onEdit, onDelete, onPasswordChange } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'rowNo',
        key: 'rowNo',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '身份证号',
        dataIndex: 'idCardNo',
        key: 'idCardNo',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '人员状态',
        dataIndex: 'status',
        key: 'status',
        render(val) {
          return StaffStatusEnum.getDisplayText(val);
        },
      },
      {
        title: '操作',
        render: (val, record) => (
          <Fragment>
            <a
              onClick={() => {
                onEdit(record.id);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                onDelete(record.id);
              }}
            >
              删除
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                onPasswordChange(record);
              }}
            >
              重置密码
            </a>
          </Fragment>
        ),
      },
    ];

    const tableConfigs = {
      columns,
      rowKey: 'id',
      ...this.props,
    };

    return (
      <div className={styles.staffTable}>
        <Table {...tableConfigs} />
      </div>
    );
  }
}

export default StaffTable;
