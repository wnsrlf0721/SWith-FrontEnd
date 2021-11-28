import './css/PostList.css';
import styled from 'styled-components';

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Topbar from '../Main/Topbar';
import Post from './Post';
import PostList from './PostList';
import CreatePost from './CreatePost';

import search_icon from '../../images/search_gray.png';
import writing_icon from '../../images/writing_icon.png';

const baseUrl = '/comm/';

const Index = () => {
  return (
    <>
      <Topbar />
      <div style={{ marginTop: '64px', height: '100%' }}>
        <Container>
          <div>
            <List>
              <Box>
                <form onSubmit={(e) => onsearch(e)}>
                  <button
                    style={{
                      backgroundColor: 'white',
                      border: '0px',
                      padding: '0 6px 0 0 ',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      style={{
                        height: '18px',
                        width: '18px',
                        verticalAlign: 'middle',
                      }}
                      src={search_icon}
                      alt="search_icon"
                    />
                  </button>
                  <input
                    style={{ border: '0px' }}
                    type="text"
                    placeholder="게시글 검색"
                  ></input>
                </form>
              </Box>
              <Box>
                <Link href="/comm/CreatePost">
                  <img
                    style={{
                      height: '18px',
                      width: '18px',
                      verticalAlign: 'middle',
                      padding: '0 6px 0 0 ',
                    }}
                    src={writing_icon}
                    alt="writing_icon"
                  />
                  게시글 작성하기
                </Link>
              </Box>
              <Box>
                게시판 목록
                <ul style={{ listStyleType: 'none' }}>
                  <li>
                    <Link href="/comm">스터디 모집</Link>
                  </li>
                  <li>
                    <Link href="/comm">스터디 참여</Link>
                  </li>
                  <li>
                    <Link href="/comm">자유게시판</Link>
                  </li>
                  <li>
                    <Link href="/comm">정보 공유</Link>
                  </li>
                </ul>
              </Box>
            </List>
          </div>
          <BrowserRouter>
            <Switch>
              {/* <Route exact path={baseUrl} component={view} />
            <Route path="" component={viewOtherUser} />
            <Route path= component={edit} /> */}
              <Route exact path={baseUrl} component={PostList} />
              <Route path={baseUrl + 'post'} component={Post} />
              <Route path={baseUrl + 'CreatePost'} component={CreatePost} />
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    </>
  );
};

export default Index;

const Container = styled.div`
  margin-top: 70px;
  display: grid;
  width: 70%;
  height: 100%;
  margin: 0 auto;
  border: solid 1px #e4e6eb;
  grid-template-columns: 1fr 3fr;
`;
const List = styled.div`
  width: 100%;
`;
const Box = styled.div`
  margin: 30px 0;
  border: 1px solid #e4e6eb;
  border-left: hidden;
  border-right: hidden;
  padding: 10px 20px;
`;
const Link = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #454648;
`;
