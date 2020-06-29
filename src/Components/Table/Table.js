import React, { useState, useEffect,useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import HistoryIcon from '@material-ui/icons/History';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {DeleteOutline} from '@material-ui/icons';
import { Chip,Button,Badge,TextField,Typography } from '@material-ui/core';
import Edit from '../Add/Edit'
import firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Template from '../Add/template';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStyles } from '../Add/template';
import RenderToLayer from 'material-ui/internal/RenderToLayer';
import { edit1 } from '../Add/Edit';
import Fab from '@material-ui/core/Fab';
import  Deletetask  from '../Add/delete';
import EditOutlineIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom' 
import auth from '../login/Authorize'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },


}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
  


function createData(name, calories, fat, carbs, protein) {
  return { calories, fat, carbs, protein };
}




const useStyles1 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function Tables(props) {
  const classes = useStyles1();
  const classes1 = useStyles();
  const [open, setOpen] = React.useState(false);
  const [edit,setEdit] = useState([])
  const [rows, setnames ] = useState([])
  const [togid,setTogid] = useState(false)
  const [sortt,setsortt] = useState('reverse')
  const [query,setquery] = useState('')
  const history = useHistory();
  //const [Filteredrows, setFilteredrows ] = useState([]);
var now = Date.now() 
var n = now.toString()
var n1 = n.substr(0,10)
var a = (+n1)

//var arr = props.data
useEffect(() => {
  setnames(props.data)
},[])
console.log(props.data)
const sortTable = () =>{

  var arr;
  if (togid ==false){
    arr = filterDate
  }
  else{
    arr = filterToggle
  }
   var sorted = arr.sort((a,b) =>  a.task > b.task ? 1 : -1 )
   setnames(sorted)
   setsortt('reverse')

}
const sortTableRev = () =>{
  var arr;
  if (togid ==false){
    arr = filterDate
  }
  else{
    arr = filterToggle
  }
   var sortedrev = arr.sort((a,b) =>  a.task < b.task ? 1 : -1 )
   setnames(sortedrev)
   setsortt('default')

}
const sortTableByTag = () =>{

  var arr;
  if (togid ==false){
    arr = filterDate
  }
  else{
    arr = filterToggle
  }
   var sorted = arr.sort((a,b) =>  a.priority > b.priority ? 1 : -1 )
   setnames(sorted)


}
const searchdata = (e) => {
  setquery((e.target.value))
  var arr;
  if (togid == false){
    arr = filterDate
  }
  else{
    arr = filterToggle
  }

  //alert(e.target.value)
  
  alert(query)
  if (query !== ''){

   var sorted = arr.filter(x => x['tag'].toLowerCase().includes(query))
   setnames(sorted)
  }
   else{
     setnames(arr)
   }
   
  //console.log(e.target.value)
  }


var filterDate = props.data.filter(row => {
  return row.date.seconds > a;
})
  console.log(filterDate) 
useEffect(() => {
  setnames(filterDate)
},[])
for(var i =0; i<filterDate.length;i++){
  filterDate[i].status = 'Not Completed';
  }

  var filterToggle = props.data.filter(row => {
    return row.date.seconds < a;
  })
const toggle = () => {
  if (togid == false){
  setnames(filterToggle)
  setTogid(true)
  for(var i =0; i<filterToggle.length;i++){
    filterToggle[i].status = 'Completed';
    }
  //filterToggle[0].status = 'Completed';
  //console.log(togid)
}
else{
setnames(filterDate)
setTogid(false)
for(var i =0; i<filterDate.length;i++){
filterDate[i].status = 'Not Completed';
}
console.log(togid)
}
}
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var newLabel = (created) => {
    now = Date.now()
    n = now.toString()
    a = (+n)
    console.log(a)
    console.log(created)
    if ((created + 1000000) > a){
      return 'new'
    }
    else{
      return 0
    }
  }
  function Editdata(id){
    setOpen(true);
   // Deletetask(id,rows);
    
    setEdit({data: id,rows: rows})
  }
  function Editevent(id){
    setOpen(true);
    return id
    //console.log(rows[id])
  }
  

function onclickhandler(e) {
  var filtered = rows.filter(row => {
    return row.tag === e;
})


  if (filtered.length !== 0){
  setnames(filtered);
  };
}
function SignOut() {
     localStorage.setItem('auth',0)
      history.push('/')
  

}
//Deletetask(id,rows)
  
    function convertData(id){
      //console.log(id)
    var myDate = new Date( id*1000);
    var Date2 = JSON.stringify(myDate);

    return (Date2.substr(1,10))
    //return arr
    }
  var ColorPriority = (variable) => {
      if (variable == 'A'){
        return '#ee432c'
      }
      else if (variable == 'B'){
        return '#e6b51d'
      }
      else if (variable == 'C'){
        return '#00b369'
      }

    }
    console.log(ColorPriority('A'))


  //useEffect(() => {
    //setFilteredrows(
      //rows.filter(row => {
        //return row.statuss === true
      //})
    //)
 // },[])
  
  //console.log(rows)
  let d = rows[edit.data]
  let e = rows

  //console.log(filtered)
  return (
    <div>
       <AppBar position="static">
        <Toolbar>
          <Button href='#'>
          <Typography variant="h6" style={{color: 'white'}}>
            {localStorage.getItem('userHandle')}
          </Typography>
          </Button>

          <Button color="inherit" style={{position: 'absolute', right: '5%'}} onClick={SignOut}><Typography variant="subtitle1">
            Sign Out
          </Typography></Button>
        </Toolbar>
      </AppBar>
      <br></br>
        
     
        <Fab   size="large" style={{top: '80%',left:'85%',position: 'absolute',color: 'white',backgroundColor: '#2fc435'}} onClick={toggle} aria-label="add">
  <HistoryIcon/>
</Fab>
        
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes1.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes1.paper}>
          <Edit data = {d} rows = {e} id = {edit.data} />
        </div>
      </Fade>
    </Modal>
    <TableContainer component={Paper} width="50%">
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow> 
          <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center" onClick={sortt == 'default' ? sortTable : sortTableRev} style={{cursor: 'pointer'}}>Task</StyledTableCell>
            <StyledTableCell align="center">Due Date(y-m-d)</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell  style={{cursor:'pointer',padding: '0px'}} onClick={sortTableByTag} align="center">Tag</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,id) => (
            <StyledTableRow>
             <StyledTableCell align="center" component="th" scope="row">
             <Badge badgeContent={newLabel(row.createdAt)}style={{ backgroundColor: '#09a1ff'}} color='primary'   >
               
                </Badge>
             </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row" key={id}>
              {row.task}
                </StyledTableCell>
            
              <StyledTableCell align="center">{convertData(row.date.seconds+row.date.nanoseconds)}</StyledTableCell>
              <StyledTableCell align="center" ><Chip variant="outlined" color = {row.status == 'Completed' ? 'primary' : 'secondary'} label={row.status}></Chip></StyledTableCell>
              <StyledTableCell align="center" onClick={() => onclickhandler(row.tag)}>
              <Chip
              
        label={row.tag}
        name= {row.priority}
         style ={{backgroundColor: ColorPriority(row.priority), color: 'white', cursor:'pointer'}} />
              </StyledTableCell>
              <StyledTableCell>
              <EditOutlineIcon onClick={() => Editdata(id)} style={{cursor:'pointer'}} align="center"></EditOutlineIcon>
              </StyledTableCell>
              <StyledTableCell  >
              <DeleteOutline onClick={() => Deletetask(id,rows)}  style={{cursor:'pointer'}} align="center"></DeleteOutline>
              
              </StyledTableCell>

            </StyledTableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  
    </div>
  );
}

