import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

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
  },
  btn: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    margin: '0 25px 0 50px',
    height: '45px',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (evt, newValue) => setValue(newValue);

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) setValue(0);
    else if (window.location.pathname === '/services' && value !== 1)
      setValue(1);
    else if (window.location.pathname === '/revolution' && value !== 2)
      setValue(2);
    else if (window.location.pathname === '/about' && value !== 3) setValue(3);
    else if (window.location.pathname === '/contact' && value !== 4)
      setValue(4);
    else if (window.location.pathname === '/estimate' && value !== 5)
      setValue(5);
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
                className={classes.tab}
                component={Link}
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
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
