import React  from 'react';
import firebase from '../../services/firebase/setup'
import Layout from '../../components/layout'
import {GroupContext} from '../../context/groups'
import Group from '../group'
import styles from './style.module.scss';


class GroupCrud extends React.Component {
   state={
    isOpen: false,
    groupId:null,
    
  }
  


  render() {
   const{groups}=this.context

    const {
      groupId,
      isOpen
    } = this.state; 
  
     const group = groups.find(n => n.id === groupId);
  
      return (
        
            <Layout>
               <div className={styles.buttonFloat}
               onClick={()=> this.setState({isOpen:true , groupId:null})}
              >
              +
              </div>
              
              <div className="container">
             
                 <div className="card" >     
                    <table class="table table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Coach</th>
                          <th scope="col">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groups.map(row =>{
                          return(
                            <tr
                            key={row.id}
                            onClick={() => this.setState({ groupId: row.id,isOpen:true})}
                            >
                              <td>{row.name}</td>
                              <td>{row.coach}</td>
                              <td>{row.description}</td>
                              </tr>
                          )
                        })}
                      </tbody>   
                     </table>
                 </div>     
              </div>
              {isOpen &&
              <Group
              group={group}
              onClose={()=> this.setState({isOpen:false})}
              />
              }
            </Layout>
    );
  }
}


GroupCrud.contextType =GroupContext;

export default GroupCrud;
