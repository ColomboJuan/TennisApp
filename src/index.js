import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter ,Route,Switch,Redirect } from 'react-router-dom';
import Login from './pages/login/login';
import Crud from './pages/crud/Crud';
import {AuthContextProvider } from './context/auth'
import {StudentContextProvider } from './context/students'
import GuardRoute from './components/guardRoute'
import Root from './components/root'
const App =(
    <BrowserRouter>
        <AuthContextProvider>
        <StudentContextProvider>
            <Root>
            <Switch>
             <Route type="private" path="/App" component={Crud} />

            <Route type="public" path="/login" component={Login} />
            
                    </Switch>
            </Root>
        </StudentContextProvider>

        </AuthContextProvider>
    </BrowserRouter>
)

ReactDOM.render(App, document.getElementById('root'));


serviceWorker.unregister();

