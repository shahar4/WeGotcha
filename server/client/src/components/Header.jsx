import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.activeUser) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google"> Log in With Google </a></li>;
            default:
                return <li><a href="/api/logout"> Logout </a></li>;
        }
    }
    render () {
        return (
            <nav>
                <div className="nav-wrapper" style={{ backgroundColor:'#C4D8E2'}}>
                    <Link
                        to={this.props.activeUser ? '/chooseHat' : '/'}
                        className="left brand-logo">
                        SmArtOH
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ activeUser }) {
    return { activeUser };
}

export default connect(mapStateToProps, null)(Header);