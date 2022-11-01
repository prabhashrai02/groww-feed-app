import './Card.css';
function Card(props) {
    const data = props.data;
    return (
        <div key={data.id} className="card flex flex_direction_column">
            <img src={data.urls.small} alt={data.alt_description} className="data_img"/>
            <div className="flex card_description justify_content_space_around">
                <p><a href={data.user.links.self}>{data.user.instagram_username}</a></p>
                <p>{data.likes}</p>
            </div>
        </div>
    );
}

export default Card;