const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  console.log(auth);
  console.log(businesses);
  const myReviews = reviews.filter((review) => review.userid === auth.id);
  console.log(myReviews);
  const numReviews = myReviews.length;

  return (
    <div>
      {auth ? (
        <div>
          <h1>Welcome back, {auth.username}!</h1>
          {!numReviews ? (
            <h3>No reviews yet</h3>
          ) : (
            <div>
              <h2>My reviews:</h2>
              {myReviews.map((review) => (
                <div key={review.id}>
                  <h3>{review.businessid}</h3>
                  {review.comments}, rating: {review.rating} stars
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h1>Home</h1>
      )}
      <p>
        Display some interesting information about our {businesses.length}{" "}
        Businesses
        <br />
        Display some interesting information about our {users.length} Users
        <br />
        Display some interesting information about our {reviews.length} Reviews
      </p>
    </div>
  );
};

export default Home;
