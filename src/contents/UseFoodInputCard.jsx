import * as React from 'react';
import {useState,useContext} from "react";
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
import Grid from "@material-ui/core/Grid";
import Divider from '@mui/material/Divider';

import {UseFoodNameDictContext} from './context.js';

import UseFoodDataInput from './UseFoodDataInput'
import AutoSuggestForFood from './AutoSuggestForFood'

//　デフォルトデータ
import labelToAccurate from '../data/labelToAccurate.json';

import data from '../data/data.json';

const tabNames = data.foodTabNames;

const UseFoodInputCard = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Card elevation={3}>
            <CardContent>
            <Typography variant="h5" component="div">
                使用食材
            </Typography>
            <Typography variant="body2">
                <br/>使用したい食材を入力してください
                <br/>使用食材のタブに表示された食材が献立に考慮されます
                <br/>・量を考慮しない場合は「買う」にチェック
                <br/>・ g 数を考慮したい場合は数字を入力
                <br/>　→ 使い切りたい場合は「使い切り」にチェック
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
                <AutoSuggestForFood />
              </Box>
            </TabPanel>);
          }else{
            tmpArray.push(<TabPanel value={props} index={i}>{MakeTabContents(tabNames[i])}</TabPanel>);
          }
    }
    return tmpArray;
}

const MakeTabContents =(tabName) => {
    let allFoodNameDict = {}
    const categoryNames = Object.keys(labelToAccurate)
    for(let categoryName of categoryNames){
        const labels = Object.keys(labelToAccurate[categoryName])
        allFoodNameDict[categoryName]=labels
    }

    const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext);
    var tabContents = [];
    if(tabName in allFoodNameDict){
        for(let foodName of allFoodNameDict[tabName]){
            tabContents.push(
            <ul>
                <Grid container spacing={2}>
                    <UseFoodDataInput name={foodName} genre={tabName}/>
                </Grid>
                <Divider/>
            </ul>);
        }
    }
    return <Box sx={{ width: '100%', height:400, overflow: 'auto'}}>{tabContents}</Box>;

}

export default UseFoodInputCard;