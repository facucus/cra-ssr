import React from "react";
import Helmet from "react-helmet";

export default () => {
  return (
    <div>
      <Helmet>
        <title>Turbo Posts</title>
        <meta name="description" content="Posts on steroid!" />
      </Helmet>
      <h1>This is the Posts Page!</h1>
    </div>
  );
};
