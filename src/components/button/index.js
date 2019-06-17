import React  from 'react';

const Button = (props) =>{
    const{
        type,
        onClick,
        label,
        disabled
      }=props
        

  return(
      <div
      className={`btn btn-${type} p-10`}
      isDisabled={`${disabled}`}
      onClick={e => !disabled && onClick(e)}
      >
      {label}

      </div>
  )
}

Button.defaultProps ={
type:'primary',

} 

export default Button;
