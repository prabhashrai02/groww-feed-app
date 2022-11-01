import { useSelector } from "react-redux";
import Card from "../Card/Card";

function ListView() {
    const state = useSelector((state) => state.feedData.imageList)
    console.log(state)
    const imageList = state.map((data) => <Card data={data} key={data.id}/>);

    return (
        <div className="listView flex flex_direction_column align_items_center">
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

export default ListView;