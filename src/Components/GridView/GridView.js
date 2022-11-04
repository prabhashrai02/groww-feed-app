import ImageView from "../ImageView/ImageView";

function GridView(props) {
  let state = [];
  if (props.data) state = props.data;

  return (
    <ImageView data={props.data} class={"gridView flex flex_wrap_wrap justify_content_space_between"} />
  );
}

export default GridView;