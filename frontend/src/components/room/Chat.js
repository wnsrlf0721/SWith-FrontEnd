import { useState, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import socket from "./utils/Socket"
import './Chat.css';
export const Chat = ({ userNickName }) => {
    const [content, setContent] = useState("");
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

    const sendMessage = () => {
        setMessages((old) => [...old, {
            name: userNickName,
            messageSendID: socket.id,
            content: content,
            date: new Date(),
        }]);

        console.log(content);
        socket.emit("chatting", {
            name: userNickName,
            messageSendID: socket.id,
            content: content,
            date: new Date(),
        });
        setContent("");
    };

    

    return (
        <>
            <div className   = "chatContainer">
                <div className="TitleHeader">
                    <div className="Title">채팅</div>
                </div>
                <div id="chat" >
                    <div className="ChatWrap">
                        {
                            messages.map((message, index) => {
                                return <ChatMessage key={index} chat_message={message} ></ChatMessage>
                                
                            })
                            
                        }
                    </div>
                    
                    <div className="InputBox">
                        <input className="Input" onChange={onChangeContent} value={content} />
                        <button className="Button" onClick={sendMessage}>전송</button>
                    </div>
                    
                </div>
            </div>
            
        </>
    );
};