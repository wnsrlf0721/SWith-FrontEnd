import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 800px;
  text-align: center;
  align-items: center;
`;

const LoginPage = styled.div`
  display: flex;
  position: relative;
  width: 400px;
  height: 500px;
  margin: 0 auto;
  padding: 60px 50px 63px;

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
const Login = styled.div`
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
  display: inline-block;
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
const Join = styled.div`
  margin-top: 30px;
  text-align: left;
  p {
    display: inline-block;
    font-family: Roboto;
    font-size: 15px;
    font-weight: normal;
    color: #828282;
  }
  a {
    font-family: Roboto;
    font-size: 15px;
    font-weight: normal;
    margin: 30px 7px 0 9px;
    color: #ef8585;
    text-decoration: none;
  }
`;

const login = () => {
  return (
    <Container>
      <LoginPage>
        <h4>안녕하세요! 오늘도 화이팅!</h4>
        <Login>
          <Text>
            <Label>이메일</Label>
            <Input placeholder="이메일" />
            <div>
              <label>
                <input type="checkbox" />
                <span
                  style={{
                    color: "#ef8585",
                    fontFamily: "Roboto",
                    fontSize: "15px",
                  }}
                >
                  아이디 저장
                </span>
              </label>
            </div>
          </Text>
          <Text>
            <Label>비밀번호</Label>
            <Input placeholder="비밀번호" />
            <a>비밀번호를 잊어버리셨나요?</a>
          </Text>
          <Button>로그인</Button>
        </Login>
        <Join>
          <p>아직 회원이 아니신가요?</p>
          <a href="/login/join">회원가입</a>
        </Join>
      </LoginPage>
    </Container>
  );
};

export default login;
