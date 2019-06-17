import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter ,Route,Switch,Redirect } from 'react-router-dom';
import Login from './pages/login/login';
import Crud from './pages/crud/Crud';
import GroupCrud from './pages/groupsCrud/Crud';
import EvalCrud from './pages/evalCrud/Crud';
import CoachCrud from './pages/coachCrud/Crud';
import MatchCrud from './pages/groupMatchCrud/Crud'
import {AuthContextProvider } from './context/auth'
import {StudentContextProvider } from './context/students'  
import {EvalContextProvider } from './context/evals'  
import {GroupContextProvider } from './context/groups'  
import {CoachContextProvider } from './context/coaches'
import {MatchContextProvider } from './context/matches'
import GuardRoute from './components/guardRoute'
import Root from './components/root'

const App =(
    <BrowserRouter>
        <AuthContextProvider>
        <StudentContextProvider>
        <GroupContextProvider>
          <EvalContextProvider>
          <CoachContextProvider>
              <MatchContextProvider>
            <Root>
            <Switch>
             <Route type="private" path="/App" component={Crud} />
             <Route type="public" path="/login" component={Login} />
             <Route type="public" path="/Group" component={GroupCrud} />
             <Route type="public" path="/Eval" component={EvalCrud} />
             <Route type="public" path="/Coach" component={CoachCrud} />
             <Route type="public" path="/Match" component={MatchCrud} />

                    </Switch>
            </Root>
            </MatchContextProvider>
            </CoachContextProvider>
            </EvalContextProvider>
     
        </GroupContextProvider>
        </StudentContextProvider>


        </AuthContextProvider>
    </BrowserRouter>
)

ReactDOM.render(App, document.getElementById('root'));


serviceWorker.unregister();

