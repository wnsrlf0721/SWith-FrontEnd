import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CommentIcon from '../../images/comment_icon.png';
import ViewsIcon from '../../images/views_icon.png';
import DefaultProfile from '../../images/default_profile.png';
import { getBoardPostId, postComment } from '../../api/APIs';

const Post = ({ match }) => {
  const boardId = match.params.boardId;
  const postId = match.params.postId;
  //console.log(boardId, postId);
  const [postInfo, setPostInfo] = useState({
    title: '',
    board: [],
    createdDate: '',
    comments: [],
    user: [],
    viewCount: '',
    contents: '',
  });
  const [comment, setComment] = useState('');
  useEffect(() => {
    getBoardPostId(boardId, postId)
      .then((response) => {
        const info = response.data.data;
        console.log(info);
        setPostInfo(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onclick = (e) => {
    const isLogined = window.sessionStorage.userInfo == null ? false : true;
    if (!isLogined) {
      alert('로그인이 필요합니다.');
      return (window.location.href = '/login');
    } else {
      const userId = JSON.parse(window.sessionStorage.userInfo).userId;
      postComment(boardId, postId, userId, comment)
        .then((response) => {
          const data = response.data.data;
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      window.location.reload();
    }
  };
  return (
    <Container>
      <Header>
        <TopTitle>
          <a href="/comm">{postInfo.board.title}</a>
        </TopTitle>
        <Title>{postInfo.title}</Title>
        <Info>
          <Divimg>
            <img src={DefaultProfile} alt="기본사용자이미지" width="40" height="40" />
          </Divimg>
          <div>
            <div style={{ fontWeight: 'bold' }}>{postInfo.user.nickname}</div>
            <div>
              <span style={{ marginRight: '10px', fontSize: '14px' }}>
                {moment(postInfo.createdDate).format('YYYY.MM.DD. HH:mm')}
              </span>
              <span style={{ marginRight: '10px' }}>
                <img
                  src={CommentIcon}
                  alt="댓글이미지"
                  style={{ height: '14px', width: '14px', padding: '0 6px 0 0 ' }}
                />
                {postInfo.comments.length}
              </span>
              <span>
                <img
                  src={ViewsIcon}
                  alt="조회수이미지"
                  style={{ height: '10px', width: '14px', padding: '0 6px 0 0 ' }}
                />
                {postInfo.viewCount}
              </span>
            </div>
          </div>
        </Info>
      </Header>
      <Body>
        <Content>{postInfo.contents}</Content>
      </Body>
      <div>
        <h4>댓글</h4>
        <ul style={{ listStyle: 'none' }}>
          {postInfo.comments.map((comment) => {
            return (
              <li>
                <CommentArea>
                  <img
                    src={DefaultProfile}
                    alt="기본사용자이미지"
                    width="35"
                    height="35"
                  />
                  <div style={{ padding: '0 0 0 10px' }}>
                    <div style={{ fontWeight: 'bold' }}>{comment.user.nickname}</div>
                    <Content>{comment.comment}</Content>
                    <div style={{ fontSize: '13px' }}>
                      <span>
                        {moment(comment.createdDate).format('YYYY.MM.DD. HH:mm')}
                      </span>
                      <span style={{ marginLeft: '10px' }}>
                        <span style={{ marginLeft: '5px' }}>수정</span>
                        <span style={{ marginLeft: '5px' }}>삭제</span>
                      </span>
                    </div>
                  </div>
                </CommentArea>
              </li>
            );
          })}
        </ul>
        <Comment>
          <textarea
            placeholder="내용을 입력하세요"
            className="inputarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={(e) => onclick(e)}>등록</button>
        </Comment>
      </div>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  border: 1px solid #e4e6eb;
  padding: 30px 80px;
  border-left: hidden;
`;
const Header = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e6eb;
`;
const TopTitle = styled.div`
  margin: 10px 0 0;
  a {
    font-weight: bold;
    text-decoration: none;
    color: #454648;
  }
`;
const Title = styled.div`
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
const Info = styled.div`
  margin-top: 6px;
  display: flex;
`;
const Divimg = styled.div`
  margin-right: 10px;
  width: 40px;
  height: 40px;
`;

const Body = styled.div`
  min-height: 400px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e4e6eb;
`;

const Comment = styled.div`
  margin: 12px 0 29px;
  padding: 16px 10px 10px 18px;
  border: 2px solid #e4e6eb;
  border-radius: 6px;
  box-sizing: border-box;
  background: white;
  .inputarea {
    overflow: hidden;
    overflow-wrap: break-word;
    height: 17px;
    display: block;
    width: 100%;
    min-height: 17px;
    padding-right: 1px;
    border: 0;
    font-size: 13px;
    -webkit-appearance: none;
    resize: none;
    box-sizing: border-box;
    background: transparent;
    color: var(--skinTextColor);
    outline: 0;
  }
`;

const CommentArea = styled.div`
  display: flex;
  position: relative;
  padding: 12px 23px 10px 0;
  border-bottom: 1px solid #e4e6eb;
`;

const Content = styled.div`
  position: relative;
  font-size: 15px;
  word-break: break-all;
  word-wrap: break-word;
`;
