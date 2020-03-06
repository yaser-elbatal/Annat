import React, { Component } from 'react';
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';

// import { renderRoutes } from 'react-router-config';
import './App.scss';
import Loader from "./views/Components/Custom/Loader/Loader"

import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from "apollo-cache-inmemory"

const loading = () => <div style={{ position: "fixed", top: "50%", left: "45%" }} ><Loader /></div>

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./login/login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));


const PrivateRoute = ({ ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("AnnatLogin") && localStorage.getItem("AnnatLogin") != "null"
      ? (
        /*
        self-invocated function to self-implemented
        when local storage assigned then client take the right token
        not null
        */
        (() => {
          const client = new ApolloClient({
            link: new WebSocketLink({
              uri: "ws://68.183.67.204/v1/graphql",
              options: {
                reconnect: true,
                connectionParams: {
                  headers: {
                    // 'x-hasura-admin-secret': 'annat@2019',
                    Authorization: `Bearer ${(localStorage.getItem("AnnatLogin") && JSON.parse(localStorage.getItem("AnnatLogin")).token) || ""}`
                  }
                }
              }
            }),
            cache: new InMemoryCache(),
          });

          return (
            <ApolloProvider client={client}>
              <DefaultLayout {...props} />
            </ApolloProvider>
          )
        })()
      )
      : <Redirect to='/login' />
  )} />
);


class App extends Component {



  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
            <PrivateRoute path='/' name="Home" />

          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


export default App;
