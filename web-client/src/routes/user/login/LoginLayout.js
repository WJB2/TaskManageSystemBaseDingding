import React, { Component } from 'react';
import { connect } from 'dva';

import { APPLICATION_NAME } from './../../../utils/GlobalConst';
import Login from './../../../components/user/login/Login';

import styles from './LoginLayout.less';

@connect(state => ({
  login: state['user/authentication'],
}))
class LoginLayout extends Component {
  handleSubmit(values) {
    const { dispatch } = this.props;

    dispatch({
      type: 'user/authentication/login',
      payload: {
        ...values,
      },
    });
  }

  render() {
    const { errorText } = this.props.login;
    return (
      <div className={styles.box}>
        <div className={styles.container}>
          <div className={styles.title}>{APPLICATION_NAME}</div>
          <Login
            errorText={errorText}
            style={{ display: 'flex' }}
            onSubmit={this.handleSubmit.bind(this)}
          />
        </div>
        <div className={styles.top} />
        <div className={styles.bottom} />
      </div>
    );
  }
}

export default LoginLayout;
