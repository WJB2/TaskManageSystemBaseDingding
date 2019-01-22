import React, { PureComponent } from 'react';

class ContentWrapper extends PureComponent {
  render() {
    const { children, style } = this.props;
    return (
      <div
        style={{
          padding: 16,
          width: '100%',
          height: '100%',
          ...style,
        }}
        {...this.props}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default ContentWrapper;
