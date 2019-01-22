import React, { PureComponent } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import styles from './OrganizationIndex.less';

const FormItem = Form.Item;

@Form.create({
  onValuesChange: (props, values) => {
    props.onParamsChange(values);
  },
})
class OrganizationPane extends PureComponent {
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
        <div className={styles.organization_index_form}>
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6} sm={24}>
                <FormItem label="查询关键字">{getFieldDecorator('orgText')(<Input />)}</FormItem>
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
        <div className={styles.organization_indexOperator}>
          <Button icon="plus" type="primary" onClick={this.handleAdd.bind(this)}>
            新增
          </Button>
        </div>
      </div>
    );
  }
}

export default OrganizationPane;
