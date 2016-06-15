/**
 * The server's main file.
 */
import { StyleRoot } from 'radium';
import compression from 'compression';
import path from 'path';
import express from 'express';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { RouterContext, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import serializeJavascript from 'serialize-javascript';
import favicon from 'serve-favicon';
import { doInit } from './actions';
import createStore from './createStore';
import reducer from './reducer';
import { getRoutes } from './routes';

// The html skeleton used during server-side initial render
class HtmlComponent extends Component {

  static propTypes = {
    component: PropTypes.node.isRequired,
    scripts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    state: PropTypes.string.isRequired,
    styles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  }

  render () {
    const { state, component, styles, scripts } = this.props;
    const markup = ReactDOM.renderToString(component);
    return (
      <html lang='en'>
        <head>
          {/* Encoding. */}
          <meta charSet='utf-8' />
          {/* Favicon, title and description. */}
          <title></title>
          <link href='/favicon.ico' rel='shortcut icon' />
          {/* Other stuff */}
          <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
          <meta content='width=device-width, initial-scale=1, user-scalable=no' name='viewport' />
          {/* Styles */}
          {styles.map((href, key) => <link href={href} key={key} rel='stylesheet' />)}
        </head>
        <body>
          {/* App container */}
          <div dangerouslySetInnerHTML={{ __html: markup }} id='root'></div>
          <div id='fb-root'></div>
          {/* Store data */}
          <script dangerouslySetInnerHTML={{ __html: state }}></script>
          {/* Scripts */}
          {scripts.map((src, key) => <script key={key} src={src} />)}
        </body>
      </html>
    );
  }
}

// Create and configure express server
const app = express();
app.use(compression());

// Favicon middleware
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// Serve static contents
if (__DEVELOPMENT__) {
  // Use webpack development server for serving static content.
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackDevConfig = require('../webpack.dev.config.babel');
  const compiler = webpack(webpackDevConfig);
  const myWebpackDevMiddleware = webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackDevConfig.output.publicPath });
  app.use(myWebpackDevMiddleware);
  app.getWebpackDevServerFile = function (filename) {
    return myWebpackDevMiddleware.fileSystem.readFileSync(path.join(compiler.outputPath, filename)); // eslint-disable-line no-sync
  };
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

// Render frontend
app.get('*', async (req, res) => {
  // Get script and style file locations from webpack
  let scripts = [];
  let styles = [];
  try {
    // Note: this file is generated at built time.
    let webpackResult;
    if (__DEVELOPMENT__) {
      webpackResult = JSON.parse(req.app.getWebpackDevServerFile('webpackStats.json').toString('utf8'));
    } else {
      webpackResult = require('../dist/webpackStats.json');
    }
    scripts = webpackResult.scripts;
    styles = webpackResult.styles;
  } catch (e) {
    console.error('ERROR: Could not require webpack stats. This is probably because ' +
                  'bundling has not yet completed. Try again in a moment, please!', e);
    return;
  }
  // Create history
  const almostHistory = createHistory(req.originalUrl);
  // Create redux store
  const store = createStore(almostHistory, reducer);
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(almostHistory, store, { selectLocationState: (state) => state.get('routing') });
  // Initialize the app.
  await store.dispatch(doInit());
  // Route and render
  match({ ourHistory, routes: getRoutes(ourHistory, store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      console.log('Redirect');
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('500 Error', error);
      res.status(500);
    } else {
      try {
        // Render component
        const component = (
          <Provider key='provider' store={store}>
            <StyleRoot>
              <RouterContext {...renderProps} />
            </StyleRoot>
          </Provider>);
        // Grab and serialize the initial state from our Redux store
        const state = `window.__INITIAL_STATE__=${serializeJavascript(store.getState().toJS())};`;
        // Send response
        res.send(`<!DOCTYPE html>
          ${ReactDOM.renderToString(<HtmlComponent component={component} scripts={scripts} state={state} styles={styles} />)}`);
      } catch (error2) {
        console.error('Render failed. 500 Error', error2);
        res.status(500);
      }
    }
  });
});

// Install error handling middleware: emergency error handling
app.use((err, req, res, next) => { // eslint-disable-line handle-callback-err
  console.error('ERROR: something went wrong while processing the request:', err);
  console.error(err.stack);
  res.status(500).send().end();
});

// Start listening
const PORT = process.env.PORT || 2999;
app.listen(PORT, () => {
  console.info(`${app.get('env')} server listening on port ${PORT}`);
});

export default app;
