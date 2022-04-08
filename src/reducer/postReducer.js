const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        default:
            return state;
    }
};

export default postReducer;

// Note: when our application loads up initially, postReducer run with some random/unknown action
// during this time it will return state=[]/empty redux state
// and render method of component during this point will get empty state
// only after componentDidMount lifecycle method our actual action creator will run and update
// with new redux state
