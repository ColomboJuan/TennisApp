import React  from 'react';
import ReactDOM  from 'react-dom'
import {Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'
import styles from './style.module.scss';
import Button from '../../components/button'
import Select from '../../components/select'
import FormControl from '../../components/formControl'
import {createEvals,updateEvals,deleteEvals} from "../../services/firebase";
import { EvalContext } from '../../context/evals';
import { StudentContext } from '../../context/students';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';






const formSchema = yup.object().shape({
  student:yup.string().min(3).required(),
  assistance:yup.boolean().required(),
  date:yup.string().min(1).required(),

})

class Eval extends React.Component {
  state={
    evaluation: this.props.evaluation,
    showReload :false
  }

  componentWillReceiveProps(newProps) {
    const {
      evaluation: oldEval,
    } = this.state;
    const {
      evaluation: newEval
    } = newProps;

    if(
      newEval && oldEval &&(
        newEval.student !== oldEval.student ||
        newEval.assistance !== oldEval.assistance ||
        newEval.date !== oldEval.date 
       
      )
    ) {
        this.setState({
          evaluation: newEval,
            showReload: true,
        });
    }
}
  


onSubmit = async (values, { setSubmitting }) => {
  const {
      evaluation,
  } = this.state;

  if (evaluation) {
    await updateEvals(evaluation.id,values)
  } else {
    await createEvals(values)
  }

  setSubmitting(false);
  this.props.onClose();
}




onCancel = () =>{
  
  this.props.onClose()
}

onDelete = async()=>{
  const {
    evaluation,
    onClose
  } = this.props
  await deleteEvals(evaluation.id);
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
      evaluation,
      showReload,
  } = this.state;
  const resource = evaluation || {}
  const studentsName=students.map(row =>{
    return{label: row.name,
      value: row.name}})
      const node = (
           <div className={styles.modalContainer}>
             <div className={styles.modalBox}>
              <h1 onClick={onClose}>{resource.id ? "Edit" : "Create" } Eval</h1>
              <Formik
                initialValues={{
                    student:resource.student ||'',
                    assistance:resource.assistance ||'',
                     date:resource.date ||'',         
                     date:resource.date ||'',
                     effort:resource.effort ||'',
                     engagement:resource.engagement || '',
                     competeLevel:resource.competeLevel || '',
                     attitude:resource.attitude || '',
                    
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
                        <Select
                          options={studentsName}
                          value={values.student}
                          onChange={handleChange('student')}
                          onBlur={handleBlur('student')}
                          placeholder={'Student'}/>
                  <ErrorMessage  style={{ color: 'red' }} name="student"/>
                  <label><h5>Assistance</h5></label>
                  <input type="checkbox" className="form-control"
                  defaultChecked={values.assistance}
                  onChange={handleChange('assistance')}
                  onBlur={handleBlur('assistance')}
                  placeholder="assistance"
                
                  />
                  
                  
        
   
                 
                  
           
              </FormControl>
              <FormControl type="row">
              <input type="date" className="form-control"
                  value={values.date}
                  onChange={handleChange('date')}
                  onBlur={handleBlur('date')}
                  placeholder="date"
                  />
              </FormControl>
              {
                    values.assistance &&
                  
              <div className="conatiner m-2">
              <FormControl type="row">
                <h6>
                  Effort
                </h6>
                <Slider
                  min={0}
                  max={5}
                  marks={{ 1: 1, 2: 2, 3: 3,4:4,5:5 }}
                  value={values.effort}
                  onChange={handleChange('effort')}
                  onBlur={handleBlur('effort')}
                  placeholder="effort"/>
             </FormControl>
             <FormControl type="row">
                <h6>
                  Engagement
                </h6>
                <Slider
                  min={0}
                  max={5}
                  marks={{ 1: 1, 2: 2, 3: 3,4:4,5:5 }}
                  value={values.engagement}
                  onChange={handleChange('engagement')}
                  onBlur={handleBlur('engagement')}
                  placeholder="engagement"/>
             </FormControl>
             
             <FormControl type="row">
                <h6>
                  Compete Level
                </h6>
                <Slider
                  min={0}
                  max={5}
                  marks={{ 1: 1, 2: 2, 3: 3,4:4,5:5 }}
                  value={values.competeLevel}
                  onChange={handleChange('competeLevel')}
                  onBlur={handleBlur('competeLevel')}
                  placeholder="competeLevel"/>
             </FormControl>
             
             <FormControl type="row">
                <h6>
                  Attitude
                </h6>
                <Slider
                  min={0}
                  max={5}
                  marks={{ 1: 1, 2: 2, 3: 3,4:4,5:5 }}
                  value={values.attitude}
                  onChange={handleChange('attitude')}
                  onBlur={handleBlur('attitude')}
                  placeholder="attitude"/>
             </FormControl>
             </div>
                  }
             
          
             
          
                 
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


Eval.contextType = EvalContext;
Eval.contextType = StudentContext;

export default Eval;
