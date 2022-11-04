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
    const [errorOccured, setErrorOccured] = useState(false);

    useEffect(() => {
        // fetch images when component is loaded initially
        dispatch(fetchImages());

        // remove error while closing component
        return () => dispatch(removeError());
    }, [])

    useEffect(() => {
        if (state.imageList.length === 0) {
            setNoData(true);
        }
        else {
            setNoData(false);
            dispatch(removeError());
        }

        if (state.error !== '') {
            setErrorOccured(true);
        }
        else {
            setErrorOccured(false);
        }

    }, [state])

    function loadMore() {
        dispatch(fetchImages()); 
        dispatch(nextPage());
    }

    return (
        <div className="feed flex justify_content_center">
            <div className="feed_container">
                {
                    errorOccured && (
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
        </div>
    );
}

export default Feed;
