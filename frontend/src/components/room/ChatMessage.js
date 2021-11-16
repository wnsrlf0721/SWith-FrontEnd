import styled from "styled-components";

export const ChatMessage = ({ chat_message }) => {

    const Container = styled.div`

    `

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

    return (
        <ChatBox>
            <UserBox>{chat_message.name}</UserBox>
            <ContentBox>{chat_message.content}</ContentBox>
        </ChatBox>
    );
};