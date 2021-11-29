import './css/Chat.css';

import { useState, useEffect, useCallback } from 'react';
import ChatMessage from './ChatMessage';
import socket from '../../socket/socket';

const Chat = ({ userNickName }) => {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chatting', (data) => {
      console.log(data);
      setMessages((old) => [...old, data]);
    });
  }, []);

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      setMessages((old) => [
        ...old,
        {
          name: userNickName,
          messageSendID: socket.id,
          content: content,
          date: new Date(),
        },
      ]);

      console.log(content);
      socket.emit('chatting', {
        name: userNickName,
        messageSendID: socket.id,
        content: content,
        date: new Date(),
      });
      setContent('');
    },
    [content],
  );

  return (
    <>
      <div className="chatContainer">
        <div className="TitleHeader">
          <div className="Title">채팅</div>
        </div>
        <div id="chat">
          <div className="ChatWrap">
            {messages.map((message, index) => {
              return <ChatMessage key={index} chat_message={message}></ChatMessage>;
            })}
          </div>

          <div className="InputBox">
            <form onSubmit={sendMessage}>
              <input className="Input" onChange={onChangeContent} value={content} />
              <button className="Button">전송</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
