import React, { Component } from 'react';
import { changeCategoryFilter, loadPosts } from '../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Menu from '../components/Menu';
import { withRouter } from 'react-router-dom';

class CategoryMenu extends Component {

	render()  {
		const {filter, category_filter, changeCategoryFilter, loadPosts, history} = this.props;
    
		if (filter === category_filter) {
			return <span className="menu active">{filter}</span>;
		}
		else {
			return (
				<Menu to={`/${filter}`} ative={filter === category_filter} 
					onClick={(e) => {
						e.preventDefault();
						changeCategoryFilter({category_filter: filter});
						loadPosts(filter);
						history.push(`/${filter}`);
					}}
				>
					{filter}
				</Menu>
			);
		}
  
	}
}

const mapStateToProps = (state) => {
	return {
		category_filter: state.category_filter,
	};
};

const mapDispatchToProps = { changeCategoryFilter, loadPosts };

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(CategoryMenu);
