import { Link } from "react-router-dom";

const ServiceCard = ({
  title,
  subtitle,
  description,
  features,
  priceLabel,
  price,
  buttonText,
  to,
}) => (
  <div className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="absolute inset-0 bg-primary/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
    <div className="relative">
      <h3 className="text-xl font-red-rose text-CharcoleDark font-bold mb-3">
        {title}
        <span className="ml-2 text-primary/60 text-sm">{subtitle}</span>
      </h3>
      <p className="text-CharcoleDark/60 font-poppins mb-4 leading-relaxed">
        {description}
      </p>

      {features && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {features.map((item) => (
            <div
              key={item}
              className="flex items-center bg-SmokeWhite rounded-lg p-2 text-CharcoleDark/80"
            >
              <div className="w-2 h-2 bg-primary rounded-full mr-2" />
              <span className="text-sm font-poppins">{item}</span>
            </div>
          ))}
        </div>
      )}

      {price && (
        <div className="bg-SmokeWhite rounded-lg p-4 mb-2">
          <p className="text-sm text-CharcoleDark/60 mb-2 font-poppins">
            {priceLabel}
          </p>
          <div className="text-2xl font-red-rose text-primary">
            {price}
            <span className="text-sm ml-1">/day</span>
          </div>
        </div>
      )}

      <Link to={to} className="bg-primary text-white px-6 py-3 rounded-lg font-poppins hover:bg-primary-dark transition-colors duration-300">
        {buttonText} →
      </Link>
    </div>
  </div>
);

export default ServiceCard;
