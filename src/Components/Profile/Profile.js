import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, userNameChanged, removeError, removeUser } from "../../Redux/Slice";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import ListView from "../ListView/ListView";
import GridView from "../GridView/GridView";

function Profile() {
    const state = useSelector((state) => state.feedData);
    const dispatch = useDispatch();
    const { userName } = useParams();
    const urlHistory = useNavigate();
    const [listView, setListView] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [noUserFound, setNoUserFound] = useState(false);
    const [searchingUser, setSearchingUser] = useState(false);

    useEffect(() => {
        setNoUserFound(false);
        setSearchingUser(false)
        
        // handle the empty image
        if (Number(state?.userDetail?.photos?.length) === 0) setEmpty(true);
        else setEmpty(false);
        
        // handle no useer with given username
        if (state?.userDetail?.username !== undefined) {
            dispatch(removeError());
        }
        else {
            setNoUserFound(true)
        }
    }, [state])

    // handle changing url directly
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(userNameChanged(userName));
        fetchNewUser()
    }, [urlHistory])

    // removed global error while closing component
    useEffect(() => {
        return () => dispatch(removeError())
    }, [])
    
    function fetchNewUser() {
        setNoUserFound(false);
        setSearchingUser(true);
        dispatch(removeUser());
        dispatch(fetchUser());
    }
    
    function changeToGridView() {
        setListView(false);
    }
    
    function changeToListView() {
        setListView(true);
    }

    return (
        <div className="profile flex flex_direction_column align_items_center">
            {
                noUserFound && !searchingUser && (
                    <div className="user_profile">
                        <div className="user_detail flex flex_wrap_wrap align_items_center justify_content_space_around">
                            <div className="view_zero_post no_user">
                            {state?.error?.errors}!!!
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !noUserFound && !searchingUser && (
                    <div className="user_profile">
                        <div className="user_detail flex flex_wrap_wrap align_items_center justify_content_space_around">
                            <img src={state?.userDetail?.profile_image?.large} alt="profile pic" className="profile_pic"/>
                            <div className="user_data text_align_center">
                                <h4>{state?.userDetail?.name}</h4>
                                <div className="flex flex_wrap_wrap justify_content_center">
                                    <h5><i>{state?.userDetail?.bio}</i></h5>
                                    <div className="user_data flex flex_wrap_wrap justify_content_space_around">
                                        <h4>
                                            <p>{state?.userDetail?.followers_count}</p>
                                            <p>Followers</p>
                                        </h4>
                                        <h4>
                                            <p>{state?.userDetail?.following_count}</p>
                                            <p>Following</p>
                                        </h4>
                                        <h4>
                                            <p>{state?.userDetail?.photos?.length}</p>
                                            <p>Photos</p>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="view flex justify_content_space_around">
                                <button className="view_button flex justify_content_space_around" onClick={changeToListView}><AiOutlineUnorderedList className="icon_size"/></button>
                                <button className="view_button flex justify_content_space_around" onClick={changeToGridView}><TfiLayoutGrid2 className="icon_size"/></button>
                            </div>
                            <div className="user_photos flex justify_content_center">
                                {
                                    listView && <ListView data={state?.userDetail?.photos}/>
                                }
                                {
                                    !listView && <GridView data={state?.userDetail?.photos} />
                                }
                                {
                                    empty && (
                                        <div className="view_zero_post">
                                            No Post Yet!!!
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>                    
                )
            }
        </div>
    );
}

export default Profile;