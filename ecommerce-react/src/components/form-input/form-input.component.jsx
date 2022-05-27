import './form-input.styles.scss'

// {...otherProps} is a spread, passes through all key/values in the object
const FormInput = ({label, ...otherProps}) =>{
    return (
        <div className="group">
        <input className="form-input" {...otherProps} />
            {
                // if label exists then render the label, else do nothing
                label && 
                <label className={`${otherProps.value.length > 0 ? 'shrink' :  ''} form-input-label`}>{label}</label>
            }
        </div>
    )
}

export default FormInput