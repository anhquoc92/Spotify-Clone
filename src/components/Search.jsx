import React, { useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";

const spotifyApi = new SpotifyWebApi({
  clientId: "6dcd9ee75f494fa3a229e3d6f19fd4d4",
});

const Search = () => {
  const [{ token }, dispatch] =
    useStateProvider();
  // const accessToken = useAuth(token);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef();
  const {searchvalue} = useParams();
  // const searchValue = searchInputRef.current.value;


  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);
  }, [token]);

  useEffect(() => {
    if (!searchvalue) return setSearchResults([]);
    if (!token) return;

    let cancel = false;
    spotifyApi.searchTracks(searchvalue).then((response) => {
      if (cancel) return;
      setSearchResults(
        response.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
   
  }, [searchvalue]);
  return (
    <Container>
      <div className="tracks">
        {searchResults.map((track) => {
          return <TrackSearchResult track={track} key={track.uri} />;
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
.tracks {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
}
`;


export default Search;
