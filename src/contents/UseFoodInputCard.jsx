import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";
import PropTypes from 'prop-types';


import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import {
    UseFoodNameDictContext,
    AllFoodNameDictContext} from './context.js';

import UseFoodDataInput from './UseFoodDataInput';
import AutoSuggestFoodInput from './AutoSuggestFoodInput';

//　デフォルトデータ
import data from '../data/data.json';
const tabNames = data.foodTabNames;




const UseFoodInputCard = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Card sx={{ minWidth: 275}} elevation={3}>
            <CardContent>
            <Typography variant="h5" component="div">
                使用食材
            </Typography>
            <Typography variant="body2">
                <br/>使用したい食材のg数を入力してください
                <br/>入力すると使用食材のタブにその食材が表示されるようになります
                <br/>使い切りたい場合には、使い切りにチェックを入れてください
            </Typography>
            </CardContent>
            <CardActions>
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
            <UseFoodDataInput name={foodName} type={tabName}/>
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
}

const MakeTabPanels = (props) => {

    let tmpArray =[];
    for (let i=0;i<tabNames.length;i++){
        if(tabNames[i] == "使用食材"){
            tmpArray.push(<TabPanel value={props} index={i}>
              <Box sx={{ width: '100%', height:400, overflow: 'auto'}}>
                <AutoSuggestFoodInput type="useFood"/>
              </Box>
            </TabPanel>);
          }else{
            tmpArray.push(<TabPanel value={props} index={i}>{MakeTabContents(tabNames[i])}</TabPanel>);
          }
    }
    return tmpArray;
}

export default UseFoodInputCard