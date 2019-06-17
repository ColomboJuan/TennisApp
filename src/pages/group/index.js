import React  from 'react';
import ReactDOM  from 'react-dom'
import {Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'
import styles from './style.module.scss';
import Button from '../../components/button'
import Select from '../../components/select'
import FormControl from '../../components/formControl'
import {createGroups,updateGroups,deleteGroups} from "../../services/firebase";
import { GroupContext } from '../../context/groups';
import { CoachContext } from '../../context/coaches';



const formSchema = yup.object().shape({
  coach:yup.string().min(3).required(),
  description:yup.string().min(1).required(),
  name:yup.string().min(1).required()
})

class Group extends React.Component {
  state={
    group: this.props.group,
    showReload :false
  }

  componentWillReceiveProps(newProps) {
    const {
        group: oldGroup,
    } = this.state;
    const {
        group: newGroup
    } = newProps;

    if(
      newGroup && oldGroup &&(
        newGroup.name !== oldGroup.name ||
        newGroup.coach !== oldGroup.coach ||
        newGroup.description !== oldGroup.description 
     
      )
    ) {
        this.setState({
            group: newGroup,
            showReload: true,
        });
    }
}
  


onSubmit = async (values, { setSubmitting }) => {
  const {
      group,
  } = this.state;

  if (group) {
    await updateGroups(group.id,values)
  } else {
    await createGroups(values)
  }

  setSubmitting(false);
  this.props.onClose();
}




onCancel = () =>{
  
  this.props.onClose()
}

onDelete = async()=>{
  const {
    group,
    onClose
  } = this.props
  await deleteGroups(group.id);
  onClose()


}

  render() {
const{
  coaches
} = this.context
    const{
      onClose
    }=this.props
    const {
      group,
      showReload,
  } = this.state;
  const resource = group || {};
  const coachesName=coaches.map(row =>{
    return{label: row.name,
      value: row.name}})
      const node = (
           <div className={styles.modalContainer}>
             <div className={styles.modalBox}>
              <h1 onClick={onClose}>{resource.id ? "Edit" : "Create" } Group</h1>
              <Formik
                initialValues={{
                    name:resource.name ||'',
                    coach:resource.coach ||'',
                    description:resource.description ||''
                    
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
                  <Select
               options={coachesName}
              value={values.coach}
              onChange={handleChange('coach')}
              onBlur={handleBlur('coach')}
              placeholder={'Coach'}

              />
                  <ErrorMessage  name="Coach"/>
                  
              </FormControl>
              <FormControl type="row">
              <input type="text" className="form-control"
                  value={values.description}
                  onChange={handleChange('description')}
                  onBlur={handleBlur('description')}
                  placeholder="Description"
                  />
              <ErrorMessage name="Description"/>

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


Group.contextType = GroupContext;
Group.contextType = CoachContext;

export default Group;
