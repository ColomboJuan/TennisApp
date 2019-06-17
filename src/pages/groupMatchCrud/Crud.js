import React  from 'react';
import moment  from 'moment';
import Layout from '../../components/layout'
import {MatchContext} from '../../context/matches'
import Match from '../groupMatch'
import styles from './style.module.scss';


class MatchCrud extends React.Component {
   state={
    isOpen: false,
    matchId:null,
    
  }
  


  render() {
   const{matches}=this.context

    const {
      matchId,
      isOpen
    } = this.state; 
  
     const match = matches.find(n => n.id === matchId);
  
      return (
        
            <Layout>
               <div className={styles.buttonFloat}
               onClick={()=> this.setState({isOpen:true , matchId:null})}
              >
              +
              </div>
              
              <div className="container">
             
                 <div className="card" >     
                    <table class="table table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matches.map(row =>{
                          return(
                           
                            <tr
                            key={row.id}
                            onClick={() => this.setState({ matchId: row.id,isOpen:true})}
                            >
                            <td>{row.name}</td>
                            <td>{row.date}</td>
                              </tr>
                          )
                        })}
                      </tbody>   
                     </table>
                 </div>     
              </div>
              {isOpen &&
              <Match
              match={match}
              onClose={()=> this.setState({isOpen:false})}
              />
              }
            </Layout>
    );
  }
}


MatchCrud.contextType =MatchContext;

export default MatchCrud;
