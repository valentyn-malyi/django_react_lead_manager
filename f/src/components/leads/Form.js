import React, {Component} from 'react';
import {connect} from "react-redux"
import Proptypes from "prop-types"
import {addLead} from "../../actions/leads"

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: ""
        };


        this.onChange = e => {
            this.setState({
                [e.target.name]: e.target.value
            });
        };


        this.onSubmit = e => {
            e.preventDefault();
            const {name, email, message} = this.state;
            const lead = {name, email, message};
            this.props.addLead(lead);
            this.setState({
                name: "",
                email: "",
                message: ""
            })
        }
    }

    render() {
        const {name, email, message} = this.state;
        return <div className="card card-body">
            <h2>
                Add Lead
            </h2>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" onChange={this.onChange} value={name}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="email" name="email" onChange={this.onChange}
                           value={email}/>
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <input className="form-control" type="text" name="message" onChange={this.onChange}
                           value={message}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    }
}

Form.propTypes = {
    addLead: Proptypes.func.isRequired
};

export default connect(null, {addLead})(Form)