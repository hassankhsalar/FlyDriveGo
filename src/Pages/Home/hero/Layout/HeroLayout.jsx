import React from "react";

const HeroLayout = ({
  leftImage,
  rightImage,
  title,
  subtitle,
  description,
  communityText,
  avatars = [],
}) => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-SmokeWhite px-4">
      <div className="container mx-auto flex flex-col items-center justify-center my-14 md:my-20 lg:my-24 xl:my-28">
        <div className="grid grid-cols-1 md:grid-cols-4 w-full items-center md:items-start xl:items-center relative">
          {/* Left Image */}
          <div className="flex justify-center align-top">
            {leftImage && (
              <img
                src={leftImage}
                className="w-36 md:w-40 lg:w-56 xl:w-64"
                alt="Left Background"
              />
            )}
          </div>

          {/* Main Hero Content */}
          <div className="text-center col-span-2">
            <h1 className="text-2xl md:text-4xl xl:text-5xl font-red-rose mb-4 text-primary font-bold">
              {title}
              {subtitle && <br />}
              {subtitle && <span className="text-[#333333]">{subtitle}</span>}
            </h1>
            {description && (
              <p className="text-sm md:text-lg text-CharcoleDark/60 font-poppins mb-4 md:mb-8 max-w-xl mx-auto">
                {description}
              </p>
            )}
            {communityText && (
              <p className="text-CharcoleDark font-bold text-2xl md:text-3xl font-red-rose">
                {communityText}
              </p>
            )}
            {avatars.length > 0 && (
              <div className="flex justify-center mt-2">
                <div className="avatar-group -space-x-6">
                  {avatars.map((src, index) => (
                    <div className="avatar" key={index}>
                      <div className="w-8 h-8 md:w-12 md:h-12">
                        <img src={src} alt={`User Avatar ${index + 1}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="hidden md:flex justify-center">
            {rightImage && (
              <img
                src={rightImage}
                className="w-28 md:w-40 lg:w-56 xl:w-64"
                alt="Right Background"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLayout;
