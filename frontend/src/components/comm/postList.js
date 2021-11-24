import React, { useState, useEffect } from "react";
import axios from "../../api/defaultaxios";
import "./postList.css";
import writeIMG from "../../images/write.png";
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
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "1",
    },
    {
      id: 1,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "2",
    },
    {
      id: 2,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "3",
    },
    {
      id: 0,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "4",
    },
    {
      id: 1,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "4",
    },
    {
      id: 2,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "4",
    },
    {
      id: 0,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "5",
    },
    {
      id: 1,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "5",
    },
    {
      id: 2,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "6",
    },
    {
      id: 0,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "6",
    },
    {
      id: 1,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "7",
    },
    {
      id: 2,
      title: "게시글 제목",
      writer: "작성자",
      date: "2021-11-23",
      commentsNum: "0",
      viewNum: "7",
    },
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
      <>
        {currentPosts.map((x) => {
          return (
            <div className="TextsWrap" style={{ borderTop: "hidden" }}>
              <div className="TextLeftBox">{x.title}</div>
              <div className="TextCenterBox">{x.writer}</div>
              <div className="TextCenterBox">{x.date}</div>
              <div className="TextCenterBox">{x.commentsNum}</div>
              <div className="TextCenterBox">{x.viewNum}</div>
            </div>
          );
        })}
      </>
    );
  };

  const sortList = [
    { id: 0, lable: "최신순" },
    { id: 1, lable: "조회순" },
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
              style={{ fontFamily: "Roboto" }}
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
            style={{ border: "solid 2px #ccc", backgroundColor: "#f2f2f2" }}
          >
            <div
              className="TextBlackBox"
              style={{ width: "48%", marginLeft: "30px" }}
            >
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
                  className={
                    currentPage === number ? "PagebuttonActive" : "Pagebutton"
                  }
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              );
            })}
          </nav>
          <div className="button">
            <img src={writeIMG} alt="writeIMG" />
            <div>글쓰기</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
