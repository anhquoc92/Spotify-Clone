import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

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
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
