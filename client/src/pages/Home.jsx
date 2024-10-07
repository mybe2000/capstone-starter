const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  return (
    <div>
      {auth.id && <h1>Welcome back, {auth.username}!</h1>}
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
