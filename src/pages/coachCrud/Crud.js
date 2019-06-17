import React  from 'react';
import firebase from '../../services/firebase/setup'
import Layout from '../../components/layout'
import {CoachContext} from '../../context/coaches'
import Coach from '../coach'
import styles from './style.module.scss';


class CoachCrud extends React.Component {
   state={
    isOpen: false,
    coachId:null,
    
  }
  


  render() {
   const{coaches}=this.context

    const {
      coachId,
      isOpen
    } = this.state; 
  
     const coach = coaches.find(n => n.id === coachId);
  
      return (
        
            <Layout>
               <div className={styles.buttonFloat}
               onClick={()=> this.setState({isOpen:true , coachId:null})}
              >
              +
              </div>
              
              <div className="container">
             
                 <div className="card" >     
                    <table class="table table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Title</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coaches.map(row =>{
                          return(
                            <tr
                            key={row.id}
                            onClick={() => this.setState({ coachId: row.id,isOpen:true})}
                            >
                              <td>{row.name}</td>
                              <td>{row.title}</td>
                              
                              </tr>
                          )
                        })}
                      </tbody>   
                     </table>
                 </div>     
              </div>
              {isOpen &&
              <Coach
              coach={coach}
              onClose={()=> this.setState({isOpen:false})}
              />
              }
            </Layout>
    );
  }
}


CoachCrud.contextType =CoachContext;

export default CoachCrud;
