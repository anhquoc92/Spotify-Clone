import React, { useRef } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import { TiSocialFlickr } from "react-icons/ti";
import { useEffect, useState } from "react";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import SpotifyWebApi from "spotify-web-api-node";
import { msToMinutesAndSeconds } from "../utils/datetime-utils";
import TrackSearchResult from "./TrackSearchResult";
import { useParams } from "react-router-dom";

const spotifyApi = new SpotifyWebApi({
  clientId: "6dcd9ee75f494fa3a229e3d6f19fd4d4",
});


export default function Body(headerBackground) {
  const {id} = useParams()
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        image: response.data.images[0].url,
        total_song: response.data.tracks.total,
        display_name: response.data.owner.display_name,
        follower_like: response.data.followers.total,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      // console.log(selectedPlaylist);
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylist]);
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const sumTime = () => {
    const sumTimePlayList = selectedPlaylist.tracks.map(
      ({ duration }) => duration
    );
    return sumTimePlayList.reduce((partialSum, a) => partialSum + a, 0);
  };

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
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
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${idDevice}`,
      {
        context_uri,
        offset: { position: track_number - 1 },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selectedplaylist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
              <p className="infor_react">
                {selectedPlaylist.display_name} <TiSocialFlickr />{" "}
                {selectedPlaylist.follower_like} likes <TiSocialFlickr />{" "}
                {selectedPlaylist.total_song} songs <TiSocialFlickr />{" "}
                {msToMinutesAndSeconds(sumTime())}
              </p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="dol">
                <span>#</span>
              </div>
              <div className="dol">
                <span>TITLE</span>
              </div>
              <div className="dol">
                <span>ALBUM</span>
              </div>
              <div className="dol">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 1) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 3.5rem;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2.05fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;

// {/* <a draggable='false' href="https://open.spotify.com/genre/0JQ5DArNBzkmxXHCqFLx2J" loading='lazy'>
// <div>
//     <img aria-hidden='false' draggable='false' loading='lazy' src="" alt="" />
//     <span className="">Podcasts</span>
// </div>
// </a> */}



