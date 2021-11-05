import React, {useState} from "react";
import styled from "styled-components";
import Topbar from "../main/topbar";

import UserImage from "../../images/default_profile_Image.png"


const Container = styled.div`
  display: flex;
  min-height: 800px;
  text-align: left;
  align-items: center;
  flex-direction: column;
  margin-top : 120px;
`;//모든것의 바깥

const PictureTextWrap = styled.div`
    display : flex;

`

const Header = styled.header`
  height: 64px;
  margin: 0;
  h1 {
    padding: 20px;
    line-height: 1;
    margin: 0;
  }
`;


const EditBoxWrap = styled.div`
  display: flex;
  min-height: 800px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin-top : 70px;
`;//입력창+완료버튼

const TextB = styled.div`
  width: 400px;
  margin: 0 auto;
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin: 5px 0;
`;
const TextG = styled.div`
  width: 400px;
  margin: 0 auto;
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #595959;
  margin: 5px 0;
`;//기본 회색


const TextInputBox = styled.input`
  width: 368px;
  padding: 15px;
  background-color: white;
  border: 1px solid #828282;
  border-radius: 3px;
  font-size: 15px;
  font-weight: normal;
  font-family: Roboto;
  margin: 5px 0;
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
`;//폰트 15

//////



const EditProfilePictureWrap = styled.div`
    margin: 50px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    
`

const EditProfilePicture = styled.div`

    width: 150px;
    height: 150px; 
    border-radius: 70%;
    overflow: hidden;
    margin : 20px

 `

const EditProfilePictureImg = styled.div`
    img {  
        width: auto;
        height: 150px;
        object-fit: cover; 
        
    }
   
`

const EditProfilePictureButton = styled.button`
    margin : 4px;
    border: 1px;
    solid #ef7575;
    background-color: #ef8585;
    border-radius: 100px;
    padding: 3px 18px;
    font-size: 15px;
    line-height: 34px;
    cursor: pointer;
    h3{
        color : #fff;
    }

   
`
const UserEmailNameWrap = styled.div`
    justify-content: space-between;
    -webkit-box-align: end;
    align-items: flex-end;
    display : flex;
    
 
`




//임시 이미지, 이메일 ,닉네임
const UserimgUrl = UserImage
const UserEmail = "SWith@ajou.ac.kr";
const UserName = "스윗";



const Index = () => {
    return(
        <>
            <Topbar/>
            <Container>
                <PictureTextWrap>
                    <EditProfilePictureWrap>
                        <EditProfilePicture>
                            <EditProfilePictureImg>
                                <img src = {UserimgUrl} alt="기본사용자이미지"/>
                            </EditProfilePictureImg>
                        </EditProfilePicture>
                        <EditProfilePictureButton>
                            <h3>프로필 사진 변경</h3>
                        </EditProfilePictureButton>
                    </EditProfilePictureWrap>
                    
                    <EditBoxWrap>
                        <TextB style = {{marginBottom : '15px'}}>
                            <h2>{UserEmail}</h2>
                            <h3 style ={{fontSize : '20px' }}>{UserName}</h3>
                        </TextB>
                        <TextB>닉네임</TextB>
                        <TextInputBox placeholder = "닉네임" style={{margin : "5px 0 25px"}}/>
                        <TextB>비밀번호 변경</TextB>
                        <TextG>현재 비밀번호</TextG>
                        <TextInputBox placeholder = "기존 비밀번호를 입력하세요."/>
                        <TextG>새 비밀번호</TextG>
                        <TextInputBox placeholder = "새로운 비밀번호를 입력하세요."/>
                        <TextG>비밀번호 확인</TextG>
                        <TextInputBox placeholder = "새로운 비밀번호를 한번 더 입력하세요."/>
                        <Button>프로필 설정 완료</Button>
                    </EditBoxWrap>
                
                </PictureTextWrap>
            </Container>


            
        </>
    );
}
export default Index;


