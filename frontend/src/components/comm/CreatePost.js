import React, {useState,useMemo,useEffect,useCallback} from 'react';
import styled from 'styled-components';
import stats_icon from '../../images/stats_icon.svg';
import post_icon from '../../images/post_icon.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactHtmlParser from 'html-react-parser';

const CreateContainer = styled.div`
    width: 970px;
    height: 916px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin: 64px 320px 0 0;
    padding: 30px 40px;
    border: solid 1px #e4e6eb;
    font-family: Roboto !important;
`

const Header = styled.div`
    width: 700px;
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
}
`

const ContentContainer = styled.div`
    width: 700px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    
`
const Category = styled.select`
    height: 34px;
    flex-grow: 0;
    border-radius: 5px;
    border: solid 2px #eaeaea;
    
`

const Title = styled.input`
    height: 30px;
    flex-grow: 0;
    border-radius: 5px;
    border: solid 2px #eaeaea;
    resize: none;
    font-size: 15px;
    padding: 5px;    
    
`

const ContentEdit = styled.textarea`
    height: 344px;
    flex-grow: 0;
    border-radius: 5px;
    border: solid 2px #eaeaea;
    resize: none;
    font-size: 16px;
    font-family: Roboto;
    padding: 5px;
`
const ButtonWrap = styled.div`
    height: 30px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`
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
    gap:4px;
    cursor:pointer;
    font-weight: bold;
`

const CreatePost = () => {
    const category = [
        {
            id:1,
            name:'자유게시판',
            cate: 'free-board',
        },
        {
            id:2,
            name:'스터디 모집',
            cate: 'study-recruit',
        },
        {
            id:3,
            name:'스터디 참여',
            cate: 'study-enter',
        },
        {
            id:4,
            name:'정보 공유 - 국가 고시',
            cate: 'k-exam',
        },
        {
            id:5,
            name:'정보 공유 - 독서',
            cate: 'reading',
        },
        {
            id:6,
            name:'정보 공유 - 수능',
            cate: 'sat',
        },
        {
            id:7,
            name:'정보 공유 - 어학',
            cate: 'eng',
        },
        {
            id:8,
            name:'정보 공유 - 자격증',
            cate: 'cert',
        },
        {
            id:9,
            name:'정보 공유 - 기타',
            cate: 'etc',
        },
    ];


    const getTitle = (e) => {
        setTit(e.target.value);
    }

    const enterContent = (e) => {
        if(window.confirm('게시글을 등록하시겠습니까?')){
            //axios
        }
    }
    const [editor,setEditor] = useState("");
    const [tit,setTit] = useState("");

    // react-quill module
    const modules = useMemo(
        () => ({
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ color: [] }],
              [
                { list: "ordered" },
                { list: "bullet" },
                // { indent: "-1" },
                // { indent: "+1" },
                { align: [] },
              ],
              [],
            ],

          },
        }),
        []
      );
    
    return(

        <CreateContainer>
            <Header>
                헤더입니다
            </Header>
            <ContentContainer>
                <Category>
                    {category.map((data) => (<option>{data.name}</option>))}
                </Category>
                <Title
                    placeholder='제목을 입력해주세요.'
                    onChange={getTitle}
                    value={tit}
                >
                    {console.log(tit)}
                </Title>
                {/* <ContentEdit 
                    placeholder="내용을 입력하세요"
                    onChange={getValue}
                    name='content'
                >
                </ContentEdit> */}
                <ReactQuill
                    style={{minHeight:"350px",marginBottom: "30px"}}
                    
                    onChange={setEditor}
                    modules={modules}
                    theme="snow"
                    placeholder="내용을 입력해주세요."
                    />
                <ButtonWrap>
                    <Button>
                        <img  src ={stats_icon}/>
                        나의 학습 관리 추가
                    </Button>
                    <Button 
                    style={{backgroundColor:'#ef8585'}}
                    onClick={enterContent}
                    >
                        <img  src ={post_icon}/>
                        게시글 등록
                    </Button>
                </ButtonWrap>
            </ContentContainer>
 
            {/* 테스트 test */}
            <h2>{tit}</h2>
            <div>{editor}</div>
        </CreateContainer>

    );
}
export default CreatePost;