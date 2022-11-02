import { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../Redux/Slice";

function Profile() {
    const state = useSelector((state) => state.feedData.userDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [])
    

    function chng() {
        console.log(state)
    }
    return (
        <div className="profile flex flex_direction_column align_items_center">
            <div className="user_profile">
                <button onClick={chng}>load user</button>
                <div className="user_detail flex flex_wrap_wrap align_items_center justify_content_space_around">
                    <img src={state?.profile_image?.large} alt="profile pic" className="profile_pic"/>
                    <div className="user_data">
                        <h4>{state.name}</h4>
                        <div className="flex flex_wrap_wrap justify_content_center">
                            <h5><i>{state.bio}</i></h5>
                            <div className="user_data flex flex_wrap_wrap justify_content_space_around">
                                <h4>
                                    <p>{state.followers_count}</p>
                                    <p>Followers</p>
                                </h4>
                                <h4>
                                    <p>{state.following_count}</p>
                                    <p>Following</p>
                                </h4>
                                <h4>
                                    <p>{state.total_photos}</p>
                                    <p>Photos</p>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user_photos">
                </div>
            </div>
        </div>
    );
}

export default Profile;