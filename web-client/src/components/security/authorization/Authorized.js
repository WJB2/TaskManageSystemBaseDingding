import { PureComponent } from 'react';

import ObjectUtils from './../../../utils/ObjectUtils';
import SecurityUtils from './../../../utils/SecurityUtils';

class Authorized extends PureComponent {
  render() {
    const { children, permission, logical = 'AND', notAuthorized = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    let result = false;

    if (!SecurityUtils.isAuthenticated()) {
      return notAuthorized;
    }

    if (typeof permission === 'string') {
      result = SecurityUtils.isPermit(permission);
    } else if (ObjectUtils.isArray(permission) && logical.toUpperCase() === 'AND') {
      result = true;

      for (let i = 0; i < permission.length; i += 1) {
        if (!SecurityUtils.isPermit(permission[i])) {
          result = false;
          break;
        }
      }
    } else if (ObjectUtils.isArray(permission) && logical.toUpperCase() === 'OR') {
      for (let i = 0; i < permission.length; i += 1) {
        if (SecurityUtils.isPermit(permission[i])) {
          result = true;
          break;
        }
      }
    }

    if (result) {
      return childrenRender;
    } else {
      return notAuthorized;
    }
  }
}

export default Authorized;
