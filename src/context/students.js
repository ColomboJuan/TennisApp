import React from 'react'
import { watchStudents,watchUserChanges } from '../services/firebase'
export const StudentContext =React.createContext()

export class StudentContextProvider extends React.Component{
    state = {
       students:[]
    }

    componentDidMount(){
        this.userWatcherUnsub = watchUserChanges((user)=>{
            if(user && !this.isSetup){
                this.isSetup =true; 
                this.expenseWatcherUnsub =  watchStudents((students) =>{
                    this.setState({students})
                })
            }
        })

        
    }

    componentWillUnmount() {
        if (this.expenseWatcherUnsub) {
            this.expenseWatcherUnsub();
        }
    }
 

render(){
    const {
        children,
    } = this.props;
    return(
        
        <StudentContext.Provider value={{...this.state}}>
          {children}
        </StudentContext.Provider>
    )
}
}

export const StudentContextComsumer =StudentContext.Consumer;