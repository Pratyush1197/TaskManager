import React from 'react';
import Template from '../src/Components/Add/template'
//import { fetchData } from '../src/Components/api/index';
import {  Switch,Route} from 'react-router';
import { CircularProgress } from '@material-ui/core'
import { Link,BrowserRouter,useHistory,useLocation,withRouter } from 'react-router-dom'
import Tables  from '../src/Components/Table/Table';
import firebase from 'firebase';
//import  fetchData  from '../src/Components/api/index'
//import { Table } from 'reactstrap';
import { MDBInput, MDBCol } from "mdbreact";
class App extends React.Component {
  constructor(){
    super();
  this.state = {
    data: {}
  }

}
  componentDidMount(){

    const userHandle = localStorage.getItem('userHandle')
    var database = firebase.firestore()
    database.collection(`/users/${userHandle}/lists`)
    .get()
    .then((snapshot) => {
      const items = []
      snapshot.docs.forEach(doc => {
        var Date1 = new Date(doc.data().date.seconds);
        console.log((doc.data().date).seconds)
        var myDate = new Date( Date1 *1000);
        console.log(myDate)
        let item = (doc.data());
        items.push(item)
      })
      this.setState({data: items})
      //.catch(error => console.log('err'))
  
       

        
  
    }
    )
    


    }
    

    
        

  
    //const location = useLocation()
    //const data = await fetchData();
  //  const data2 = Add();
    //if (data.length !== 0){
   
  



  render() {

  
    //const userHandle = (this.props.location.sendData)
    const  { data }  = this.state;
    //console.log(userHandle)
   if (data.length === undefined){
      return ( <CircularProgress color="secondary" style={{top: '45%', left: "50%",position: "absolute"}}></CircularProgress>)
    } 
    else{
    return(
    <div>
      <Template data = {data}  /> 
        <Tables  data={data} /> 
    </div>
    
)}

    }
}
export default App;
