import React from 'react';
import MaterialTable from 'material-table';

export const DepartmentsTable = (props) => {
   return (
      <div>
         <MaterialTable
            // other props
            actions={[
               {
                  icon: 'info',
                  tooltip: 'Details',
                  onClick: (event, rowData) => {
                     // Do save operation
                     props.setAlert2Class('displayNone');
                     props.setViewDepartment(rowData);
                     props.getDeptDetailsStart(rowData.dept_no);
                     props.setMsgArr(
                        props.cubeMsgNext(
                           'Viewing Department ' +
                              rowData.first_name +
                              ' ' +
                              rowData.last_name,
                           'info',
                           props.msgArr
                        )
                     );
                     props.setCubeWrapperAnim(
                        props.msgArr[
                           props.msgArr.findIndex((el) => el.current === true)
                        ].anim
                     );
                  },
               },
            ]}
            title='Departments'
            columns={props.state.columns}
            data={props.state.data}
            editable={{
               onRowAdd: (newData) =>
                  new Promise((resolve) => {
                     setTimeout(() => {
                        resolve();
                        props.setState((prevState) => {
                           const data = [...prevState.data];
                           data.push(newData);
                           return { ...prevState, data };
                        });
                     }, 600);
                  }),
               onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                     setTimeout(() => {
                        //editDepartment(newData, props.token).then((res) => {
                        resolve();
                        props.setMsgArr(
                           props.cubeMsgNext(
                              'New entry added to database',
                              'success',
                              props.msgArr
                           )
                        );
                        // find number of next up slide and then update state of Cube Wrapper to trigger roll
                        props.setCubeWrapperAnim(
                           props.msgArr[
                              props.msgArr.findIndex(
                                 (el) => el.current === true
                              )
                           ].anim
                        );
                        if (oldData) {
                           props.setState((prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return { ...prevState, data };
                           });
                        }
                        props.setAlert2Class('fadeInFast');
                        props.setAlert2Msg(
                           'NOTE: This is a demo so this data UPDATE will not persist.'
                        );
                        props.setAlert2Severity('warning');
                     }, 600);
                  }),
               onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                     setTimeout(() => {
                        //// start
                        resolve();
                        props.setState((prevState) => {
                           const data = [...prevState.data];
                           data.splice(data.indexOf(oldData), 1);
                           return { ...prevState, data };
                        });
                        //// finish
                        props.setMsgArr(
                           props.cubeMsgNext(
                              'Removed employee',
                              'Success',
                              props.msgArr
                           )
                        );
                        props.setCubeWrapperAnim(
                           props.msgArr[
                              props.msgArr.findIndex(
                                 (el) => el.current === true
                              )
                           ].anim
                        );

                        props.setAlert2Class('fadeInFast');
                        props.setAlert2Msg(
                           'NOTE: This is a demo so this DELETE will not persist.'
                        );
                        props.setAlert2Severity('warning');
                     }, 600);
                  }),
            }}
         />
      </div>
   );
};
