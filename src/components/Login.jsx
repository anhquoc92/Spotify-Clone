import React from "react";
import styled from "styled-components";
import LoginAcc from "./LoginAcc";

export default function Login() {
  const handleClick = () => {
    const clientId = "6dcd9ee75f494fa3a229e3d6f19fd4d4"; //6dcd9ee75f494fa3a229e3d6f19fd4d4-Quoc1 f6464f2b39f04c4fa11e11d2157545db-Minh2 e585ef943fd349f9884ddd3b7a4c7cf1-Minh
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "http://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
    // localStorage.setItem("rawToken",`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`)
  };
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify"
      ></img>
      <button onClick={handleClick}>Connect Spotify By Token</button>
      <LoginAcc />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 2rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: white;
    font-size: 1.4rem;
  }
`;
