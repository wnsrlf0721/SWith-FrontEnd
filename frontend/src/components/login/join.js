import React, { useState } from "react";
import styled from "styled-components";
import axios from "../../api/defaultaxios";

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin-top: 150px;
`;
const JoinPage = styled.div`
  display: flex;
  position: relative;
  width: 400px;
  margin: 0 auto;
  padding: 50px 50px 63px;

  background: #fafafa;
  border: 1px solid #e4e6eb;
  box-sizing: border-box;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  line-height: 1;

  flex-direction: column;

  h4 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: normal;
    letter-spacing: normal;
    margin: 0 0 10px 0;
    color: #000000;
    text-align: left;
  }
`;
const Join = styled.div`
  margin: 18px 0 0 0;
  padding: 0;
  text-align: left;
`;
const Text = styled.div`
  position: relative;
  margin-top: 12px;
  div {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }
  a {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    color: #ef8585;
    text-decoration: none;
  }
`;
const Label = styled.label`
  display: flex;
  margin: 0;
  padding-bottom: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #4b5054;
  line-height: 1;
`;
const Input = styled.input`
  width: 90%;
  padding: 15px;
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
const SendBT = styled.button`
  height: 42px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0 0 0 5px;
  border-radius: 5px;
  border-color: #fafafa;
  background-color: #f8931d;
  font-family: Roboto;
  font-size: 15px;
  color: #fafafa;
  cursor: pointer;
`;

const Joinjs = () => {
  //회원가입 정보
  const [joinInfo, setJoinInfo] = useState({
    email: "",
    password: "",
    nickname: "",
    certificationCode: "",
  });
  //이메일 형식 체크
  const [emailtype, setEmailtype] = useState(false);
  var reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  //이메일 중복 체크
  const [checkemail, setCheckEmail] = useState(false); //email dup check
  //이메일 인증번호 확인
  const [checkcode, setCheckcode] = useState(false);
  //비밀번호 일치 확인
  const [checkpw, setCheckpw] = useState(false);
  const [repeatpw, setRepeatpw] = useState("");

  //input에 입력하는 값 onChange
  const onChangehandler = (e) => {
    const { name, value } = e.target;
    if (name === "repeatpw") {
      setRepeatpw(value);
      if (joinInfo.password === value) {
        setCheckpw(true);
      } else {
        setCheckpw(false);
      }
    } else {
      setJoinInfo((previnfo) => ({
        ...previnfo,
        [name]: value,
      }));
      if (name === "email") {
        if (reg_email.test(value)) {
          setEmailtype(true);
        } else {
          setEmailtype(false);
        }
      }
      if (name === "password") {
        if (repeatpw === value) {
          setCheckpw(true);
        } else {
          setCheckpw(false);
        }
      }
    }
  };

  const dupcheck = (e) => {
    if (!emailtype || !joinInfo.email) {
      return alert("이메일 형식에 맞게 작성해주세요.");
    }
    axios
      .post("/signup/check-email", {
        email: joinInfo.email,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "200" && data.message === "OK") {
          setCheckEmail(true);
          alert("사용가능한 이메일입니다.");
        }
      })
      .catch(function (error) {
        console.log(error.toJSON());
        alert("중복된 이메일입니다!");
        setCheckEmail(false);
      });
  };

  const sendCode = (e) => {
    axios
      .post("/signup/recieve-certificate-code", {
        email: joinInfo.email,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "200" && data.message === "OK") {
          alert(
            `${joinInfo.email}에 인증번호를 전송했습니다.\n이메일 인증번호를 확인해주세요.`
          );
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
        alert("인증번호 전송에 오류가 생겨 재전송이 필요합니다.");
      });
  };
  const certificate = (e) => {
    axios
      .post("/signup/certificate-email", {
        email: joinInfo.email,
        certificationCode: joinInfo.certificationCode,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "200" && data.message === "OK") {
          setCheckcode(true);
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
        alert("인증번호가 일치하지 않습니다.");
      });
  };
  const onSignup = (e) => {
    //console.log(joinInfo.nickname);
    if (
      !emailtype ||
      !checkemail ||
      !checkcode ||
      !checkpw ||
      !joinInfo.nickname
    ) {
      return alert("빈칸을 다시 한번 확인해주세요.");
    }
    axios
      .post("/signup", {
        email: joinInfo.email,
        password: joinInfo.password,
        nickname: joinInfo.nickname,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "200" && data.message === "OK") {
          alert("회원가입이 완료되었습니다!");
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        //console.log(joinInfo.nickname);
        console.log(error.toJSON());
        alert("빈칸이 없는지 확인해주세요.");
      });
  };
  return (
    <Container>
      <JoinPage>
        <h4>반가워요! SWith과 함께해요</h4>
        <Join>
          <Text>
            <Label>이메일</Label>
            <Input
              placeholder="이메일"
              style={{ width: "60%" }}
              name="email"
              value={joinInfo.email}
              onChange={(e) => onChangehandler(e)}
            />
            <SendBT onClick={(e) => dupcheck(e)}>중복확인</SendBT>
            {!emailtype && (
              <div style={{ color: "red", fontSize: "12px" }}>
                올바른 이메일 형식이 아닙니다
              </div>
            )}
            {checkemail ? (
              <div style={{ color: "green", fontSize: "12px" }}>
                사용가능한 이메일입니다
              </div>
            ) : (
              <div style={{ color: "red", fontSize: "12px" }}>
                이메일이 중복되었는지 확인해주세요
              </div>
            )}
            {checkemail && (
              <div>
                <SendBT onClick={(e) => sendCode(e)}>인증번호 전송</SendBT>
              </div>
            )}
          </Text>
          <Text>
            <Label>인증번호</Label>
            <Input
              placeholder="인증번호를 입력해주세요."
              style={{ width: "70%" }}
              name="certificationCode"
              value={joinInfo.authcode}
              onChange={(e) => onChangehandler(e)}
            />
            <SendBT onClick={(e) => certificate(e)}>확인</SendBT>
            {checkcode ? (
              <div style={{ color: "green", fontSize: "12px" }}>인증 성공!</div>
            ) : (
              <div style={{ color: "red", fontSize: "12px" }}>
                이메일 인증이 필요합니다.
              </div>
            )}
          </Text>
          <Text>
            <Label>비밀번호</Label>
            <Input
              placeholder="비밀번호"
              type="password"
              name="password"
              value={joinInfo.password}
              onChange={(e) => onChangehandler(e)}
            />
          </Text>
          <Text>
            <Label>비밀번호 확인</Label>
            <Input
              placeholder="비밀번호"
              type="password"
              name="repeatpw"
              value={repeatpw}
              onChange={(e) => onChangehandler(e)}
            />
            {!checkpw ? (
              <div style={{ color: "red", fontSize: "12px" }}>
                비밀번호가 일치하지 않습니다
              </div>
            ) : (
              <div style={{ color: "green", fontSize: "12px" }}>
                비밀번호가 일치합니다
              </div>
            )}
          </Text>
          <Text>
            <Label>닉네임</Label>
            <Input
              placeholder="닉네임"
              name="nickname"
              value={joinInfo.nickname}
              onChange={(e) => onChangehandler(e)}
            />
          </Text>
          <Button onClick={(e) => onSignup(e)}>회원가입</Button>
        </Join>
      </JoinPage>
    </Container>
  );
};

export default Joinjs;
