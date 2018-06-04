import { createSelector } from 'reselect';

const getCategoryFilter = (state) => state.category_filter;
const getOrderByFilter = (state) => state.order_posts_filter;
const getPosts = (state) => state.posts;
const getPost = (state) => state.post;
const getFavorites = (state) => state.favorites;
const getReadingList = (state) => state.readingLater;

export const getVisiblePosts = createSelector(
	[ getPosts, getFavorites, getReadingList, getCategoryFilter],
	( posts, favorites, readingList, category_filter) => {
		const idsFavorites = favorites && favorites.map(p => {return p.id;});
		const idsReading = readingList && readingList.map(p => {return p.id;});

		if (category_filter === 'favorites') {
			return favorites.map(p => { return { ...p, favorite: true, reading: idsReading.indexOf(p.id) > -1 };});
		}
		if (category_filter === 'reading-list') {
			return readingList.map(p => { return { ...p, favorite: idsFavorites.indexOf(p.id) > -1 , reading: true };});
		}
    
		return posts.filter((post) => !post.deleted).map(p => { return {
			...p, 
			favorite: idsFavorites && idsFavorites.indexOf(p.id) > -1 ,
			reading: idsReading && idsReading.indexOf(p.id) > -1 
		};});
	}
);


export const getVisiblePost = createSelector(
	[ getPost, getFavorites, getReadingList, getCategoryFilter],
	( post, favorites, readingList) => {
		if (!post) return; 
      
		const idsFavorites = favorites.map(p => {return p.id;});
		const idsReading = readingList.map(p => {return p.id;});

		return {
			...post, 
			favorite: idsFavorites.indexOf(post.id) > -1 ,
			reading: idsReading.indexOf(post.id) > -1 
		};
	}
);

export const getVisiblePostsOrderedBy = createSelector(
	[ getOrderByFilter, getVisiblePosts ],
	( order_posts_filter, posts ) => {
		return posts.sort((a, b) => a[order_posts_filter] < b[order_posts_filter]);
	}
);

const getComments = (state) => state.post.comments;

export const getVisibleComments = createSelector(
	[ getComments ],
	( comments) => {
		return comments.filter((comment) => !comment.deleted).sort((a, b) => a.voteScore < b.voteScore);
	}
);
