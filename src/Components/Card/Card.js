import './Card.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userNameChanged, fetchUser } from "../../Redux/Slice";

function Card(props) {
    const dispatch = useDispatch();
    const data = props.data;

    function changeUser() {
        dispatch(userNameChanged(data.user.username));
        dispatch(fetchUser());
    }
    
    return (
        <div key={data.id} className="card flex flex_direction_column">
            <img src={data.urls.small} alt={data.alt_description} className="card_image"/>
            <div className="flex card_description justify_content_space_around">
                    <p>
                    <Link to="/profile">
                        <span onClick={changeUser}>{data.user.username}</span>
                    </Link>
                    </p>
                    <p>{data.likes}</p>
            </div>
        </div>
    );
}

export default Card;