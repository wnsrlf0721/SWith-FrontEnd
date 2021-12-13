import styled from 'styled-components';

import React, { useState } from 'react';
import {
  postCheckDuplication,
  postSendCertificationCode,
  postCertifiacteCode,
  postFindPassword,
} from '../../api/APIs';

const FindPassword = () => {
  const [joinInfo, setJoinInfo] = useState({
    email: '',
    password: '',
    nickname: '',
    certificationCode: '',
  });
  const [emailtype, setEmailtype] = useState(false);
  var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const [checkemail, setCheckEmail] = useState(false);
  const [checkcode, setCheckcode] = useState(false);
  const [pwvalid, setPwvalid] = useState(false);
  const [checkpw, setCheckpw] = useState(false);
  const [repeatpw, setRepeatpw] = useState('');

  const CheckPWvalid = (value) => {
    if (!/^[a-zA-Z0-9]{8,20}$/.test(value)) {
      setPwvalid(false);
      console.log('비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.');
    } else {
      var chk_num = value.search(/[0-9]/g);
      var chk_eng = value.search(/[a-z]/gi);
      if (chk_num < 0 || chk_eng < 0) {
        setPwvalid(false);
        console.log('비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.');
      } else {
        setPwvalid(true);
      }
    }
  };
  const onChangehandler = (e) => {
    const { name, value } = e.target;
    if (name === 'repeatpw') {
      setRepeatpw(value.trim());
      if (joinInfo.password === value) {
        setCheckpw(true);
      } else {
        setCheckpw(false);
      }
    } else {
      setJoinInfo((previnfo) => ({
        ...previnfo,
        [name]: value.trim(),
      }));
      if (name === 'email') {
        if (reg_email.test(value)) {
          setEmailtype(true);
        } else {
          setEmailtype(false);
        }
      }
      if (name === 'password') {
        CheckPWvalid(value);
        if (!value) {
          //return alert('비밀번호를 입력해야합니다');
          setCheckpw(false);
        } else if (repeatpw === value) {
          setCheckpw(true);
        } else {
          setCheckpw(false);
        }
      }
    }
  };

  const dupcheck = (e) => {
    if (!emailtype || !joinInfo.email) {
      return alert('이메일 형식에 맞게 작성해주세요.');
    }
    postCheckDuplication(joinInfo.email)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
          alert('가입되지 않은 이메일입니다.');
          setCheckEmail(false);
        }
      })
      .catch(function (error) {
        const data = error.toJSON().status;
        if (data === 409) {
          alert('가입된 이메일입니다.');
          setCheckEmail(true);
        }
      });
  };

  const sendCode = (e) => {
    postSendCertificationCode(joinInfo.email)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
          alert(
            `${joinInfo.email}에 인증번호를 전송했습니다.\n이메일 인증번호를 확인해주세요.`,
          );
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
        alert('인증번호 전송에 오류가 생겨 재전송이 필요합니다.');
      });
  };

  const certificate = (e) => {
    postCertifiacteCode(joinInfo.email, joinInfo.certificationCode)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
          setCheckcode(true);
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
        alert('인증번호가 일치하지 않습니다.');
      });
  };

  const onSignup = (e) => {
    if (!emailtype) {
      return alert('이메일 형식을 다시 확인해주세요.');
    } else if (!checkemail) {
      return alert('이메일 가입확인을 해주세요.');
    } else if (!checkcode) {
      return alert('이메일 인증을 완료해주세요.');
    }
    postFindPassword(joinInfo.email)
      .then((response) => {
        alert('새 비밀번호가 이메일로 전송되었습니다.');
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <JoinPage>
        <h4>비밀번호를 잊으셨나요?</h4>
        <JoinWrapper>
          <Text>
            <Label>이메일</Label>
            <Input
              placeholder="이메일"
              style={{ width: '60%' }}
              name="email"
              value={joinInfo.email}
              onChange={(e) => onChangehandler(e)}
            />
            <SendBT onClick={(e) => dupcheck(e)}>가입확인</SendBT>
            {!emailtype && (
              <div style={{ color: 'red', fontSize: '12px' }}>
                올바른 이메일 형식이 아닙니다
              </div>
            )}
            {checkemail ? (
              <div style={{ color: 'green', fontSize: '12px' }}>가입된 이메일입니다.</div>
            ) : (
              <div style={{ color: 'red', fontSize: '12px' }}>
                가입한 이메일을 입력해주세요.
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
              style={{ width: '70%' }}
              name="certificationCode"
              value={joinInfo.authcode}
              onChange={(e) => onChangehandler(e)}
            />
            <SendBT onClick={(e) => certificate(e)}>확인</SendBT>
            {checkcode ? (
              <div style={{ color: 'green', fontSize: '12px' }}>인증 성공!</div>
            ) : (
              <div style={{ color: 'red', fontSize: '12px' }}>
                이메일 인증이 필요합니다.
              </div>
            )}
          </Text>

          <Button onClick={(e) => onSignup(e)}>새 비밀번호 받기</Button>
        </JoinWrapper>
      </JoinPage>
    </Container>
  );
};

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
const JoinWrapper = styled.div`
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

export default FindPassword;
