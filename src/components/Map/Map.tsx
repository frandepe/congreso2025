const Map = () => {
  return (
    <div className="w-full h-[400px]">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps?q=-35.987036315675795,-62.753346&z=15&output=embed"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
