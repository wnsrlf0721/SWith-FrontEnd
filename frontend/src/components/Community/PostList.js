import './css/PostList.css';

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getBoards, getBoardPost, postBoardPost } from '../../api/APIs';

import writeIMG from '../../images/write.png';

// const PostList = () => {

//   //console.log(query.search);
//   useEffect(() => {

//   }, []);
const PostList = ({ location, match }) => {
  const [post, setPost] = useState([]);
  //const [boardType, setBoardType] = useState('');
  const query = queryString.parse(location.search);
  const boardId = match.params.boardId;
  const boardTitle = match.params.boardTitle;
  useEffect(() => {
    // if (boardId == undefined) {
    //   boardId = 'all';
    // }

    // postBoardPost(53, 32, '테스트중2', '테스트중입니다.')
    //   .then((response) => {
    //     console.log(response);
    //     //alert('스터디룸 생성 성공!');
    //     //return (window.location.href = '/');
    //   })
    //   .catch((error) => {
    //     console.log(error.toJSON());
    //     //alert('input 입력이 잘못된것 같습니다.');
    //   });
    // console.log(boardId);
    // console.log(boardTitle);
    if (query.search) {
      console.log(`${query.search}를 검색하여 들어옴`);
    } else {
      console.log('기본 전체목록');
    }

    //setBoardType(boardId);
    if (boardId == undefined) {
      getBoards()
        .then((response) => {
          const tempBoards = response.data.data;
          let boardsId = [];
          tempBoards.map((x) => {
            boardsId = boardsId.concat(x.id);
          });
          //console.log(boardsId);
          let tempPs = [];
          boardsId.map((x) => {
            //console.log(x);
            getBoardPost(x)
              .then((response) => {
                const tempPosts = response.data.data;
                tempPs = tempPs.concat(tempPosts);
                setPost(tempPs.sort((a, b) => getDateNum(a, b)));
                //console.log(tempPs);
              })
              .catch((error) => {
                console.log(error.response);
              });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getBoardPost(boardId)
        .then((response) => {
          const tempPosts = response.data.data;
          setPost(tempPosts.sort((a, b) => getDateNum(a, b)));
          //console.log(tempPosts);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);

  const [Selected, setSelected] = useState(0);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    DoSort(e.target.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(post.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const postsReturn = () => {
    return (
      <div style={{ width: '100%', minHeight: '520px' }}>
        {currentPosts.map((x) => {
          return (
            <div className="TextsWrap" style={{ borderTop: 'hidden' }}>
              <a href="/comm/post" className="TextLeftBox">
                {x.title}
              </a>
              <div className="TextCenterBox">{x.user.nickname}</div>
              <div className="TextCenterBox">{getKrDate(x.createdDate)}</div>
              <div className="TextCenterBox">{x.comments.length}</div>
              <div className="TextCenterBox">{x.viewCount}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const sortList = [
    { id: 0, lable: '최신순' },
    { id: 1, lable: '조회순' },
  ];
  const getDateNum = (a, b) => {
    const dateA = new Date(a.createdDate);
    const dateB = new Date(b.createdDate);
    //console.log(a.title, a.createdDate);
    return dateB - dateA;
  };
  const getKrDate = (date) => {
    //x.createdDate.substring(0, 10)
    let tempDate = new Date(date);
    tempDate.setHours(tempDate.getHours() + 9);
    //console.log(tempDate.toISOString());
    return tempDate.toISOString().substring(0, 10);
  };

  const DoSort = (sortNum) => {
    if (sortNum == 1) {
      //조회순
      let tempPost = post;
      setPost(tempPost.sort((a, b) => b.viewCount - a.viewCount));
    } else if (sortNum == 0) {
      //최신순
      let tempPost = post;
      setPost(tempPost.sort((a, b) => getDateNum(a, b)));
    }
  };

  const getListTitle = () => {
    if (query.search) {
      return <div className="PostListTitle">{`'${query.search}'의 검색결과`}</div>;
    } else if (boardId == undefined) {
      return <div className="PostListTitle">전체글 보기</div>;
    } else {
      return <div className="PostListTitle">{boardTitle}</div>;
    }
  };

  return (
    <>
      <div className="PostListWrap">
        <div className="PostListHeader">
          {query.search ? (
            <div className="PostListTitle">{`'${query.search}'의 검색결과`}</div>
          ) : (
            <div className="PostListTitle">전체글 보기</div>
          )}
        </div>
        <div className="HeaderWrap">
          <div className="SortWrap">
            <select
              onChange={handleSelect}
              defaultValue={0}
              value={Selected}
              style={{ fontFamily: 'Roboto' }}
            >
              {sortList.map((data) => (
                <option value={data.id} key={data.id}>
                  {data.lable}
                </option>
              ))}
            </select>
          </div>
          <div
            className="TextsWrap"
            style={{ border: 'solid 2px #ccc', backgroundColor: '#f2f2f2' }}
          >
            <div className="TextBlackBox" style={{ width: '48%', marginLeft: '30px' }}>
              게시글 제목
            </div>
            <div className="TextBlackBox">작성자 </div>
            <div className="TextBlackBox">작성일</div>
            <div className="TextBlackBox">댓글수</div>
            <div className="TextBlackBox">조회수</div>
          </div>
        </div>
        {postsReturn()}
        <div className="buttonWrap">
          <nav>
            {pageNumbers.map((number) => {
              return (
                <button
                  className={currentPage === number ? 'PagebuttonActive' : 'Pagebutton'}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              );
            })}
          </nav>
          <a href="/comm/CreatePost" className="button">
            <img src={writeIMG} alt="writeIMG" />
            <div>글쓰기</div>
          </a>
        </div>
      </div>
    </>
  );
};
export default PostList;
