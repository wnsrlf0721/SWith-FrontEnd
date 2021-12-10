import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

import ReactQuill from 'react-quill';
import React, { useState, useMemo, useEffect } from 'react';
import { getBoards, postBoardPost } from '../../api/APIs';
import ReactHtmlParser from 'html-react-parser';

import post_icon from '../../images/post_icon.svg';

const CreatePost = () => {
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const [boardsInfo, setBoardsInfo] = useState([]);
  const [selectState, setSelectState] = useState();
  const submitContents = ReactHtmlParser(editorContent);
  useEffect(() => {
    const isLogined = window.localStorage.userInfo == null ? false : true;
    if (!isLogined) {
      alert('로그인이 필요합니다.');
      return (window.location.href = '/login');
    }
    let boardsData = [];
    getBoards()
      .then((response) => {
        const data = response.data;
        const datas = data.data;

        datas.map((data) => {
          boardsData = boardsData.concat({
            id: data.id,
            title: data.title,
          });
        });

        setBoardsInfo(boardsData);
      })

      .catch((error) => {
        console.log(error);
        alert('게시판 조회에 실패했습니다.');
      });
  }, []);
  const getTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSelect = (e) => {
    setSelectState(e.target.value);
  };

  const onsubmit = (e) => {
    const userInfo = JSON.parse(window.localStorage.userInfo);
    e.preventDefault();
    if (selectState === undefined) {
      alert('게시판을 선택해주세요.');
      return;
    }
    if (title.length < 1) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (submitContents < 1) {
      alert('내용을 입력해주세요.');
      return;
    }

    postBoardPost(selectState, userInfo.userId, title, editorContent)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
          alert('게시글이 등록되었습니다.');
          window.location.href = '/comm';
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
        alert('게시글 등록에 실패했습니다.');
      });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          [],
        ],
      },
    }),
    [],
  );

  return (
    <CreateContainer>
      <Header>게시글 작성하기</Header>
      <ContentContainer>
        <Category onChange={(e) => handleSelect(e)}>
          <option>-------</option>
          {boardsInfo.map((data) => (
            <option value={data.id}>{data.title}</option>
          ))}
        </Category>
        <Title
          placeholder="제목을 입력해주세요."
          onChange={getTitle}
          value={title}
        ></Title>
        <ReactQuill
          style={{ minHeight: '350px', marginBottom: '30px' }}
          onChange={setEditorContent}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
        <ButtonWrap>
          <Button style={{ backgroundColor: '#ef8585' }} onClick={(e) => onsubmit(e)}>
            <img src={post_icon} alt="게시글 등록" />
            게시글 등록
          </Button>
        </ButtonWrap>
      </ContentContainer>
    </CreateContainer>
  );
};

const CreateContainer = styled.div`
  min-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 30px 80px;
  border: solid 1px #e4e6eb;
  border-right: hidden;
  font-family: Roboto !important;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-family: Roboto;
  font-size: 22px;
  font-weight: bold;
  color: #454648;
`;

const ContentContainer = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
const Category = styled.select`
  height: 34px;
  flex-grow: 0;
  border-radius: 5px;
  border: solid 2px #eaeaea;
`;

const Title = styled.input`
  height: 30px;
  flex-grow: 0;
  border-radius: 5px;
  border: solid 2px #eaeaea;
  resize: none;
  font-size: 15px;
  padding: 5px;
`;

const ContentEdit = styled.textarea`
  height: 344px;
  flex-grow: 0;
  border-radius: 5px;
  border: solid 2px #eaeaea;
  resize: none;
  font-size: 16px;
  font-family: Roboto;
  padding: 5px;
`;
const ButtonWrap = styled.div`
  height: 30px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
  margin-top: 10px;
`;
const Button = styled.button`
  width: auto;
  padding: 2px 15px;
  height: 34px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 0;
  background-color: #f8ad1d;
  color: white;
  gap: 4px;
  cursor: pointer;
  font-weight: bold;
`;

export default CreatePost;
