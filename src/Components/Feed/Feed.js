import { useSelector, useDispatch } from "react-redux";
import ListView from "../ListView/ListView";
import "./Feed.css";
import { fetchImages, nextPage } from "../../Redux/Slice";
import InfiniteScroll from 'react-infinite-scroller';


function Feed() {
    const state = useSelector((state) => state.feedData.imageList)
    const dispatch = useDispatch();

    function loadMore() {
        dispatch(fetchImages()); 
        dispatch(nextPage());
    }

    return (
        <div className="feed flex justify_content_center">
            <InfiniteScroll
                // dataLength={pageNumber * 10}
                loadMore={loadMore}
                hasMore={true}
                loader={<div className="loader" key={0}>Loading ...</div>}
                useWindow={true}
            >
                <ListView />
            </InfiniteScroll>
        </div>
    );
}

export default Feed;
