let accessToken;
let expiresIn;

const clientId = "a215e7fb7a394eb4b19bfbce7c4c7a69";
const redirectUri = "http://localhost:3000";
// const redirectUri = "https://wwww.Jamn.surge.sh";

const Spotify = {
  // Check if there is an access token in the URL
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Extract access token and expiration time from the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);

      // Clear parameters from the URL
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      // Redirect user to Spotify authorization URL
      const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = redirectUrl;
    }
  },

  // Method to check if there is an access token
  hasAccessToken() {
    return accessToken ? true : false;
  },

  // Method to make a Spotify API request
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
      }));
    }

    throw new Error("Failed to fetch search results from Spotify.");
  },

  // Method to get the user's ID
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

  // Method to save the user's playlist to Spotify
  async savePlaylist(playlistName, trackURIs) {
    const userId = await Spotify.getUserId();
    const accessToken = Spotify.getAccessToken();

    // Step 1: Fix the missing parenthesis in the fetch URL
    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: 'New playlist description',
        public: true,
      })
    });

    // Step 2: Fix the condition to check if the playlist creation is successful
    if (!createPlaylistResponse.ok) {
      throw new Error('Failed to create playlist.');
    }

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    // Add tracks to the new playlist

    // Step 3: Fix the missing opening parenthesis in the fetch URL
    const addTrackResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: trackURIs
      })
    });

    // Step 4: Fix the condition to check if adding tracks to the playlist is successful
    if (!addTrackResponse.ok) {
      throw new Error('Failed to add tracks to playlist.');
    }

    // Return the playlist ID

    return playlistId;
  },
};

export default Spotify;
