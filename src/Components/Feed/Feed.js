import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListView from "../ListView/ListView";
import "./Feed.css";
import { fetchImages, nextPage, removeError } from "../../Redux/Slice";
import InfiniteScroll from 'react-infinite-scroller';


function Feed() {
    const state = useSelector((state) => state.feedData);
    const dispatch = useDispatch();

    const [noData, setNoData] = useState(false);

    useEffect(() => {
        dispatch(fetchImages());
        return () => dispatch(removeError(''));
    }, [])

    useEffect(() => {
        if (state.imageList.length === 0) {
            setNoData(true);
        }
        else {
            setNoData(false);
            dispatch(removeError(''));
        }

    }, [state])

    function loadMore() {
        dispatch(fetchImages()); 
        dispatch(nextPage());
    }

    return (
        <div className="feed flex justify_content_center">
            {
                noData && (
                    <div className="feed_error">
                        {state.error?.errors}!!!
                    </div>
                )
            }
            {
                !noData && (
                    <InfiniteScroll
                        initialLoad={false}
                        loadMore={loadMore}
                        hasMore={true}
                        loader={<div className="loader" key={0}/>}
                        useWindow={true}
                    >
                        <ListView data={state?.imageList}/>
                    </InfiniteScroll>
                )
            }
        </div>
    );
}

export default Feed;
