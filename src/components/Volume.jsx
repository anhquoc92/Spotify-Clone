import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { TbMicrophone2 } from "react-icons/tb";
import { MdQueueMusic, MdDevicesOther } from "react-icons/md";
import { BsFillVolumeUpFill, BsArrowsFullscreen } from "react-icons/bs";

export default function Volume() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
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
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume?device_id=${idDevice}`,
      {},
      {
        params: { volume_percent: parseInt(e.target.value) },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <Container>
      <li>
        <div className="tooltip">
          <TbMicrophone2 />
          <span className="tooltiptext">Lyrics</span>
        </div>
      </li>
      <li>
        <div className="tooltip">
          <MdQueueMusic />
          <span className="tooltiptext">Queue</span>
        </div>
      </li>
      <li>
        <div className="tooltip">
          <MdDevicesOther />
          <span className="tooltiptext">Connect to a device</span>
        </div>
      </li>
      <li>
        <div className="tooltip">
          <BsFillVolumeUpFill />
          <span className="tooltiptext">Mute</span>
        </div>
      </li>
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
      <li>
        <div className="tooltip">
          <BsArrowsFullscreen />
          <span className="tooltiptext">Full Screen</span>
        </div>
      </li>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  input {
    width: 12rem;
    border-radius: 2rem;
    height: 0.35rem;
  }
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
`;
