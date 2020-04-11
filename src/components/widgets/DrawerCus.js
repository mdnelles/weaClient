import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import StorageIcon from '@material-ui/icons/Storage';

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex'
   },
   appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen
      })
   },
   appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen
      })
   },
   menuButton: {
      marginRight: theme.spacing(2)
   },
   hide: {
      display: 'none'
   },
   drawer: {
      width: drawerWidth,
      flexShrink: 0
   },
   drawerPaper: {
      width: drawerWidth
   },
   drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
   },
   contentShift: {
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
   }
}));

export const DrawerCus = (props) => {
   const classes = useStyles();
   const theme = useTheme();
   // by passing in props status when ever nav opens or closes it will
   // rerender in the approriate fashion
   const [open, setOpen] = React.useState(props.drawerState);

   const bClick = (link) => {
      setTimeout(() => {
         window.location.href = '/' + link;
      }, 500);
   };

   // drawer needs the ability to close itself
   const handleDrawerClose = () => {
      props.toggleDrawer();
      setOpen(false);
   };

   const icolor = '#444444';
   const fs = '30px';

   return (
      <div>
         <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={open}
            classes={{
               paper: classes.drawerPaper
            }}
         >
            <div className={classes.drawerHeader}>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                     <ChevronLeftIcon />
                  ) : (
                     <ChevronRightIcon />
                  )}
               </IconButton>
            </div>
            <Divider />
            <List component='nav' aria-label='application stack'>
               <ListItem button onClick={() => bClick('employees')}>
                  <ListItemAvatar>
                     <PersonRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Employees' />
               </ListItem>
               <ListItem button onClick={() => bClick('departments')}>
                  <ListItemAvatar>
                     <AccountTreeRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Deptartments' />
               </ListItem>
               <ListItem button onClick={() => bClick('dept_manager')}>
                  <ListItemAvatar>
                     <SupervisorAccountRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Department Managers' />
               </ListItem>
               <ListItem button onClick={() => bClick('titles')}>
                  <ListItemAvatar>
                     <AssignmentIndRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Title' />
               </ListItem>
               <ListItem button onClick={() => bClick('salaries')}>
                  <ListItemAvatar>
                     <LocalAtmRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Salaries' />
               </ListItem>

               <ListItem button onClick={() => bClick('stats')}>
                  <ListItemAvatar>
                     <EqualizerRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Statistics' />
               </ListItem>

               <Divider />

               <ListItem button onClick={() => bClick('users')}>
                  <ListItemAvatar>
                     <StarsRoundedIcon style={{ fontSize: fs, fill: icolor }} />
                  </ListItemAvatar>
                  <ListItemText primary='Admin Users' />
               </ListItem>
               <ListItem button onClick={() => bClick('settings')}>
                  <ListItemAvatar>
                     <SettingsRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Settings' />
               </ListItem>
               <ListItem button onClick={() => bClick('logs')}>
                  <ListItemAvatar>
                     <StorageIcon style={{ fontSize: fs, fill: icolor }} />
                  </ListItemAvatar>
                  <ListItemText primary='App Logs' />
               </ListItem>
            </List>
         </Drawer>
      </div>
   );
};
