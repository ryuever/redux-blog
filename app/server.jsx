import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router'
import fetch from 'isomorphic-fetch';
import { Provider } from 'react-redux';
import createRoutes from 'routes.jsx';
import configureStore from 'store/configureStore';
// import headconfig from 'components/Meta';

import MakeRequest from './util/MakeRequest';

function renderFullPage(renderedContent, initialState, head={
  title: 'React Webpack Node',
  meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
  link: '<link rel="stylesheet" href="/assets/styles/main.css"/>'
}) {
  return `
  <!doctype html>
    <html lang="">

    <head>
        ${head.title}

        ${head.meta}

        ${head.link}
    </head>
    <body>
    <div id="app">${renderedContent}</div>

    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script type="text/javascript" charset="utf-8" src="/assets/vendor.bundle.js"></script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
    <link rel="stylesheet" type="text/css" href="/assets/style.css" />
    <link rel="stylesheet" type="text/css" href="/Draft.css" />
    <link rel="stylesheet" type="text/css" href="/reactTags.css" />
    <link rel="stylesheet" type="text/css" href="/modal.css" />
    </body>
    </html>

  `;
}

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {

  const history = createMemoryHistory();
  let initialState = {
    article:{
      articles: [],
      presentArticle: {},
      newArticle:{
        articleTitle: '',
        articleContent: ''
      }
    },
    user: {
      authenticated: false,
      isWaiting: false,
      account: {}
    },
    tag: {
      newArticleTag: [],
      suggestions: []
    }
  }


  const store = configureStore(initialState, history);
  const routes = createRoutes(store);

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {

      const initialState = store.getState();
      const renderedContent = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>);
      const renderedPage = renderFullPage(renderedContent, initialState, {
        title: '',
        meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
        link: '<link rel="stylesheet" href=""/>'
      });
      res.status(200).send(renderedPage);
    } else {
      res.status(404).send('Not Found');
    }
  });
};
