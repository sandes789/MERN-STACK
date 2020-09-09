import React from 'react'
import {NavLink} from 'react-router-dom'

//Material Import
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from './Logout';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavBar = () => {
  const {isAuthenticated, user} = useSelector(state => state.Auths)
    const RegisterLogin = (
      <>
          <NavLink to='/register'>
              <Button color="default">Register</Button>
          </NavLink>
          <NavLink to='/login'>
              <Button color="default">Login</Button>
          </NavLink>
      </>
    )

    const WcLogout = (
      <>
        <p> { user ? `Welcome ${user.name}` : ' ' } </p>
        <Logout />
      </>
    )

    const classes = useStyles();
    return (
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MERN Stack
          </Typography>
          { isAuthenticated ? WcLogout : RegisterLogin }
          
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default NavBar
