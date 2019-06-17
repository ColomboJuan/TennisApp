import React  from 'react';
import ReactDOM  from 'react-dom'
import {Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'
import styles from './style.module.scss';
import Button from '../../components/button'
import Select from '../../components/select'
import FormControl from '../../components/formControl'
import {createStudents,updateStudents,deleteStudents} from "../../services/firebase";
import { StudentContext } from '../../context/students';
import { GroupContext } from '../../context/groups';


const formSchema = yup.object().shape({
  name:yup.string().min(3).required(),
  age:yup.number().required(),
  group:yup.string().min(1).required(),
  gender:yup.string().min(1).required(),
  email:yup.string().required(),
  adress:yup.string().required()
})

class Student extends React.Component {
  state={
    student: this.props.student,
    showReload :false,
    students:this.context,
  }

  componentWillReceiveProps(newProps) {
    const {
        student: oldStudent,
    } = this.state;
    const {
        student: newStudent
    } = newProps;

    if(
      newStudent && oldStudent &&(
        newStudent.adress !== oldStudent.adress ||
        newStudent.age !== oldStudent.age ||
        newStudent.email !== oldStudent.email ||
        newStudent.gender !== oldStudent.gender ||
        newStudent.group !== oldStudent.group ||
        newStudent.name !== oldStudent.name
      )
    ) {
        this.setState({
            student: newStudent,
            showReload: true,
        });
    }
}
  


onSubmit = async (values, { setSubmitting }) => {
  const {
      student,
  } = this.state;
  const{
    students
  }=this.context

  if (student) {
    await updateStudents(student.id,values)
  } else {
    await createStudents(values)
  }

 
  
  setSubmitting(false);
  this.props.onClose();
}




onCancel = () =>{
  
  this.props.onClose()
}

onDelete = async()=>{
  const {
    student,
    onClose
  } = this.props
  await deleteStudents(student.id);
  onClose()


}

  render() {
    const{
      students,
      groups
    }=this.context
    const{
      onClose
    }=this.props
    const {
      student,
      showReload,
  } = this.state;
  const resource = student || {};
  const groupsName=groups.map(row =>{
    return{label: row.name,
      value: row.name}})
      const node = (
           <div className={styles.modalContainer}>
             <div className={styles.modalBox}>
              <h1 onClick={onClose}>{resource.id ? "Edit" : "Create" } student</h1>
              <Formik
                initialValues={{
                    name:resource.name ||'',
                    age:resource.age ||'',
                    group:resource.group ||'',
                    gender:resource.gender ||'',
                    email:resource.email ||'',
                    adress:resource.adress ||'',
                    
                }}
                validationSchema={formSchema}
                onSubmit={this.onSubmit}
                render={props=>{
                    const {
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        handleReset,
                        isValid
                    }=props
                    return(
                        <React.Fragment>
                        <FormControl type="block">
                        <input type="text" className="form-control"
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Name"
                  />
                  <ErrorMessage  style={{ color: 'red' }} name="name"/>
                  <input type="number" className="form-control"
                  value={values.age}
                  onChange={handleChange('age')}
                  onBlur={handleBlur('age')}
                  placeholder="Age"
                  />
                  <ErrorMessage  name="age"/>
                    <Select

              options={[{
                  label:'Male',
                  value:'Male'
              },
              {
                label:'Femenale',
                value:'Femenale'
            },
            {
                label:'Undifined',
                value:'Undifined'
            }
        ]}
              value={values.gender}
              onChange={handleChange('gender')}
              onBlur={handleBlur('gender')}
              placeholder="Gender"/>

              <ErrorMessage name="gender"/>
              </FormControl>
              <FormControl type="row">
              <input type="text" className="form-control"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email"
                  />
              <ErrorMessage name="email"/>

              </FormControl> 
              <FormControl type="block">
              <input type="text" className="form-control"
                  value={values.adress}
                  onChange={handleChange('adress')}
                  onBlur={handleBlur('adress')}
                  placeholder="Adress"
                  />
              <ErrorMessage name="adress"/>

              <Select
              options={groupsName}
              value={values.group}
              onChange={handleChange('group')}
              onBlur={handleBlur('group')}
              placeholder={'Group'}

              />
              <ErrorMessage name="group"/>
              </FormControl> 
                 
              <FormControl type="block" >
              <Button 
              type="primary"
              disabled={isSubmitting || !isValid}
              onClick={handleSubmit}
              label={resource.id ? 'Update'  : 'Create'}
              />
                {resource.id &&
              <Button 
              type="danger"
              onClick={this.onDelete}
              label='Delete'
              />
            }
              <Button 
              type="warning"
              
              onClick={this.onCancel}
              label='Cancel'
              />
              
            </FormControl>
              <FormControl type="row" >
            
              </FormControl>
              {showReload &&
              <FormControl>
                <div>
                  This resource has been update.
                <Button 
                type="link"
                 onClick={() =>{
                handleReset()
                this.setState({showReload:false})
              }}
              label='Click here'
              />to refresh
                </div>
              </FormControl>
              }
              </React.Fragment> 
                    )}}
              >
              
              </Formik>
             </div>
           
           </div>
    )
    return ReactDOM.createPortal(node,document.getElementById('modal-root'))  
  }
}


Student.contextType = StudentContext;
Student.contextType = GroupContext;

export default Student;
