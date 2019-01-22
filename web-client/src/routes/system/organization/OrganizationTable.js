import React, { PureComponent, Fragment } from 'react';
import { Table, Divider } from 'antd';

import styles from './OrganizationIndex.less';

class OrganizationTable extends PureComponent {
  state = {};

  render() {
    const { onEdit, onDelete } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'rowNo',
        key: 'rowNo',
      },
      {
        title: '组织机构编码',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '组织机构名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '组织机构简称',
        dataIndex: 'nameAbbr',
        key: 'nameAbbr',
      },
      {
        title: '组织机构别名',
        dataIndex: 'nameAlias',
        key: 'nameAlias',
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
      <div className={styles.organizationTable}>
        <Table {...tableConfigs} />
      </div>
    );
  }
}

export default OrganizationTable;
