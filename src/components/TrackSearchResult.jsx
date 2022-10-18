import React from "react";
import styled from "styled-components";

const TrackSearchResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };
  return (
    <Container>
      <div
        className="track-searched"
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
      >
        <img
          src={track.albumUrl}
          style={{ height: "128px", width: "128px", margin: "14px" }}
          alt={track.title}
        />
        <div className="track-infor">
          <div className="track-title">{track.title}</div>
          <div className="track-artist">{track.artist}</div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .track-searched {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .track-infor {
    margin-top: 14px;
    padding-left: 10px;
    color: white;
  }
  .track-title {
    color: white;
    font-size: large;
  }
  
`;

export default TrackSearchResult;
