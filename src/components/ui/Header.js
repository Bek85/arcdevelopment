import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
  },
  logo: {
    height: '8em',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    '&:hover': {
      opacity: 1,
    },
  },
  btn: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    margin: '0 25px 0 50px',
    height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: '#fff',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    transition: '.5s',
    '&:hover': {
      opacity: 1,
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (evt, newValue) => setValue(newValue);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
    setOpen(true);
  };

  const handleClose = (evt) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  const menuOptions = [
    { name: 'Services', link: '/services' },
    { name: 'Custom Software Development', link: '/customsoftware' },
    { name: 'Mobile App Development', link: '/mobileapps' },
    { name: 'Website Development', link: '/websites' },
  ];

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) setValue(0);
        break;
      case '/services':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }

        break;
      case '/revolution':
        if (value !== 2) setValue(2);
        break;
      case '/about':
        if (value !== 3) setValue(3);
        break;
      case '/contact':
        if (value !== 4) setValue(4);
        break;
      case '/estimate':
        if (value !== 5) setValue(5);
        break;
      case '/mobileapps':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case '/websites':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;

      default:
        break;
    }
  }, [value]);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed' color='primary'>
          <Toolbar disableGutters>
            <Button
              onClick={() => setValue(0)}
              component={Link}
              to='/'
              disableRipple
              className={classes.logoContainer}
            >
              <img className={classes.logo} src={logo} alt='company logo' />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor='primary'
            >
              <Tab
                className={classes.tab}
                component={Link}
                to='/'
                label='Home'
              />
              <Tab
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup={anchorEl ? true : undefined}
                className={classes.tab}
                component={Link}
                onMouseOver={(evt) => handleClick(evt)}
                to='/services'
                label='Services'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='revolution'
                label='The Revolution'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='about'
                label='About Us'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='contact'
                label='Contact Us'
              />
            </Tabs>
            <Button
              className={classes.btn}
              component={Link}
              to='estimate'
              variant='contained'
              color='secondary'
            >
              Free Estimate
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              classes={{ paper: classes.menu }}
              elevation={0}
            >
              {menuOptions.map((option, i) => {
                return (
                  <MenuItem
                    key={i}
                    component={Link}
                    to={option.link}
                    classes={{ root: classes.menuItem }}
                    onClick={(e) => {
                      handleMenuItemClick(e, i);
                      setValue(1);
                      handleClose();
                    }}
                    selected={i === selectedIndex && value === 1}
                  >
                    {option.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
