import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalComment from '../components/ModalComment';
import Comment from '../components/Comment';
import PostHeaderContainer from '../containers/PostHeaderContainer';
import { deletePost, upVoteComment, downVoteComment, deleteComment, setPost,upVotePost, downVotePost, setComment, toggleModalPost, isNewPost} from '../actions';
import {withRouter} from 'react-router-dom';
import { compose } from 'redux';
import { getVisiblePost } from '../selectors';

class PostView extends Component {

	componentDidMount() {
		const { match, setPost} = this.props;
		setPost(match.params.post_id);
	}

	render()  {
		const {post,setComment, deleteComment} = this.props;

		if ( post === null || post === undefined || post.deleted === true ) {
			return null;
		}
		else {
			return ( 
				<div className="posts"> 
          
					<PostHeaderContainer post={post} />

					<div className="body">
						{post.body}
						<div className="comments">
							<ModalComment parentId={post.id}/>
              
							{post && post.comments && post.comments
								.filter( c => !c.deleted)
								.sort((a, b) => a.voteScore < b.voteScore)
								.map( (comment, index) => (
                
									<Comment key={comment.id}
										comment={comment} 
										onUpClick={(e) => {
											e.preventDefault();
											this.props.upVoteComment({id: comment.id, parentId: comment.parentId} );
										}} 
										onDownClick={(e) => {
											e.preventDefault();
											this.props.downVoteComment({id: comment.id, parentId: comment.parentId} );
										}}
										onEditClick={(e) => {
											e.preventDefault();
											setComment(comment);
										}}
										onDeleteClick={(e) => {
											e.preventDefault();
											deleteComment({id: comment.id, parentId: comment.parentId} );
										}}
									/>
                

								))}
						</div>
					</div>
				</div>
			);
		}
    
	}
}

const mapStateToProps = (state) => {
	return {
		post: getVisiblePost(state),
	};
};

const mapDispatchToProps = {upVoteComment,downVoteComment,deleteComment,deletePost,setPost,toggleModalPost,upVotePost,downVotePost,setComment,isNewPost};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(PostView);