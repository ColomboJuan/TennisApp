import React, { Component } from 'react';
import{ createStudents } from '../../services/firebase'


class StudentForm extends Component{
    constructor(){
        super();
        this.onChange = this.onChange.bind(this)
        this.submitStudent = this.submitStudent.bind(this)

        this.state={
            name:'',
            age:'',
            group:'',
            email:'',
            gender:'',
            adress:'',
            students:[]
        }
        
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    submitStudent = (e) =>{  
        e.preventDefault();
        const student ={
         name:this.state.name,
         age:this.state.age,
         group:this.state.group,
         email:this.state.email,
         gender:this.state.gender,
         adress:this.state.adress
       }


     createStudents(student)

    }
    render(){
       

        return(
            <div className="card ">  
            <div className="card card-header">
               <h5>New Student</h5>
            </div>
            <div className="card card-body">
              <div className="form-group">
                <input className="form-control" name="name" value={this.state.name} placeholder="Name" onChange={this.onChange} type="text" />
             </div>
             <div className="form-group">
               <input className="form-control" name="age" value={this.state.age} placeholder="Age" onChange={this.onChange} type="number" />
             </div>
             <div className="form-group">
               <select className="form-control" name="group" placeholder="Group" onChange={this.onChange} value={this.state.group} >
              <option selected hidden> Group</option>
               <option>1</option>
               <option>2</option>
               <option>3</option>
               </select>
             </div>
             <div className="form-group" name="email" value={this.state.email}>
               <input className="form-control" placeholder="Email" name="email" onChange={this.onChange} type="mail" />
             </div>
             <div className="form-group">
               <select className="form-control" name="gender" placeholder="Gender" onChange={this.onChange} value={this.state.gender} >
               <option selected hidden>Gender</option>
               <option>Male</option>
               <option>Femenale</option>
               <option>Undefined</option>
               </select>
             </div>
             <div className="form-group" value={this.state.adress}>
               <input className="form-control" placeholder="Adress" onChange={this.onChange} name="adress" type="text" />
             </div>             
             <button className="btn btn-block bg-primary text-white " onClick={this.submitStudent}> Add</button>
           </div>
          </div>
        )
    }
    
}
export default StudentForm