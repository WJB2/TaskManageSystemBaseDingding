import React, { PureComponent } from 'react';

import { Modal, Tree } from 'antd';

const { TreeNode } = Tree;

class PermissionAuthorizationForm extends PureComponent {
  state = {
    checkedKeys: [],
  };

  componentWillMount() {
    const { permissionTree } = this.props;

    const getCheckedNodeIdList = list => {
      let result = [];

      list.forEach(item => {
        if (item.checked === true) {
          result.push(item.id);
        }

        if (item.children) {
          result = result.concat(getCheckedNodeIdList(item.children));
        }
      });

      return result;
    };

    const checkedKeys = getCheckedNodeIdList(permissionTree);

    this.setState({
      checkedKeys,
    });
  }

  render() {
    const { permissionTree, onCancel, onAuthorize, currentRole } = this.props;

    const renderTree = list => {
      return list.map(item => {
        if (item.children) {
          return (
            <TreeNode title={item.name} key={item.id} dataRef={item}>
              {renderTree(item.children)}
            </TreeNode>
          );
        } else {
          return <TreeNode title={item.name} key={item.id} dataRef={item} />;
        }
      });
    };

    return (
      <Modal
        title="角色授权"
        visible
        onCancel={onCancel}
        onOk={() => {
          onAuthorize({
            roleId: currentRole.id,
            permissionIdList: this.state.checkedKeys,
          });
        }}
      >
        <Tree
          checkable
          checkedKeys={this.state.checkedKeys}
          onCheck={checkedKeys => {
            this.setState({
              checkedKeys,
            });
          }}
        >
          {renderTree(permissionTree)}
        </Tree>
      </Modal>
    );
  }
}

export default PermissionAuthorizationForm;
