import UserCard from "./UserCard";

const Users = ({ users }) => {
  console.log(users);
  return (
    <div>
      <h1>{users.length} Users</h1>
      <p>Click on user to see their business reviews</p>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
