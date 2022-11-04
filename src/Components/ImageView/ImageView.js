import Card from "../Card/Card";

function ImageView(props) {
  let state = [];
  if (props.data) state = props.data;
  
    const imageList = state.map((data) => <Card data={data} key={data.id}/>);

    return (
        <div className={props.class}>
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

export default ImageView;