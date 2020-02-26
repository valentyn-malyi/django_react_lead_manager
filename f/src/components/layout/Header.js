import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {logout} from "../../actions/auth";


class Header extends Component {
    render() {
        const {user, isAuthenticated} = this.props.auth;
        const authLink = <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <span className="navbar-text mr-3">
                <strong>
                    {user ? `Welcome ${user.username}` : ""}
                </strong>
            </span>
            <li className="nav-item" onClick={this.props.logout}>
                <button className="btn btn-danger nav-link">Logout</button>
            </li>
        </ul>;

        const guestLink = <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </li>
        </ul>;

        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse"/>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Lead Manager</a>
                </div>
                {isAuthenticated ? authLink : guestLink}
            </nav>
        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Header)