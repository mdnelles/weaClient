import React, { useState, useEffect } from "react";
import localForage from "localforage";

import { cubeMsgNext, obj } from "./_sharedFunctions";

import { CubeMsg } from "./3d/CubeMsg";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
   head: {
      backgroundColor: "#8888",
      color: "#fff",
   },
   body: {
      fontSize: 14,
   },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
   root: {
      "&:nth-of-type(odd)": {
         backgroundColor: theme.palette.background.default,
      },
   },
}))(TableRow);

function createData(table, engine, rowFormat, rows, aveLen, indexLength) {
   return { table, engine, rowFormat, rows, aveLen, indexLength };
}

const rows = [
   createData(
      "departments",
      "InnoDB",
      "Dynamic",
      9,
      1820,
      "16.0KiB",
      "16.0 KiB"
   ),
   createData(
      "dept_emps",
      "InnoDB",
      "Dynamic",
      331143,
      36,
      "11.5MiB",
      "5.5 MiB"
   ),
   createData(
      "dept_managers",
      "InnoDB",
      "Dynamic",
      24,
      682,
      "16.0MiB",
      "16.0 bytes"
   ),
   createData(
      "employees",
      "InnoDB",
      "Dynamic",
      298936,
      50,
      "14.5MiB",
      "0.0 bytes"
   ),
   createData("logs", "InnoDB", "Dynamic", 24642, 149, "3.5MiB", "0.0 bytes"),
   createData(
      "salaries",
      "InnoDB",
      "Dynamic",
      2828426,
      35,
      "95.6 MiB",
      "0.0 bytes"
   ),
   createData(
      "titles",
      "InnoDB",
      "Dynamic",
      442308,
      46,
      "19.6 MiB",
      "0.0 bytes"
   ),
   createData("users", "InnoDB", "Dynamic", 26, 630, "16.0 KiB", "16.0 KiB"),
];

const useStyles = makeStyles({
   table: {
      minWidth: 700,
   },
   media: {
      paddingTop: 1,
      maxWidth: 800,
   },
});

export const Statistics = () => {
   const classes = useStyles();
   const [msgArr, setMsgArr] = useState(obj),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   useEffect(() => {
      localForage
         .getItem("token")
         .then(function (theToken) {
            setMsgArr(cubeMsgNext("Stats and Schema loaded", "info", msgArr));
            setCubeWrapperAnim(
               msgArr[msgArr.findIndex((el) => el.current === true)].anim
            );
         })
         .catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
            alert("no token found");
            window.location.href = "/";
         });
   }, [msgArr]);

   return (
      <div id='main' className='body'>
         <h3>Employee App</h3> <br />
         <div style={{ padding: 25, display: "block" }}></div>
         <div className='contain' style={{ marginLeft: 10 }}>
            <div className={"cubeWrapperFluid " + cubeWrapperAnim} id='stage'>
               <CubeMsg
                  msgArr={msgArr}
                  width={"100%"}
                  height={78}
                  marginT={-60}
               />
            </div>
         </div>
         <div style={{ display: "block", padding: 15 }}></div>
         <div className='displayBlock'></div>
         <div style={{ display: "block", padding: 20 }}></div>
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Table</StyledTableCell>
                     <StyledTableCell>Engine</StyledTableCell>
                     <StyledTableCell>Row Format</StyledTableCell>
                     <StyledTableCell>Rows</StyledTableCell>
                     <StyledTableCell>Ave/len</StyledTableCell>
                     <StyledTableCell>Index Length</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <StyledTableRow key={row.table}>
                        <StyledTableCell
                           component='th'
                           scope='row'
                           style={{ fontWeight: "bold" }}
                        >
                           {row.table}
                        </StyledTableCell>
                        <StyledTableCell component='th' scope='row'>
                           {row.engine}
                        </StyledTableCell>
                        <StyledTableCell>{row.rowFormat}</StyledTableCell>
                        <StyledTableCell>{row.rows}</StyledTableCell>
                        <StyledTableCell>{row.aveLen}</StyledTableCell>
                        <StyledTableCell>{row.indexLength}</StyledTableCell>
                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         <div style={{ padding: 10, display: "block" }} />
         <p align='center'>
            <img
               src='/img/employees-schema.png'
               alt='recipe thumbnail'
               style={{ maxWidth: "100%", height: "auto" }}
            />
         </p>
      </div>
   );
};
