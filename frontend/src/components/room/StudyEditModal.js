
import React,{useState,useEffect,useCallback} from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from "../../api/defaultaxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import moment from "moment";



function StudyEditModal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  studyRoomId,
}) {

    const [swapleft, setSwapleft] = useState(true);
    // title(방 제목), purpose(필터링), password(비밀번호), notice(공지사항), endDate, hashTag(해시태그)
    const [inputTag, setInputTag] = useState("");
    const [roominfo, setRoominfo] = useState({
      title: "",
      purpose: "",
      notice: "",
      hashtag: [],
      endDate: new Date(), //'YYYY-MM-DD HH:MM:SS' 형식
      secret: 0,
      password: "",
    });
    const [studyRoomInfo,setStudyRoomInfo] = useState([]);
    
    const [toggleState, setToggleState] = useState(1);
    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e)
        }
    }

    const close = (e) => {
        if (onClose) {
            onClose(e)
        }
    }
    
  const category = [
    {
      id: 1,
      name: "국가 고시",
      purpose: "k-exam",
    },
    {
      id: 2,
      name: "독서",
      purpose: "reading",
    },
    {
      id: 3,
      name: "수능",
      purpose: "sat",
    },
    {
      id: 4,
      name: "어학",
      purpose: "eng",
    },
    {
      id: 5,
      name: "자격증",
      purpose: "cert",
    },
    {
      id: 6,
      name: "기타",
      purpose: "order",
    },
  ];

 
//기존 정보 받아오기
  useEffect(() => {
    // const tempDay = roomData.endDate.substring(0,10);
    // console.log(moment(roomData.endDate.substring(0,10), "YYYY-MM-DD")._d)
    // var moment = require('moment'); 
    require('moment-timezone'); 
    moment.tz.setDefault("Asia/Seoul");
    // console.log({studyRoomId});
    axios
      .get(`/studyrooms/${studyRoomId}`)
      .then((response) => {
        const data = response.data;
        const roomData = data.data
        console.log(data.data);
        if (data.status === "200" && data.message === "OK") {
          setRoominfo({
            title: roomData.title,
            purpose: roomData.purpose,
            notice: roomData.notice,
            hashtag: roomData.hashtags,
            endDate: moment(roomData.endDate)._d, //'YYYY-MM-DD HH:MM:SS' 형식
            secret: roomData.secret,
            password: roomData.password,
          })
          category.map((data) => (
            roomData.purpose == data.purpose ? setToggleState(data.id) : data
          ))
        }
      })
      .catch((error) => { 
        console.log(error);
      });
  }, []);





  const onclick = (data) => {
    setToggleState(data.id);
    setRoominfo((previnfo) => ({
      ...previnfo,
      purpose: data.purpose,
    }));
  };
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
    } else if (name === "hashtag") {
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
        !roominfo.hashtag.includes(trimmedInput)
        ) {
        e.preventDefault();
        setRoominfo((previnfo) => ({
            ...previnfo,
            hashtag: [...previnfo.hashtag, trimmedInput],
        }));
        setInputTag("");
        }
    };
    const deleteTag = (index) => {
        setRoominfo((previnfo) => ({
        ...previnfo,
        hashtag: previnfo.hashtag.filter((tag, i) => i !== index),
        }));
    };





    return (
        <>
        {console.log(roominfo)}
            <ModalOverlay visible={visible} />
            <ModalWrapper
                className={className}
                onClick={maskClosable ? onMaskClick : null}
                tabIndex="-1"
                visible={visible}
                
            >
                <ModalInner tabIndex="0" className="modal-inner">
                <Container>
                        
                        <div className="page">
                        <div style={{margin:"5px",fontSize:"18px",fontWeight:"bold"}}>
                            스터디 수정
                        </div>
                        <Rowarea>
                            <Label>스터디 이름</Label>
                            <Input
                            name="title"
                            onChange={(e) => onChangehandler(e)}
                            value={roominfo.title}
                            />
                        </Rowarea>
                        <Rowarea>
                            <Label>카테고리</Label>
                            {/* 국가고시, 독서, 수능, 어학, 자격증, 기타 */}
                            <Cate>
                            {category.map((data) => (
                                <CategoryButton
                                name={data}
                                className={toggleState === data.id ? "activation" : ""}
                                onClick={() => onclick(data)}
                                >
                                {data.name}
                                </CategoryButton>
                            ))}
                            </Cate>
                        </Rowarea>
                        <Rowarea>
                            <Label>종료기간</Label>
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
                        <Rowarea style={{flexDirection: "column"}}>
                            <div style={{ display: "flex",justifyContent: "space-between"}}>
                            <Label>해시태그</Label>
                            <Input
                                name="hashtag"
                                placeholder="Enter a tag"
                                onChange={(e) => onChangehandler(e)}
                                onKeyDown={(e) => onKeyDown(e)}
                                value={inputTag}
                            />
                            </div>
                            <div style={{marginTop:"5px",display: "flex",justifyContent: "flex-start"}}>
                            {roominfo.hashtag.map((tag, index) => (
                                <div className="tag">
                                {"#"+tag.hashtag}
                                <button onClick={() => deleteTag(index)}>x</button>
                                </div>
                            ))}
                            </div>
                        </Rowarea>
                        <Rowarea style={{flexDirection:"column"}}>
                            <div  style={{ display: "flex",justifyContent: "space-between",marginBottom:"10px"}}>
                              <Label>공지사항</Label>
                            </div>
                            <Input
                            name="notice"
                            onChange={(e) => onChangehandler(e)}
                            value={roominfo.notice}
                            />
                        </Rowarea>
                        <TabWrap>
                            <KeyButton
                            className={swapleft ? "active" : ""}
                            onClick={() => setSwapleft(true)}
                            >
                            공개방
                            </KeyButton>
                            <KeyButton
                            className={!swapleft ? "active" : ""}
                            onClick={() => setSwapleft(false)}
                            >
                            비밀방
                            </KeyButton>
                        </TabWrap>
                        {!swapleft && (
                            <Rowarea>
                            <Label>비밀번호</Label>
                            <Input
                                name="password"
                                onChange={(e) => onChangehandler(e)}
                                value={roominfo.password}
                            />
                            </Rowarea>
                        )}
                        
                            <Button style={{ marginTop: "40px" }} onClick={onsubmit}>
                            수정 완료
                            </Button>
                        
                        </div>
                    </Container>
                </ModalInner>
            </ModalWrapper>
        </>
    )
}

StudyEditModal.propTypes = {
  visible: PropTypes.bool,
}

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: normal;
  .page {
    display: flex;
    position: relative;
    width:100%;
    margin: 0 10px;
    padding: 50px 0;
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
    width:fit-content;
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
  font-size: 15px;
  font-weight: 500;
  color: #333;
  line-height: 1;
  width:180px;
  align-items: center;
  
`;
const BeforeInfo = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  color:gray;
  width:100%;
`
const Input = styled.input`
  padding: 10px;
  margin-left: 10px;
  background-color: white;
  border: 1px solid #828282;
  border-radius: 3px;
  font-size: 12px;
  font-weight: normal;
  font-family: Roboto;
  height:20px;
`;
const DateInput = styled(DatePicker)`
  padding: 10px;
  margin-left: 10px;
  background-color: white;
  border: 1px solid #828282;
  border-radius: 3px;
  font-size: 12px;
  font-weight: normal;
  font-family: Roboto;
`;
const TabWrap = styled.div`
  width: 182px;
  font-family: Roboto;
  font-size: 12px;
  display: flex;
  align-items: center;
  display: table;
  margin: 20px auto;
  .active {
    border: 1px solid #f8ad1d;
    background-color: #f8ad1d;
    font-weight: 700;
    color: #fff;
  }
`;
const Button = styled.button`
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #ef8585;
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 0;
  outline: 0;
  text-decoration: none;
`;
const CategoryButton = styled.button`
  margin: 4px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;
  padding: 0 8px;
  background-color: #fff;
  font-size: 10px;
  line-height: 30px;
  cursor: pointer;
  color: #454648;
`;
const KeyButton = styled.button`
  margin: 4px;
  border: 1px solid #d0d0d0;
  background-color: #fff;
  color: #454648;
  border-radius: 20px;
  padding: 3px 14px;
  font-size: 12px;
  line-height: 30px;
  outline: 0;
  text-decoration: none;
  cursor: pointer;
  align-items: center;
`;

const Cate = styled.div`
  margin-left: 30px;
  .activation {
    border: 1px solid #f8ad1d;
    background-color: #f8ad1d;
    font-weight: 700;
    color: #fff;
  }
`;


const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  min-width:600;
  min-height: 500px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;

`

export default StudyEditModal;