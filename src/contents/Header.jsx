import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

export default function Header () {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              1食分の献立推薦
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }