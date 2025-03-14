const SectionHeader = ({ title }) => (
  <h2 className="text-3xl md:text-4xl font-red-rose text-primary font-bold text-center mb-8 relative pb-4">
    {title}
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary/20 rounded-full"></span>
  </h2>
);

export default SectionHeader;
