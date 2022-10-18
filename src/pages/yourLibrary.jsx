import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
export default function Library() {
  
  const [{ token, library, selectedPlaylistId }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  useEffect(() => {
    const getPlayListData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const { items } = response.data;
      const library = items.map(({ name, id, images }) => {
        return { name, id, images };
      });
      dispatch({ type: reducerCases.SET_PLAYPLIST_LIBRARY, library });
    };
    getPlayListData();
  }, [token, dispatch]);

  // const changeCurrentPlaylist = (library) => {
  //   dispatch({ type: reducerCases.SET_PLAYPLIST_LIBRARY, library })
  //   console.log(library)
  // };
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId})
    console.log(selectedPlaylistId)
  };
  // const found = changeCurrentPlaylist.find()
  return (
    <Container>
      <div className="layout-header">
        {library.map(({ name, id, images }) => {
          console.log(library)
          return (
            <div className="header" onClick={() => navigate(`/${selectedPlaylistId}`)}>
              <div className="card" onClick ={() => changeCurrentPlaylist(id)}> 
                <span
                  className="component-header"
                  key={name}> 
                  {name}
                </span>
                {
                  <img src={images[0]?.url} alt={name} />
                }
              </div>
          </div>
          );
        })}

      </div>
    </Container>
  );
}
const Container = styled.div`
    padding: 0px;
    height: 100%;
    width: 100%;
  .layout-header {
    height: 64px;
    position: sticky;
    top: 0;
    }
  .header{
    display: inline-block;
    padding: 15px;
  }
  .card{
    cursor: pointer;
    background-color: #1e272e;
    text-align: center;
    height: 188px;
    width: 210px;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #485460;
    }
  }
  img {
    height: 150px;
    border-radius: 8px;
  }
  .component-header {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    color: white;
    transition: 0.3s ease-in-out;
    text-align: center;
  }
`;


