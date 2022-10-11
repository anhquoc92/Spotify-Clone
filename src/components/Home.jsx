import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";

const Home = () => {
    const [{ token, playerState }, dispatch] = useStateProvider();
    const getAlbum = async () => {
        const response = await axios.get(
            `https://api.spotify.com/v1/albums/2up3OPMp9Tb4dAKM2erWXQ`,
            {
              headers: {
                Authorization: "Bearer " +  
                token,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response)
    };
    getAlbum();
    
    return (
        <Container>
            <div></div>
        </Container>
    )
};

export default Home;

const Container = styled.div`
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
    font-size: 2.5rem;
  }
`;