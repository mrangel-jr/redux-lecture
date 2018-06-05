import * as ReadApi from '../utils/api';

//Extras
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE';
export const REMOVE_FROM_READING_LIST = 'REMOVE_FROM_READING_LIST';
export const FAVORITE = 'FAVORITE';
export const READING_LIST = 'READING_LIST';
export const LOAD_FAVORITE = 'LOAD_FAVORITE';
export const LOAD_READING_LIST = 'LOAD_READING_LIST';
export const RESET_FAVORITE = 'RESET_FAVORITE';
export const RESET_READING_LIST = 'RESET_READING_LIST';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const CHANGE_CATEGORY_FILTER = 'CHANGE_CATEGORY_FILTER';
export const CHANGE_ORDER_POSTS_FILTER = 'CHANGE_ORDER_POSTS_FILTER';

//posts
export const ADD_POST = 'ADD_POST'; 
export const UPDATE_POST = 'UPDATE_POST'; 
export const DELETE_POST = 'DELETE_POST'; 
export const LOAD_POSTS = 'LOAD_POSTS';
export const SET_POST = 'SET_POST';
export const IS_NEW_POST = 'IS_NEW_POST';
export const TOGGLE_MODAL_POST = 'TOGGLE_MODAL_POST'; 

//categories
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
//comments
export const SET_COMMENT = 'SET_COMMENT'; 
export const RESET_COMMENT = 'RESET_COMMENT'; 
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT'; 
export const TOGGLE_MODAL_COMMENT = 'TOGGLE_MODAL_COMMENT';

//votes
export const SET_VOTE = 'SET_VOTE'; //id
export const SET_VOTE_COMMENT = 'SET_VOTE_COMMENT'; //id

export const resetErrorMessage = () => ({
	type: RESET_ERROR_MESSAGE
});

export function changeCategoryFilter({ category_filter }) {
	return {
		type: CHANGE_CATEGORY_FILTER,
		category_filter,
	};
}

export function changeOrderPostsFilter({ order_posts_filter }) {
	return {
		type: CHANGE_ORDER_POSTS_FILTER,
		order_posts_filter,
	};
}

//posts
export function addPost (post) {
	const { id, timestamp, title, body, author, category, voteScore, commentCount, comments } = post;
	return dispatch => {
		ReadApi.addPost(id, timestamp, title, body, author, category, voteScore, commentCount, comments)
			.then(() => {
				dispatch( {
					type: ADD_POST,
					id,
					timestamp,
					title,
					body,
					author,
					category,
					voteScore,
					commentCount,
					comments
				});
				dispatch({ type: TOGGLE_MODAL_POST});
			})
			.catch(error => {
				alert(error);
			});
	};
  
}

export function updatePost ({ id, title, body}) {
	return dispatch => {
		ReadApi.updatePost(id, title, body)
			.then(() => {
				dispatch({ type: UPDATE_POST, id, body, title});
				dispatch({ type: TOGGLE_MODAL_POST});
			});
	};
}

export function deletePost ({ id }) {
	return dispatch => {
		ReadApi.deletePost(id)
			.then(() => {
				dispatch({ type: DELETE_POST, id});
				dispatch({ type: REMOVE_FROM_FAVORITE, id });
				dispatch({ type: REMOVE_FROM_READING_LIST, id });
			});
	};
}

export const toggleModalPost = () => ({
	type: TOGGLE_MODAL_POST
});
export const isNewPost = (isNewPost) => ({
	type: IS_NEW_POST, isNewPost
});


export function setComment(comment) {
	return dispatch => {
		dispatch({ type: SET_COMMENT, comment});
		dispatch({ type: TOGGLE_MODAL_COMMENT});
	};
}

export function resetComment() {
	return dispatch => {
		dispatch({ type: RESET_COMMENT});
	};
}

export function addComment ({ id, body, author, parentId, voteScore, deleted, parentDeleted }) {
	return dispatch => {
		ReadApi.addComment(id, body, author, parentId)
			.then(() => {
				dispatch({ 
					type: ADD_COMMENT, 
					id, 
					body, 
					author, 
					parentId,
					voteScore,
					deleted,
					parentDeleted
				});
			});
	};
}

export function updateComment ({ id, body, author, parentId}) {
	return dispatch => {
		ReadApi.updateComment(id, body, author)
			.then(() => {
				dispatch({ 
					type: UPDATE_COMMENT, 
					id, 
					body, 
					author,
					parentId
				});
			});
	};
}

export function deleteComment ({ id , parentId}) {
	return dispatch => {
		ReadApi.deleteComment(id)
			.then(() => {
				dispatch({ type: DELETE_COMMENT, id, parentId});
			});
	};
}


export function upVotePost({ id }) {
	return dispatch => {
		ReadApi.votePost( id, 'upVote')
			.then(data => {
				dispatch({ type: SET_VOTE, id: data.id, voteScore: data.voteScore});
			});
	};
}

export function downVotePost({ id }) {
	return dispatch => {
		ReadApi.votePost( id, 'downVote')
			.then(data => {
				dispatch({ type: SET_VOTE, id: data.id, voteScore: data.voteScore});
			});
	};
}

export function upVoteComment({ id, parentId }) {
	return dispatch => {
		ReadApi.voteComment( id, 'upVote')
			.then(data => {
				dispatch({ type: SET_VOTE_COMMENT, id, parentId, voteScore: data.voteScore});
			});
	};
}

export function downVoteComment({ id, parentId }) {
	return dispatch => {
		ReadApi.voteComment( id, 'downVote')
			.then(data => {
				dispatch({ type: SET_VOTE_COMMENT, id, parentId, voteScore: data.voteScore});
			});
	};
}


export function loadCategories() {
	return dispatch => {
		ReadApi.categories().then(categories =>
			dispatch({ type: LOAD_CATEGORIES, categories })
		);
	};
}

export function setPost(id) {
	return dispatch => {
		ReadApi.post(id)
			.then(post => {
				if (post.id !== undefined ) {
					ReadApi.comments(post.id)
						.then(comments => {
							if (comments) 
								post.comments = comments; 
							else 
								post.comments = [];
						})
						.then(() => dispatch({ type: SET_POST, post }));  
				}
			});
       
	};
}

export function loadPosts(category) {
	if (category === null || category === undefined) {
		return dispatch => {
			ReadApi.posts().then(posts =>
				dispatch({ type: LOAD_POSTS, posts })
			);
		};
	}
	else if (category === 'favorites' || category === 'reading-list') {
		return dispatch => {
			ReadApi.posts().then(posts =>
				dispatch({ type: LOAD_POSTS, posts })
			);
		};
	}
	else {
		return dispatch => {
			ReadApi.postsBy(category).then(posts =>
				dispatch({ type: LOAD_POSTS, posts })
			);
		};
	}
    
}
