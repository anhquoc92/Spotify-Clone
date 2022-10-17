import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "7vqyCtqzbioUxLkEgQos2B", //0r9lC6sJ7H6loFRe0HBAFT 37i9dQZF1DX5wl7LrXS3uG
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  playerShuffle: false,
  playerRepeat: false,
  categories: [],
  categoryPlaylists: [],
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
    case reducerCases.SET_PLAYER_SHUFFLE: {
      return {
        ...state,
        playerShuffle: action.playerShuffle,
      };
    }
    case reducerCases.SET_PLAYER_REPEAT: {
      return {
        ...state,
        playerRepeat: action.playerRepeat,
      };
    }

    case reducerCases.SET_PLAYLIST_ID: {
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    }
    case reducerCases.SET_CATEGORIES: {
      return {
        ...state,
        categories: action.categories
      }
    }
    case reducerCases.SET_CATEGORIES_PLAYLISTS: {
      return {
        ...state,
        categoryPlaylists: action.categoryPlaylists
      }
    }
    default:
      return state;
  }
};

export default reducer;
