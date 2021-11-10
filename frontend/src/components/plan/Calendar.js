import React, {useState} from "react";
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

import { INITIAL_EVENTS, createEventId } from './event-utils';

let todayStr = new Date().toDateString() // YYYY-MM-DD of today
let today = new Date().toLocaleDateString()


export default class Calendar extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
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
            initialView='timeGridWeek'
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
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('새로운 일정을 등록하세요')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`정말 '${clickInfo.event.title}'을 삭제하시겠습니까?`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
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

function renderSidebarEvent(event) {
  let Start = event.start.toDateString() 
  let Today = new Date()

 
  if(!event.end){
    if(Start==todayStr){
      return (
        <li key={event.id}>
          
          <b>{event.title}</b>
        </li>
      )
    }
  }
  else{
    let startMD = String(event.start.getMonth()+event.start.getDate().toString().padStart(2,'0')+'00')
    let todayMD = String(Today.getMonth()+ Today.getDate().toString().padStart(2,'0')+'01')
    let endMD = String(event.end.getMonth()+event.end.getDate().toString().padStart(2,'0')+event.end.getHours().toString().padStart(2,'0'))
    
   

    if((todayMD>=startMD)&&(todayMD<=endMD)){
    // if((Today.getTime()>=event.start.getTime()&&(Today.getTime()<=event.end.getTime()))){
      return (
        <li key={event.id}>
          <b>{event.title}</b>
        </li>
      )
    }

    
  }
// 원본 코드
// return (
//   <li key={event.id}>
//     <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//     <i>{event.title}</i>
//   </li>
// )


}








