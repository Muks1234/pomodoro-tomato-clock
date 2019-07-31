import React,{Component} from 'react';
import './App.css';

class App extends Component {
  
  state = {
    time: 25,
    previousButton: '',
    currentTime:'25:00',
    breakTime:5,
    SessionTime:25,
    cycle:"Session",
    stop_count: 0
  }


  start=(duration)=>{

    if(this.state.previousButton!=="stop"){
      this.setState({
        time:this.state.SessionTime*60
        })
    }
    
      
     if(this.state.previousButton!=="start"){

      this.cycleID = setInterval(()=>{
        this.setState({
          time: this.state.time - 1
        })    
        let time = this.state.time
        let minutes = Math.floor(time/60)
        let seconds = time - minutes * 60
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.setState({currentTime:`${minutes}:${seconds}`})
    
        if(this.state.time===0 && this.state.cycle==="Session"){
          document.getElementById('beep').play();
          this.setState({
            time:this.state.breakTime*60+1,
            cycle:"Break"
          })
        }else if(this.state.time===0 && this.state.cycle==="Break"){
          document.getElementById('beep').play();
          this.setState({
            time:this.state.SessionTime*60+1,
            cycle:"Session"
          })
        }
      }, 1000)
    }
    this.setState({
      previousButton:'start'
    })
  }

  stop=()=>{
    clearInterval(this.cycleID)
    this.setState({
    previousButton:"stop",
    stop_count:this.state.stop_count+1})
  }

  reset =()=> {
    var audio = document.getElementById("beep")
    audio.currentTime=0.0;
    audio.pause()
    if(this.state.previousButton ==="start"){
      this.stop()
    }   
    this.setState({
      breakTime:5,
      SessionTime:25,
      currentTime:"25:00",
      previousButton:"reset",
      time:1500,
      cycle: "Session"
    })
  }

  breakDecrement =()=> {
    if(this.state.breakTime >=2 && this.state.previousButton !=="start"){
    this.setState({
      breakTime:this.state.breakTime - 1,
      previousButton:"breakDecrement"
    })
    }
  }

  breakIncrement =()=>{
    if(this.state.breakTime < 60 && this.state.previousButton !=="start"){
      this.setState({
        breakTime:this.state.breakTime + 1,
        previousButton:"breakIncrement"

      })
    }
  }

  sessionDecrement=()=>{
    if(this.state.SessionTime >=2 && this.state.previousButton !=="start"){
      this.setState({
        SessionTime: this.state.SessionTime - 1,
        previousButton:"sessionDecrement"
      })
    }    
  }

  sessionIncrement=()=>{
    if(this.state.SessionTime < 60 && this.state.previousButton !=="start"){
      this.setState({
        SessionTime: this.state.SessionTime + 1,
        previousButton:"sessionIncrement"
      })
    }   
  }
  

  render(){
  
    return (
      <div className="App">
        <div className="clock">
        <h1 id="header">Pomodoro Clock</h1>
        <Break
          breakTime={this.state.breakTime}
          SessionTime={this.state.SessionTime}
          breakDecrement={this.breakDecrement}
          breakIncrement={this.breakIncrement}
          sessionDecrement={this.sessionDecrement}
          sessionIncrement={this.sessionIncrement}
        />
        <Session
          currentTime={this.state.currentTime}
          cycle={this.state.cycle}/>
        <Start_stop 
          previousButton={this.state.previousButton}
          start={this.start}
          stop={this.stop}
          reset={this.reset}
          />
        <Credits/>
        <Audio/>
        </div>
      </div>
    );
  }
}

const Break = (props)=>{
    return(
      <div className="control_panel">
        <div id="break">
          <h1 id="break-label">Break Length</h1>
          <div className="controls">
            <i className="fas fa-arrow-down" id="break-decrement" onClick={props.breakDecrement}>
              </i>
              <span id="break-length">{props.breakTime}</span>
            <i className="fas fa-arrow-up" id="break-increment" onClick={props.breakIncrement}>
            </i>
          </div>
        </div>
        <div>

        <div id="session">
          <h1 id="session-label">Session Length</h1>
          <div className="controls">
            <i className="fas fa-arrow-down" id="session-decrement" onClick={props.sessionDecrement}>
              </i>
              <span id="session-length">{props.SessionTime}</span>
            <i className="fas fa-arrow-up" id="session-increment" onClick={props.sessionIncrement}>
            </i>
          </div>
        </div>
        </div>
      </div>
    )
}

const Session = (props)=>{
  return(
    <div>
      <div id='timer'>
        <h1 id="timer-label">{props.cycle}</h1>
        <div id="time-left">{props.currentTime}</div>
      </div>
    </div>
  )
}

const Start_stop = (props)=>{
    if(props.previousButton==="start"){
      return(
        <div>
          <button id="start_stop" onClick={props.stop}>
          <i className="fas fa-play" style={{fontSize:35}}></i>
          <i className="fas fa-pause" style={{fontSize:35}}></i>
          </button>

          <button id="reset" onClick={props.reset}>
          <i className="fa fa-refresh" style={{fontSize:35}}></i>
          </button>      
        </div>
      )   
  }else{
    return(
      <div>
          <button id="start_stop" onClick={props.start}>
          <i className="fas fa-play" style={{fontSize:35}}></i>
          <i className="fas fa-pause" style={{fontSize:35}}></i>
          </button>

          <button id="reset" onClick={props.reset}>
          <i className="fa fa-refresh" style={{fontSize:35}}></i>
          </button>      
        </div>
    )
  }
}

const Credits = (props) => {
      return(
        <div id="credits">
          <h4 style={{color: '#a50d0d'}}>Designed by Peter Weinberg and Coded by</h4>
          <h4 style={{color:"#00264d"}}>Mollelwa Mngoma</h4>
        </div>
      )
}

const Audio = (props) =>{
    return(
      <audio id="beep" src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav">

      </audio>
    )
}

export default App;
