export const ChatMessage = ({ chat_message }) => {

    return (
        <div>
            <b>사용자:{chat_message.name}</b>{" "}
            <span> 내용 :{chat_message.content}</span>
        </div>
    );
};