import Card from "../Card/Card";

function GridView(props) {
  let state = [];
  if (props.data) state = props.data;
  
    const imageList = state.map((data) => <Card data={data} key={data.id}/>);

    return (
        <div className="gridView flex flex_wrap_wrap align_items_center justify_content_space_around">
        {
          imageList.map(
            (project, index) => {
              return (
                <div key={index}>
                  {project}
                </div>
              )
            }
          )
        }
        </div>
    );
}

export default GridView;