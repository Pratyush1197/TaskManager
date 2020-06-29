import React, {useState} from 'react';
import axios from 'axios';
import firebase from 'firebase';
import { Paper,Input, makeStyles, withStyles, Typography,AppBar,Toolbar, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import RenderToLayer from 'material-ui/internal/RenderToLayer';
import  base  from '../../dest';
import { Alert } from '@material-ui/lab'
import { exportDefaultSpecifier } from '@babel/types';
import { allSettled } from 'q';
import { Link,BrowserRouter, useHistory } from 'react-router-dom'
import { fetchdata } from '../api/index';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: 2,
    },
    padding: {
        padding: theme.spacing()
    }
}));

const SignUp = () => {
    const [userHandle,setuserHandle] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [show,setshow] = useState('none');
    const [msg,setmsg] = useState('');
    const [success,setsuccess] = useState(false);
    const [error,setError] = useState(null);
    let token1, userId;

    

    async function signUpWithEmail(e,email,password,ConfirmPassword,userHandle) {
        e.preventDefault();
    
        let  params = {
            email: email,  
            password: password,
            confirmPassword: ConfirmPassword,
            userHandle: userHandle
          }
          
        let res = await axios({
            method: 'post',
            url: 'http://localhost:3005/signUp/',
            data : params,
             headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
             },
             validateStatus: (status) => {
                 return true
             },
            })
            
  
          .then((response) => {
              console.log(response)
            if(response){
               if(response.status !== 200){
                if(response.data.email !== undefined)
                {
                        setshow('block')
                        setmsg(response.data.email)
                        setTimeout(() => {
                            setshow('none')
                
                        },3000)
    
    
                    }
                    if(response.data.password !== undefined)
                    {
                            setshow('block')
                            setmsg(response.data.password)
                            setTimeout(() => {
                                setshow('none')
                    
                            },3000)
        
        
                        }
                        if(response.data.confirmPassword !== undefined)
                        {
                                setshow('block')
                                setmsg(response.data.confirmPassword)
                                setTimeout(() => {
                                    setshow('none')
                        
                                },3000)
            
            
                            }   
                        if(response.data.handle !== undefined)
                        {
                                setshow('block')
                                setmsg(response.data.handle)
                                setTimeout(() => {
                                    setshow('none')
                                
                        
                                },3000)
            
            
                            }
                        if (response.data === 'this handle is already taken'){
                            setshow('block')
                            setmsg('this handle is already taken')
                            setTimeout(() => {
                               setshow('none')
                    
                            },3000)
                       }   
                       else if (response.data && response.data.err){
                        setshow('block')
                        setmsg(response.data.err)
                        setTimeout(() => {
                           setshow('none')
                
                        },3000)
                   }
                   else if (response.data && response.data.confirmPassword !== undefined ){
                    setshow('block')
                
                    setmsg(response.data.confirmPassword)
                    setTimeout(() => {
                       setshow('none')
            
                    },3000)
                }   
                        else if (response.data && response.data !== 'this handle is already taken' ){
                        setshow('block')
                    
                        setmsg('Wrong Credentials.')
                        setTimeout(() => {
                           setshow('none')
                
                        },3000)
                   }        

                  
               }        
            
                else if (response.status === 200){
                    setshow('block')
                    setmsg('Account Created Successfully')
                    setsuccess(true)
                    setTimeout(() => {
                        setshow('none')
            
                    },3000)

                }
            }
                
               
                   
            })
    
        

          
    }
    const signInWithEmail = (e,email,password,userHandle) => {
        e.preventDefault();
        if (password !== ConfirmPassword){
            console.log('Error')
        }
        
        const db = base.firestore().collection("users");

        db.doc(`${userHandle}`).get()
        .then(doc => {
            if(doc.exists){
                alert('Exists')
            }
            else{

                firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(data => {
                userId = data.user.uid
                return data.user.getIdToken();
            })
            .then(token => {
                token1 = token;
        
                const userCredentials = {
                    handle: userHandle,
                    email: email,
                    userId: userId
                }
               return db.doc(`${userHandle}`).set(userCredentials);
            })
            .then(() => {
                
            })
            .catch((err) => {
                if(err.code === 'auth/email-already-in-use'){
                    console.log('Email already in use')}
                else{
                    alert(err.code)}}) 
            }
        })

        

        
        
        }
        //console.log(email,password)

    
    const onChangeHandler = (e) => {
        const {name, value} = e.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
        else if(name === 'ConfirmPassword'){
            setConfirmPassword(value);
              
        }
        else if(name === 'username'){
            setuserHandle(value);
              
        }

    };
    const Sign  = () => {
        window.location.reload()
    } 
    

   
    
    
    const classes = useStyles()
return (
    <div>
         <AppBar position="static">
        <Toolbar>
          <Button href='#'>
          <Typography variant="h6" style={{color: 'white'}}>
            Sign Up
          </Typography>
          </Button>

          <Button color="inherit" style={{position: 'absolute', right: '5%'}} onClick={Sign}><BrowserRouter><Link to="/"><Typography style={{color: 'white'}} variant="subtitle1">
            Login
          </Typography></Link></BrowserRouter></Button>
        </Toolbar>
      </AppBar>
        
          <Alert style ={{ display: show, marginTop: 10}} severity={success ? 'success' : 'error'}>{msg}
      </Alert>
    <Paper className={classes.padding}>
        <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
        
        <Grid item md={true} sm={true} xs={true}>
        <TextField   name="username"  InputProps={{ disableUnderline: true }} value = {userHandle} label="Username" type="text"  onChange = {(event) => onChangeHandler(event)} fullWidth autoFocus required />
        </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
        
        <Grid item md={true} sm={true} xs={true}>
        <TextField  label="Email" name="userEmail"  InputProps={{ disableUnderline: true }} value = {email} label="Email" type="email"  onChange = {(event) => onChangeHandler(event)} fullWidth autoFocus required />
        </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
       
        <Grid item md={true} sm={true} xs={true}>
         <TextField name="userPassword" label="Password" type="password"   InputProps={{ disableUnderline: true }} value = {password} onChange = {(e) => onChangeHandler(e)} fullWidth required />
        </Grid>
         </Grid>
         <Grid container spacing={8} alignItems="flex-end">
       
       <Grid item md={true} sm={true} xs={true}>
        <TextField name="ConfirmPassword" label="ConfirmPassword" type="password" InputProps={{ disableUnderline: true }} value = {ConfirmPassword} onChange = {(e) => onChangeHandler(e)} fullWidth required />
       </Grid>
        </Grid>
        
   
             
        <Grid container justify="center" style={{ marginTop: '10px' }}>

                <Button color="primary"  onClick = {(e) => signUpWithEmail(e, email, password,ConfirmPassword,userHandle)}  style={{ textTransform: "none" }}>SignUp</Button>
             </Grid>
             <Grid item>
            
             
        
                 </Grid>     
           </div>
        </Paper>
        </div>
        );


}
export default SignUp;
