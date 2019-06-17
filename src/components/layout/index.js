import React from 'react';
import firebase from '../../services/firebase/setup'
import ButtonAppBar from '../appBar'
class Layout extends React.Component {

  
   
      render() {
        const {
            children,
        } = this.props;
       
    return (
        <React.Fragment>
            <ButtonAppBar />
            <div className="Container p-3">
                {children}
            </div>
      </React.Fragment>
       )
    }
}



export default Layout;