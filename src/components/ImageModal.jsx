const ImageModal = ({ img, onClose }) => {
  if (!img) return null;

  return (
    <button
      type="button"
      className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-4"
      onClick={onClose}
      aria-label="Close image preview"
    >
      <img
        src={img}
        alt="Selected design preview"
        className="max-h-[90vh] max-w-[92vw] object-contain shadow-2xl"
      />
    </button>
  );
};

export default ImageModal;
