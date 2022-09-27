import { useState, useEffect } from "react";
import "./UserPortal.css";
import CategoryView from "../CategoryView/CategoryView";
import Display from "../Display/Display";



function UserPortal(props)
{
    const [fileNames, setFileNames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hasSelected, setHasSelected] = useState(false);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedFileIndex, setSelectedFileIndex] = useState(0)
    const authFunction = props.setAuth;
    function CategorySelectionHandler(selected, categoryIndex=null, fileIndex=null) {
        if(selected)
        {
            setHasSelected(true);
            setSelectedCategoryIndex(categoryIndex);
            setSelectedFileIndex(fileIndex);
        }
        else
        {
            setHasSelected(false);
            setSelectedCategoryIndex(0);
            setSelectedFileIndex(0);
        }
    }
    useEffect(()=>{
      fetch("./data")
      .then((res)=>{
        if(res.status === 200)
        {
          res.json().then(
            data =>
            {
              setFileNames(data.fileNames);
              setCategories(data.categories);
            }
          );
        }
        else
        {
          authFunction(false);
        }
      });
    },[]);

    return(
    <>
        {
            hasSelected &&
            <Display
                selectionHandler={CategorySelectionHandler}
                category={categories[selectedCategoryIndex]}
                fileNames={fileNames[selectedCategoryIndex]}
                categoryIndex ={selectedCategoryIndex}
                fileIndex={selectedFileIndex}/>
        }
        {
            !hasSelected &&
            <CategoryView
                selectionHandler={CategorySelectionHandler}
                categories={categories}
                fileNames={fileNames}/>
        }
    </>)
}

export default UserPortal;