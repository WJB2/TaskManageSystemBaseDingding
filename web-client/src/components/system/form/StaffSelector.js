import React, { PureComponent } from 'react';
import { Select } from 'antd';

import staffService from '../../../services/system/StaffService';

const { Option } = Select;

class StaffSelector extends PureComponent {
  state = {
    dataSource: [],
  };

  async componentWillMount() {
    const result = await staffService.findStaffList();

    this.setState({
      dataSource: result,
    });
  }

  render() {
    return (
      <Select {...this.props}>
        {this.state.dataSource.map(item => {
          return <Option key={item.id}>{item.name}({item.code})</Option>;
        })}
      </Select>
    );
  }
}

export default StaffSelector;
