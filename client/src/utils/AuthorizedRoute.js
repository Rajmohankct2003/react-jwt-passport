import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedRoute = ({ component, ...rest }) => {
  // const user = useSelector(({ authedUser }) => authedUser);
  const user = null;
  const logged = user && user.length > 0 ? true : false;
  if (logged === null) return <div>Loading...</div>;
  if (logged !== true) return <Redirect push to='/auth' />;
  return <Route component={component} {...rest} />;
};

export default AuthorizedRoute;
