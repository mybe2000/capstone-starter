const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  return (
    <div>
      {auth.id && <h1>Welcome back, {auth.username}!</h1>}
      <p className="home">
        Discover and evaluate businesses! Currently {businesses.length}{" "}
        Businesses
      </p>
      <p className="home">
        User-generated feedback! Currently {users.length} Users
      </p>

      <p className="home">
        Read reviews and get advice! Currently {reviews.length} Reviews
      </p>
    </div>
  );
};

export default Home;
