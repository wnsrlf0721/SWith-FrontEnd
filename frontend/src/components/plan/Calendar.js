
import React, { useEffect } from "react";
//import Topbar from "../main/topbar";
import "./styles.css";

//import styled from "styled-components";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import { INITIAL_EVENTS, createEventId,currentID} from './event-utils';

let todayStr = new Date().toDateString() // YYYY-MM-DD of today
let today = new Date().toLocaleDateString()

export default class Calendar extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    todo: [
      {
        id:'0' ,
        check: false,
        title:'0번',
        date:''
      },
      {
        id:'1' ,
        check: true,
        title:'1번',
        date:''
      }
      
    ]
  }

  render() {

    return (
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            locale="ko"
            initialView="dayGridMonth"

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
    );
  }


  // eventAdd={function(){}}
  // eventChange={function(){}}
  // eventRemove={function(){}}

/* 여기서부터 api연결부분 */

  eventAllSave=(event)=>{
    //currentEvent라는 배열에 현재 시점까지의 이벤트들이 전부 들어있고 이것을 한꺼번에 DB에 올리는 부분.. 실제로는 필요x

/*
    this.state.currentEvents.map((event)=> {
      "taskID": event.id,
      
      "taskDescription":event.title,
    
      "startDate":event.start,
      
      "endDate":event.end,
      
      "complete":+this.getTodoCheck(event.id)//boolean값을 0,1로 바꿈
    })
*/
  }

  handleEventAdd = (event) =>{
    //해당 이벤트를 캘린더의 클릭으로 생성하였으므로 데이터베이스에 이벤트를 추가해야함
/*
    "taskID": event.id,

    "taskDescription":event.title,
  
    "startDate":event.start,
    
    "endDate":event.end,
    
    "complete":+this.getTodoCheck(event.id)//boolean값을 0,1로 바꿈
*/
  }
  handleEventChange = (event) =>{
    //체크 상태가 바뀐 이벤트를 데이터베이스에 반영, 해당 이벤트만 내용을 수정할 것인가?

  }

  handleEventRemove = (event) =>{
    //달력에 존재하는 이벤트를 클릭할 때 이벤트가 삭제됨, 파라미터에 들어온 이벤트를 DB에서 삭제하는 부분

  }

  renderSidebar() {
    // const {todo} = this.state;
    // console.log(todo);
    return (
      <div className="demo-app-sidebar">
        <div className='demo-app-sidebar-section'>
          <h2>오늘의 To-do list</h2>
          <h3>{today}</h3>
          <ul>
            {this.state.currentEvents.map(this.renderSidebarEvent)}
          </ul>
        </div>
      </div>
    );
  }

  //userId.taskDescription=부분들,,,배열?

  getTodoCheck = (event) => {
    let IdNum = event.id;
    const { todo } = this.state;
    let chch;
    todo.map((x)=> { 
      if(x.id === IdNum) { 
        chch = x.check;
      } })
    return chch
  }
  handleTodoUpdate = (event) => {
    let IdNum = event.id;
    const { todo } = this.state;
    this.setState({
      todo: todo.map(
        info => IdNum === info.id
          ? { ...info, check: !info.check } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
          : info // 기존의 값을 그대로 유지
      )
    });
    this.handleEventChange(event);
  };

  handleTodoCreate = (event) => {
    const { todo } = this.state;
    this.setState({
      todo: todo.concat({ id: event.id, check:false, title:event.title,date:event.end})
    })
  }

  handleTodoRemove = (event) => {
    const { todo } = this.state;
    this.setState({
      todo: todo.filter(info => info.id !== event.id),
    });
  };



  handleDateSelect = (selectInfo) => {
    let title = prompt('새로운 일정을 등록하세요')
    let calendarApi = selectInfo.view.calendar
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
      let event = calendarApi.getEventById(idNum);
      this.handleTodoCreate(event);
      this.handleEventAdd(event)
    }
    
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`정말 '${clickInfo.event.title}'을 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
      this.handleTodoRemove(clickInfo.event);
      this.handleEventRemove(clickInfo.event);
      //console.log(clickInfo.event.id);
    }
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  
  renderSidebarEvent= (event) => {
    let Start = event.start.toDateString() 
    let Today = new Date()
  
   
    if(!event.end){
      if(Start==todayStr){
        return (
          <li key={event.id}>
            <input
              type='checkbox'
              checked={this.getTodoCheck(event)}
              onChange={()=>this.handleTodoUpdate(event)}
            ></input>
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
            <input
              type='checkbox'
              checked={this.getTodoCheck(event)}
              onChange={()=>this.handleTodoUpdate(event)}
            ></input>        
          
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
