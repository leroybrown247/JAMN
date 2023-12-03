let accessToken;
let expiresIn;

const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const redirectUri = 'YOUR_REDIRECT_URI';

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
  window.setTimeout(() => accessToken = '', expiresIn * 1000);
  window.history.pushState('Access Token', null, '/');

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
      throw new Error('Access token is missing.');
    }

    const apiUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
  
      throw new Error('Failed to fetch search results from Spotify.');
    },
    // Additional methods can be added as needed for your application
  };

export default Spotify;