import UserCard from "./UserCard";

const Users = ({ users, reviews }) => {
  console.log(users);
  return (
    <div>
      <h2>{users.length} Users</h2>
      <p>Click on user to see their business reviews</p>
      {users.map((user) => (
        <UserCard key={user.id} user={user} reviews={reviews} />
      ))}
    </div>
  );
};

export default Users;
