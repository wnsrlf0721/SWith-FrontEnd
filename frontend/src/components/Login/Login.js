import styled from 'styled-components';

import React, { useState, useCallback } from 'react';
import { postLogIn } from '../../api/APIs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const [password, setPassword] = useState('');

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      if (reg_email.test(value)) {
        setEmailCheck(true);
      } else {
        setEmailCheck(false);
      }
    } else {
      setPassword(value);
    }
  };

  const onsubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !emailCheck) {
        return setEmailCheck(false);
      }
      postLogIn(email, password)
        .then((response) => {
          const result = response.data;
          if (result.status === '200' && result.message === 'OK') {
            const data = result.data;
            if (data.banned === 1) {
              alert('정지된 아이디입니다.');
              return;
            }
            alert('로그인 성공!');
            let user = {
              name: email,
              jwt: data.jwt,
              userId: data.userId,
            };
            localStorage.setItem('userInfo', JSON.stringify(user));
            return (window.location.href = '/');
          }
        })
        .catch(function (error) {
          console.log(error.toJSON());
          alert('이메일과 비밀번호를 확인해주세요');
        });
    },
    [email, password],
  );

  return (
    <Container>
      <LoginPage>
        <h4>안녕하세요! 오늘도 화이팅!</h4>
        <LoginWrapper>
          <form onSubmit={onsubmit}>
            <Text>
              <Label>이메일</Label>
              <Input
                placeholder="이메일"
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChangehandler(e)}
              />
              {!emailCheck && (
                <div style={{ color: 'red', fontSize: '12px' }}>
                  올바른 이메일 형식이 아닙니다
                </div>
              )}
            </Text>
            <Text>
              <Label>비밀번호</Label>
              <Input
                placeholder="비밀번호"
                name="password"
                type="password"
                value={password}
                onChange={(e) => onChangehandler(e)}
              />
            </Text>
            <Button>로그인</Button>
          </form>
        </LoginWrapper>
        <Join style={{ marginTop: '15px' }}>
          <p>비밀번호를 잊으셨나요?</p>
          <a href="/login/password">비밀번호 찾기</a>
        </Join>
        <Join style={{ marginTop: '0px' }}>
          <p>아직 회원이 아니신가요?</p>
          <a href="/login/join">회원가입</a>
        </Join>
      </LoginPage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin-top: 150px;
`;
const LoginPage = styled.div`
  display: flex;
  position: relative;
  width: 400px;
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
const LoginWrapper = styled.div`
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
  cursor: pointer;
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

export default Login;
