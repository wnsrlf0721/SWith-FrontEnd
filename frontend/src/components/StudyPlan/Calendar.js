import './css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState, useEffect } from 'react';
import {
  getUserPlanner,
  deletePlannerTask,
  putPlannerTask,
  postPlannerTask,
} from '../../api/APIs';
import CalendarTutorial from './CalendarTutorial';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

import '@fullcalendar/core';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import infoIcon from '../../images/info_icon.svg';

const Calendar = ({ userId }) => {
  const [dateStr, setDateStr] = useState(new Date().toDateString());
  const [currentEvents, setCurrentEvents] = useState([]);
  const [todo, setTodo] = useState([]);
  const [isUser, setIsUser] = useState(true);
  const [tfCheck, setTfCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [getEvent, setEvent] = useState([
    {
      id: '',
      title: '',
      start: '',
      end: '',
      allDay: '',
    },
  ]);
  const userInfo = JSON.parse(window.localStorage.userInfo);

  const HandleLoad = () => {
    useEffect(() => {
      let tempEvents = [];
      let tempTodo = [];
      getUserPlanner(userId)
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
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  };
  const handleEventDelete = (event) => {
    deletePlannerTask(userInfo.userId, event.id)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getTodoCheck = (eventId) => {
    //let IdNum = event.id;
    let check = false;
    todo.map((x) => (x.id == eventId ? (check = x.check) : check));
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
    if (userInfo.userId !== Number(userId)) {
      alert('다른사람의 일정은 변경할 수 없습니다!');
      return;
    }
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
    if (!getTodoCheck(event.id)) {
      chch = 1;
    }
    putPlannerTask(userInfo.userId, event.id, event.title, start, end, chch)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
        }
        window.location.reload();
      })
      .catch((error) => {
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
    if (userInfo.userId !== Number(userId)) {
      setIsUser(false);
      alert('다른사람의 일정은 변경할 수 없습니다!');
      return;
    }
    let title = prompt('새로운 일정을 등록하세요');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
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
    if (title && title.length < 21) {
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
          if (data.status === '200' && data.message === 'OK') {
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else if (title && title.length > 20) {
      return alert('일정 내용은 20자 이하로 입력해주세요.');
    }
  };

  const handleEventClick = (clickInfo) => {
    if (userInfo.userId !== Number(userId)) {
      alert('다른사람의 일정은 변경할 수 없습니다!');
      return;
    }
    if (window.confirm(`정말 '${clickInfo.event.title}'을 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
      handleTodoRemove(clickInfo.event);
      handleEventDelete(clickInfo.event);
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const selectOneday = (selectInfo) => {
    let startDate = selectInfo.start;
    let endDate = selectInfo.end;
    endDate.setSeconds(endDate.getSeconds() - 1);
    if (startDate.getDate() === endDate.getDate()) {
      return true;
    } else {
      return false;
    }
  };

  const renderSidebarEvent = (event) => {
    let Start = event.start.toDateString();
    if (Start === dateStr) {
      return (
        <li key={event.id}>
          <input
            type="checkbox"
            checked={getTodoCheck(event.id)}
            onChange={() => HandleTodoCheck(event)}
          ></input>
          <b>{event.title}</b>
        </li>
      );
    }
  };
  const CustomInputButton = ({ value, onClick }) => (
    <button class="customDateInput" style={{ fontSize: '14px' }} onClick={onClick}>
      {' '}
      {value}{' '}
    </button>
  );

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>To-do list</h2>
            <img src={infoIcon} onClick={openModal}></img>
          </div>
          {modalVisible && (
            <CalendarTutorial
              visible={modalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeModal}
            ></CalendarTutorial>
          )}

          <DatePicker
            selected={new Date(dateStr)}
            onChange={(date) => setDateStr(date.toDateString())}
            locale={ko}
            dateFormat="yyyy-MM-dd"
            customInput={<CustomInputButton />}
            todayButton="오늘"
          />
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
          editable={false}
          selectable={isUser}
          selectMirror={isUser}
          dayMaxEvents={true}
          weekends={true}
          events={getEvent}
          initialEvents={HandleLoad()}
          select={handleDateSelect}
          selectAllow={selectOneday}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
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
  return str.length >= 2 ? str : new Array(2 - str.length + 1).join('0') + str;
}

let today = new Date().toLocaleDateString();

export default React.memo(Calendar);
