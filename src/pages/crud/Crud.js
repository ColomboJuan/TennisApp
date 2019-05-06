import React  from 'react';
import firebase from '../../services/firebase/setup'
import StudentForm from './StudentForm';
import StudentList from './studentList';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth';
import Layout from '../../components/layout'
import {StudentContext} from '../../context/students'
import Student from '../student/index'




class Crud extends React.Component {
  
  
  state={
    studentId:null
  }
  
  handleLogout(){
    console.log('anda')
    firebase.auth().signOut()
    .then(result=> console.log('Salio'))
    .catch(error=>console.log(error))
  }

  render() {

    

    const{
      students,
    }=this.context

    const {
      studentId
    } = this.state; 
  
     const student = students.find(n => n.id === studentId);
  
      return (
            <Layout>
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
                            onClick={() => this.setState({ studentId: row.id})}
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
              {studentId &&
              <Student
              student={student}
              onClose={()=> this.setState({studentId:null})}
              />
              }
            </Layout>
    );
  }
}

Crud.contextType =StudentContext;

export default Crud;
