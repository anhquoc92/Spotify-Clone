import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Categories from "./Categories";
import BrowseSearch from "./BrowseSearch";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// phần làm route
import {Routes, Route} from "react-router-dom";
import Library from "../pages/yourLibrary";
import LikeSong from "../pages/likedSong";
import ListSearch  from "../search/searchList";
import CategoryPlaylistsData from "./CategoriesPlaylists";
import Search from "./Search";
import TrackSearchResult from "./TrackSearchResult";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const navigate = useNavigate();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 30
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  const { access_token } = useLocation();
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className="body__contents">
            <Routes>
              <Route path="/" element={<Categories />} />
              <Route
                path="/playlists/:id"
                element={<CategoryPlaylistsData />}
              />
              <Route
                path="/library"
                element={<Body headerBackground={headerBackground} />}
              />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:searchvalue" element={<Search />} />
              {/* <Route path="/library" element={<Library/>}/>
                <Route path="/library" element={<Library/>}/>
                <Route path="/library" element={<Library/>}/>
                <Route path="/library" element={<Library/>}/> */}
            </Routes>
          </div>
        </div>
        </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 92vh 8vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 1rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
