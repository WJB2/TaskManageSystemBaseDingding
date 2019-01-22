import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Authenticated from './../components/security/authorization/Authenticated';

class AuthenticatedRoute extends PureComponent {
  render() {
    const { component: Component, render, redirectPath = '/user/login', ...rest } = this.props;
    return (
      <Authenticated
        notAuthenticated={
          <Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />
        }
      >
        <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
      </Authenticated>
    );
  }
}

export default AuthenticatedRoute;
