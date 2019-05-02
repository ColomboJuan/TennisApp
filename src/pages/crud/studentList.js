import React ,{ Component} from 'react';
import firebase from '../../services/firebase/setup'

class StudentList extends Component{
    constructor(){
        super();
       // this.deleteStudent = this.deleteStudent.bind(this)


       this.state={
         students:{}
       }

        const db = firebase.firestore()
        window.onload = function() {
        var table=document.getElementById('studentTable')
        
        db.collection('students').onSnapshot((querySnapshot) =>{
            table.innerHTML = ''
            querySnapshot.forEach((doc)=>{
                table.innerHTML += `<tr>
                <th scope="row">${doc.data().name}</th>
                
                <td>${doc.data().age}</td>
                <td>${doc.data().group}</td>
                <td>${doc.data().gender}</td>
                <td>${doc.data().email}
                <td>${doc.data().adress}</td>
              
              </tr>`

            })
        })
    }

 
}
    
    render(){
        return(
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
      <th scope="col">Delete</th>
      <th scope="col">Edit</th>
      
      
    </tr>
  </thead>
  <tbody id="studentTable">
    
  
    
    
  </tbody>
</table>
</div>
)
    }
}

export default StudentList;