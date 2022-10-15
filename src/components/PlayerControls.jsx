import React from "react";
import styled from "styled-components";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import {
  MdOutlineShuffleOn,
  MdShuffle,
  MdRepeat,
  MdOutlineRepeatOn,
} from "react-icons/md";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { msToMinutesAndSeconds } from "../utils/datetime-utils";

export default function PlayerControls() {
  const [{ token, playerState, playerShuffle, playerRepeat,currentlyPlaying }, dispatch] =
    useStateProvider();

  const changeTrack = async (type) => {
    const getIdDevice = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const idDevice = getIdDevice.data.devices[0].id;
    console.log(type);
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}?device_id=${idDevice}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response1);
    if (response1.data !== "") {
      const { item } = response1.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        duration: item.duration_ms,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    } else dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
  };

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    const getIdDevice = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const idDevice = getIdDevice.data.devices[0].id;
    const response2 = await axios.put(
      `https://api.spotify.com/v1/me/player/${state}?device_id=${idDevice}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response2);
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };

  const changeShuffle = async () => {
    const shuffle = playerShuffle ? "false" : "true";
    const getIdDevice = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const idDevice = getIdDevice.data.devices[0].id;
    const response3 = await axios.put(
      `https://api.spotify.com/v1/me/player/shuffle?state=${shuffle}&device_id=${idDevice}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response3);
    dispatch({
      type: reducerCases.SET_PLAYER_SHUFFLE,
      playerShuffle: !playerShuffle,
    });
  };

  const changeRepeat = async () => {
    const repeat = playerShuffle ? "off" : "context";
    const getIdDevice = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const idDevice = getIdDevice.data.devices[0].id;
    console.log(repeat);
    const response3 = await axios.put(
      `https://api.spotify.com/v1/me/player/repeat?state=${repeat}&device_id=${idDevice}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: reducerCases.SET_PLAYER_REPEAT,
      playerRepeat: !playerRepeat,
    });
  };

  return (
    <Container>
      <div className="button__control">
        <div className="shuffle tooltip">
          {playerShuffle ? (
            <MdOutlineShuffleOn onClick={changeShuffle} />
          ) : (
            <MdShuffle onClick={changeShuffle} />
          )}
          <span className="tooltiptext">Enable Shuffle</span>
        </div>
        <div className="previous tooltip">
          <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
          <span className="tooltiptext">Previous</span>
        </div>
        <div className="state tooltip">
          {playerState ? (
            <BsFillPauseCircleFill onClick={changeState} />
          ) : (
            <BsFillPlayCircleFill onClick={changeState} />
          )}
          <span className="tooltiptext">Play</span>
        </div>
        <div className="next tooltip" onClick={() => changeTrack("next")}>
          <CgPlayTrackNext />
          <span className="tooltiptext">Next</span>
        </div>
        <div className="repeat tooltip">
          {playerRepeat ? (
            <MdOutlineRepeatOn onClick={changeRepeat} />
          ) : (
            <MdRepeat onClick={changeRepeat} />
          )}
          <span className="tooltiptext">Enable Repeat</span>
        </div>
      </div>
      <div className="process__bar">
        {currentlyPlaying ? (<div className="time__full">{msToMinutesAndSeconds(currentlyPlaying.duration)}</div>) : ''}
        <input type="range" min={0} max={100} />
        <div className="time__run">00:00</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 3rem 0 2rem;
  .button__control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    svg {
      color: yellowgreen;
      transition: 0.2s ease-in-out;
      &:hover {
        color: white;
      }
    }
    .state {
      svg {
        color: white;
      }
    }
    .previous,
    .next,
    .state {
      font-size: 2rem;
    }
    .tooltip {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black;
    }
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 7rem;
      background-color: #302f2f;
      color: white;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      font-size: 1rem;
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

    .tooltip .span {
      font-size: 2rem;
    }
  }

  .process__bar {
    display: flex;
    flex-direction: row-reverse;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    color: #b3b3b3;
    font-size: small;
    margin: 0 2rem 0 2rem;
    input {
      width: 86%;
      border-radius: 2rem;
      height: 0.3rem;
    }
  }
`;
