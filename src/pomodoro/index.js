/* @flow */
document.addEventListener('DOMContentLoaded', () =>  console.log('pomodoro.js'));

import React from 'react'
import {connect} from 'react-redux'
import Navbar from '../../Navbar'
// import pomodoroReducer from "./index"
import {
  TIME,  
  PAUSE, 
  START, 
  RUNNING,
  CLOCK_STATUS,
  WORK_COUNTER, 
  REST_COUNTER,
  REST_HISTORY, 
  WORK_HISTORY, 
  ALTER_COUNTER, 
  PERCENTAGE_COMPLETE,
} from '../Actions'
import { bindActionCreators } from 'redux'
import * as ActionCreators from "../ActionCreators"

export class Pomodoro extends React.Component {

  constructor(props) {
    super(props)
    this.stopTimer.bind(this)
    this.startTimer.bind(this)
  }

  // static defaultProps = {rest: 1, time: 0, work: 1, flipped: true, fill: "0vh"}

  propTypes: {
    modifyCount: React.PropTypes.func.isRequired,
    flipped: React.PropTypes.bool.isRequired,
    time: React.PropTypes.number.isRequired,
    work: React.PropTypes.func.isRequired,
    rest: React.PropTypes.func.isRequired,
    clock: React.PropTypes.object,
  }

  componentWillReceiveProps({running}) {
    if (!running) clearInterval(this.interval)
  }

  stopTimer() {
    return () => {
      this.props.pause()
      this.interval = clearInterval(this.interval)
    }
  }

  startTimer() {
    return () => {
      this.props.start()
      this.interval = setInterval(() => {this.props.tick()})
    }
  }

  render() {
    const { 
      time, 
      rest, 
      work, 
      fill,
      reset,
      status, 
      running, 
      restHistory, 
      modifyCount,
      workHistory, 
    } = this.props

    const timerButton = running ? this.stopTimer() : this.startTimer() 

    const timer = {
      position: 'absolute',
      top: '20%',
      right: '0',
      left: '0',
      bottom: '0',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: '50%',
      border: '2px solid black',
      backgroundImage: 'linear-gradient(0deg, black '+fill+', transparent 0%)',
    }

    return (
      <div>
        <Navbar className='pm nav'/>
        <div className='pm layout'>
          <div className='pm game-layout'>
            <div className='pm work'>
              <div>
                <div className='window'>work: {work}</div>
                <div>count: {workHistory}</div>
              </div>
              <div>
                <button onClick={()=>{modifyCount(WORK_COUNTER, 1)}}>+</button>
                <button onClick={()=>{modifyCount(WORK_COUNTER, -1)}}>-</button>
              </div>
            </div>
            <div className='pm rest'>
              <div>
                <div className='window'>rest: {rest}</div>
                <div>count: {restHistory}</div>
              </div>
              <div>
                <button onClick={()=>{modifyCount(REST_COUNTER, 1)}}>+</button>
                <button onClick={()=>{modifyCount(REST_COUNTER, -1)}}>-</button>
              </div>
            </div>
            <div style={timer}>
              <button onClick = {timerButton} className='pm timer'>
                { status } | { time }
              </button>
              <button onClick = { ()=> reset() }>reset</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

//insert npm joke here
const padLeft = (number, columns) => {
  while (number.length < columns) {number = `0${number}`}
  return number
}

const parse = (elapsedTime) => {
  const time = new Date(elapsedTime)
  const minutes = padLeft(time.getMinutes().toString(), 2)
  const seconds = padLeft(time.getSeconds().toString(), 2)
  const milliseconds = padLeft(time.getMilliseconds().toString(), 3)
  return `${minutes}:${seconds}.${milliseconds}`
}

export function mapStateToProps(state) {
  return {
    time: parse(state.pomodoroReducer[TIME]),
    running: state.pomodoroReducer[RUNNING], 
    work: state.pomodoroReducer[WORK_COUNTER],
    rest: state.pomodoroReducer[REST_COUNTER],
    status: state.pomodoroReducer[CLOCK_STATUS],
    workHistory: state.pomodoroReducer[WORK_HISTORY],
    restHistory: state.pomodoroReducer[REST_HISTORY],
    fill: `${state.pomodoroReducer[PERCENTAGE_COMPLETE]}%`,
  }
}

export function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({...ActionCreators}, dispatch)
}

const PomodoroContainer = connect(mapStateToProps, mapDispatchToProps)(Pomodoro)

export default PomodoroContainer  

/* Timer states:
 * running | stopped
 *
 * additional state:
 * stage of the timer
 * work, rest counters
 *
 * actions:
 * start | pause | TICK
 * increment | decrement : work counter
 * increment | decrement : rest counter
 */
import {
  TICK,
  START,
  PAUSE,
  RESET,
  FLIP_CYCLE,
  ALTER_COUNTER,
} from '../Actions';

export function modifyCount(counter, amount) {
  return {
    type: ALTER_COUNTER,
    payload: { counter, amount },
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function start() {
  return {
    type: START,
    payload: {
      start: Date.now(),
    },
  };
}

export function pause() {
  return {
    type: PAUSE,
  };
}

export function tick(depInj) {
  return {
    type: TICK,
    payload: {
      offset: depInj || Date.now(),
    }
  };
}

export function flipCycle() {
  return {
    type: FLIP_CYCLE,
  };
}

/* Timer states:
 * running | stopped
 *
 * additional state:
 * stage of the timer
 * work, rest counters
 *
 * actions:
 * start | pause | TICK
 * increment | decrement : work counter
 * increment | decrement : rest counter
 */
import {
  TICK,
  START,
  PAUSE,
  RESET,
  FLIP_CYCLE,
  ALTER_COUNTER,
} from '../Actions';

export function modifyCount(counter, amount) {
  return {
    type: ALTER_COUNTER,
    payload: { counter, amount },
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function start() {
  return {
    type: START,
    payload: {
      start: Date.now(),
    },
  };
}

export function pause() {
  return {
    type: PAUSE,
  };
}

export function tick(depInj) {
  return {
    type: TICK,
    payload: {
      offset: depInj || Date.now(),
    }
  };
}

export function flipCycle() {
  return {
    type: FLIP_CYCLE,
  };
}
import {
  TICK,
  TIME,
  START, 
  STAGE, 
  PAUSE, 
  RESET, 
  FLIPPED, 
  RUNNING, 
  FLIP_CYCLE,
  CLOCK_STATUS,
  WORK_COUNTER, 
  REST_COUNTER,
  WORK_HISTORY,
  REST_HISTORY,
  ALTER_COUNTER,
  PERCENTAGE_COMPLETE,
} from '../Actions'
import {modifyCount, start, pause} from "../ActionCreators"

const init = {
  [TIME]: 0,
  [STAGE]: 0, 
  [RUNNING]: false,
  [REST_HISTORY]: 0,
  [WORK_HISTORY]: 0,
  [REST_COUNTER]: 1,
  [WORK_COUNTER]: 25,
  [FLIP_CYCLE]: false,
  [FLIPPED]: false,
  [CLOCK_STATUS]: "Work Timer",
  [PERCENTAGE_COMPLETE]: 0,
}

const SEC_IN_MINUTES = 60
const kSEC_IN_SECONDS = 1000

export default function pomorodoReducer(state = init, action) {
  const newState = {...state}
  switch (action.type) {
    case START:
      // newState[TIME] = 0
      newState[RUNNING] = true
      // newState[PERCENTAGE_COMPLETE ] = 0
      newState[START] = action.payload.start

      if (newState[FLIPPED]) {
        newState[FLIPPED] = false 
        newState[CLOCK_STATUS] = newState[FLIP_CYCLE] === false 
          ? "Work Timer" 
          : "Rest Timer" 
      }
      break

    case RESET: 
      newState[TIME] = 0
      newState[START] = 0
      newState[PERCENTAGE_COMPLETE] = 0
    case PAUSE:
      newState[RUNNING] = false 
      break

    case ALTER_COUNTER:
      const {counter, amount} = action.payload
      newState[counter] = Math.max(1, newState[counter] + amount)
      break

    case TICK:
      let interval = newState[FLIP_CYCLE] === false 
        ? newState[WORK_COUNTER]  
        : newState[REST_COUNTER]

      interval = interval  * SEC_IN_MINUTES * kSEC_IN_SECONDS

      const history = newState[FLIP_CYCLE] === false 
        ? WORK_HISTORY 
        : REST_HISTORY 

      const percentage = newState[TIME] / interval
      newState[PERCENTAGE_COMPLETE] = percentage * 100    

      //has time run out?
      if (newState[TIME] >= interval) {
        //no one wants to see a timer that can't stop correctly
        newState[TIME] = interval 
        newState[RUNNING] = false
        newState[history] = newState[history] + 1
        newState[FLIP_CYCLE] = !newState[FLIP_CYCLE]
        newState[FLIPPED] = true
        //  
        // newState[TIME] = 0
        newState[START] = 0
      }
      else {
        const {offset} = action.payload
        newState[TIME] = newState[TIME] + (offset - newState[START])
        newState[START] = offset
      }
      break

    default:
      break
  }

  return newState
}