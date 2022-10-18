import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  library: [],
  userInfo: null,
  selectedPlaylistId: "0a9afa271afb418abf1454e6fbdfd925",  //0r9lC6sJ7H6loFRe0HBAFT 37i9dQZF1DX5wl7LrXS3uG 7vqyCtqzbioUxLkEgQos2B
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState:false, 
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }
    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    }
    case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState: action.playerState,
      };
    }
    case reducerCases.SET_PLAYLIST_ID: {
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    }
    case reducerCases.SET_PLAYPLIST_LIBRARY: {
      return{
        ...state,
        library: action.library,
      }
    }
    default:
      return state;
  }
};

export default reducer;
