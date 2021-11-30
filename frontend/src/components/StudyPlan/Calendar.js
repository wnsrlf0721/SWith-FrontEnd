import './css/styles.css';

import React, { useState, useEffect } from 'react';
import {
  getUserPlanner,
  deletePlannerTask,
  putPlannerTask,
  postPlannerTask,
} from '../../api/APIs';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/core';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [todo, setTodo] = useState([]);
  const [getEvent, setEvent] = useState([
    {
      id: '',
      title: '',
      start: '',
      end: '',
      allDay: '',
    },
  ]);

  const HandleLoad = () => {
    useEffect(() => {
      let tempEvents = [];
      let tempTodo = [];
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      getUserPlanner(userInfo.userId)
        .then((events) => {
          const tasks = events.data.data.studyplanner_Tasks;
          tasks.map((task) => {
            const taskStart = task.startDate;
            const taskEnd = task.endDate;
            const startTxt = [
              taskStart.substring(11, 13),
              taskStart.substring(14, 16),
            ].join('');
            const endTxt = [taskEnd.substring(11, 13), taskEnd.substring(14, 16)].join(
              '',
            );
            let allday = false;
            if (
              endTxt.substring(0, 4) === '0000' &&
              startTxt.substring(0, 4) === '0000'
            ) {
              allday = true;
            }
            tempEvents = tempEvents.concat({
              id: task.id,
              title: task.taskDescription,
              start: task.startDate,
              end: task.endDate,
              allDay: allday,
            });
            tempTodo = tempTodo.concat({
              id: task.id,
              check: Boolean(task.complete),
            });
          });
          setEvent(tempEvents);
          setTodo(tempTodo);
          //return getEvent;
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  };

  const handleEventDelete = (event) => {
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    deletePlannerTask(userInfo.userId, event.id)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === '200' && data.message === 'OK') {
          //alert(`성공`);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        //alert("오류");
      });
  };

  const getTodoCheck = (event) => {
    let IdNum = event.id;
    let check = false;
    todo.map((x) => {
      if (x.id == IdNum) {
        check = x.check;
      }
    });
    return check;
  };

  const HandleTodoCheck = (event) => {
    let IdNum = event.id;
    setTodo(
      todo.map((info) => (info.id === IdNum ? { ...info, check: !info.check } : info)),
    );
    HandleTodoUpdate(event);
  };

  const HandleTodoUpdate = (event) => {
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    const startDate = event.start;
    const endDate = event.end;
    let chch = 0;
    const start =
      [
        startDate.getFullYear(),
        fillZero((startDate.getMonth() + 1).toString()),
        startDate.toString().substring(8, 10),
      ].join('-') +
      'T' +
      startDate.toTimeString().substring(0, 8);
    const end =
      [
        endDate.getFullYear(),
        fillZero((endDate.getMonth() + 1).toString()),
        endDate.toString().substring(8, 10),
      ].join('-') +
      'T' +
      endDate.toTimeString().substring(0, 8);
    if (!getTodoCheck(event)) {
      chch = 1;
    }
    putPlannerTask(userInfo.userId, event.id, event.title, start, end, chch)
      .then((response) => {
        const data = response.data;
        console.log(todo);
        console.log(data);
        if (data.status === '200' && data.message === 'OK') {
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log(todo);
        console.log(error.toJSON());
      });
  };

  const handleTodoCreate = (event) => {
    const TempTodo = {
      id: event.id,
      check: false,
    };
    setTodo(todo.concat(TempTodo));
  };
  const handleTodoRemove = (event) => {
    setTodo(todo.filter((info) => info.id !== event.id));
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt('새로운 일정을 등록하세요');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    const startDate = selectInfo.start;
    const endDate = selectInfo.end;
    const start =
      [
        startDate.getFullYear(),
        fillZero((startDate.getMonth() + 1).toString()),
        startDate.toString().substring(8, 10),
      ].join('-') +
      'T' +
      startDate.toTimeString().substring(0, 8);
    const end =
      [
        endDate.getFullYear(),
        fillZero((endDate.getMonth() + 1).toString()),
        endDate.toString().substring(8, 10),
      ].join('-') +
      'T' +
      endDate.toTimeString().substring(0, 8);
    console.log(startDate);
    console.log(start);
    if (title) {
      postPlannerTask(userInfo.userId, title, start, end)
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
          console.log(data);
          if (data.status === '200' && data.message === 'OK') {
            //alert(`성공`);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          //alert("오류");
        });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`정말 '${clickInfo.event.title}'을 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
      handleTodoRemove(clickInfo.event);
      handleEventDelete(clickInfo.event);
      window.location.reload();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderSidebarEvent = (event) => {
    let Start = event.start.toDateString();
    let Today = new Date();
    if (!event.end) {
      if (Start === todayStr) {
        return (
          <li key={event.id}>
            <input
              type="checkbox"
              checked={getTodoCheck(event)}
              onChange={() => HandleTodoCheck(event)}
            ></input>
            <b>{event.title}</b>
          </li>
        );
      }
    } else {
      let startMD = String(
        event.start.getMonth() + event.start.getDate().toString().padStart(2, '0') + '00',
      );
      let todayMD = String(
        Today.getMonth() + Today.getDate().toString().padStart(2, '0') + '01',
      );
      let endMD = String(
        event.end.getMonth() +
          event.end.getDate().toString().padStart(2, '0') +
          event.end.getHours().toString().padStart(2, '0'),
      );

      if (todayMD >= startMD && todayMD <= endMD) {
        return (
          <li key={event.id}>
            <input
              type="checkbox"
              checked={getTodoCheck(event)}
              onChange={() => HandleTodoCheck(event)}
            ></input>
            <b>{event.title}</b>
          </li>
        );
      }
    }
  };
  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>오늘의 To-do list</h2>
          <h3>{today}</h3>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          locale="ko"
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={getEvent}
          initialEvents={HandleLoad()}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        />
      </div>
      {renderSidebar()}
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
function fillZero(str) {
  return str.length >= 2 ? str : new Array(2 - str.length + 1).join('0') + str; //남는 길이만큼 0으로 채움
}

let todayStr = new Date().toDateString(); // YYYY-MM-DD of today
let today = new Date().toLocaleDateString();

export default React.memo(Calendar);
