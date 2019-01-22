import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';

import PostPane from './PostPane';
import PostTable from './PostTable';
import PostTree from './PostTree';
import PostForm from './PostForm';

import styles from './PostIndex.less';

@connect(models => ({
  post: models['system/post'],
  loading: models.loading.models.post,
}))
class PostIndex extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/post/queryPostPageAsync',
    });

    dispatch({
      type: 'system/post/queryPostTreeAsync',
    });
  }

  handlePostAdd() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/post/updateState',
      payload: {
        formVisible: true,
        formType: 'ADD',
      },
    });
  }

  handlePostSearch() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/post/queryPostPageAsync',
    });
  }

  handlePostQueryParamsChange(values) {
    const { dispatch, post } = this.props;

    dispatch({
      type: 'system/post/updateState',
      payload: {
        params: { ...post.params, ...values },
      },
    });
  }

  handlePostEdit(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/post/editPostAction',
      payload: {
        id,
      },
    });
  }

  handlePostDelete(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/post/deletePostByIdAsync',
      payload: {
        id,
      },
    });
  }

  handlePostTreeNodeSelect(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/post/changePostRootNode',
      payload: {
        id:id[0],
      },
    });
  }

  handleFormSubmit(formValues) {
    const { dispatch, post } = this.props;

    if (post.formType === 'ADD') {
      dispatch({
        type: 'system/post/addPostAsync',
        payload: formValues,
      });
    } else if (post.formType === 'EDIT') {
      dispatch({
        type: 'system/post/editPostAsync',
        payload: formValues,
      });
    }
  }

  handleFormCancel() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/post/updateState',
      payload: {
        formVisible: false,
        formType: null,
      },
    });
  }

  render() {
    const { dispatch, post } = this.props;

    const { formType, formVisible, currentPost, data, treeData } = post;

    const paneConfigs = {
      onAdd: this.handlePostAdd.bind(this),
      onSearch: this.handlePostSearch.bind(this),
      onParamsChange: this.handlePostQueryParamsChange.bind(this),
    };

    const formConfigs = {
      onSubmit: this.handleFormSubmit.bind(this),
      onCancel: this.handleFormCancel.bind(this),
      formType,
      formVisible,
      currentPost,
    };

    const treeConfigs = {
      dataSource: treeData,
      onSelect : this.handlePostTreeNodeSelect.bind(this),
    };

    const tableConfigs = {
      dataSource: data.list,
      pagination: {
        ...data.pagination,
        onChange: page => {
          dispatch({
            type: 'system/post/queryPostPageAsync',
            payload: {
              page,
            },
          });
        },
      },
      onEdit: this.handlePostEdit.bind(this),
      onDelete: this.handlePostDelete.bind(this),
    };

    return (
      <div>
        <Card>
          <div className={styles.postIndex}>
            <PostPane {...paneConfigs} />
            <div style={{ display: 'flex' }}>
              <div style={{ width: 256 }}>
                <PostTree {...treeConfigs} />
              </div>
              <div style={{ flex: 1, marginLeft: 16 }}>
                <PostTable {...tableConfigs} />
              </div>
            </div>
          </div>
        </Card>

        {formVisible && <PostForm {...formConfigs} />}
      </div>
    );
  }
}

export default PostIndex;
