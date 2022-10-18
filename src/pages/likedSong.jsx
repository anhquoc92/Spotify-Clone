import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function LikeSong() {
  const navigate = useNavigate()
  return (
    <Container>
      <div className="full-body">
        <div className="part-1-layout">
          <div className="component-part-1">
            <img
              src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              alt="Logo"
              className="logo-liked-song"
            />
            <div className="font-title"><h5 style={{fontSize: "18px" }}>PLAYLIST</h5> <h1 style={{fontSize: "80px" }}>Liked Songs</h1></div>
          </div>
          <br/><br/><hr/>
        </div>

        <div className="part-2-layout">
          <div className="component-part-2">
            <h1 style={{fontSize: "60px", color:"white"}}>Songs you like will appear here</h1>
            <br/>
            <h2 style={{fontSize: "20px", color:"white"}}>Save songs by tapping the heart icon.</h2>
            <button className="find-song" onClick={() => {navigate('/search')}}><strong>Find Songs</strong></button>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
    padding: 0px;
    height: 100%;
    width: 100%;
  .part-1-layout {
    background-color: rgb(80, 56, 160);
    width: 100%;
    margin-top: -149px;
  }
  .logo-liked-song{
    width: 232px; 
    height: 232px;
    margin-top: 129px;
  }
  .component-part-1 {
    padding-left: 25px;
    padding-bottom: 13px;
  }
  .font-title{
    color: white;
    padding-left: 255px;
    position: relative;
    top: -149px;
    
  }
  hr {
    border: 0.25px solid white;
  }
  .component-part-2{
    text-align: center;
    background-color: #1e272e;
    padding-bottom: 206px;
  }

  .find-song{
    cursor: pointer;
    width: 150px;
    height: 40px;
    border-radius: 12px;
    border: none;
    position: relative;
    bottom: -37px;
    &:hover {
       background-color: #485460;
    }
  }
`;