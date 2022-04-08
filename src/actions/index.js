import jsonPlaceholder from "../apis/jsonPlaceholder"
import _ from 'lodash';

export const fetchPost = () => {
    return async (dispatch) => {
        const posts = await jsonPlaceholder.get('/posts');

        dispatch({
            type: "FETCH_POSTS",
            payload: posts.data
        })
    }
}

export const fetchUser = (id) => {
    return async (dispatch) => {
        const user = await jsonPlaceholder.get(`/users/${id}`);

        dispatch({
            type: 'FETCH_USER',
            payload: user.data
        })
    }
}

// combining posts and users reducers in a single action creator
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPost());
    // iterate through all posts to get unique userId's
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // invoking action creator for all useIds 
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // alternate to above is chaining
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
}