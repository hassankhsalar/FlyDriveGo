const ImageCard = ({
  image,
  alt,
  overlayText,
  subText,
  badge,
  className = "",
  imageHeight = "h-48",
}) => (
  <div
    className={`relative ${imageHeight} rounded-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 ${className}`}
  >
    <img src={image} alt={alt} className="w-full h-full object-cover" />
    {overlayText && (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-CharcoleDark/60 p-4">
        <h4 className="text-white font-red-rose text-lg">{overlayText}</h4>
        <p className="text-white/80 text-sm font-poppins">{subText}</p>
      </div>
    )}
    {badge && (
      <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-poppins text-black">
        {badge}
      </div>
    )}
    <div className="absolute inset-0 border-4 border-white/20 rounded-2xl" />
  </div>
);

export default ImageCard;
