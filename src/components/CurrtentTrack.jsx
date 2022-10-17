import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { MdPictureInPicture } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

export default function CurrtentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track__info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
          <div className="save__library">
            <li>
              <div className="tooltip">
                <FaRegHeart />
                <span className="tooltiptext">Save to Your Library</span>
              </div>
            </li>
          </div>
          <div className="show__track__image">
            <li>
            <div className="tooltip">
              <MdPictureInPicture />
              <span className="tooltiptext">Picture to Picture</span>
            </div>
            </li>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        font-size: small;
        color: white;
        margin: 0.1rem;
        text-overflow: ellipsis; 
      }
      h6 {
        color: #b3b3b3;
        margin: 0.1rem;
        text-overflow: ellipsis; 
      }
    }
  }

  .track__info {
    width: 13rem;
  }

  .save__library {
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      color: white;
      transition: 0.3s ease-in-out;
      &:hover {
        color: greenyellow;
      }
    }
  }
  .show__track__image {
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      color: white;
      transition: 0.3s ease-in-out;
      &:hover {
        color: greenyellow;
      }
    }
  }

  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }
  .track .tooltip .tooltiptext {
    visibility: hidden;
    width: 7rem;
    background-color: #302f2f;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    font-size: 1rem;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

`;
