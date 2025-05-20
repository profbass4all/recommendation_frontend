import mtt3 from "./assets/3mtt.jpg";


function Banner() {
  return (
    <div className="flex justify-center items-center">
      <img
        src={mtt3}
        alt="Movie Time"
        className="max-w-48 md:max-w-64 lg:max-w-96 h-auto mt-8"
      />
    </div>
  );
}

export default Banner