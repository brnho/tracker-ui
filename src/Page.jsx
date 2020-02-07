import React from 'react';
import {
	Navbar, Nav, NavItem, NavDropdown, MenuItem, 
	Glyphicon, Tooltip, OverlayTrigger, Grid, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import Search from './Search.jsx';
import UserContext from './UserContext.js';
import SignInNavItem from './SignInNavItem.jsx';

function NavBar({ user, onUserChange }) {
	return(
		<Navbar fluid>
			<Navbar.Header>
				<Navbar.Brand>Issue Tracker</Navbar.Brand>
			</Navbar.Header>
			<Nav>
				<LinkContainer exact to="/">
					<NavItem>Home</NavItem>
				</LinkContainer>
				<LinkContainer to="/issues">
					<NavItem to="/issues">Issues</NavItem>
				</LinkContainer>
				<LinkContainer to="/report">
					<NavItem to="/report">Report</NavItem>
				</LinkContainer>
				<LinkContainer to="/about">
					<NavItem to="/about">About</NavItem>
				</LinkContainer>
			</Nav>
			<Col sm={5}>
				<Navbar.Form>
					<Search />
				</Navbar.Form>
			</Col>
			<Nav pullRight>
				<NavItem>
					<OverlayTrigger
						placement="left"
						delayShow={300}
						overlay={<Tooltip id="create-issue">Create Issue</Tooltip>}
					>
						<Glyphicon glyph="plus" />
					</OverlayTrigger>
				</NavItem>
				<SignInNavItem user={user} onUserChange={onUserChange} />
				<NavDropdown
					id="user-dropdown"
					title={<Glyphicon glyph="option-vertical" />}
					noCaret
				>
					<MenuItem>About</MenuItem>
				</NavDropdown>
			</Nav>
		</Navbar>
	);
}

export default class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: { signedIn: false } };
		this.onUserChange = this.onUserChange.bind(this);
	}

	async componentDidMount() { //check if we're logged in
		const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
		const response = await fetch(`${apiEndpoint}/user`, {
			method: 'POST',
			credentials: 'include',
		});
		const body = await response.text();
		const result = JSON.parse(body);
		const { signedIn, givenName } = result;
		this.setState({ user: { signedIn, givenName } });
	}

	onUserChange(user) {
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<div>
				<NavBar user={user} onUserChange={this.onUserChange} />
				<Grid fluid>
					<UserContext.Provider value={user}>
						<Contents />
					</UserContext.Provider>
				</Grid>
			</div>
		);
	}
}

