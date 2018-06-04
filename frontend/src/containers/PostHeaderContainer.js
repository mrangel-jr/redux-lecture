import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostHeader from '../components/PostHeader';
import { upVotePost, downVotePost, toggleModalPost, deletePost, isNewPost, setPost} from '../actions';
import { compose } from 'redux';


class PostHeaderContainer extends Component {

	render()  {
		const {user, post,  upVotePost, downVotePost, history, isNewPost, deletePost, toggleModalPost, setPost} = this.props;
		return (
			<PostHeader   
				post={post}  
				user={user}     
				onDeleteClick={(e) => {   
					e.preventDefault();   
					deletePost({id: post.id} );    
					history.push('/');   
				}}    
				onEditClick={(e) => {   
					e.preventDefault();   
					setPost(post.id);    
					isNewPost(false);    
					toggleModalPost();   
				}}    
				onUpClick={(e) => {   
					e.preventDefault();    
					upVotePost({id: post.id} );    
				}}    
				onDownClick={(e) => {   
					e.preventDefault();    
					downVotePost({id: post.id} );    
				}}    
			/>
          
		);
	}
}

const mapStateToProps = (state) => {
	return {
		favorites: state.favorites,
		user: state.user
	};
};

const mapDispatchToProps = { upVotePost, downVotePost, isNewPost, toggleModalPost, deletePost, setPost};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(PostHeaderContainer);
