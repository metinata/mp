import React, { Component } from 'react'
import moment from 'moment'
import { Field, FieldArray, reduxForm, change, arrayPush, reset } from 'redux-form'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import InputMask from 'react-input-mask';

let renderField = ({ input, label, type, placeholder, meta: { touched, error, pristine } }) =>
    <div className='form-control'>
        <label>{label}</label>
        <div className={`input ${touched && error ? 'error' : ''} ${!pristine && !error ? 'success' : ''}`}>
            <input type={type} placeholder={placeholder} {...input} />
        </div>
    </div>
let renderInputMask = ({ input, label, type, placeholder, mask, maskChar, meta: { touched, error, pristine } }) =>
    <div className='form-control'>
        <label>{label}</label>
        <div className={`input ${touched && error ? 'error' : ''} ${!pristine && !error ? 'success' : ''}`}>
            <InputMask {...input} mask={mask} maskChar={maskChar} placeholder={placeholder} />
        </div>
    </div>
let renderDatePicker = ({ input, label, type, placeholder, meta: { touched, error, pristine } }) =>
    <div className='form-control'>
        <label>{label}</label>
        <div className={`input ${touched && error ? 'error' : ''} ${!pristine && !error ? 'success' : ''}`}>
            <DayPickerInput placeholder={placeholder} format='DD/MM/YYYY' {...input} />
        </div>
    </div>
let renderTextarea = ({ input, label, type, placeholder, maxLength, meta: { touched, error, pristine } }) =>
    <div className='form-control'>
        <label>{label}</label>
        <div className={`input border-only ${touched && error ? 'error' : ''} ${!pristine && !error ? 'success' : ''}`}>
            <textarea cols='10' rows='10' maxLength={maxLength} {...input} placeholder={placeholder}></textarea>
        </div>
    </div>
let renderSelect = ({ input, label, type, placeholder, children, meta: { touched, error, pristine } }) =>
    <div className='form-control'>
        <label>{label}</label>
        <div className={`input border-only ${touched && error ? 'error' : ''} ${!pristine && !error ? 'success' : ''}`}>
            <select {...input}>
                {children}
            </select>
        </div>
    </div>



let renderChildren = ({ fields, meta: { error, submitFailed } }) =>
    <div>
        {fields.map((child, index) =>
            <div key={index} className='nest-block'>
                <div className='control'>
                    <Field name={`${child}.name`} type='text' component={renderField} label='Name' placeholder='Name' />
                </div>
                <div className='control'>
                    <Field name={`${child}.birth`} type='text' component={renderDatePicker} label='Birth Date' placeholder='Birth Date' />
                </div>
                <div className='control'>
                    <Field name={`${child}.gender`} component={renderSelect} label='Gender'>
                        <option value=''>Choose</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </Field>
                </div>
                <div className='control'>
                    <div className='form-control'>
                        <button type='button' onClick={() => { fields.push() }}>ADD CHILD</button>
                    </div>
                </div>
            </div>
        )}
    </div>
let renderChildrenBe = ({ fields, meta: { error, submitFailed } }) =>
    <div>
        {fields.map((child, index) =>
            <div key={index} className='nest-block'>
                <div className='control'>
                    <Field name={`${child}.name`} type='text' component={renderField} label='Name' placeholder='Name' />
                </div>
                <div className='control'>
                    <Field name={`${child}.gender`} component={renderSelect} label='Gender'>
                        <option value=''>Choose</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </Field>
                </div>
                <div className='control'>
                    <div className='form-control'>
                        <button type='button' onClick={() => { fields.push() }}>ADD CHILD</button>
                    </div>
                </div>
            </div>
        )}
    </div>


const status = {
    parent: 'parent',
    parentToBe: 'parentToBe',
    other: 'other'
}

class CompetitionForm extends Component {
    constructor(props) {
        super(props);
        this.state = { status: status.parent };
        this.statusChange = this.statusChange.bind(this);
        this.addChild = this.addChild.bind(this);
        this.resetChildren = this.resetChildren.bind(this);
    }
    addChild(child) {
        this.props.dispatch(arrayPush('competition', 'child', child));
    }
    resetChildren() {
        this.props.dispatch(change('competition', 'child', null));
    }
    statusChange(e) {
        this.resetChildren();
        switch (e.target.value) {
            case status.parent:
                this.setState({ status: status.parent }, () => { this.addChild({ name: null, birth: null, gender: null }) });
                break;
            case status.parentToBe:
                this.setState({ status: status.parentToBe }, () => { this.addChild({ name: null, gender: null }) });
                break;
            default:
                this.setState({ status: status.other });
        }
    }
    componentWillMount() {
        this.addChild({ name: null, birth: null, gender: null });
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <form id='competition' className='competition' autoComplete='off' noValidate onSubmit={handleSubmit}>
                <div className='step-head'>
                    SHARE YOUR TOP TIP
                    <span>To make parenting a little easier...</span>
                </div>
                <div className='form-group col2'>
                    <Field name='email' type='email' component={renderField} label='Email Address *' placeholder='Email Address' />
                    <Field name='mobile' type='text' component={renderInputMask} mask='+999 999 99 99 99' maskChar='_' label='Mobile *' placeholder='Mobile' />
                </div>
                <div className='form-group'>
                    <div className='form-control inline'>
                        <span>I am a</span>
                        <label>
                            <Field name='status' onChange={this.statusChange} component='input' type='radio' value='parent' checked={this.state.status == status.parent} /> Parent
                        </label>
                        <label>
                            <Field name='status' onChange={this.statusChange} component='input' type='radio' value='parentToBe' checked={this.state.status == status.parentToBe} /> Parent to be
                        </label>
                        <label>
                            <Field name='status' onChange={this.statusChange} component='input' type='radio' value='other' checked={this.state.status == status.other} /> other
                        </label>
                    </div>
                    {
                        this.state.status != status.other ?
                            <div className={`nested-control ${this.state.status}`}>
                                <FieldArray name='child' component={this.state.status == status.parent ? renderChildren : renderChildrenBe} />
                            </div>
                            :
                            ''
                    }
                </div>
                <div className='form-group'>
                    <Field name='tip' type='textarea' component={renderTextarea} maxLength='200' label='Share with us your top tip' placeholder='Tell us in 200 words...' />
                </div>
                <button type='submit' disabled={submitting}>PROCEED TO NEXT STEP</button>
            </form>
        )
    }
}
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? false : true;
const phone = p => p && !isNaN(p.replace('+','').replace(/ /g,'')) && p.replace('+','').replace(/ /g,'').length == 12;
const maxLength = (max, value) => value && value.length <= max ? true : false;
const isValidDate = (s) => moment(s, 'DD/MM/YYYY',true).isValid();

const validate = values => {
    const errors = {}
    if (!values.email || !email(values.email)) {
        errors.email = 'Required'
    }
    if (!values.mobile || !phone(values.mobile)) {
        errors.mobile = 'Required'
    }
    const childArrayErrors = [];
    if (values.child) {
        values.child.forEach((child, childIndex) => {
            const childErrors = {}
            if (!child || !child.name) {
                childErrors.name = 'Required'
                childArrayErrors[childIndex] = childErrors
            }
            if (!child || (child && !child.birth) || (child.birth && !isValidDate(child.birth))) {
                console.log(child.birth);
                childErrors.birth = 'Required'
                childArrayErrors[childIndex] = childErrors
            }
            if (!child || !child.gender) {
                childErrors.gender = 'Required'
                childArrayErrors[childIndex] = childErrors
            }
        })
        if (childArrayErrors.length) {
            errors.child = childArrayErrors
        }
    }
    if (!values.tip || !maxLength(200, values.tip)) {
        errors.tip = 'Required'
    }
    return errors
}

export default reduxForm({
    form: 'competition',
    validate,
    initialValues: {
        status: status.parent
    }
})(CompetitionForm)