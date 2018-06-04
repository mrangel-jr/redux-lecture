import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const favorites = (state = [], action) => {
    
	switch(action.type) {
	case ActionTypes.FAVORITE: {//id, timestamp, title, body, author, category
		const ids = state.map( favorite => { return favorite.id; });
		const index = action && action.post && ids.indexOf(action.post.id);
		if (index > -1) {
			return [
				...state.slice(0, index),
				...state.slice(index + 1)
			];
		}
		else {
			return [
				...state,
				action.post
			];
		}
	}

	case ActionTypes.REMOVE_FROM_FAVORITE: { //id
		const ids = state.map( favorite => { return favorite.id; });
		const index = action && action.post && ids.indexOf(action.post.id);
		return [
			...state.slice(0, index),
			...state.slice(index + 1)
		];
	}

	case ActionTypes.LOAD_FAVORITE: //id
		return action.favorites ? action.favorites : state;
        
	case ActionTypes.RESET_FAVORITE: //id
		return [];
        
	default: 
		return state;
	}
};

const readingLater = (state = [], action) => {
	switch(action.type) {
	case ActionTypes.READING_LIST: { //id, timestamp, title, body, author, category
		const ids = state.map( reading_post => { return reading_post.id; });
		const index = action && action.post && ids.indexOf(action.post.id);
    
		if (index > -1) {
			return [
				...state.slice(0, index),
				...state.slice(index + 1)
			];
		}
		else {
			return [
				...state,
				action.post
			];
		}
	}

	case ActionTypes.REMOVE_FROM_READING_LIST: {
		const ids = state.map( reading_post => { return reading_post.id; });
		const index = action && action.post && ids.indexOf(action.post.id);
    
		return [
			...state.slice(0, index),
			...state.slice(index + 1)
		];
	}

	case ActionTypes.LOAD_READING_LIST:
		return action.readingList ? action.readingList : state;
        
	case ActionTypes.RESET_READING_LIST:
		return [];
	default: 
		return state;
	}
};

const errorMessage = (state = null, action) => {
	const { type, error } = action;

	if (type === ActionTypes.RESET_ERROR_MESSAGE) {
		return null;
	} else if (error) {
		return error;
	}

	return state;
};

const category_filter = (state = null, action) => {
	const { type, category_filter } = action;
	if (type === ActionTypes.CHANGE_CATEGORY_FILTER) {
		return category_filter !== undefined ? category_filter : state;
	} 
  
	if (type === ActionTypes.SET_POST) {
		return '';
	} 
  
	return state;
};

const categories = (state = [], action) => {
	const { type, categories } = action;
	if (type === ActionTypes.LOAD_CATEGORIES) {
		return categories;
	} 
	return state;
};

const order_posts_filter = (state = 'voteScore', action) => {
	const { type, order_posts_filter } = action;
	if (type === ActionTypes.CHANGE_ORDER_POSTS_FILTER) {
		return order_posts_filter;
	} 
	return state;
};

const comment = (state = null, action) => {
  
	switch(action.type) {
	case ActionTypes.RESET_COMMENT:
		return null;
	case ActionTypes.SET_COMMENT:
		return action.comment;
	case ActionTypes.SET_POST:
		return null;
	case ActionTypes.LOAD_POSTS:
		return null;
	default: 
		return state;
	}
};

const hidden_modal_post = (state = true, action) => {
	switch(action.type) {
	case ActionTypes.TOGGLE_MODAL_POST:
		return !state;
	default: 
		return state;
	}
};

const hidden_modal_comment = (state = true, action) => {
  
	switch(action.type) {
	case ActionTypes.TOGGLE_MODAL_COMMENT:
		return !state;
	default: 
		return state;
	}
};

const isNewPost = (state = false, action) => {
  
	switch(action.type) {
	case ActionTypes.IS_NEW_POST:
		return action.isNewPost;
	case ActionTypes.SET_POST:
		return false;
	default: 
		return state;
	}
};


const post = (state = null, action) => {
  
	switch(action.type) {

	case ActionTypes.SET_POST:
		return action.post;

	case ActionTypes.LOAD_POSTS:
		return null;

	case ActionTypes.SET_VOTE:
		if (state && state.id && state.id !== action.id) {
			return state;
		}
		return {
			...state,
			voteScore: action.voteScore
		};

	case ActionTypes.FAVORITE:
		if (state && state.id !== action.post.id) {
			return state;
		}

		return {
			...state,
			favorite: state && state.favorite ? true : !post.favorite
		};
    
	case ActionTypes.READING_LIST:
		if (state && state.id !== action.post.id) {
			return state;
		}

		return {
			...state,
			favorite: state && state.reading ? true : !post.reading
		};

	case ActionTypes.SET_VOTE_COMMENT:
      
		if (state.id !== action.parentId) {
			return post;
		}

		return {
			...state,
			comments: state.comments.map(comment => {
				if (comment.id !== action.id) {
					return comment;
				}

				return {
					...comment,
					voteScore: action.voteScore
				};
			})
		};
      
	case ActionTypes.DELETE_COMMENT: //id
       
		if (state.id !== action.parentId) {
			return state;
		}
		return {
			...state,
			commentCount: state.commentCount - 1,
			comments: state.comments.map(comment => {
				if (comment.id !== action.id) {
					return comment;
				}
				return {
					...comment,
					deleted: true
				};
			})
		};

	case ActionTypes.ADD_COMMENT: //id
       
		if (state.id !== action.parentId) {
			return post;
		}
		return {
			...state,
			commentCount: state.commentCount + 1,
			comments: state.comments && [
				...state.comments,
				{
					id: action.id,
					timestamp: action.timestamp,
					body: action.body,
					author: action.author,
					parentId: action.parentId,
					voteScore: action.voteScore,
					deleted: action.deleted,
					parentDeleted: action.parentDeleted,
				}
			]
		};

	case ActionTypes.UPDATE_COMMENT: //id
      
		if (state.id !== action.parentId) {
			return post;
		}
		return {
			...state,
			comments: state.comments.map(comment => {
				if (comment.id !== action.id) {
					return comment;
				}

				return {
					...comment,
					author: action.author,
					body: action.body,
				};
			})
		};

	case ActionTypes.UPDATE_POST:
		const {title, body} = action;
		if (state.id !== action.id) {
			return post;
		}

		return {
			...state,
			title,
			body
		};

	default: 
		return state;
	}
};

const posts = (state = [], action) => {
	switch(action.type) {
     

	case ActionTypes.LOAD_POSTS:
		return action.posts;
    
	case ActionTypes.ADD_POST:
		return [
			...state,
			{
				id: action.id,
				timestamp: action.timestamp,
				title: action.title,
				body: action.body,
				author: action.author,
				category: action.category,
				commentCount: 0,
				voteScore: 1,
				comments: []
			}
		];

	case ActionTypes.UPDATE_POST:
		return state.map(post => {
			const {title, body} = action;
			if (post.id !== action.id) {
				return post;
			}

			return {
				...post,
				title,
				body
			};
		});
    
	case ActionTypes.DELETE_POST:
		return state.map(post => {
			if (post.id !== action.id) {
				return post;
			}

			return {
				...post,
				deleted: true,
				comments: post.comments && 
        post.comments.map(comment => {
        	return {
        		...comment,
        		parentDeleted: true
        	};
        })
			};
		});

	case ActionTypes.ADD_COMMENT:
		return state.map(post => {
			if (post.id !== action.parentId) {
				return post;
			}
			return {
				...post,
				commentCount: post.commentCount + 1
			};
		});

	case ActionTypes.DELETE_COMMENT: //id
		return state.map(post => {
        
			if (post.id !== action.parentId) {
				return post;
			}

			return {
				...post,
				commentCount: post.commentCount - 1
			};
		});


	case ActionTypes.FAVORITE:
		return state.map(post => {
        
			if (post.id !== action.id) {
				return post;
			}

			return {
				...post,
				favorite: post.favorite ? true : !post.favorite
			};
		});

	case ActionTypes.READING_LIST:
		return state.map(post => {
        
			if (post.id !== action.id) {
				return post;
			}

			return {
				...post,
				favorite: post.reading ? true : !post.reading
			};
		});

	case ActionTypes.SET_VOTE: //id
		return state.map(post => {

			if (post.id !== action.id) {
				return post;
			}
			return {
				...post,
				voteScore: action.voteScore
			};
		});

	default: 
		return state;
	}
};


const rootReducer = combineReducers({
	errorMessage, 
	category_filter, 
	categories,
	order_posts_filter,
	posts,
	post,
	comment,
	hidden_modal_post,
	hidden_modal_comment,
	isNewPost,
	favorites,
	readingLater,
	form: formReducer
});

export default rootReducer;