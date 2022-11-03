import './Card.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLike } from "react-icons/ai";
import { userNameChanged } from "../../Redux/Slice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { decode } from "blurhash";

function Card(props) {
    let data = [];
    let url = '';
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(240, 288);
    let pixels = '';
    
    if (props.data) {
        data = props.data;
        url = `/profile/${data?.user?.username}`;
        
        pixels = decode(data?.blur_hash, 240, 288);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
    }
    const dispatch = useDispatch();

    function changeUser() {
        dispatch(userNameChanged(data.user.username));
    }

    return (
        <div key={data?.id} className="card flex flex_direction_column">
            <LazyLoadImage 
                className="card_image"
                placeholderSrc={canvas.toDataURL()}
                src={data?.urls?.regular}
                alt={data?.alt_description}
            />
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