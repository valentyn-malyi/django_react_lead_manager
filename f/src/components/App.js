import React, {Component, Fragment} from 'react';
import ReactDOM from "react-dom";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Dashboard from "./leads/Dashboard";
import {Provider} from "react-redux"
import store from "../store";
import Login from "./accounts/Login";
import {Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic";
import {HashRouter, Switch, Route} from "react-router-dom";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";

const alertOption = {
    timeout: 3000,
    position: "top center"
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }


    render() {
        return <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOption}>
                <HashRouter>
                    <Fragment>
                        <Header/>
                        <Alerts/>
                        <div className="container">
                            <Switch>
                                <PrivateRoute exact path={`/`} component={Dashboard}/>
                                <Route exact path={`/register`} component={Register}/>
                                <Route exact path={`/login`} component={Login}/>
                            </Switch>
                        </div>
                    </Fragment>
                </HashRouter>
            </AlertProvider>
        </Provider>
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));

