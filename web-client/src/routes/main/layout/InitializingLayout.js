import React, { PureComponent } from 'react';

import { connect } from 'dva';

const loading = import('./../../../assets/images/loading.gif');

@connect(models => ({
  global: models.global,
}))
class InitializingLayout extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/initialize',
    });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div>
          <img src={loading} alt="loading" />
          <div style={{ textAlign: 'center', fontSize: 18 }}>系统加载中，请稍后...</div>
        </div>
      </div>
    );
  }
}

export default InitializingLayout;
