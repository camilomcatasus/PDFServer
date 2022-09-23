import "./Display.css";
import { useEffect, useState } from 'react';

function Display(props) {



    function FileCard(props) {
      return (
        <div className='pdf-img-container'>
          <img
            src={"./data/" + props.category + "/thumbnails/" + props.url.substring(0, props.url.length - 3) + "jpg"}
            onClick = {props.selectionHandler}
            alt = {props.url}/* TODO: Fix below */
            className={props.id !== props.fileIndex ? "unselected-thumbnail" : "selected-thumbnail"}/>
        </div>
      );
    }

    return (
      <>
      <button className="back-button" onClick={(e) => {props.selectionHandler(false);}}>X</button>
        <div className='display-container'>
            <iframe
            src={"./data/" + props.category + "/files/" + props.fileNames[parseInt(props.fileIndex)]}
            className="pdf-viewer"
            title='pdf-viewer'
            height={"100%"}
            width={"100%"}/>
        </div>
        <div className='file-selector-container'>
          <div className='file-selector-scroll'
            style={{width: (props.fileNames.length * 65)  }}>
            {
              props.fileNames.map((file,index)=>
                <FileCard
                  url={file}
                  id={index}
                  category={props.category}
                  fileIndex={props.fileIndex}
                  selectionHandler = {()=>{
                    console.log(props.fileNames);
                    console.log(index);
                    props.selectionHandler(true, props.categoryIndex, index);
                  }}/>
              )
            }
          </div>
        </div>
      </>);
}

export default Display;