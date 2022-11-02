import './Card.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLike } from "react-icons/ai";
import { userNameChanged, fetchUser } from "../../Redux/Slice";

function Card(props) {
    let data = [];
    let url = '';
    if (props.data) {
        data = props.data;
        url = `/profile/${data?.user?.username}`;
    }
    const dispatch = useDispatch();

    function changeUser() {
        dispatch(userNameChanged(data.user.username));
    }

    return (
        <div key={data?.id} className="card flex flex_direction_column">
            <img src={data?.urls?.small} alt={data?.alt_description} className="card_image"/>
                {
                    data && data.user && (
                    <div className="flex card_description align_items_center justify_content_space_around">
                        <div>
                            <Link to={url}>
                                <div className='flex align_items_center'>
                                    <CgProfile className='user_icons' />
                                    <span onClick={changeUser}>{data?.user?.username}</span>
                                </div>
                            </Link>
                        </div>
                        <div className='flex align_items_center'>
                            <AiOutlineLike className='user_icons'/>
                            <p>{data.likes}</p>
                        </div>
                    </div>
                    )
                }
        </div>
    );
}

export default Card;