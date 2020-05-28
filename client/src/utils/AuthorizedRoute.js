import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedRoute = ({ component, ...rest }) => {
  const [user] = useState(() =>
    JSON.parse(localStorage.getItem('@pocpassaport') || null)
  );

  const logged = user && user.token.length > 0 ? true : false;
  if (logged === null) return <div>Loading...</div>;
  if (logged !== true) return <Redirect push to='/auth' />;
  return <Route component={component} {...rest} />;
};

export default AuthorizedRoute;
