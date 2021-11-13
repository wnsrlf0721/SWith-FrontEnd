
import React, { useState,useEffect } from "react";
//import styled from "styled-components";
import "./styles.css";
import axios from "../../api/defaultaxios";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import { INITIAL_EVENTS, createEventId,currentID} from './event-utils';
import LoadTest from "./LoadTest"
///////////////////////////////////
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

let todayStr = new Date().toDateString() // YYYY-MM-DD of today
let today = new Date().toLocaleDateString()
let tooday = new Date().toISOString().substring(0,19);
const Calendar = () => {
  const [currentEvents,setCurrentEvents] = useState([]);
  const [todo,setTodo] = useState([]);
  const [getEvent, setEvent] = useState([{
    id:'',
    title:'',
    start:'',
    end:'',
  }]);
  //const {id,title,start,end} = currentEvents;
  //const {id,title,start,end} = getEvent;
  const {id,check} = todo;

  const HandleLoad = () =>{
    useEffect(() => {
      let tempEvents = [];
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      axios
        .get(`/planners/${userInfo.userId}`)
        .then((events) => {
          const tasks= events.data.data.studyplanner_Tasks;
          tasks.map((task)=>{
            // const startTxt = [task.startDate.getFullYear(),task.startDate.getMonth()+1,task.startDate.getDate(),task.startDate.toTimeString().substring(0,8)].join()
            // const endTxt = [task.endDate.getFullYear(),task.endDate.getMonth()+1,task.endDate.getDate(),task.endDate.toTimeString().substring(0,8)].join()
            // if(endTxt - startTxt == )
            tempEvents= tempEvents.concat(
            {
              id: task.id,
              title: task.taskDescription,
              start: task.startDate,
              end: task.endDate
            })
          });setEvent(tempEvents);
          return getEvent;      
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    console.log(getEvent);
    return getEvent; 
  }

  const handleEventDelete = (event) =>{
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    axios
    .delete(`/planners/${userInfo.userId}/${event.id}`, {
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      if (data.status === "200" && data.message === "OK") {
        //alert(`성공`);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      //alert("오류");
    });
  }

  const getTodoCheck = (event) => {
    let IdNum = event.id;
    let check;
    todo.map((x)=> { 
      if(x.id === IdNum) { 
        check = x.check;
      } })
    return check
  };

  const handleTodoUpdate = (event) => {
    let IdNum = event.id;
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    setTodo(
      todo.map(info =>
        info.id === IdNum ? { ...info, check: !info.check, } : info
      )
    );

    axios
    .put(`/planners/${userInfo.userId}/${event.id}`, {
      taskDescription:event.title,
      startDate:event.start,
      endDate:event.end, 
      complete:+getTodoCheck(event)
    })
    .then((response) => {
      const data = response.data;
      console.log(+getTodoCheck(event))
      //console.log({todo})
      console.log(data);
      if (data.status === "200" && data.message === "OK") {
        //alert(`성공`);
      }
      window.location.reload();
    })
    .catch((error) => {
      console.log(event.id)
      console.log(getTodoCheck(event))
      console.log(error.toJSON());

    });
    
  };

  const handleTodoCreate = (event) => {
    const TempTodo = {
      id:event.id,
      check:false
    };
    setTodo(todo.concat(TempTodo));
  }
  const handleTodoRemove = (event) => {
    setTodo(todo.filter(info => info.id !== event.id));
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt('새로운 일정을 등록하세요')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    // let start = selectInfo.start.toISOString().substring(0,19);
    // let end = selectInfo.end.toISOString().substring(0,19);
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    const startDate = selectInfo.start;
    const endDate = selectInfo.end;
    const start = [startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate()].join('-')+'T'+startDate.toTimeString().substring(0,8)
    const end = [endDate.getFullYear(),endDate.getMonth()+1,endDate.getDate()].join('-')+'T'+endDate.toTimeString().substring(0,8)

    //let idNum = createEventId();
    //console.log(selectInfo)  
    if (title) {
        axios
        .post(`/planners/${userInfo.userId}`, {
          taskDescription:title,
          startDate:start,
          endDate:end, 
          complete:0
        })
        .then((response) => {
          const data = response.data;
          calendarApi.addEvent({
            id: data.data.taskId,
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
            
          });
          let event = calendarApi.getEventById(data.data.taskId);
          handleTodoCreate(event);
          //handleEventAdd(event); 
          console.log(start)
          console.log(data);
          console.log(event)
          //console.log(data.data.taskId);
          if (data.status === "200" && data.message === "OK") {
            //alert(`성공`);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          //alert("오류");
        });

    }
  }

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`정말 '${clickInfo.event.title}'을 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
      handleTodoRemove(clickInfo.event);
      handleEventDelete(clickInfo.event);
      console.log(todo);
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  }

  const renderSidebarEvent= (event) => {
    let Start = event.start.toDateString() 
    let Today = new Date()
    //console.log(event.start.toISOString().substring(0,19));
    //console.log(event.end.toISOString().substring(0,19))
    if(!event.end){
      if(Start==todayStr){
        return (
          <li key={event.id}>
            <input
              type='checkbox'
              checked={getTodoCheck(event)}
              onChange={()=>handleTodoUpdate(event)}
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
              checked={getTodoCheck(event)}
              onChange={()=>handleTodoUpdate(event)}
            ></input>                
            <b>{event.title}</b>
          </li>
        )
      }
      
    }
    //   return (
    //   <li key={event.id}>
    //     <input
    //       type='checkbox'
    //       checked={getTodoCheck(event)}
    //       onChange={()=>handleTodoUpdate(event)}
    //     ></input>  
    //     <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
    //     <i>{event.title}</i>
    //   </li>
    // )
  }
  const renderSidebar = ()=> {
    return (
      <div className="demo-app-sidebar">
        <div className='demo-app-sidebar-section'>
          <h2>오늘의 To-do list</h2>
          <h3>{today}</h3>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    );
  }
  return (  
    <div className="demo-app">
      <LoadTest/>
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
          weekends={true}
          events = {getEvent}
          initialEvents={HandleLoad()} 
          //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          
       />
      </div>
      {renderSidebar()}
    </div>
  );

}

export default Calendar;