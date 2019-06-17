import React from 'react'
import { watchCoaches,watchUserChanges } from '../services/firebase'
export const CoachContext =React.createContext()

export class CoachContextProvider extends React.Component{
    state = {
        coaches:[]
    }

    componentDidMount(){
        this.userWatcherUnsub = watchUserChanges((user)=>{
            if(user && !this.isSetup){
                this.isSetup =true; 
                this.coachWatcherUnsub =  watchCoaches((coaches) =>{
                     this.setState({coaches})
                })
            }
        })

        
    }

    componentWillUnmount() {
        if (this.coachWatcherUnsub) {
            this.coachWatcherUnsub();
        }
    }
 

render(){
    const {
        children,
    } = this.props;
    return(
        
        <CoachContext.Provider value={{...this.state}}>
          
          {children}
        </CoachContext.Provider>
    )
}
}

export const CoachContextComsumer =CoachContext.Consumer;