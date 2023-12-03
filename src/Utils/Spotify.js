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

}




export default Spotify;