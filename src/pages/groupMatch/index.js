import React  from 'react';
import ReactDOM  from 'react-dom'
import {Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'
import styles from './style.module.scss';
import Button from '../../components/button'
import Select from '../../components/select'
import FormControl from '../../components/formControl'
import {createMatches,updateMatches,deleteMatches} from "../../services/firebase";
import { MatchContext } from '../../context/matches';
import { StudentContext } from '../../context/students';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import moment  from 'moment';







const formSchema = yup.object().shape({
  
  name:yup.string().min(3).required(),
   date:yup.string().min(1).required(),

})

class Match extends React.Component {
  state={
    match: this.props.match,
    showReload :false
  }

  componentWillReceiveProps(newProps) {
    const {
      match: oldMatch,
    } = this.state;
    const {
      match: newMatch
    } = newProps;

    if(
      newMatch && oldMatch &&(
        newMatch.name !== oldMatch.name ||
        newMatch.date !== oldMatch.date 
       
      )
    ) {
        this.setState({
          match: newMatch,
            showReload: true,
        });
    }
}
  


onSubmit = async (values, { setSubmitting }) => {
  const {
    match,
  } = this.state;

  if (match) {
    await updateMatches(match.id,values)
  } else {
    await createMatches(values)
  }

  setSubmitting(false);
  this.props.onClose();
}




onCancel = () =>{
  
  this.props.onClose()
}

onDelete = async()=>{
  const {
    match,
    onClose
  } = this.props
  await deleteMatches(match.id);
  onClose()


}

  render() {
    const{
      students
     
    }=this.context
    const{
      onClose
    }=this.props
    const {
      match,
      showReload,
  } = this.state;
  const resource = match || {}
  const studentsName=students.map(row =>{
    return{label: row.name,
      value: row.name}})
      const node = (
           <div className={styles.modalContainer}>
             <div className={styles.modalBox}>
              <h1 onClick={onClose}>{resource.id ? "Edit" : "Create" } Match</h1>
              <Formik
                initialValues={{
                    name:resource.name ||'',
                     date: moment().calendar()||''
                  
                    
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
                   <input type="date" className="form-control"
                  value={values.date}
                  onChange={handleChange('date')}
                  onBlur={handleBlur('date')}
                  placeholder="date"
                  />
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
    return ReactDOM.createPortal(node,document.getElementById('modal-root3'))  
  }
}


Match.contextType = MatchContext;
Match.contextType = StudentContext;

export default Match;
