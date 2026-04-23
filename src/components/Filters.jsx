const Filters = ({ categories, selected, setSelected }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-4 py-2 text-sm font-medium transition ${
            selected === category
              ? "bg-[#9D174D] text-white"
              : "bg-white text-gray-700 ring-1 ring-gray-200 hover:text-[#9D174D]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filters;
