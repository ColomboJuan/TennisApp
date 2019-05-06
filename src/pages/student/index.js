import React  from 'react';
import ReactDOM  from 'react-dom'
import {Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'
import styles from './style.module.scss';
import Button from '../../components/button'
import Select from '../../components/select'
import FormControl from '../../components/formControl'
import { createStudents,updateStudents,deleteStudents } from "../../services/firebase";
import { StudentContext } from '../../context/students';


const formSchema = yup.object().shape({
  name:yup.string().min(3).required(),
  age:yup.number().required(),
  group:yup.string().min(1).required(),
  gender:yup.string().min(1).required(),
  email:yup.string().required(),
  adress:yup.string().required()
})

class Student extends React.Component {
  
onSubmit = async (values, formikBag)=>{
  const {
    student,
    onClose
  } = this.props
  await updateStudents(student.id,values);

  formikBag.setSubmitting(false)
  onClose()

}
onCancel(){}

  render() {

    const{
      student,
      onClose
    }=this.props  
      const node = (
           <div className={styles.modalContainer}>
             <div className={styles.modalBox}>
              <h1 onClick={onClose}>Edit student</h1>
              <Formik
                initialValues={{
                    name:'',
                    age:'',
                    group:'',
                    gender:'',
                    email:'',
                    adress:''
                }}
                validationSchema={formSchema}
                
                render={props=>{
                    const {
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
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
                  <ErrorMessage name="name"/>
                  <input type="number" className="form-control"
                  value={values.age}
                  onChange={handleChange('age')}
                  onBlur={handleBlur('age')}
                  placeholder="Age"
                  />
                  <ErrorMessage name="age"/>
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
              options={[{
                  label:'1',
                  value:'1'
              },
              {
                label:'2',
                value:'2'
            },
            {
                label:'3',
                value:'3'
            }
        ]}
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
              label='Submit'
              />
              <Button 
              type="warning"
              onClick={this.onCancel}
              label='Cancel'
              />
              
              </FormControl>
              <FormControl type="row" >
            
              </FormControl>
              </React.Fragment> 
                    )
                    
                }}
              >
              
              </Formik>
             </div>
           
           </div>
    )
    return ReactDOM.createPortal(node,document.getElementById('modal-root'))  
  }
}

Student.contextType = StudentContext;

export default Student;
