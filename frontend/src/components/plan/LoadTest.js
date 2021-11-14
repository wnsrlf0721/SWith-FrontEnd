import React, { useState,useEffect} from 'react';
import axios from "../../api/defaultaxios";
import eventList from './eventList'
export function LoadTest() {
  const [getEvent, setEvent] = useState([{
    id:'',
    title:'',
    start:'',
    end:''
  }]);
  const {id,title,start,end} = getEvent;
  useEffect(() => {
    let tempEvents = [];
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    axios
      .get(`/planners/${userInfo.userId}`)
      .then((events) => {
        const tasks= events.data.data.studyplanner_Tasks;
        tasks.map((task)=>{
          tempEvents= tempEvents.concat(
          {
            id: task.id,
            title: task.taskDescription,
            start: task.startDate,
            end: task.endDate
          })
        });setEvent(tempEvents)       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //console.log(getEvent);
  return 0;
};
export default LoadTest;

