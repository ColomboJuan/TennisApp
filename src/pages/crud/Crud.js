import React  from 'react';
import firebase from '../../services/firebase/setup'
import Layout from '../../components/layout'
import {StudentContext} from '../../context/students'
import Student from '../student/index'
import styles from './style.module.scss';


class Crud extends React.Component {
   state={
    isOpen: false,
    studentId:null,
    
  }
  


  render() {
   const{students}=this.context

    const {
      studentId,
      isOpen
    } = this.state; 
  
     const student = students.find(n => n.id === studentId);
  
      return (
        
            <Layout>
               <div className={styles.buttonFloat}
               onClick={()=> this.setState({isOpen:true , studentId:null})}
              >
              +
              </div>
              
              <div className="container">
             
                 <div className="card" >     
                    <table class="table table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Age</th>
                          <th scope="col">Group</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Mail</th>
                          <th scope="col">Adress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(row =>{
                          return(
                            <tr
                            key={row.id}
                            onClick={() => this.setState({ studentId: row.id,isOpen:true})}
                            >
                              <td>{row.name}</td>
                              <td>{row.age}</td>
                              <td>{row.group}</td>
                              <td>{row.gender}</td>
                              <td>{row.email}</td>
                              <td>{row.adress}</td>
                            </tr>
                          )
                        })}
                      </tbody>   
                     </table>
                 </div>     
              </div>
              {isOpen &&
              <Student
              student={student}
              onClose={()=> this.setState({isOpen:false})}
              />
              }
            </Layout>
    );
  }
}


Crud.contextType =StudentContext;

export default Crud;
