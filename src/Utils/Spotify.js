let accessToken;
let tokenExpirationTime;

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
// const redirectUri = "http://localhost:3000";
const redirectUri = "https://leroybrown247.github.io/JAMN";


const Spotify = {
  getAccessToken() {
    if (accessToken) {
      const currentTime = new Date().getTime();

      console.log('Current time:', currentTime);
      console.log('Token expiration time:', tokenExpirationTime);

      if (currentTime < tokenExpirationTime) {
        console.log('Access token is still valid');

        return accessToken;
      } else {
        console.log('Access token has expired');
      }
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      tokenExpirationTime = new Date().getTime() + expiresIn * 1000;
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  hasAccessToken() {
    return accessToken ? true : false;
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    if (!accessToken) {
      throw new Error("Access token is missing.");
    }

    const apiUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        previewUrl: track.preview_url,
      }));
    }

    throw new Error("Failed to fetch search results from Spotify.");
  },

  async getUserId() {
    const accessToken = Spotify.getAccessToken();
    if (!accessToken) {
      throw new Error("Access token is missing.");
    }

    const apiUrl = `https://api.spotify.com/v1/me`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.id;
    }

    throw new Error("Failed to fetch user ID from Spotify.");
  },

  async savePlaylist(playlistName, trackURIs) {
    const userId = await Spotify.getUserId();
    const accessToken = Spotify.getAccessToken();

    console.log("User ID:", userId); 
    console.log("Access Token:", accessToken);

    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          description: "New playlist description",
          public: true,
        }),
      }
    );

    if (!createPlaylistResponse.ok) {
      console.error("Failed to create playlist.");

      throw new Error("Failed to create playlist.");
    }

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    console.log("Playlist ID:", playlistId);

    const addTrackResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackURIs,
        }),
      }
    );

    console.log("Add Tracks Response:", addTrackResponse);

    if (!addTrackResponse.ok) {
      throw new Error("Failed to add tracks to playlist.");
    }

    console.log("Response of adding tracks:", addTrackResponse);

    return playlistId;
  },
};

export default Spotify;
