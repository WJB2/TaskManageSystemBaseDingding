import React, { PureComponent } from 'react';

import { TreeSelect } from 'antd';

import organizationService from '../../../services/system/OrganizationService';

const { TreeNode } = TreeSelect;

class OrganizationTreeSelector extends PureComponent {
  state = {
    dataSource: [],
  };

  async componentWillMount() {
    const result = await organizationService.findOrganizationTree();

    this.setState({
      dataSource: result,
    });
  }

  buildTree(items) {
    if (!items) {
      return null;
    }

    return items.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.id} value={item.id} title={item.name}>
            {this.buildTree(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode key={item.id} value={item.id} title={item.name} />;
      }
    });
  }

  render() {
    const treeSelectConfigs = {
      ...this.props,
    };

    return <TreeSelect {...treeSelectConfigs}>{this.buildTree(this.state.dataSource)}</TreeSelect>;
  }
}

export default OrganizationTreeSelector;
