import {Route, Routes, Link, useParams} from "react-router-dom"
import React, { useState, useEffect} from "react"
import './App.css'
import posts_data from './data/posts.json'
import Pdf from './Pdfrender'

// Profile / Contacts / Blog


//재사용되는 요소들
function Title(){
    return(
        <header id="Title">
            <Link to='/' style={{textDecoration:"none", color:"black"}}>HwanGyu Jeong</Link>
        </header>
    );
}

function Footer(){
    return(
        <div style={{fontSize:10, maxWidth:'fit-content'}} className="center-content">
            Copyright ©️ 2024 Hwangyu Jeong
        </div>
    )
}

function SidebarButton({buttonname}){
    let [SidebarButtonID, setSidebarButtonID] = useState("SidebarButton")

    function handleMouseOut() {
        setSidebarButtonID("SidebarButton");
    }
    function handleMouseOver(){
        setSidebarButtonID("SidebarButtonHovered");
    }

    return(
        <div style={{paddingBottom:5}}>
            <Link to={`/${buttonname}`} id = {SidebarButtonID} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{buttonname}</Link>
        </div>
    )
}

function TitleSidebar(){

    const [isClosed, setIsClosed] = useState(true);

    function ChangeSidebarState(){
        setIsClosed(!isClosed)
    }

    return(<>
        <div>
            <button onClick={ChangeSidebarState} id='SidebarOpenButton'>
                <img src="/sidebaropen.jpeg" style={{marginLeft:-10, maxHeight:35, maxWidth:35, transform:isClosed?'rotate(0deg)':'rotate(90deg)'}} alt="sidebaropenbutton"/>
            </button>
            <Title />
        </div>
        <div id="Sidebar" style={{display:(isClosed?'none':'inline')}}>
            <SidebarButton buttonname={"Profile"}></SidebarButton>
            <SidebarButton buttonname={"Contacts"}></SidebarButton>
            <SidebarButton buttonname={"Blog"}></SidebarButton>
        </div>
        <div style={{height: 0, border: '1px black solid', marginTop: 5, marginBottom: 5}}></div>
    </>
    );
}

//Each Page 
function ProfilePage(){ //프로필 화면
    return(
        <>
            <div className="BasicTextFrame Text1">
                <div style={{float: 'none'}}>
                    <div className="Title">About Me</div>
                    <div className="Content">
                    <div>I'm a undergraduate student in Seoul National University department of Computer Science and Engineering. 
                        I'm interested in diverse field and seeking for the best fit. 
                        Among them algorithms / mathematics / hardware
                        currently attracts me. I believe solid understanding of mankind and principles of 
                        computer system is key for writing good programs. </div>
                    </div>
                    <div className="Title">Education</div>
                    <div className="Content">
                        <ul style={{marginTop:0}}>
                            <li>Feb. 2024-Current, B.S. Student, Computer Science and Engineering, Seoul National University</li>
                            <li>Mar. 2021-Feb. 2024, Incheon Academy of Science and Arts</li>
                        </ul>
                    </div>
                    <div className="Title">Experiences</div>
                    <div className="Content MultipleList">
                        <ul style={{marginTop:0}}>
                            <li>You can see (part of)what I studied <Link to="/Blog">here</Link>.</li>
                            <li>2D tracking system development with Laser, PSPD (Laser, PSPD 기반 2차원 고속 위치 추적 시스템 제작)</li>
                            <ul>
                                <li>PSPD의 광 세기 데이터를 기반으로 PSPD위의 Laser의 위치를 계산한 후 PID제어를 통해 PSPD가 움직이는 상황에서도 Laser가 그 중심에
                                위치할 수 있게 하는 프로그램을 개발. </li>
                                <li>Most Outstanding Exhibit in Science, Technology Engineering and Mathematics(KSEF)</li>
                                <li>Silver Medal(KSEF)</li>
                            </ul>
                            <li>Formular formatting supporter for HWP files (한글 자동 수식 문자열 치환 윈도우 프로그램 개발)</li>
                            <ul>
                                <li>Python+TKinter+HWPCtrl를 이용해 한글 수식 편집 과정에서 원하는 문자열을 다른 문자열로 일괄적으로 바꾸어 주는 프로그램을 개발</li>
                            </ul>
                            <li>Web Development</li>
                            <ul>
                                <li>Django+SQLite+HTML/CSS를 이용한 웹사이트 개발(CarrotStagram): 로그인/로그아웃, 댓글, 좋아요, 피드 기능 구현</li>
                                <li>React+Figma를 이용한 정적 웹페이지 개발</li>
                            </ul>
                            <li>Competitive Programming(KOI award winning-high school division)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

// 아래 title / sidebar 부분 전체적으로 만져야 함
function ContactsPage(){ //연락처 화면
    return(
        <>
            <div className="Text1 BasicTextFrame">
                <div style={{float:"none"}}>
                    <div className="Title">
                        Contacts
                    </div>
                    <div className="Content">
                        <div>Hwangyu Jeong</div>
                        <div>Undergrad Student-Computer Science and Engineering</div>
                        <div>Seoul National University</div>
                        <div style={{marginTop:10}}>Email: jhwaang(at)snu.ac.kr</div>
                        <div>Github: <Link to="https://github.com/jhwan-g" >jhwan-g</Link></div>
                    </div>
                </div>
            </div>
        </>
    );
}


function BlogListPage(){ //개시물 리스트 화면
    const [posts, setPosts] = useState([]);
      
    useEffect(() => {
      setPosts(posts_data);
    }, []);

    return(
        <>
            <div className="BasicTextFrame Text1">
                <div style={{float:"none"}}>
                    <div className="Content" style={{marginBottom:30}}>
                        <div>Technical, development experience are posted.</div>
                        <div>Korean(mainly) and English are used.</div>
                        <div>Posts are pdf-based and also accessible through webpage.</div>
                    </div>
                    <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <div className="Title"><Link to={`/Blog/${post.id}`} style={{color:"black"}}>{post.title}</Link> (<a download href={post.location} style={{color:"black"}}>PDF</a>)</div>
                            <div className="Content">{post.description}</div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

function BlogDetailPage(){
    const { id } = useParams();
    const post = posts_data.find(p => p.id === parseInt(id));


    if (!post) {
        return <h2>Post not found</h2>;
    }

    return(
        <>
            <div className="BasicTextFrame Text1" style={{Width:800}}>
                <div style={{float:"none"}}>
                    <div className="Title">{post.title} (<a download href={post.location} style={{color:"black"}}>PDF</a>)</div>
                    <div className="Content">{post.description}</div>
                    <Pdf url={post.location} />
                </div>
            </div>
        </>
    );
}

//routing
export default function App(){
    return(
        <div style={{ maxWidth:700}} className="center-content">
            <TitleSidebar />
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/Profile" element={<ProfilePage />} />
                <Route path="/Contacts" element={<ContactsPage/>} />
                <Route path="/Blog" element={<BlogListPage/>} />
                <Route path="/Blog/:id" element={<BlogDetailPage/>} />
            </Routes>
            <Footer />
        </div>
    )
}