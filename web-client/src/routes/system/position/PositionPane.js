import React, { PureComponent } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import OrganizationTreeSelector from './../../../components/system/form/OrganizationTreeSelector';
import PostTreeSelector from './../../../components/system/form/PostTreeSelector';

import styles from './PositionIndex.less';

const FormItem = Form.Item;

@Form.create({
  onValuesChange: (props, values) => {
    props.onParamsChange(values);
  },
})
class PositionPane extends PureComponent {
  handleAdd() {
    const { onAdd } = this.props;

    if (onAdd) {
      onAdd();
    }
  }

  handleSearch() {
    const { onSearch } = this.props;

    if (onSearch) {
      onSearch();
    }
  }

  handleReset() {
    const { onSearch } = this.props;

    this.props.form.resetFields();

    if (onSearch) {
      onSearch({});
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className={styles.positionIndexForm}>
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6} sm={24}>
                <FormItem label="人员关键字">{getFieldDecorator('staffText')(<Input />)}</FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label="组织机构">{getFieldDecorator('orgId')(<OrganizationTreeSelector allowClear multiple treeCheckStrictly labelInValue={false} />)}</FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label="工作职位">{getFieldDecorator('postId')(<PostTreeSelector allowClear multiple treeCheckStrictly labelInValue={false} />)}</FormItem>
              </Col>
              <Col md={6} sm={24}>
                <span className={styles.submit_buttons}>
                  <Button type="primary" onClick={this.handleSearch.bind(this)}>
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>
                    重置
                  </Button>
                </span>
              </Col>
            </Row>
          </Form>
        </div>
        <div className={styles.positionIndexOperator}>
          <Button icon="plus" type="primary" onClick={this.handleAdd.bind(this)}>
            新增
          </Button>
        </div>
      </div>
    );
  }
}

export default PositionPane;
