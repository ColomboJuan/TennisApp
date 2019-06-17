import React from 'react'
import { watchGroups,watchUserChanges } from '../services/firebase'
export const GroupContext =React.createContext()

export class GroupContextProvider extends React.Component{
    state = {
       groups:[]
    }

    componentDidMount(){
        this.userWatcherUnsub = watchUserChanges((user)=>{
            if(user && !this.isSetup){
                this.isSetup =true; 
                this.groupWatcherUnsub =  watchGroups((groups) =>{
                    this.setState({groups})
                })
            }
        })

        
    }

    componentWillUnmount() {
        if (this.groupWatcherUnsub) {
            this.groupWatcherUnsub();
        }
    }
 

render(){
    const {
        children,
    } = this.props;
    return(
        
        <GroupContext.Provider value={{...this.state}}>
          {children}
        </GroupContext.Provider>
    )
}
}

export const GroupContextComsumer =GroupContext.Consumer;