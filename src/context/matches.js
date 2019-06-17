import React from 'react'
import { watchEvals,watchUserChanges } from '../services/firebase'
export const EvalContext =React.createContext()

export class EvalContextProvider extends React.Component{
    state = {
        evaluations:[]
    }

    componentDidMount(){
        this.userWatcherUnsub = watchUserChanges((user)=>{
            if(user && !this.isSetup){
                this.isSetup =true; 
                this.evalWatcherUnsub =  watchEvals((evaluations) =>{
                     this.setState({evaluations})
                })
            }
        })

        
    }

    componentWillUnmount() {
        if (this.evalWatcherUnsub) {
            this.evalWatcherUnsub();
        }
    }
 

render(){
    const {
        children,
    } = this.props;
    return(
        
        <EvalContext.Provider value={{...this.state}}>
          
          {children}
        </EvalContext.Provider>
    )
}
}

export const EvalContextComsumer =EvalContext.Consumer;