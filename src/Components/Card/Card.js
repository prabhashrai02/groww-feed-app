import './Card.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
        dispatch(fetchUser());
    }

    return (
        <div key={data?.id} className="card flex flex_direction_column">
            <img src={data?.urls?.small} alt={data?.alt_description} className="card_image"/>
                {
                    data && data.user && (
                    <div className="flex card_description justify_content_space_around">
                        <p>
                            <Link to={url}>
                            <span onClick={changeUser}>{data?.user?.username}</span>
                            </Link>
                            </p>
                        <p>{data.likes}</p>
                    </div>
                    )
                }
        </div>
    );
}

export default Card;