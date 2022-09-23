import { useEffect, useState } from "react";
import "./CategoryView.css"

function CategoryView(props) {

    const [filter, setFilter] = useState("");
    const [closed, setClosed] = useState(Array(100).fill(false));
    return (
    <>
        <div className="search-center-container">
            <input className="search-bar" value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
            </input>
        </div>
        {
        props.categories.map((category, index)=>{
            let show = false;
            for(let i = 0; i < props.fileNames[index].length; i++)
            {
                if(props.fileNames[index][i].includes(filter))
                {
                    show = true;
                    break;
                }
            }
            if(show)
            return (
            <>
                <h2>{category}</h2>
                <div className="category-row">
                {
                    props.fileNames[index].map(
                    (file, fileIndex) =>
                    {
                        if(filter == "" || file.includes(filter))
                        return (
                        <div className="category-file-container" onClick={()=>{props.selectionHandler(true, index, fileIndex)}}>
                            <div style={{height: "15%", width: "100%", overflow: "hidden"}}><h3 >{file}</h3></div>
                            <div style={{height: "83%", width:"100%"}}>
                            <img
                                src={"./data/" + category + "/thumbnails/" + file.substring(0,file.length-3) + "jpg"}
                                className="thumbnail-image"/>
                            </div>


                        </div>);
                    }
                )}
                </div>
                <div className="separator">
                </div>
            </>
            );
        })}
    </>);
}

export default CategoryView;