import React, { useRef } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar(navBackground) {
  const [{ userInfo }] = useStateProvider();
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef();

  const userProfileDisplay = () => {
    setClicked(!clicked)
  };

  return (
    <Container navBackground={navBackground}>
      <form className="search__bar"  onSubmit={(e)=> {
        e.preventDefault()
        navigate(`/search/${searchInputRef.current.value}${window.location.hash}`)
      }}
        > 
        <FaSearch />
        <input
          type="text"
          placeholder="Artists, Songs, or Podcasts"
          ref={searchInputRef}
        />
        <input type="submit" hidden />
      </form>
      <div className="avatar"  onClick={userProfileDisplay}>
        {!clicked ? <div >
          <div className="profile-button">
            <CgProfile />
            <span>{userInfo?.userName}</span>
          </div>
        </div> : <div className="profile-button-information">
          <div>Account</div>
          <div>Profile</div>
          <div>Upgrade to Premium</div>
          <div>Support</div>
          <div>Download</div>
          <div>Settings</div>
          <hr></hr>
          <div><a href="/a">Log out</a></div>
        </div>}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba ( 0, 0, 0, 0.7)" : "none"};
  .search__bar {
    background-color: white;
    width: 40%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    input {
      border: none;
      height: 1.5rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .profile-button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.5rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
    .profile-button-information {
      display: block;
      color: white;
      border-radius: 2rem;
      border-radius: 4px;
      box-shadow: 0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%);
      max-height: calc(100vh - 24px);
      max-width: 350px;
      min-width: 160px;
      overflow-y: auto;
      padding: 4px;
      div {
        padding-top: -2px;
        margin: -2px;
        margin-left: 10px;
        :focus: underline;
        cursor: pointer;
      }
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.5rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
    }
  }
`;
