import React from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import {AiOutlineHeart} from "react-icons/ai";
import Playlists from "./Playlists";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify"
          ></img>
        </div>
        <ul>
          <li onClick={() => {
                  navigate(`/${window.location.hash}`);
                }}>
            <MdHomeFilled />
           <span>Home</span>
          </li>
          <li onClick={() => {
                  navigate(`/search${window.location.hash}`);
                }}>
            <MdSearch />
            <li><span>Search</span></li>
          </li>
          <li onClick={() => {
                  navigate(`/yourlibrary${window.location.hash}`);
                }}>
            <IoLibrary />
            <span>Your Library</span>
          </li>
          <li/>

          <li onClick={() => {
                  navigate(`/likedsongs`);
                }}>
            <AiOutlineHeart />
            <span>Liked Songs</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: greenyellow;
        }
      }
    }
  }
`;
