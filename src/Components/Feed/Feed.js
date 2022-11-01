import { useDispatch } from "react-redux";
import ListView from "../ListView/ListView";
import "./Feed.css";
import { fetchImages, nextPage } from "../../Redux/Slice";
function Feed() {
    const dispatch = useDispatch();

    return (
        <div className="feed">
            <button onClick={() => {dispatch(fetchImages()); dispatch(nextPage())}}>click me</button>
            <ListView />
        </div>
    );
}

export default Feed;
