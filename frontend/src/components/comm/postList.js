import React, { useState, useEffect } from 'react';
import axios from '../../api/defaultaxios';
import './postList.css';
import writeIMG from '../../images/write.png';
function Index() {
  /*    
  useEffect(() => {
    const session = JSON.parse(window.sessionStorage.userInfo);
    //console.log(session)
    axios
      .get(`/users/${session.userId}`)
      .then((response) => {
        const data = response.data;
        //console.log(data.data.nickname);
        if (data.status === "200" && data.message === "OK") {
          setNickName(data.data.nickname);
          // setUsers({
          //     id:data.data.id,
          //     nickname:data.data.nickname
          //   })
          //console.log(NickName,Users.id)
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, []);
*/
  const [post, setPost] = useState([
    {
      id: 0,
      title: '함께 열심히 공부할 스터디원 모집합니다',
      writer: '열공러',
      date: '2021-11-26',
      commentsNum: '0',
      viewNum: '1',
    },
    {
      id: 1,
      title: '토익 스터디방 구합니다!',
      writer: '아임파인땡큐',
      date: '2021-11-25',
      commentsNum: '0',
      viewNum: '2',
    },
    {
      id: 2,
      title: '모각코! 우리 모여서 각자 코딩해요~',
      writer: '코테준비',
      date: '2021-11-24',
      commentsNum: '0',
      viewNum: '3',
    },
    {
      id: 0,
      title: '정처기 필기 일주일 마스터 팁 알려드림',
      writer: 'weekend',
      date: '2021-11-23',
      commentsNum: '0',
      viewNum: '4',
    },
    {
      id: 1,
      title: '이 성적이면 어디 대학 갈 수 있을까요..?',
      writer: '재수없기',
      date: '2021-11-23',
      commentsNum: '0',
      viewNum: '8',
    },
    {
      id: 2,
      title: '독서를 사랑하는 모임 독사모로 초대합니다',
      writer: '살모사',
      date: '2021-11-23',
      commentsNum: '0',
      viewNum: '4',
    },
    {
      id: 0,
      title: '같이 그림그려요! *본문 필독',
      writer: '드로잉',
      date: '2021-11-23',
      commentsNum: '0',
      viewNum: '5',
    },
    {
      id: 1,
      title: '임용 공부 플래너와 달성률 함께 공유해요',
      writer: 'toteach',
      date: '2021-11-22',
      commentsNum: '0',
      viewNum: '5',
    },
    // {
    //   id: 2,
    //   title: '게시글 제목',
    //   writer: '작성자',
    //   date: '2021-11-23',
    //   commentsNum: '0',
    //   viewNum: '6',
    // },
    // {
    //   id: 0,
    //   title: '게시글 제목',
    //   writer: '작성자',
    //   date: '2021-11-23',
    //   commentsNum: '0',
    //   viewNum: '6',
    // },
    // {
    //   id: 1,
    //   title: '게시글 제목',
    //   writer: '작성자',
    //   date: '2021-11-23',
    //   commentsNum: '0',
    //   viewNum: '7',
    // },
    // {
    //   id: 2,
    //   title: '게시글 제목',
    //   writer: '작성자',
    //   date: '2021-11-23',
    //   commentsNum: '0',
    //   viewNum: '7',
    // },
  ]);
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
              <div className="TextCenterBox">{x.writer}</div>
              <div className="TextCenterBox">{x.date}</div>
              <div className="TextCenterBox">{x.commentsNum}</div>
              <div className="TextCenterBox">{x.viewNum}</div>
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
  const DoSort = (sortNum) => {
    if (sortNum == 1) {
      //조회순
      let tempPost = post;
      setPost(tempPost.sort((a, b) => b.viewNum - a.viewNum));
    } else if (sortNum == 0) {
      //최신순
      let tempPost = post;
      setPost(tempPost.sort((a, b) => a.viewNum - b.viewNum));
    }
  };

  return (
    <>
      <div className="PostListWrap">
        <div className="PostListHeader">
          <div className="PostListTitle">전체글 보기</div>
        </div>
        <div className="HeaderWrap">
          <div className="SortWrap">
            <select
              onChange={handleSelect}
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
}

export default Index;
