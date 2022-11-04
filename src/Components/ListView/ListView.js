import ImageView from "../ImageView/ImageView";

function ListView(props) {
  let state = [];
  if (props.data) state = props.data;

  return (
    <ImageView data={props.data} class={"listView flex flex_direction_column align_items_center"} />
  );
}

export default ListView;