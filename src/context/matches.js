import React from 'react'
import { watchMatches,watchUserChanges } from '../services/firebase'
export const MatchContext =React.createContext()

export class MatchContextProvider extends React.Component{
    state = {
        matches:[]
    }

    componentDidMount(){
        this.userWatcherUnsub = watchUserChanges((user)=>{
            if(user && !this.isSetup){
                this.isSetup =true; 
                this.MatchWatcherUnsub =  watchMatches((matches) =>{
                     this.setState({matches})
                })
            }
        })

        
    }

    componentWillUnmount() {
        if (this.matchWatcherUnsub) {
            this.matchWatcherUnsub();
        }
    }
 

render(){
    const {
        children,
    } = this.props;
    return(
        
        <MatchContext.Provider value={{...this.state}}>
          
          {children}
        </MatchContext.Provider>
    )
}
}

export const MatchContextComsumer =MatchContext.Consumer;