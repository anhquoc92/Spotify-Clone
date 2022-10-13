import React from "react";
import styled from "styled-components";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: "6dcd9ee75f494fa3a229e3d6f19fd4d4",
})

const Search = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (!search) return setSearchResults([]);

        spotifyApi.searchTracks(search).then(response => {
            console.log(response)
        })
    }, [search])
    return (
        <Container>
            <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)} />
        </Container>
    )
};

export default Search;