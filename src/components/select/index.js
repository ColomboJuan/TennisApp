import React from 'react';

class Select extends React.Component {
    state={
        isOpen:false
    }
    render() {
        const {
            options,
            value,
            onChange,
            onBlur,
            placeholder,
        } = this.props;

        const{
            isOpen
        }=this.state
        

       return (
           <div className="container">
             <input 
             className="form-control"
             placeholder={placeholder}
            type="text"
            value={value}
            onChange={()=>{}}
            onClick={()=> this.setState({isOpen : !isOpen})}
             >
             
             </input>
             {isOpen &&
             <ul className="list-group">
             {options.map(option=>
             <li 
             className="list-group-item"
             key={option.value}
             onClick={(e)=>{
                 onChange(option.value);
                 onBlur(e)
                 this.setState({isOpen:false})
             }
             
             }>
                 {option.label}
             </li>
                )}
            </ul>
            }
           </div>
       );
    };
}


export default Select;