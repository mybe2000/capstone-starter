const Businesses = ({ businesses }) => {
  return (
    <div>
      <h1>{businesses.length} Businesses</h1>
      {businesses.map((business) => (
        <div key={business.name}>
          {business.name}, rating: {business.rating}
        </div>
      ))}
    </div>
  );
};

export default Businesses;
