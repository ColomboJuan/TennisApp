import React from 'react'
import { watchStudents,watchUserChanges } from '../services/firebase'
export const StudentContext =React.createContext()

export class StudentContextProvider extends React.Component{
    state = {
       students:[

       ]
    }

    componentDidMount(){
        watchUserChanges((user)=>{
            if(user && !this.isSetup){
                this.isSetup =true; 
                watchStudents((students) =>{
                    this.setState({students})
                })
            }
        })

        
    }
 

render(){
    return(
        <StudentContext.Provider value={this.state}>
          {this.props.children}
        </StudentContext.Provider>
    )
}
}

export const StudentContextComsumer =StudentContext.Consumer;