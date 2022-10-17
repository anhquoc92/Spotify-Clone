import React from "react";

const TrackSearchResult = ({track, chooseTrack}) => {
    const handlePlay = () => {
        chooseTrack(track)
    }
    return <div className="track-searched" style={{cursor:"pointer"}} onClick={handlePlay}>
        <img src={track.albumUrl} style={{height:"128px", width:"128px", margin:"14px"}} />
    </div>
};

export default TrackSearchResult