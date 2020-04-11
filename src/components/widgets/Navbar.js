import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { logout } from '../UserFunctions';

const Space = () => {
   return <span> &nbsp; </span>;
};

const goHome = () => {
   setTimeout(() => {
      window.location.href = '/home';
   }, 500);
};

export const Navbar = (props) => {
   const handleClick = () => {
      props.toggleDrawer();
   };

   return (
      <div className='navAppBar'>
         <Grid container spacing={1}>
            <Grid item xs={6} sm={6}>
               <div
                  style={{
                     width: '100%',
                     textAlign: 'left',
                     marginRight: 25
                  }}
               >
                  <Button
                     aria-controls='simple-menu'
                     aria-haspopup='true'
                     onClick={handleClick}
                  >
                     <MenuIcon style={{ fill: 'white' }} />
                  </Button>
               </div>
            </Grid>

            <Grid item xs={6} sm={6}>
               <div
                  style={{
                     width: '100%',
                     textAlign: 'right',
                     marginRight: 25
                  }}
               >
                  <Button
                     aria-controls='simple-menu'
                     aria-haspopup='true'
                     onClick={() => goHome()}
                  >
                     <HomeIcon
                        className='pointer'
                        style={{ fill: 'white', marginTop: 10 }}
                     />
                  </Button>

                  <Button
                     aria-controls='simple-menu'
                     aria-haspopup='true'
                     onClick={() => logout()}
                  >
                     <AccountCircleIcon
                        className='pointer'
                        style={{ fill: 'white', marginTop: 10 }}
                     />
                  </Button>
                  <Space />
               </div>
            </Grid>
         </Grid>
      </div>
   );
};
