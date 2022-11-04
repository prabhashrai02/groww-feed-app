import './Card.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLike } from "react-icons/ai";
import { userNameChanged } from "../../Redux/Slice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Blurhash } from "react-blurhash-async"

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

    const blurImage = <Blurhash className='card_image' hash={data?.blur_hash} width={"var(--cardImageWidth)"} height={"var(--cardImageHeight)"} punch={1} />;


    return (
        <div key={data?.id} className="card flex flex_direction_column">

            <LazyLoadImage 
                className="card_image"
                placeholder={blurImage}
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