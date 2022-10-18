import React from "react";
import styled from "styled-components";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPlaylistsData = () => {
  const [{ token, categoryPlaylists }, dispatch] = useStateProvider();
  const {id} = useParams()
  console.log(id)
  useEffect(() => {
    const getCatergoriesPlaylists = async (id) => {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
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
    getCatergoriesPlaylists(id);
  }, [token, dispatch]);

  return (
    <Container>
      <div>
        {categoryPlaylists.map((categoryPlaylist) => {
          return (
            <div className="category-playlists">
              <h2 className="category-playlists-name">{categoryPlaylist.name}</h2>
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

export default CategoryPlaylistsData;

const Container = styled.div`
  .category-playlists {
    display: block;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin-left: 30px;
    margin-bottom: 20px;
  }
  .category-playlists-name {
    color: white;
    margin-bottom: 10px;
  }
`