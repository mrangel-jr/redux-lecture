import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostHeaderContainer from '../containers/PostHeaderContainer';
import OrderBy from '../components/OrderBy';
import { changeCategoryFilter, changeOrderPostsFilter, upVotePost, downVotePost, loadPosts, toggleModalPost, deletePost, isNewPost, setPost} from '../actions';
import { compose } from 'redux';
import { getVisiblePostsOrderedBy } from '../selectors';

class PostsView extends Component {

	componentDidMount() {

		const {loadPosts, changeCategoryFilter, match, categories, history} = this.props;
    
		const checkCategories = categories.filter((category) => {
			if (category.name === match.params.category) {
				return category;
			}
			return;
		});

		if(checkCategories && checkCategories.length){   
			// not empty 
			changeCategoryFilter({category_filter: match.params.category});
			loadPosts(match.params.category);
		} else {
			// empty
			changeCategoryFilter({category_filter: null});
			loadPosts(null);
			history.push('/');
		}
    
	}
  
	render()  {
		const {posts, order_posts_filter, changeOrderPostsFilter} = this.props;
		return (
			<div className="postss">
				<OrderBy value={order_posts_filter}
					options={[
						{name: 'Vote Score', value: 'voteScore'},
						{name: 'Created at', value: 'timestamp'},
						{name: 'Most commented', value: 'commentCount'},
					]}
					onChangeClick={(event) => {changeOrderPostsFilter({order_posts_filter: event.target.value}); }}/>
          
				<div className="posts">
					{posts && posts.map( (post) => (
						<PostHeaderContainer post={post} />
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: getVisiblePostsOrderedBy(state),
		categories: state.categories,
		order_posts_filter: state.order_posts_filter,
		category_filter: state.category_filter,
	};
};

const mapDispatchToProps = {loadPosts, changeCategoryFilter, changeOrderPostsFilter, upVotePost, downVotePost, isNewPost, toggleModalPost, deletePost, setPost};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(PostsView);