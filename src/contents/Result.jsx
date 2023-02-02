import React,{useState,useEffect} from "react";
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Header from "./Header";

import Box from '@mui/material/Box';
import Grid from "@material-ui/core/Grid";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@material-ui/core/Paper' 
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@material-ui/core/Button";

import {useLocation, Link} from "react-router-dom";

//　デフォルトデータ
import data from '../data/data.json';
let resultTabNames = data.resultTabNames;
let menuCategoryNames = data.menuCategoryNames;
let nutritionAndTimeInfoNames = data.nutritionAndTimeInfoNames;
let unfeasibleName = data.unfeasibleName;

const Result = () => {
    useEffect(()=>{window.scrollTo(0, 0);},[]);
    const [value, setValue] = useState(0);
    const location = useLocation(); 
    let state = location.state;
    console.log(state.body);
    // feasibleは成功、unfeasibleは何かの制約破ってる
    let resultMenusFeasible = state.body["results"]["feasible"];
    let resultMenusUnfeasible = state.body["results"]["unfeasible"];

    //タブそのもの
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

    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 30,
      lineHeight: '30px',
    }));


    //タブの中身
    const MakeTabContents = (tabName) => {
      let resultArray = [];
      let resultMenus = [];
      if (tabName == "制約満たしている献立"){
        resultMenus = resultMenusFeasible;
      }else{
        resultMenus = resultMenusUnfeasible;
      }

      //制約満たしている献立のタブの中身
      for (let i=0;i<resultMenus.length; i++){
        let resultMenu = resultMenus[i];
        console.log(resultMenu.menu.map(menu => menu["title"]));

        let tmp = resultMenu.menu.map(
          menu => {
            return (
                <Grid item xs={12} md={Math.floor(12/resultMenu.menu.length)} align="center"> 
                  <Grid container spacing={1} alignItems="center" justify="center">
                    <Grid item xs ={3}>
                      <Item key={menuCategoryNames[menu["category"]]} elevation={2}>
                        {menuCategoryNames[menu["category"]]}
                      </Item>
                    </Grid>
                    <Grid item xs ={12}>
                      <a href={menu["url"]} rel="noopener noreferrer">{menu["title"]}</a><br/>
                    </Grid>
                  </Grid>
                </Grid>
            )
          }
        );

        if(resultMenu.menu.length===5){
          tmp = [<><Grid item xs={12} md={1}></Grid>{tmp}<Grid item xs={12} md={1}></Grid></>]
        }
        
        const makeUnfeasibleCategory = () => {
          if(tabName == "制約満たしてない献立"){
          return(
            <>
              <Grid item xs={3}></Grid>
              <Grid item align="center" xs={6}>
                <Typography align="center">満たしていない項目</Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      {resultMenu["penalty"].map((name)=><TableCell align="center">{unfeasibleName[name]}</TableCell>)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={3}></Grid>
            </>
          );
          }
        }

        tmp.push(
        <>  
          {makeUnfeasibleCategory()}
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Typography align="center">栄養素と時間</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {Object.keys(resultMenu.info).map(category => <TableCell align="center">{nutritionAndTimeInfoNames[category]}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {Object.keys(resultMenu.info).map(category => <TableCell align="center">{resultMenu.info[category]}</TableCell>)}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
        )
        resultArray = resultArray.concat(<Grid container spacing={4}>{tmp}</Grid>);
        
        resultArray.push(<br />);
        resultArray.push(<Divider sx={{ borderBottomWidth: 5 }}/>);
        resultArray.push(<br />);
      }

      return <>{resultArray}</>;
    }


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
    <>
    <Header/>
      <Box sx={{ width: '100%'}}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs"
            >
            {resultTabNames.map((resultTabName, index) => {return <Tab label={resultTabName} {...a11yProps(index)}/>})}
          </Tabs>
          {resultTabNames.map((resultTabName ,index) => {return <TabPanel value={value} index={index}>{MakeTabContents(resultTabName)}</TabPanel>})}
        </Box>
      <Grid container alignItems='center' justifyContent='center' direction="column">
        <Button
          variant="contained"
          component={Link}
          to="/"
          style={{ color: "#e0f2f1", backgroundColor: "#388e3c" }}
        >
          戻る
        </Button>
      </Grid>
      </Box>
      <br/>
    </>);
  }

  export default Result;