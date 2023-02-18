import React, { useState, useEffect } from "react";
import Reviews from "../reviews/Reviews";

const Provider = () => {
  const movieId = localStorage.getItem("movieId");
  const movieTitle = localStorage.getItem("movieTitle");
  const [providerData, setProviderData] = useState({});
  const [movieLink, setMovieLink] = useState("");

  function convertString(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s/g, "-");
  }

  useEffect(() => {
    const fetchProviderData = async () => {
      const response = await fetch(
        `http://localhost:8080/tmdbprovider/${movieId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setProviderData(data);
      console.log(data);
    };

    const fetchMovieLink = async () => {
      const alteredtitle = convertString(movieTitle);
      console.log(alteredtitle);
      console.log(movieTitle);
      const response = await fetch(
        `http://localhost:8080/provider/popcornscraper/${movieTitle}`,
        {
          method: "GET",
        }
      );
      const linkdata = await response.text();
      console.log(linkdata);
      setMovieLink(linkdata);
    };

    fetchProviderData();
    fetchMovieLink();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div class="providerscontainer">
          {console.log(providerData)}
          {typeof providerData === "object" && !Array.isArray(providerData) ? (
            <div>
              <p>Provider Name: {providerData.provider_name}</p>
              <img
                src={providerData.logo_path}
                alt={providerData.provider_name}
              />
            </div>
          ) : providerData.length === 0 ? (
            <p>No streaming providers in Singapore.</p>
          ) : (
            providerData.map((provider, index) => (
              <div key={index}>
                <pre>Available on:</pre>
                {provider.provider_name === "Disney Plus" && (
                  <img
                    height="60px"
                    width="60px"
                    src="https://www.logo.wine/a/logo/Disney%2B/Disney%2B-White-Dark-Background-Logo.wine.svg"
                  />
                )}
                {provider.provider_name === "Netflix" && (
                  <img
                    height="60px"
                    width="60px"
                    src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F08%2Fmost-used-netflix-icon-boss-baby-info-001.jpg?q=90&w=1400&cbr=1&fit=max"
                  />
                )}
                {provider.provider_name === "Amazon Prime Video" && (
                  <img
                    height="60px"
                    width="60px"
                    src="https://play-lh.googleusercontent.com/VojafVZNddI6JvdDGWFrRmxc-prrcInL2AuBymsqGoeXjT4f9sv7KnetB-v3iLxk_Koi"
                  />
                )}

                {provider.provider_name === "Apple iTunes" && (
                  <img
                    height="60px"
                    width="60px"
                    src="https://thumbs.dreamstime.com/b/apple-itunes-logo-apple-itunes-logo-vector-format-available-illustrator-ai-cloud-136964439.jpg"
                  />
                )}

                {provider.provider_name === "Google Play Movies" && (
                  <img
                    height="60px"
                    width="60px"
                    src="https://technave.com/data/files/article/202207081005412770.jpeg"
                  />
                )}
                {provider.provider_name !== "Disney Plus" &&
                  provider.provider_name !== "Netflix" &&
                  provider.provider_name !== "Amazon Prime Video" &&
                  provider.provider_name !== "Apple iTunes" &&
                  provider.provider_name !== "Google Play Movies" && (
                    <div height="60px" width="60px">
                      {provider.provider_name}
                    </div>
                  )}
              </div>
            ))
          )}
        </div>
        {movieLink === "Movie not found" ? null : (
          <div class="popcorn">
            <pre>It seems that this movie is available in a local cinema:</pre>
            <a href={movieLink} target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.freepik.com/premium-vector/pocorn-illustration-popcorn-with-box-isolated-background-design-vector-popcorn-icon-illustration_597063-124.jpg?w=740"
                height="60px"
                width="60px"
                alt="Available in local cinema"
              />
            </a>
          </div>
        )}
      </div>
      <div>
        <Reviews />
      </div>
    </div>
  );
};

export default Provider;
