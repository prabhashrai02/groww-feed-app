import './Card.css';
function Card(props) {
    const data = props.data;
    return (
        <div key={data.id} className="card flex flex_direction_column">
            <img src={data.urls.thumb} alt={data.alt_description}/>
            <div className="flex card_description justify_content_space_between">
                <p><a>{data.user.instagram_username}</a></p>
                <p>{data.likes}</p>
            </div>
        </div>
    );
}

export default Card;