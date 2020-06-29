import  React   from 'react';
import  base  from '../../dest'
import DateFnsUtils from '@date-io/date-fns';
import { Alert } from '@material-ui/lab'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
//import { TextField,Radio,Select } from 'material-ui-react-final-form'
import { Form, Field } from 'react-final-form';
import { Grid,TextField, OutlinedInput ,Container,Typography, Button, InputLabel } from '@material-ui/core'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Input } from 'material-ui-react-final-form';
import { Paper } from 'material-ui';

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
         task: "",
         date: Date.now(),
         status: "",
         tag : "",
         createdAt : "",
         show: 'none'
        };

      
      }

     addUser = e => {
      e.preventDefault()
      const userHandle = localStorage.getItem("userHandle")
    
        //const userHandle = this.props.user;
        //console.log(userHandle)
        const db = base.firestore();
        db.settings({
         // timestampsInSnapshots: true
        });
        const userRef =  db.collection(`/users/${userHandle}/lists`).add({
          task: this.state.task,
          date: this.state.date,
          status: this.state.status,
          tag: this.state.tag,
          priority: this.state.priority,
          createdAt:  Date.now()
          
        });  
        this.setState({
            task: "",
            date: Date.now(),
            status: "",
            tag : "",
            priority: "",
            createdAt: ""
        });
        this.setState({
          show: 'block'
        }) 
      
        setTimeout(() => {
          this.setState({
            show: 'none'
          })

        },3000)

      };



      upDateChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      } 
      handleDateChange = (date) => {
        this.setState({
          date: date
        })
      }
    
     

    render(){
      

    return(
      <Container style={{justifyContent: 'center', width: '400px'}}>
       <Alert style ={{ display: this.state.show}} severity='success'>Task Added Successfully
      </Alert>
<form  onSubmit={this.addUser}>

<Grid>
<TextField
 InputProps={{ disableUnderline: true }}
required
  type="text"
  name="task"
  placeholder="task"
  onChange={this.upDateChange}
  value = {this.state.task}
  fullWidth
  required
/>
</Grid>
<MuiPickersUtilsProvider utils={DateFnsUtils}>
<Grid>
        <KeyboardDatePicker
          disableToolbar
          InputProps={{ disableUnderline: true }}
          variant="inline"
          name="date"
          format="MM/dd/yyyy"
          margin="normal"
          fullWidth
          id="date-picker-inline"
          label="Date picker inline"
          value={this.state.date}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',

          }}
        >
        </KeyboardDatePicker>
</Grid>
        
        </MuiPickersUtilsProvider>
<Grid >
 <TextField
  InputProps={{ disableUnderline: true }}
  type="text"
  name="status"
  placeholder="Not Completed"
  disabled
  onChange={this.upDateChange}
  value = {this.state.status}
  fullWidth
/>
</Grid>
<Grid>
 <TextField
  InputProps={{ disableUnderline: true }}
  type="text"
  name="tag"
  required
  placeholder="tag"
  onChange={this.upDateChange}
  value = {this.state.tag}
  fullWidth
/>
</Grid>
<br></br>
<FormLabel>Set Priority</FormLabel>
<RadioGroup  row aria-label="gender" name="priority" required value={this.state.priority} onChange={this.upDateChange}>
    <FormControlLabel value="A" control={<Radio />} label="High" />
    <FormControlLabel value="B" control={<Radio />} label="Medium" />
    <FormControlLabel value="C" control={<Radio />} label="Low" />
    </RadioGroup>
<br></br>
 <Grid style={{justifyContent: 'center'}}>
 <Button type="submit" style={{left: '40%'}} variant="contained"  color="secondary">Submit</Button>
</Grid>
</form>
</Container>
    )
}
}
export default Add;