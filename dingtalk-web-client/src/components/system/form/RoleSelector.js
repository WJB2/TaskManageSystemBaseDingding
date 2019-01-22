import React, { PureComponent } from 'react';
import { Select } from 'antd';

import roleService from '../../../services/system/RoleService';

const { Option } = Select;

class RoleSelector extends PureComponent {
  state = {
    dataSource: [],
  };

  async componentWillMount() {
    const result = await roleService.findRoleList();

    this.setState({
      dataSource: result,
    });
  }

  render() {
    return (
      <Select {...this.props}>
        {this.state.dataSource.map(item => {
          return <Option key={item.id}>{item.name}</Option>;
        })}
      </Select>
    );
  }
}

export default RoleSelector;
