import { useEffect, useState } from "react";
import { getBallersVideos } from "../firebase/config";
import ballSpinner from "../assets/ball.png";
import "./Playlist.scss";

function Playlist() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const baller = urlParams.get("baller");
    getBallersVideos(baller).then((videos) => {
      setLoading(false);
      if (videos.length) {
        setVideos(videos);
      } else {
        setError(true);
      }
    });
  }, []);

  return (
    <div className="playlist-container">
      <h1>Basketball video playlist</h1>
      <div className="card">
        {!!videos.length && <ul className={loading ? "" : "has-backdrop"}>
          {videos.map((video) => (
            <li key={video.date}>
              <h3>Videos from {video.date} </h3>
              <ul>
                {video.playlist.map((videoInfo) => (
                  <li key={videoInfo.url}>
                    <a href={videoInfo.url} target="_blank">
                      {videoInfo.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>}
        {loading && (
          <img className="loading-spinner" src={ballSpinner} alt="basketball" />
        )}
        {error && (
          <p className="error-msg">
            Hmm... who are you? <span>&#129300;</span>
          </p>
        )}
      </div>{" "}
    </div>
  );
}

export default Playlist;
