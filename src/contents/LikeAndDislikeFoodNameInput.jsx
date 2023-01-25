import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import AutoSuggestFoodInput from './AutoSuggestFoodInput';
import { LikeAndDislikeFoodNameDictContext , LikeAndDislikeFoodNameSelectedListContext} from './context.js';

const LikeAndDislikeFoodNameInput=(props)=>{
    const[foodName, setFoodName] = useState(props.name);
    const[like, setLike] = useState(false);
    const[dislike, setDislike] = useState(false);
    const[likeAndDislikeFoodNameDict, setLikeAndDislikeFoodNameDict] = useContext(LikeAndDislikeFoodNameDictContext);
    const[likeAndDislikeFoodNameSelectedList, setLikeAndDislikeFoodNameSelectedList] = useContext(LikeAndDislikeFoodNameSelectedListContext);

    // constructor(props){
    //   super(props);
    //   this.state = {
    //     foodName: this.props.name,
    //     like : false,
    //     dislike : false
    //   };
    // }
  
    // static contextType = LikeAndDislikeFoodNameDictContext;

    // componentDidUpdate(){
    useEffect(()=>{
        let newLikeAndDislikeFoodNameDict = Object.assign(likeAndDislikeFoodNameDict);
        // const setLikeAndDislikeFoodNameDict = this.context[1]
        // newLikeAndDislikeFoodNameDict[foodName]={"like":like,"dislike":dislike};
        // setLikeAndDislikeFoodNameDict(newLikeAndDislikeFoodNameDict);
        // console.log(this.context[0])
        // console.log(newLikeAndDislikeFoodNameDict["like"]);
        // console.log(foodName);
      
        if ((!(newLikeAndDislikeFoodNameDict["like"].includes(foodName))) && like){
          newLikeAndDislikeFoodNameDict["like"].push(foodName);
        }
        if ((!(newLikeAndDislikeFoodNameDict["dislike"].includes(foodName))) && dislike){
          newLikeAndDislikeFoodNameDict["dislike"].push(foodName);
        }
        if ((newLikeAndDislikeFoodNameDict["like"].includes(foodName)) && !like){
          newLikeAndDislikeFoodNameDict["like"] = newLikeAndDislikeFoodNameDict["like"].filter(x => x !== foodName)
        }
        if ((newLikeAndDislikeFoodNameDict["dislike"].includes(foodName)) && !dislike){
          newLikeAndDislikeFoodNameDict["dislike"] = newLikeAndDislikeFoodNameDict["dislike"].filter(x => x !== foodName)
        }

        setLikeAndDislikeFoodNameDict(newLikeAndDislikeFoodNameDict);
        console.log(newLikeAndDislikeFoodNameDict);    
      },[like,dislike]
    );


  const deleteComponent=(foodName)=>{
    // let newSelectedList = Object.assign(likeAndDislikeFoodNameSelectedList)
    let newSelectedList = new Set(likeAndDislikeFoodNameSelectedList);
    newSelectedList.delete(foodName);
    setLikeAndDislikeFoodNameSelectedList(newSelectedList);
    
    let newLikeAndDislikeFoodNameDict = Object.assign(likeAndDislikeFoodNameDict);
    if (newLikeAndDislikeFoodNameDict["like"].includes(foodName)){
      newLikeAndDislikeFoodNameDict["like"] = newLikeAndDislikeFoodNameDict["like"].filter(x => x !== foodName)
    }
    if (newLikeAndDislikeFoodNameDict["dislike"].includes(foodName)){
      newLikeAndDislikeFoodNameDict["dislike"] = newLikeAndDislikeFoodNameDict["dislike"].filter(x => x !== foodName)
    }

    console.log(foodName+"を消しました")
    return;
  }  

    return(
    <>
    {console.log("likeAndDislikeList:"+likeAndDislikeFoodNameSelectedList)}
      {foodName}:
      <Tooltip title="Like">
        <Checkbox 
        icon={<FavoriteBorder />} 
        checkedIcon={<Favorite />} 
        name={foodName+"Like"}
        checked={like} 
        // onChange={(event) => this.setState({like: event.target.checked})} 
        onChange={(event)=>setLike(event.target.checked)}
        value={like}/>
      </Tooltip>
      {/* <Checkbox  name={foodName+"Like"} checked={like} onChange={(event) => this.setState({like: event.target.checked})} value={like}/> */}
      {/* <input type="checkbox" name={foodName+"Like"} checked={like} onChange={(event) => this.setState({like: event.target.checked})} value={like}/> */}
      <Tooltip title="Dislike">
        <Checkbox 
        icon={<ThumbDownOffAltOutlinedIcon/>} 
        checkedIcon={<ThumbDownAltIcon/>} 
        name={foodName+"Dislike"} 
        checked={dislike} 
        // onChange={(event) => this.setState({dislike: event.target.checked})}
        onChange={(event)=>setDislike(event.target.checked)}
        value={dislike}/>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={()=>{deleteComponent(foodName)}}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {/* <input type="checkbox" name={foodName+"Dislike"} checked={dislike} onChange={(event) => this.setState({dislike: event.target.checked})} value={dislike}/> */}
    </>
    );

  }

export default LikeAndDislikeFoodNameInput