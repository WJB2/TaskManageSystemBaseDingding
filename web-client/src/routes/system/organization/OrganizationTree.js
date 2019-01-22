import React, { PureComponent } from 'react';
import { Tree, Card } from 'antd';

import styles from './OrganizationIndex.less';

const { TreeNode } = Tree;

class OrganizationTree extends PureComponent {
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
    const { dataSource, onSelect } = this.props;

    const treeConfigs = {
      ...this.props,
    };

    return (
      <div className={styles.organizationTable}>
        <Card title="组织机构列表" bodyStyle={{ paddingLeft: 12, paddingRight: 12 }}>
          <Tree
            onSelect={(key)=>{
              onSelect(key);
            }}
            {...treeConfigs}
          >{this.buildTree(dataSource)}
          </Tree>
        </Card>
      </div>
    );
  }
}

export default OrganizationTree;
