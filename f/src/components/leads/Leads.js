import React, {Component, Fragment} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getLeads, deleteLead} from "../../actions/leads"

class Leads extends Component {

    componentDidMount() {
        this.props.getLeads()
    }

    render() {
        return <Fragment>
            <h2>Leads</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {this.props.leads.map(lead =>
                    <tr key={lead.id}>
                        <td>{lead.name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.message}</td>
                        <td>
                            <button
                                className="button badge-danger"
                                onClick={this.props.deleteLead.bind(this,lead.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </Fragment>
    }
}

Leads.propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    leads: state.leads.leads
});

export default connect(mapStateToProps, {getLeads, deleteLead})(Leads);