import { useState, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import socket from "./utils/Socket"

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
        <div id="chat">
            내용
            <input onChange={onChangeContent} value={content} />
            <button onClick={sendMessage}>보내기</button>
            {
                messages.map((message, index) => {
                    return <ChatMessage key={index} chat_message={message} ></ChatMessage>
                })
            }
        </div>
    );
};