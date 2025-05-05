import { Link, useNavigate } from "react-router-dom";

const FlightCard = ({
  title,
  subtitle,
  times = [],
  priceLabel,
  price,
  regions = [],
  description,
  buttonText,
  type,
  to = "/transportation/by-air",
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(to, {
      state: {
        filterType: type,
        initialFilter: type === "domestic" ? "domestic" : "international"
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="border-l-4 border-primary pl-4 mb-6">
          <h3 className="text-xl font-red-rose text-CharcoleDark font-bold">
            {title}
          </h3>
          <p className="text-primary/60 text-sm font-poppins">{subtitle}</p>
        </div>

        {times.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              {times.map((time) => (
                <div key={time} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  <span className="text-CharcoleDark/80 font-poppins text-sm">
                    {time}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-SmokeWhite rounded-lg p-4">
              <p className="text-sm text-CharcoleDark/60 mb-2">{priceLabel}</p>
              <div className="text-2xl font-red-rose text-primary">{price}</div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {regions.map((region) => (
                <div
                  key={region}
                  className="text-center bg-SmokeWhite py-2 rounded-lg"
                >
                  <span className="text-sm font-poppins text-CharcoleDark/80">
                    {region}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-CharcoleDark/60 font-poppins">
              {description}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleButtonClick}
        className="w-full bg-primary text-white px-6 py-3 rounded-lg font-poppins hover:bg-primary-dark transition-colors duration-300 mt-auto"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default FlightCard;