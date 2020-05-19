import React from 'react';
import import { 
    Form, 
    FormGroup, 
    Label, 
    Button, 
    Input 
} from "reactstrap";

class Events extends Component {
    state = {
      creating: false,
      events: [],
      isLoading: false,
      selectedEvent: null,
    };
  
    isActive = true;
  
    static contextType = AuthContext;
  
    constructor(props) {
      super(props);
      
    }
  
    componentDidMount() {
      this.fetchEvents();
    }
  

