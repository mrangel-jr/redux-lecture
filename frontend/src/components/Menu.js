import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

	render()  {
		const { children, active, to, onClick } = this.props;
    
		if (active) {
			return <span className="menu active">{children}</span>;
		}
		else {
			return (
				<Link to={to} className="menu" onClick={onClick} >{children}</Link>
			);
		}
	}
}

export default Menu;