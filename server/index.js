import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import serialize from "serialize-javascript";
import { StaticRouter, matchPath } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";

import configureStore from "../src/store";
import Routes from "../src/routes";
import App from "../src/App";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static("./build"));

app.get("*", (req, res) => {
  console.log("req: ", req.url);
  const currentRoute = Routes.find(route => matchPath(req.url, route)) || {};
  let promise;

  if (currentRoute.loadData) {
    promise = currentRoute.loadData();
  } else {
    promise = Promise.resolve(null);
  }

  promise.then(data => {
    // console.log("data :", data);
    // Let's add the data to the context
    const store = configureStore();
    const context = { data };
    if (currentRoute.path === "/photographer-profile") {
      store.dispatch({
        type: "ADD_TODOS",
        todos: data
      });
    }
    console.log(store.getState());
    const app = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const indexFile = path.resolve("./build/index.html");
    fs.readFile(indexFile, "utf8", (err, indexData) => {
      if (err) {
        console.error("Something went wrong:", err);
        return res.status(500).send("Oops, better luck next time!");
      }

      if (context.status === 404) {
        res.status(404);
      }
      if (context.url) {
        return res.redirect(301, context.url);
      }

      const reduxState = JSON.stringify(store.getState());
      const helmet = Helmet.renderStatic();

      return res.send(
        indexData
          .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
          .replace('"__SERVER_REDUX_STATE__"', reduxState)
          .replace(
            "</body>",
            `<script>window.__ROUTE_DATA__ = ${serialize(data)}</script></body>`
          )
          .replace(
            "<title></title>",
            helmet.title.toString() + helmet.meta.toString()
          )
      );
    });
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
