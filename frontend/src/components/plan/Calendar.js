import React,{useState} from "react";
//import Topbar from "../main/topbar";
import "./styles.css";

//import styled from "styled-components";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

import "@fullcalendar/core";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import { INITIAL_EVENTS, createEventId,currentID} from './event-utils';

let todayStr = new Date().toDateString() // YYYY-MM-DD of today
let today = new Date().toLocaleDateString()
//let checkStatus 
// const [inputs, setInputs] = useState({
//   username: '',
//   email: ''
// }); 
export default class Calendar extends React.Component {


  state = {
    weekendsVisible: true,
    currentEvents: [],
    todo: [
      {
        id:'0' ,
        check: false,
        title:'0번'
      },
      {
        id:'1' ,
        check: true,
        title:'1번'
      }
      
    ]
  }
  

  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locale='ko'
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          
        </div>
        {this.renderSidebar()}
      </div>
    )
  }

  renderSidebar() {
    // const {todo} = this.state;
    // console.log(todo);
    return (
      <div className='demo-app-sidebar'>
        {/* <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div> */}
        {/* <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div> */}
        <div className='demo-app-sidebar-section'>
          <h2>오늘의 To-do list</h2>
          <h3>{today}</h3>
          <ul>
            {this.state.currentEvents.map(this.renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  // handleTodoToggle = () => {
  //   const { todo } = this.state;
  //   this.setState({
  //     // weekendsVisible: !this.state.weekendsVisible

  //   })
  // }


  getTodoCheck = (id) => {
    const { todo } = this.state;
    let chch;
    todo.map((x)=> { 
      if(x.id === id) { 
        chch = x.check;
      } })
    // console.log(ResultTF);
    // return ResultTF
    return chch
  }
  handleTodoUpdate = (id) => {
    const { todo } = this.state;
    this.setState({
      todo: todo.map(
        info => id === info.id
          ? { ...info, check: !info.check } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
          : info // 기존의 값을 그대로 유지
      )
    })
  };

  handleTodoCreate = (idNum,title) => {
    const { todo } = this.state;
    this.setState({
      todo: todo.concat({ id: idNum, check:false, title:title  })
    })
  }

  handleTodoRemove = (id) => {
    const { todo } = this.state;
    this.setState({
      todo: todo.filter(info => info.id !== id),
    });
  };



  handleDateSelect = (selectInfo) => {
    let title = prompt('새로운 일정을 등록하세요')
    let calendarApi = selectInfo.view.calendar
    //const { todo } = this.state;
    calendarApi.unselect() // clear date selection

    if (title) {
      let idNum = createEventId();
      calendarApi.addEvent({
        id: idNum,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      // const { todo } = this.state;
      this.handleTodoCreate(idNum,title);
      //console.log(todo)
      //console.log(title)
      //console.log()
      
    }
    
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`정말 '${clickInfo.event.title}'을 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
      this.handleTodoRemove(clickInfo.event.id);
      //console.log(clickInfo.event.id);
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  
  renderSidebarEvent=(event)=> {
    let Start = event.start.toDateString() 
    let Today = new Date()
    
  return (
    <li key={event.id}>
      <input
        type='checkbox'
        checked={this.getTodoCheck(event.id)}
        onChange={()=>this.handleTodoUpdate(event.id)}
      ></input>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )


  }
}
///////////////////////////////////
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}









