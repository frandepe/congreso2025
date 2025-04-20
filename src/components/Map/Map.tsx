const Map = () => {
  return (
    <div className="w-full h-[400px]">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps?q=-35.9638636062645,-62.733555291290045&z=15&output=embed"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
