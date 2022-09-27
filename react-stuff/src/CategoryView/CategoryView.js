import { useEffect, useState } from "react";
import "./CategoryView.css"

function CategoryView(props) {

    const [filter, setFilter] = useState("");
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
                <Category
                    fileNames={props.fileNames}
                    selectionHandler={props.selectionHandler}
                    index={index}
                    category={category}
                    filter={filter}/>
            );
        })}
    </>);
}

function Category(props)
{
    const [closed,setClosed] = useState(false);
    return(
        <>
            <h2>{props.category} <button onClick={()=>{setClosed(!closed)}}>{!closed? "Close" : "Open"}</button></h2>
            { !closed && <div className="category-row-scroll"><div className="category-row">
            {

                props.fileNames[props.index].map(
                (file, fileIndex) =>
                {
                    if(props.filter == "" || file.toLowerCase().includes(props.filter.toLowerCase()))
                    return (
                    <div className="category-file-container" onClick={()=>{props.selectionHandler(true, props.index, fileIndex)}}>
                        <div style={{height: "15%", width: "100%", overflow: "hidden"}}><h3 >{file}</h3></div>
                        <div style={{height: "83%", width:"100%"}}>
                        <img
                            src={"./data/" + props.category + "/thumbnails/" + file.substring(0,file.length-3) + "jpg"}
                            className="thumbnail-image"/>
                        </div>
                    </div>);
                }
            )}
            </div></div>
            }
            <div className="separator">
            </div>
        </>
    );
}

export default CategoryView;