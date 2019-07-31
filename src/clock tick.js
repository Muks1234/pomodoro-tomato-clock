import React,{Component} from 'react';
import './App.css';
import { reject } from 'q';

class App extends Component {
  constructor(props){
      super(props)
  }

  render(){
   
  //log Clock Time every second
  setInterval(logClockTime, 1000);

  function logClockTime(){
  
  //Get Time string as civilian time
    var time = getClockTime();

  //clear the console and log the time
    console.clear();
    console.log(time);
  }

  function getClockTime(){

    //Get the current Time
    var date = new Date();
    var time = "";

    //Serialize clock time
    var time = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      ampm: "AM"
    }

    //Convert to civilian time
    if(time.hours == 12){
        time.ampm = "PM"
    }else if(time.hours > 12){
        time.ampm = "PM"
        time.hours -= 12;
    }

    // Prepend a 0 on the hours to make double digits
    if(time.hours < 10){
      time.hours = '0' + time.hours;
      }

    //prepend a 0 on the minutes to make double digits
    if(time.minutes < 10){
      time.minutes = "0" + time.minutes;
    }

    //prepend a 0 on the seconds to make double digits
    if(time.seconds < 10){
      time.seconds = "0" + time.seconds;
    }

    // Format the clock time as string "hh:mm:ss tt"

    return time.hours + ":"
         + time.minutes + ":"
         + time.seconds + ":"
         + time.ampm;
    }


    return (
      <div className="App">
        <h1>king</h1>
      </div>
    );
  }
}

export default App;
