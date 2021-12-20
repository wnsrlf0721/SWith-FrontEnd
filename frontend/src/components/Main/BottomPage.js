import './css/BottomPage.css';
import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import { getStudyRooms, getUserInfo } from '../../api/APIs';
import StudyCard from './StudyCard';

import studyImage from '../../images/studyImage.jpg';
import closeIcon from '../../images/close_icon.svg';

const category = [
  {
    id: 1,
    name: '전체',
    purpose: 'all',
  },
  {
    id: 2,
    name: '국가 고시',
    purpose: 'k-exam',
  },
  {
    id: 3,
    name: '독서',
    purpose: 'reading',
  },
  {
    id: 4,
    name: '수능',
    purpose: 'sat',
  },
  {
    id: 5,
    name: '어학',
    purpose: 'eng',
  },
  {
    id: 6,
    name: '자격증',
    purpose: 'cert',
  },
  {
    id: 7,
    name: '기타',
    purpose: 'order',
  },
];

const BottomPage = ({ search }) => {
  const [NickName, setNickName] = useState('');
  const [toggleState, setToggleState] = useState(1);
  const [posts, setPosts] = useState([]);
  const [purpose_list, setPurpose_list] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = purpose_list.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(purpose_list.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const toggleTab = (index) => {
    let sub_array = [];
    setToggleState(index.id);
    setCurrentPage(1);
    if (index.purpose === 'all') {
      setPurpose_list(posts);
    } else {
      posts.map((data) => {
        const purpose = data.purpose;
        if (purpose === index.purpose) {
          sub_array = sub_array.concat({
            id: data.id,
            title: data.title,
            hashtags: data.hashtags,
            purpose: data.purpose,
            maxUserCount: data.maxUserCount,
            userCount: data.userCount,
            secret: data.secret,
            imageURL: data.imageURL,
          });
        }
      });
      setPurpose_list(sub_array);
    }
  };

  const getStudyTitleHashtag = () => {
    let roomInfo = [];
    getStudyRooms()
      .then((response) => {
        const datas = response.data.data;
        console.log(datas);
        datas.map((data) => {
          roomInfo = roomInfo.concat({
            id: data.id,
            title: data.title,
            hashtags: data.hashtags,
            purpose: data.purpose,
            maxUserCount: data.maxUserCount,
            userCount: data.userCount,
            secret: data.secret,
            imageURL: data.imageURL,
          });
        });

        if (search) {
          let srh_array = [];
          roomInfo.map((data) => {
            if (data.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
              srh_array = srh_array.concat({
                id: data.id,
                title: data.title,
                hashtags: data.hashtags,
                purpose: data.purpose,
                maxUserCount: data.maxUserCount,
                userCount: data.userCount,
                secret: data.secret,
                imageURL: data.imageURL,
              });
            } else {
              for (var i in data.hashtags) {
                if (
                  data.hashtags[i].hashtag.toLowerCase().indexOf(search.toLowerCase()) !==
                  -1
                ) {
                  srh_array = srh_array.concat({
                    id: data.id,
                    title: data.title,
                    hashtags: data.hashtags,
                    purpose: data.purpose,
                    maxUserCount: data.maxUserCount,
                    userCount: data.userCount,
                    secret: data.secret,
                    imageURL: data.imageURL,
                  });
                  break;
                }
              }
            }
          });
          setPosts(srh_array);
          setPurpose_list(srh_array);
        } else {
          setPosts(roomInfo);
          setPurpose_list(roomInfo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const isLogined = window.localStorage.userInfo == null ? false : true;
    if (isLogined) {
      const local = JSON.parse(window.localStorage.userInfo);
      getUserInfo(local.userId)
        .then((response) => {
          const data = response.data;
          if (data.status === '200' && data.message === 'OK') {
            setNickName(data.data.nickname);
          }
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    } else {
      setNickName('UNKNOWN');
    }
    getStudyTitleHashtag();
  }, []);

  return (
    <Bottompage>
      <div className="StudiesContainer">
        <div className="StudiesHeader">
          <div className="StudiesHeaderTitle">
            {!search ? (
              <div className="TitleTextBox">스터디 목록</div>
            ) : (
              <>
                <div className="TitleTextBox">
                  "{search}"의 검색 결과
                  <a href="/">
                    <img
                      style={{
                        display: 'block',
                      }}
                      src={closeIcon}
                    />
                  </a>
                </div>
              </>
            )}
            <div className="StudiesHeaderNum">총 {purpose_list.length} 개 스터디</div>
          </div>
        </div>

        <div className="StudiesTabWrap">
          <div className="StudiesTabListWrap">
            {category.map((data) => (
              <button
                className={
                  toggleState === data.id ? 'StudiesButtonActive' : 'StudiesButton'
                }
                onClick={() => toggleTab(data)}
              >
                {data.name}
              </button>
            ))}
          </div>
        </div>

        <div className="StudyCardWrap">
          {currentPosts.map((data) => {
            return (
              <LinkContainer>
                <StudyCard
                  title={data.title}
                  imgUrl={data.imageURL ? data.imageURL : studyImage}
                  body={data.hashtags}
                  studyRoomID={data.id}
                  nickName={NickName}
                  maxUserCount={data.maxUserCount}
                  userCount={data.userCount}
                  secret={data.secret}
                  bottomPage={true}
                ></StudyCard>
              </LinkContainer>
            );
          })}
        </div>
        <nav style={{ margin: '20px' }}>
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
      </div>
    </Bottompage>
  );
};

export default BottomPage;

const Bottompage = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const LinkContainer = styled.div`
  width: calc(20% - 16px);
  margin: 8px;
  height: 250px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  border: 0px;
  text-align: left;
`;
