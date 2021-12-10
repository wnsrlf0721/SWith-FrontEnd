import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

import ReactQuill from 'react-quill';
import React, { useState, useMemo, useEffect } from 'react';
import { getBoardPostId, putBoardPostId } from '../../api/APIs';
import ReactHtmlParser from 'html-react-parser';

import post_icon from '../../images/post_icon.svg';

const CreatePost = ({ match }) => {
  const boardId = match.params.boardId;
  const postId = match.params.postId;
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const submitContents = ReactHtmlParser(editorContent);
  useEffect(() => {
    getBoardPostId(boardId, postId)
      .then((response) => {
        const data = response.data.data;
        setTitle(data.title);
        setEditorContent(data.contents);
      })
      .catch((error) => {
        console.log(error);
        alert('게시글 내용 조회에 실패했습니다.');
      });
  }, []);

  const onsubmit = (e) => {
    e.preventDefault();
    let content = editorContent.replace(/\<p>/g, '');
    content = content.split('</p>').join('');
    content = content.replace(/\<br>/g, '');
    content = content.trim();
    if (title.trim().length < 1) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (content.length < 1) {
      alert('내용을 입력해주세요.');
      return;
    }

    putBoardPostId(boardId, postId, title, editorContent)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
          alert('게시글이 수정되었습니다.');
          window.location.href = `/comm/post/${boardId}/${postId}`;
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
        alert('게시글 수정이 실패되었습니다.');
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
      <Header>게시글 수정하기</Header>
      <ContentContainer>
        <Title
          placeholder="제목을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></Title>
        <ReactQuill
          style={{ minHeight: '350px', marginBottom: '30px' }}
          value={editorContent}
          onChange={(content, delta, source, editor) =>
            setEditorContent(editor.getHTML())
          }
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
        <ButtonWrap>
          <Button style={{ backgroundColor: '#ef8585' }} onClick={(e) => onsubmit(e)}>
            <img src={post_icon} alt="게시글 수정" />
            게시글 수정
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
