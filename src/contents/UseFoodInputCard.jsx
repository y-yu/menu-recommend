import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";
import PropTypes from 'prop-types';
import ReactDom from 'react-dom'
import axios from "axios";

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import { render } from 'react-dom';
import Autosuggest from 'react-autosuggest';


import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@material-ui/core/Grid";
import Image from 'mui-image'
import Paper from '@material-ui/core/Paper' 
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';

  

import { ResourceContext,
    UseFoodNameDictContext,
    AllFoodArrayContext,
    LikeAndDislikeFoodNameDictContext,
    AllFoodNameDictContext} from './context.js';

import UseFoodDataInput from './UseFoodDataInput';
import AutoSuggestFoodInput from './AutoSuggestFoodInput';

//　デフォルトデータ
import data from '../data/data.json';
const tabNames = data.foodTabNames;




const UseFoodInputCard = () => {
    const [value, setValue] = useState(0);
    // const allFoodNameDict = useContext(AllFoodNameDictContext);
    // console.log(useContext(AllFoodArrayContext))
    // console.log(useContext(AllFoodNameDictContext))


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (<Card sx={{ minWidth: 275}}>
        <CardContent>
        <Typography variant="h5" component="div">
            使用食材
        </Typography>
        <Typography variant="body2">
            <br/>使用する食材を選択してください
        </Typography>
        </CardContent>
        <CardActions>
        {/* <Box sx={{ width: '100%', height:500, overflow: 'auto'}}> */}
        <Box sx={{ width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="scrollable prevent tabs"
                >
                    {MakeTabs()}
                </Tabs>
            </Box>
                {MakeTabPanels(value)}
        </Box>
        </CardActions>
    </Card>);
}


const MakeTabContents = (tabName) => {
    const allFoodNameDict = useContext(AllFoodNameDictContext);
    // console.log(allFoodNameDict)
    const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext);
    var tabContents = [];
    if(tabName in allFoodNameDict){
        for(let foodName of allFoodNameDict[tabName]){
        let isInUseDict = foodName in useFoodNameDict;
        tabContents.push(
        <ul>
            <UseFoodDataInput name={foodName}/>
        </ul>);
        }
    }
    return <Box sx={{ width: '100%', height:400, overflow: 'auto'}}>{tabContents}</Box>;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MakeTabs = () => {
    let tmpArray=[];
    for (let i=0;i<tabNames.length;i++){
        tmpArray.push(<Tab label={tabNames[i]} {...a11yProps(i)}/>)
    }
    return tmpArray
    {/* {tabNames.map((tabName) => {return <Tab label={tabName} {...a11yProps(0)}/>})} */}

}

const MakeTabPanels = (props) => {

    let tmpArray =[];
    for (let i=0;i<tabNames.length;i++){
        if(tabNames[i] == "入力"){
            tmpArray.push(<TabPanel value={props} index={i}>
              <Box sx={{ width: '100%', height:400, overflow: 'auto'}}>
                <AutoSuggestFoodInput type="useFood"/>
              </Box>
            </TabPanel>);
          }else{
            tmpArray.push(<TabPanel value={props} index={i}>{MakeTabContents(tabNames[i])}</TabPanel>);
          }
        // tmpArray.push(<TabPanel value={props} index={i}><div></div>{tabNames[i]}</TabPanel>);
    }
    return tmpArray;
}

export default UseFoodInputCard