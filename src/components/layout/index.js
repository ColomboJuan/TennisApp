import React from 'react';
import { Link} from 'react-router-dom'
class Layout extends React.Component {
    render() {
        const {
            children,
        } = this.props;
       

       return (
        <React.Fragment>
        <div className="navbar navbar-ligth bg-primary">
        <Link className="text-white" to="/App">Tennis App  </Link>
        <div >
        <Link  className="text-white mr-sm-3"  to="/App">{this.context.user && this.context.user.name}</Link>
       </div>
      </div>
      <div className="Container p-3">
      {children}
      </div>
      </React.Fragment>
       )
    }
}


export default Layout;