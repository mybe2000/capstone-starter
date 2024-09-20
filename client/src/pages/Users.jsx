const Users = ({ users }) => {
  console.log(users);
  return (
    <div>
      <h1>{users.length} Users</h1>

      {users.map((user) => (
        <div key={user.username}>{user.username} </div>
      ))}
    </div>
  );
};

export default Users;
