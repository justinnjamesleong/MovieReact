import { useEffect, useRef, useState } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./Reviews.css";

import React from "react";

const Reviews = (props) => {
  const token = localStorage.getItem("isAuthenticated");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const user_name = localStorage.getItem("username");
  const user_id = localStorage.getItem("userid");
  const movie_id = localStorage.getItem("movieId");
  console.log(movie_id);
  const [reviews, setReviews] = useState("");
  const avatar = localStorage.getItem("avatar");
  const [hover, setHover] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          content: content,
          user_name: user_name,
          user_id: user_id,
          movie_id: movie_id,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to submit review. Request failed with status code ${response.status}`
        );
      }

      console.log("Review submitted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/review/${movie_id}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch reviews. Request failed with status code ${response.status}`
          );
        }

        const data = await response.json();
        setReviews(data.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div class="container mt-5  ">
      <div class="row height d-flex justify-content-center align-items-center ">
        <div>
          <div class="card">
            <div
              class="p-3 text-dark"
              style={{
                width: "600px",
              }}
            >
              <h6>Comments</h6>
            </div>
            {localStorage.getItem("isAuthenticated") === "true" && (
              <form onSubmit={handleSubmit}>
                <div class=" d-flex flex-row align-items-center  form-color">
                  {" "}
                  <img
                    src="https://i.imgur.com/zQZSWrt.jpg"
                    width="50"
                    class="rounded-circle mr-2"
                  />{" "}
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your comment..."
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />{" "}
                </div>
                <div class="flex-star-submitb-container">
                  <div className="flex star-rating align-items-center mt-2 pl-2 ">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={index <= (hover || rating) ? "on" : "off"}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>
                  <button type="submit" class="submitbutton ">
                    Submit
                  </button>
                </div>
              </form>
            )}
            {Object.values(reviews).map((review, index) => (
              <div key={index} class="mt-2">
                <div class="d-flex flex-row p-3">
                  <img
                    src="https://i.imgur.com/zQZSWrt.jpg"
                    width="40"
                    height="40"
                    class="rounded-circle mr-3"
                  />
                  <div class=" commentcard w-100">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex flex-row align-items-center text-dark">
                        <span class="mr-2">{review.user_name}</span>
                        <div style={{ display: "flex" }}>
                          {Array.from({ length: review.rating }, (_, i) => (
                            <span key={i} style={{ color: "#FFCC00" }}>
                              &#9733;
                            </span>
                          ))}
                          {Array.from({ length: 5 - review.rating }, (_, i) => (
                            <span key={i} style={{ color: "#C0C0C0" }}>
                              &#9733;
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p class="text-justify comment-text mb-0 text-dark">
                      {review.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
