import "./Profile.css";
import { useSelector } from "react-redux";

function Profile() {
    const state = useSelector((state) => state.feedData)

    return (
        <div className="profile">
            <button onClick={print}>load karo</button>
            <div className="user_detail">
            </div>
            <div className="user_photos">
            </div>
        </div>
    );
}

export default Profile;