import React, {useState} from 'react';
import {  Switch,Route } from 'react-router';
import axios from 'axios';
import App from '../../App';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import { Link,BrowserRouter, useHistory } from 'react-router-dom'
import SignUp from './SignUp'
import { Paper,Input, makeStyles, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox,Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { Face, Fingerprint } from '@material-ui/icons'
import auth from './Authorize';

import RenderToLayer from 'material-ui/internal/RenderToLayer';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: 2,
    },
    padding: {
        padding: theme.spacing()
    }
}));


const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userHandle, setuserHandle] = useState('');
    const [show,setshow] = useState('none');
    const [msg,setmsg] = useState('');
    const history = useHistory()
    
   

        
    
  
    
    async function signInWithEmail(e,email,password,userHandle){
        e.preventDefault();
       
        let  params = {

            email: email,  
            password: password,
            userHandle: userHandle
          }
          
        let request = await axios({
            method: 'post',
            url: 'http://localhost:3005/login/',
            data : params,
             headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
             },
             validateStatus: (status) => {
                 return true
             },
             
            })
  
          .then((response) =>{
            
            if (response){
                if(response.status === 200){
        
                    localStorage.setItem('userHandle', userHandle)
                    localStorage.setItem('auth', 1)
                    history.push({
                        pathname:  `/app`
                    })
                
 
            }
            else{
            
                if(response.data){
                    setshow('block')
                    setmsg(response.data)
                    setTimeout(() => {
                        setshow('none')
            

                    },3000)
                }

                if(response.data.message == 'auth/user-not-found'){
                    setshow('block')
                    setmsg('User with this e-mail not found ')
                    setTimeout(() => {
                        setshow('none')
            

                    },3000)

                    
                }
                else if(response.data !== undefined)
            {
                    setshow('block')
                    setmsg(response.data)
                    setTimeout(() => {
                        setshow('none')
            
                    },3000)


                }
            }
        }  
          })
        
            .catch((error) => {
                if(error.response){
                       console.log(error.response.data)
                    
                   }
                       
                

            })
        

    }


    const Sign  = () => {
        window.location.reload()
    } 
    

    
                
          
    const onChangeHandler = (e) => {
        const {name, value} = e.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
        else if(name === 'username'){
            setuserHandle(value);
          }
      
    };
    const classes = useStyles()
    //console.log(loggedIn)
    
return (
    <div>

         <AppBar position="static">
        <Toolbar>
          <Button href='#'>
          <Typography variant="h6" style={{color: 'white'}}>
            Login
          </Typography>
          </Button>

          <Button style={{position: 'absolute', right: '5%',color: 'white'}} onClick={Sign}> 
        <BrowserRouter><Link to="/register"> <Typography style={{color: 'white'}} variant="subtitle1">
            Sign Up
          </Typography></Link></BrowserRouter>
            </Button>
        </Toolbar>
      </AppBar>
        
        <Alert style ={{ display: show, marginTop: 10}} severity="error">Wrong Credentials
      </Alert>
 
    <Paper className={classes.padding}>
        <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
        
        <Grid item md={true} sm={true} xs={true}>
        <TextField  label="UserHandle" name="username"  InputProps={{ disableUnderline: true }} value = {userHandle}  type="text"  onChange = {(event) => onChangeHandler(event)} fullWidth autoFocus required />
        </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
        
        <Grid item md={true} sm={true} xs={true}>
        <TextField  label="Email" name="userEmail"  InputProps={{ disableUnderline: true }} value = {email}  type="email"  onChange = {(event) => onChangeHandler(event)} fullWidth autoFocus required />
        </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
       
        <Grid item md={true} sm={true} xs={true}>
         <TextField name="userPassword" label="Password" type="password"   InputProps={{ disableUnderline: true }} value = {password} onChange = {(e) => onChangeHandler(e)} fullWidth required />
        </Grid>
         </Grid>
    
        <Grid container justify="center" style={{ marginTop: '10px' }}>
                <Button color="primary"  onClick = {(e) => signInWithEmail(e, email, password,userHandle)}  style={{ textTransform: "none" }}>Login
                
                
                </Button>
             </Grid>
             <Grid item>

                 </Grid>
                    
           </div>
        </Paper>
        </div>
        );


}
export default Login;
