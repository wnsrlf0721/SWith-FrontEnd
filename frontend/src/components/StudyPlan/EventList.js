import React from 'react';

function Event({ event }) {
  return (
    <div>
      <b>{event.id}</b> <span>({event.title})</span>
    </div>
  );
}

function eventList({ events }) {
  return (
    <div>
      {events.map((event) => (
        <Event event={event} key={event.id} />
      ))}
    </div>
  );
}
