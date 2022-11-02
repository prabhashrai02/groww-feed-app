import { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../Redux/Slice";
import ListView from "../ListView/ListView";
import GridView from "../GridView/GridView";

function Profile() {
    const state = useSelector((state) => state.feedData.userDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [])
    

    function chng() {
        console.log(state.photos)
    }
    return (
        <div className="profile flex flex_direction_column align_items_center">
            <div className="user_profile">
                {/* <button onClick={chng}>load user</button> */}
                <div className="user_detail flex flex_wrap_wrap align_items_center justify_content_space_around">
                    <img src={state?.profile_image?.large} alt="profile pic" className="profile_pic"/>
                    <div className="user_data text_align_center">
                        <h4>{state?.name}</h4>
                        <div className="flex flex_wrap_wrap justify_content_center">
                            <h5><i>{state?.bio}</i></h5>
                            <div className="user_data flex flex_wrap_wrap justify_content_space_around">
                                <h4>
                                    <p>{state?.followers_count}</p>
                                    <p>Followers</p>
                                </h4>
                                <h4>
                                    <p>{state?.following_count}</p>
                                    <p>Following</p>
                                </h4>
                                <h4>
                                    <p>{state?.photos?.length}</p>
                                    <p>Photos</p>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="view flex justify_content_space_around">
                        <button className="view_button">List View</button>
                        <button className="view_button">Grid View</button>
                    </div>
                    <div className="user_photos">
                        {/* <ListView data={state?.photos}/> */}
                        <GridView data={state?.photos} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;