import React  from 'react';
import ReactDOM  from 'react-dom'
import {Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'
import styles from './style.module.scss';
import Button from '../../components/button'
import Select from '../../components/select'
import FormControl from '../../components/formControl'
import {createCoaches,updateCoaches,deleteCoaches} from "../../services/firebase";
import { CoachContext } from '../../context/coaches';



const formSchema = yup.object().shape({
  name:yup.string().min(3).required(),
  gender:yup.string().min(1).required(),
  role:yup.string().min(1).required(),
  title:yup.string().min(1).required(),
  dateBirth:yup.string().min(1),
  email:yup.string().min(1).required(),
})

class Coach extends React.Component {
  state={
    coach: this.props.coach,
    showReload :false
  }

  componentWillReceiveProps(newProps) {
    const {
      coach: oldCoach,
    } = this.state;
    const {
        coach: newCoach
    } = newProps;

    if(
      newCoach && oldCoach &&(
        newCoach.name !== oldCoach.name ||
        newCoach.coach !== oldCoach.coach ||
        newCoach.description !== oldCoach.description 
     
      )
    ) {
        this.setState({
            coach: newCoach,
            showReload: true,
        });
    }
}
  


onSubmit = async (values, { setSubmitting }) => {
  const {
      coach,
  } = this.state;

  if (coach) {
    await updateCoaches(coach.id,values)
  } else {
    await createCoaches(values)
  }

  setSubmitting(false);
  this.props.onClose();
}




onCancel = () =>{
  
  this.props.onClose()
}

onDelete = async()=>{
  const {
    coach,
    onClose
  } = this.props
  await deleteCoaches(coach.id);
  onClose()


}

  render() {
    const{
      
      coaches
    }=this.context
    const{
      onClose
    }=this.props
    const {
      coach,
      showReload,
  } = this.state;
  const resource = coach || {};
  const coachesName=coaches.map(row =>{
    return{label: row.name,
      value: row.name}})
      const node = (
           <div className={styles.modalContainer}>
             <div className={styles.modalBox}>
              <h1 onClick={onClose}>{resource.id ? "Edit" : "Create" } Coach</h1>
              <Formik
                initialValues={{
                    name:resource.name ||'',
                    title:resource.title ||'',
                    group:resource.group ||'',
                    gender:resource.gender ||'',
                    email:resource.email ||'',
                    role:resource.role ||'',
                    dateBirth:resource.dateBirth ||'',
 
                    
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
                  <input type="date" className="form-control"
                  value={values.dateBirth}
                  onChange={handleChange('dateBirth')}
                  onBlur={handleBlur('dateBirth')}
                  placeholder="Date birth"
                  />
                  <ErrorMessage  name="dateBirth"/>
          

              <ErrorMessage name="gender"/>
              </FormControl>
              <FormControl type="block">
              <input type="text" className="form-control"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email"
                  />
              <ErrorMessage name="email"/>
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

              </FormControl> 
              <FormControl type="block">
              <input type="text" className="form-control"
                  value={values.title}
                  onChange={handleChange('title')}
                  onBlur={handleBlur('title')}
                  placeholder="Title"
                  />
              <ErrorMessage name="title"/>

              <Select
               options={[{
                  label:'Coach',
                  value:'Coach'
              },
              {
                label:'Lead Coach',
                value:'Lead Coach'
            }
        ]}
              value={values.role}
              onChange={handleChange('role')}
              onBlur={handleBlur('role')}
              placeholder={'Role'}

              />
              <ErrorMessage name="role"/>
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


Coach.contextType = CoachContext;

export default Coach;
