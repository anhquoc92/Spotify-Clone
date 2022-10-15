import React from "react";
import styled from "styled-components";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect } from "react";

const categoryPlaylistsData = () => {
  const [{ token, categoryPlaylists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCatergoriesPlaylists = async (categoryId) => {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const categoryPlaylists = response.data.playlists.items;
      console.log(categoryPlaylists);
      dispatch({
        type: reducerCases.SET_CATEGORIES_PLAYLISTS,
        categoryPlaylists,
      });
    };
    getCatergoriesPlaylists();
  }, [token, dispatch]);

  return (
    <Container>
      <div>
        {categoryPlaylists.map((categoryPlaylist) => {
          return (
            <div>
              <h2>{categoryPlaylist.name}</h2>
              <img
                key={categoryPlaylist.id}
                src={categoryPlaylist.images[0].url}
                alt={categoryPlaylist.name}
              />
            </div>
          );
        })}
      </div>
      ;
    </Container>
  );
};

export default categoryPlaylistsData;

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