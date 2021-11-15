import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "../../api/defaultaxios";
import Topbar from "../topbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import moment from "moment";

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin-top: 50px;
  .page {
    display: flex;
    position: relative;
    margin: 0 auto;
    padding: 50px 50px 63px;

    flex-direction: column;
  }
`;
const Rowarea = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px dashed #ef8585;
  .react-datepicker-wrapper {
    width: auto;
  }
  .container {
    display: flex;
  }
  .tag {
    display: flex;
    align-items: center;
    margin: 7px 0;
    margin-right: 10px;
    padding: 0 10px;
    padding-right: 5px;
    border: 1px solid #ef8585;
    border-radius: 5px;
    background-color: #ef8585;
    white-space: nowrap;
    color: white;
  }

  .tag button {
    display: flex;
    padding: 6px;
    border: none;
    background-color: unset;
    cursor: pointer;
    color: white;
  }
`;
const Label = styled.label`
  display: flex;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 1;
`;
const Input = styled.input`
  padding: 15px;
  margin-left: 10px;
  background-color: white;
  border: 1px solid #828282;
  border-radius: 3px;
  font-size: 15px;
  font-weight: normal;
  font-family: Roboto;
`;
const DateInput = styled(DatePicker)`
  padding: 15px;
  margin-left: 10px;
  background-color: white;
  border: 1px solid #828282;
  border-radius: 3px;
  font-size: 15px;
  font-weight: normal;
  font-family: Roboto;
`;
const Button = styled.button`
  align-items: center;
  width: 100%;
  height: 48px;
  margin-top: 30px;
  background-color: #ef8585;
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 0;
  outline: 0;
  text-decoration: none;
`;
const Index = () => {
  useEffect(() => {
    const isLogined = window.sessionStorage.userInfo == null ? false : true;
    if (!isLogined) {
      alert("로그인이 필요합니다.");
      return (window.location.href = "/login");
    }
  }, []);

  // title(방 제목), purpose(필터링), password(비밀번호), notice(공지사항), endDate, hashTag(해시태그)

  const [inputTag, setInputTag] = useState("");
  const [roominfo, setRoominfo] = useState({
    title: "",
    purpose: "",
    notice: "",
    hashTag: [],
    endDate: new Date(), //'YYYY-MM-DD HH:MM:SS' 형식
    secret: 0,
    password: "",
  });

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setRoominfo((previnfo) => ({
        ...previnfo,
        title: value,
      }));
    } else if (name === "purpose") {
      setRoominfo((previnfo) => ({
        ...previnfo,
        purpose: value,
      }));
    } else if (name === "hashTag") {
      setInputTag(value);
    } else if (name === "notice") {
      setRoominfo((previnfo) => ({
        ...previnfo,
        notice: value,
      }));
    } else if (name === "password") {
      setRoominfo((previnfo) => ({
        ...previnfo,
        password: value,
      }));
    }
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = inputTag.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !roominfo.hashTag.includes(trimmedInput)
    ) {
      e.preventDefault();
      setRoominfo((previnfo) => ({
        ...previnfo,
        hashTag: [...previnfo.hashTag, trimmedInput],
      }));
      setInputTag("");
    }
  };
  const deleteTag = (index) => {
    setRoominfo((previnfo) => ({
      ...previnfo,
      hashTag: previnfo.hashTag.filter((tag, i) => i !== index),
    }));
  };
  const onsubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!roominfo.title) {
        return alert("스터디룸 이름이 비어있으면 안됩니다");
      }
      const room = roominfo;
      room.endDate = moment(room.endDate).format("YYYY-MM-DD 00:00:00");
      if (room.password) {
        room.secret = 1;
      }
      console.log(room);
      axios
        .post("/studyrooms", room)
        .then((response) => {
          console.log(response);
          alert("스터디룸 생성 성공!");
          return (window.location.href = "/");
        })
        .catch((error) => {
          console.log(error.toJSON());
          alert("input 입력이 잘못된것 같습니다.");
        });
    },
    [roominfo]
  );
  return (
    <div>
      <Topbar />
      <Container>
        <div className="page">
          <Rowarea>
            <Label>스터디 이름</Label>
            <Input
              name="title"
              onChange={(e) => onChangehandler(e)}
              value={roominfo.title}
            />
          </Rowarea>
          <Rowarea>
            <Label>필터링</Label>
            <Input
              name="purpose"
              onChange={(e) => onChangehandler(e)}
              value={roominfo.purpose}
            />
          </Rowarea>
          <Rowarea>
            <Label>기간</Label>
            <DateInput
              selected={roominfo.endDate}
              onChange={(date) =>
                setRoominfo((previnfo) => ({
                  ...previnfo,
                  endDate: date,
                }))
              }
              locale={ko}
              dateFormat="yyyy-MM-dd"
            />
          </Rowarea>
          <Rowarea>
            <Label>해시태그</Label>
            <div className="container">
              {roominfo.hashTag.map((tag, index) => (
                <div className="tag">
                  {tag}
                  <button onClick={() => deleteTag(index)}>x</button>
                </div>
              ))}
              <Input
                name="hashTag"
                placeholder="Enter a tag"
                onChange={(e) => onChangehandler(e)}
                onKeyDown={(e) => onKeyDown(e)}
                value={inputTag}
              />
            </div>
          </Rowarea>
          <Rowarea>
            <Label>공지사항</Label>
            <Input
              name="notice"
              onChange={(e) => onChangehandler(e)}
              value={roominfo.notice}
            />
          </Rowarea>
          <Rowarea>
            <Label>비밀번호</Label>
            <Input
              name="password"
              onChange={(e) => onChangehandler(e)}
              value={roominfo.password}
            />
          </Rowarea>
          <Button onClick={onsubmit}>스터디 생성</Button>
        </div>
      </Container>
    </div>
  );
};

export default Index;
