import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';

function ListItemLink(props) {
   return <ListItem button component='a' {...props} />;
}

const icolor = '#1976d2';
const fs = '50px';

export const HomeMenu = () => {
   return (
      <div className='center-outer'>
         <div className='center-inner2'>
            <List component='nav' aria-label='application stack'>
               <ListItem button>
                  <ListItemAvatar>
                     <PersonRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText
                     primary='Employees'
                     secondary='Manage employees database top down'
                  />
               </ListItem>
               <ListItem button>
                  <ListItemAvatar>
                     <AccountTreeRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText
                     primary='Deptartments'
                     secondary='Departments overview'
                  />
               </ListItem>
               <ListItem button>
                  <ListItemAvatar>
                     <SupervisorAccountRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText
                     primary='Department Managers'
                     secondary='Managers v Employees Overview'
                  />
               </ListItem>
               <ListItem button>
                  <ListItemAvatar>
                     <AssignmentIndRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText
                     primary='Title'
                     secondary='Employee Titles Manager'
                  />
               </ListItem>
               <ListItem button>
                  <ListItemAvatar>
                     <LocalAtmRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText
                     primary='Salaries'
                     secondary='Employees vs Salaries Overview'
                  />
               </ListItem>

               <ListItem button disableGutters={true}>
                  <ListItemLink href='https://github.com/mdnelles'>
                     <ListItemAvatar>
                        <EqualizerRoundedIcon
                           style={{ fontSize: fs, fill: icolor }}
                        />
                     </ListItemAvatar>
                     <ListItemText
                        primary='Statistics'
                        secondary='Statistics Charts and Graphs'
                     />
                  </ListItemLink>
               </ListItem>
            </List>
         </div>
      </div>
   );
};
