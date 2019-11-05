import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Routes from "./routes";

import styles from "./app.module.scss";
export default props => {
  return (
    <div>
      <div className={styles.imgContainer}>
        <img src="https://about.canva.com/wp-content/uploads/sites/3/2016/08/logos-1.png" />
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/photographer-profile">Photographer Profile</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
      </ul>

      <Switch>
        {Routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};
