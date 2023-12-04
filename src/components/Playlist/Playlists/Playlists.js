function Playlists({ playlists }) {
    console.log(playlists); // Log the playlists prop


    return (
      <div>
        {playlists.map((playlist) => (
          <div key={playlist.id}>{playlist.name}</div>
        ))}
      </div>
    );
  }
  
  export default Playlists;