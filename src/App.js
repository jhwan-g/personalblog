import {Route, Routes, Link, useParams} from "react-router-dom"
import React, { useState, useEffect } from "react"
import './App.css'
import posts_data from './data/posts.json'
import Pdf from './Pdfrender'

// Profile / Contacts / PersonalBlog

//재사용되는 요소들
function Title(){
    return(
        <header id="Title">
            HwanGyu Jeong
        </header>
    );
}

function SidebarButton({current, buttonname}){
    let buttonid = NaN
    if(current === buttonname) {buttonid = "SidebarButton0";}
    else {buttonid = "SidebarButton1";}
    return(
        <div>
            <Link to={`/${buttonname}`} id = {buttonid}>{buttonname}</Link>
            <div style={{width: 110, height: 0, border: '1px black solid'}}></div>
        </div>
    )
}

function Sidebar({current}){
    return(
        <div id="Sidebar" className="Frame9">
            <SidebarButton current={current} buttonname={"Profile"}></SidebarButton>
            <SidebarButton current={current} buttonname={"Contacts"}></SidebarButton>
            <SidebarButton current={current} buttonname={"PersonalBlog"}></SidebarButton>
        </div>
    );
}
/*
function TitleSidebar({current}){
    return(<>
        <Title />
        <div id="Frame19" style={{position: 'relative', float:'left'}}>
            <Sidebar current={current}/>
            <div style={{position: 'absolute', top: 0, bottom:-20, border: '1px black solid', left:180, minHeight:600}}></div>
        </div>
    </>
    );
}
*/
//기본 화면 
function ProfilePage({current}){ //프로필 화면
    return(
        <>
            <Title />
            <div id="Frame19" style={{position: 'relative', float:'left'}}>
                <Sidebar current={current}/>
                <div style={{position: 'absolute', top: 0, bottom:-20, border: '1px black solid', left:180, minHeight:600}}></div>

                <div className="BasicTextFrame Text1" style={{maxWidth:800}}>
                    <div style={{float: 'none'}}>
                        <div className="Title">About Me</div>
                        <div className="Content">
                        <div>I'm a undergraduate student in Seoul National University department of Computer Science and Engineering. 
                            As a freshman I'm interested in diverse field and seeking for the area which fits best on me. 
                            Among them algorithms / mathematical foundations of computer and AI systems / system, 
                            compiler programming currently attracts me. I believe solid understanding of mankind and principles of 
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
                                <li>Laser, PSPD 기반 2차원 고속 위치 추적 시스템 제작</li>
                                <ul>
                                    <li>PSPD의 광 세기 데이터를 기반으로 PSPD위의 Laser의 위치를 계산한 후 PID제어를 통해 PSPD가 움직이는 상황에서도 Laser가 그 중심에
                                    위치할 수 있게 하는 프로그램을 개발. </li>
                                    <li>Most Outstanding Exhibit in Science, Technology Engineering and Mathematics(KSEF)</li>
                                    <li>Silver Medal(KSEF)</li>
                                </ul>
                                <li>한글 자동 수식 문자열 치환 프로그램 개발(windows application)</li>
                                <ul>
                                    <li>Python+TKinter+HWPCtrl를 이용해 한글 수식 편집 과정에서 원하는 문자열을 다른 문자열로 일괄적으로 바꾸어 주는 프로그램을 개발</li>
                                </ul>
                                <li>웹프로그래밍</li>
                                <ul>
                                    <li>Django+SQLite+HTML/CSS를 이용한 웹사이트 개발(CarrotStagram): 로그인/로그아웃, 댓글, 좋아요, 피드 기능 구현</li>
                                    <li>React+Figma를 이용한 정적 웹페이지 개발</li>
                                </ul>
                                <li>Competitive Programming(KOI award winning-high school division)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ContactsPage({current}){ //연락처 화면
    return(
        <>
            <Title/>
            <div id="Frame19" style={{position: 'relative', float:'left'}}>
                <Sidebar current={current}/>
                <div style={{position: 'absolute', top: 0, bottom:-20, border: '1px black solid', left:180, minHeight:600}}></div>

                <div className="Text1 BasicTextFrame" style={{maxWidth:800}}>
                    <div style={{float:"none"}}>
                        <div className="Title">
                            Contacts
                        </div>
                        <div className="Content">
                            <div>Hwangyu Jeong</div>
                            <div>Undergrad Student-Computer Science and Engineering</div>
                            <div>Seoul National University</div>
                            <div style={{marginTop:10}}>Email: jhwaang(at)snu.ac.kr</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


function BlogListPage({current}){ //개시물 리스트 화면
    const [posts, setPosts] = useState([]);
      
    useEffect(() => {
      setPosts(posts_data);
    }, []);

    return(
        <>
            <Title/>
            <div id="Frame19" style={{position: 'relative', float:'left'}}>
                <Sidebar current={current}/>
                <div style={{position: 'absolute', top: 0, bottom:-20, border: '1px black solid', left:180, minHeight:600}}></div>
                <div className="BasicTextFrame Text1" style={{maxWidth:800}}>
                    <div style={{float:"none"}}>
                        <div className="Content" style={{marginBottom:30}}>
                            <div>Technical, development experience are posted.</div>
                            <div>Korean(mainly) and English are used.</div>
                            <div>Posts are pdf-based and also accessible through webpage.</div>
                        </div>
                        <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <div className="Title"><Link to={`/PersonalBlog/${post.id}`} style={{textDecoration:"none", color:"black"}}>{post.title}</Link></div>
                                <div className="Content">{post.description}</div>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

function BlogDetailPage({current}){
    const { id } = useParams();
    const post = posts_data.find(p => p.id === parseInt(id));


    if (!post) {
        return <h2>Post not found</h2>;
    }

    return(
        <>
            <Title />
            <div id="Frame19" style={{position: 'relative', float:'left'}}>
                <Sidebar current={current}/>
                <div style={{position: 'absolute', top: 0, bottom:-20, border: '1px black solid', left:180, minHeight:600}}></div>
                <div className="BasicTextFrame Text1" style={{Width:800}}>
                    <div style={{float:"none"}}>
                        <div className="Title">{post.title}</div>
                        <div className="Content">{post.description}</div>
                        <Pdf url={post.location} />
                    </div>
                </div>
            </div>
        </>
    );
}

//routing
export default function App(){
    return(
        <Routes>
            <Route path="/" element={<ProfilePage current={"Profile"}/>} />
            <Route path="/Profile" element={<ProfilePage current={"Profile"}/>} />
            <Route path="/Contacts" element={<ContactsPage current={"Contacts"}/>} />
            <Route path="/PersonalBlog" element={<BlogListPage current={"PersonalBlog"}/>} />
            <Route path="/PersonalBlog/:id" element={<BlogDetailPage current={"PersonalBlog"}/>} />
        </Routes>
    )
}