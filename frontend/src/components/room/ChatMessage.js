import styled from "styled-components";
import { useEffect,useRef } from "react";

export const ChatMessage = ({ chat_message }) => {

    const ChatBox = styled.div`
        font-size: 1rem;
        border-bottom: 1px solid #e5e5e5;
        padding: 5px 18px;
        
    `
    const UserBox = styled.div`
      
        margin: 5px 0;
        font-size:14px;
        font-weight:bold;
        font-family: "Roboto";
        
    `
    const ContentBox = styled.pre`
        color:#312b30;
        font-family: "Roboto";
        font-size:16px;
    `
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(scrollToBottom, [chat_message]);

    return (
        <ChatBox>
            <UserBox>{chat_message.name}</UserBox>
            <ContentBox>{chat_message.content}</ContentBox>
            <div ref={messagesEndRef} />
        </ChatBox>
    );
};