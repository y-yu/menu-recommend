import * as React from 'react';
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

import AutoSuggestForLike from './AutoSuggestForLike';

//　デフォルトデータ
import data from '../data/data.json';
let cardSize = data.cardSize;

//好き嫌いのカードの大枠を作る
const LikeAndDislikeInputCard=()=>{

        return(
            <Card sx={{height:cardSize}}  elevation={3}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        好き嫌い
                    </Typography>
                    <Typography variant="body2">
                        <br/>好きな食材と嫌いな食材を選択してください
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ width: '100%', overflow: 'auto'}}>
                        <AutoSuggestForLike />
                    </Box>
                </CardActions>
          </Card>
        );
    }

    export default LikeAndDislikeInputCard