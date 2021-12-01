import './css/PostList.css';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Topbar from '../Main/Topbar';
import Post from './Post';
import PostList from './PostList';
import CreatePost from './CreatePost';
import EditPost from './EditPost';

import search_icon from '../../images/search_gray.png';
import writing_icon from '../../images/writing_icon.png';
import post_list from '../../images/post_list.png';
import { getBoards, getBoardPost } from '../../api/APIs';

const baseUrl = '/comm/';

const Index = () => {
  const [boardList, setBoardList] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getBoards()
      .then((response) => {
        let array = [];
        response.data.data.map((board) => {
          array = array.concat(board);
          // getBoardPost(board.id)
          //   .then((response) => {
          //     console.log(response.data);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        });
        //console.log(array);
        setBoardList(array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onsearch = (e) => {
    e.preventDefault();
    if (search.length > 1) {
      window.location.href = `/comm?search=${search}`;
    } else {
      alert(`검색어는 2자 이상 필요합니다.`);
    }
  };
  return (
    <>
      <Topbar />
      <div style={{ marginTop: '64px', height: '100%' }}>
        <Container>
          <div style={{ border: 'solid 1px #e4e6eb' }}>
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                  {boardList.map((board) => {
                    return (
                      <li>
                        <Link href={`/comm/${board.id}/${board.title}`}>
                          <img
                            style={{
                              height: '18px',
                              width: '18px',
                              verticalAlign: 'middle',
                              padding: '0 6px 0 0 ',
                            }}
                            src={post_list}
                            alt="post_list"
                          />
                          {board.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            </List>
          </div>
          <BrowserRouter>
            <Switch>
              <Route exact path={baseUrl} component={PostList} />
              <Route path={baseUrl + 'post/:boardId/:postId'} component={Post} />
              <Route path={baseUrl + 'EditPost/:boardId/:postId'} component={EditPost} />
              <Route path={baseUrl + ':boardId/:boardTitle/'} component={PostList} />
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
