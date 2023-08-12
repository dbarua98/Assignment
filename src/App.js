import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
  
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });


    axios.get("https://jsonplaceholder.typicode.com/albums")
      .then(response => {
        setAlbumsData(response.data);
      })
      .catch(error => {
        console.error("Error fetching albums:", error);
      });

    axios.get("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        setPhotosData(response.data);
      })
      .catch(error => {
        console.error("Error fetching photos:", error);
      });
  }, []);

  useEffect(() => {
    if (userData.length > 0 && albumsData.length > 0 && photosData.length > 0) {
      setDataLoaded(true);
    }
  }, [userData, albumsData, photosData]);

  return (
    <div className="App">
      <h1>User Albums and Photos</h1>
      {dataLoaded ? (
        userData.map(user => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            {albumsData
              .filter(album => album.userId === user.id)
              .map(album => (
                <div key={album.id}>
                  <h3>Album: {album.title}</h3>
                  <div className="photos">
                    {photosData
                      .filter(photo => photo.albumId === album.id)
                      .map(photo => (
                        <img
                          key={photo.id}
                          src={photo.thumbnailUrl}
                          alt={photo.title}
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
