import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactHtmlParser from 'html-react-parser';

import CommentIcon from '../../images/comments_icon.svg';
import ViewsIcon from '../../images/eye_icon.svg';
import DefaultProfile from '../../images/default_profile.png';
import {
  deleteBoardPostId,
  deleteComment,
  getBoardPostId,
  postComment,
  putComment,
} from '../../api/APIs';

const Post = ({ match }) => {
  const boardId = match.params.boardId;
  const postId = match.params.postId;
  //console.log(boardId, postId);
  const [postInfo, setPostInfo] = useState({
    title: '',
    id: '',
    board: [],
    createdDate: '',
    comments: [],
    user: [],
    viewCount: '',
    contents: '',
  });
  const [comment, setComment] = useState('');
  const [loginId, setLoginId] = useState('');
  const [editNum, setEditNum] = useState('');
  const [editComment, setEditComment] = useState('');
  useEffect(() => {
    if (window.sessionStorage.userInfo) {
      setLoginId(JSON.parse(window.sessionStorage.userInfo).userId);
    }
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
      const name = e.target.name;
      if (name === 'newComment') {
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
      } else if (name === 'editComment') {
        putComment(boardId, postId, editNum, editComment)
          .then((response) => {
            const data = response.data.data;
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        window.location.reload();
      }
    }
  };
  const onEdit = (id, comment) => {
    if (editNum === id) {
      setEditNum('');
      setEditComment('');
    } else {
      setEditNum(id);
      setEditComment(comment);
    }
  };

  const onDelete = (type, id) => {
    if (window.confirm(`해당 ${type}을 삭제하시겠습니까?`)) {
      if (type === '댓글') {
        deleteComment(boardId, postId, id)
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            alert('삭제하는데 오류가 생겼습니다');
            console.log(error);
          });
      } else if (type === '게시글') {
        deleteBoardPostId(boardId, id)
          .then((response) => {
            console.log(response.data);
            alert('게시글 삭제를 완료하였습니다!');
            window.location.href = '/comm';
          })
          .catch((error) => {
            alert('삭제하는데 오류가 생겼습니다');
            console.log(error);
          });
      }
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  style={{
                    height: '16px',
                    width: '16px',
                    paddingRight: '6px ',
                    marginTop: '3px',
                  }}
                />
                {postInfo.viewCount}
              </span>
              {loginId === postInfo.user.id ? (
                <span style={{ marginLeft: '10px' }}>
                  <span style={{ marginLeft: '5px' }}>
                    <ChangeButton
                      onClick={(e) =>
                        (window.location.href = `/comm/EditPost/${boardId}/${postId}`)
                      }
                    >
                      수정
                    </ChangeButton>
                  </span>
                  <span style={{ marginLeft: '5px' }}>
                    <ChangeButton onClick={(e) => onDelete('게시글', postInfo.id)}>
                      삭제
                    </ChangeButton>
                  </span>
                </span>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </Info>
      </Header>
      <Body>
        <Content>{ReactHtmlParser(postInfo.contents)}</Content>
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
                      {loginId === comment.user.id ? (
                        <span style={{ marginLeft: '10px' }}>
                          <span style={{ marginLeft: '5px' }}>
                            <ChangeButton
                              onClick={(e) => onEdit(comment.id, comment.comment)}
                            >
                              수정
                            </ChangeButton>
                          </span>
                          <span style={{ marginLeft: '5px' }}>
                            <ChangeButton onClick={(e) => onDelete('댓글', comment.id)}>
                              삭제
                            </ChangeButton>
                          </span>
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                </CommentArea>
                {editNum === comment.id ? (
                  <CommentArea>
                    <Comment>
                      댓글 수정
                      <textarea
                        placeholder="내용을 입력하세요"
                        className="inputarea"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                      />
                      <button
                        style={{
                          backgroundColor: '#ef8585',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                          margin: '0 0 0 10px',
                        }}
                        name="editComment"
                        onClick={(e) => onclick(e)}
                      >
                        등록
                      </button>
                    </Comment>
                  </CommentArea>
                ) : (
                  <div></div>
                )}
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
          <button
            style={{
              backgroundColor: '#ef8585',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              margin: '0 0 0 10px',
            }}
            name="newComment"
            onClick={(e) => onclick(e)}
          >
            등록
          </button>
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
  min-height: 50px;
  .inputarea {
    overflow: visible;
    overflow-wrap: break-word;
    display: inline-block;
    width: 85%;
    min-height: 30px;
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

const ChangeButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: skyblue;
`;
