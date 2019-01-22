import React, { PureComponent } from 'react';

import Login from './../../../components/user/login/Login';

class MainLoginLayout extends PureComponent {
  handleSubmit(values) {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/login',
      payload: {
        ...values,
      },
    });
  }

  render() {
    const { loginErrorText } = this.props.global;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 99999,
          backgroundColor: 'rgba(242, 242, 242, 0.35)',
        }}
      >
        <Login errorText={loginErrorText} onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

export default MainLoginLayout;
