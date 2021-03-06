import React, { Component } from 'react'
import BabyApiService from '../../Services/baby-api-service'
import HamburgerContext from '../../Contexts/HamburgerContext'
import { Link } from 'react-router-dom'

class EditProfile extends Component {

    static contextType = HamburgerContext

    state = {
        error: null,
    }

    handleUpdateProfile = ev => {
        ev.preventDefault()
        this.setState({ error: null })        
        const { name, age, format, country, about } = ev.target
        
        BabyApiService.updateBaby({
            id: this.context.baby.id,
            baby_name: name.value,
            age: age.value,
            age_format: format.value,
            country: country.value,
            about: about.value
        }) 
            .then(res => {
                name.value = ''
                about.value = ''
                this.props.onSubmitForm()
            })    
    }

    render() {
        const { error } = this.state
        const { baby } = this.context
        
        return  <form 
                    id="edit-form"
                    onSubmit={this.handleUpdateProfile}
                >
                    <div role='alert'>{error && <p className='error'>{error}</p>}</div>
                    <div className="editFormItems">
                        <label className="edit-form-label">Name</label>
                    </div>
                    <div className="editFormItems">
                        <input 
                            id="editname"
                            aria-label="name"
                            className="edit-input"
                            type="text"
                            name="name" 
                            required 
                            defaultValue={baby.baby_name}
                        />
                    </div>
                    <div className="form-items">
                        <label className='edit-form-label'>Age</label>
                    </div>
                    <div className="form-items">
                        <input 
                            id="editage"
                            aria-label="age"
                            className="edit-input"
                            type="number"
                            min='1'
                            name="age" 
                            required
                            defaultValue={baby.age}
                        />
                    </div>
                    <div className="form-items">
                        <select 
                            id="editformat"
                            aria-label="format"
                            name="format" 
                            className="month-year selector" 
                            defaultValue={baby.age_format} >
                            <option>month</option>
                            <option>months</option>
                            <option>year</option>
                            <option>years</option>
                        </select>
                    </div>
                    <div className="form-items">
                        <label className='create-form-label'>Country</label>
                    </div>
                    <div className="form-items">
                        <input
                            aria-label="country"
                            id="country" 
                            name="country" 
                            className="edit-input"
                            required
                            defaultValue={baby.country}
                        />
                    </div>
                    <div className="editFormItems">
                        <label className="edit-form-label">About</label>
                    </div>
                    <div className="editFormItems">
                        <textarea 
                            aria-label="about"
                            className="width-100 edit-about"
                            name="about" 
                            rows="10" 
                            id="editabout"
                            defaultValue={baby.about}
                        />
                    </div>
                    <div className="editFormButtons" id="cancel-submit-buttons">
                        <button className="edit-buttons cancel-button" type="click">
                            <Link id="cancel-button" to={`/profile/${baby.id}`}>Cancel</Link>
                        </button>
                        <button id="edit-submit" className="edit-buttons submit-button" type="submit">Submit</button>
                    </div>
                </form>
    }
}

export default EditProfile;
