
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    extendedProps:{
      CheckStatus:false
    }
    //CheckStatus:false
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    extendedProps:{
      CheckStatus:true
    }
    //CheckStatus:true
  }
]

export function createEventId() {
  return String(eventGuid++)
}

// console.log(text.substr(14)); // , world!

