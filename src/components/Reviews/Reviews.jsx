import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../service/fetchAPI";
import { useParams } from "react-router-dom";
import s from "./Reviews.module.css";
import { GoPersonFill } from "react-icons/go";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getReviewsData = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData.results || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    getReviewsData();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li className={s.listItem} key={review.id}>
              <h3 className={s.authorName}>
                <span className={s.authorTitle}>Author:</span>
                {review.author_details?.name?.length > 1
                  ? review.author_details.name
                  : review.author_details?.username || "Anonymous"}
              </h3>
              <div className={s.reviewWrapper}>
                {review.author_details?.avatar_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                    alt={`Avatar of ${review.author_details?.username || "the author"}`}
                    className={s.authorAvatar}
                  />
                ) : (
                  <GoPersonFill className={s.icon} />
                )}
                <p className={s.reviewContent}>{review.content || "No review content available"}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2>There are no reviews for this movie.</h2>
      )}
    </div>
  );
};

export default Reviews;
