import React  from 'react';
import firebase from '../../services/firebase/setup'
import StudentForm from './StudentForm';
import StudentList from './studentList';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth';




class Crud extends React.Component {
  

  
  handleLogout(){
    console.log('anda')
    firebase.auth().signOut()
    .then(result=> console.log('Salio'))
    .catch(error=>console.log(error))
  }

  render() {
    return (
    <div className="Crud">
      <div className="navbar navbar-ligth bg-primary">
      
        <Link className="text-white" to="/App">Tennis App  </Link>
        <div >
        <Link  className="text-white mr-sm-3"  to="/App">{this.context.user && this.context.user.name}</Link>
       
        </div>
      </div>
      <div className="container">
         <div className="col-md-6 m-5 ">
             <StudentForm/>
            

           </div>
           <div id="Students-list" className="col-md-12 mx-auto m-3">
           <StudentList/>
          </div> 
       
      </div>

    </div>
    );
  }
}

Crud.contextType =AuthContext;

export default Crud;
