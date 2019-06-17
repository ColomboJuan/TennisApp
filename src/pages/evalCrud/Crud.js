import React  from 'react';
import moment  from 'moment';
import firebase from '../../services/firebase/setup'
import Layout from '../../components/layout'
import {EvalContext} from '../../context/evals'
import Eval from '../eval'
import styles from './style.module.scss';


class EvalCrud extends React.Component {
   state={
    isOpen: false,
    evalId:null,
    
  }
  


  render() {
   const{evaluations}=this.context

    const {
      evalId,
      isOpen
    } = this.state; 
  
     const evaluation = evaluations.find(n => n.id === evalId);
  
      return (
        
            <Layout>
               <div className={styles.buttonFloat}
               onClick={()=> this.setState({isOpen:true , evalId:null})}
              >
              +
              </div>
              
              <div className="container">
             
                 <div className="card" >     
                    <table class="table table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Student</th>
                          <th scope="col">Assistence</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {evaluations.map(row =>{
                          return(
                           
                            <tr
                            key={row.id}
                            onClick={() => this.setState({ evalId: row.id,isOpen:true})}
                            >
                              <td>{row.student}</td>
                              <td>{row.assistance ? "Asistio" : "No Asitio" }</td>

                              <td>{moment(row.date).format('DD-MM-YYYY')}</td>
                              </tr>
                          )
                        })}
                      </tbody>   
                     </table>
                 </div>     
              </div>
              {isOpen &&
              <Eval
              evaluation={evaluation}
              onClose={()=> this.setState({isOpen:false})}
              />
              }
            </Layout>
    );
  }
}


EvalCrud.contextType =EvalContext;

export default EvalCrud;
