import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { getServiceById, WHATSAPP_NUMBER } from "../data/servicesData";

const ProductCard = ({ item, onClick }) => {
  const images = item.images || [];
  const tags = item.tags || [];
  const service = getServiceById(item.service);
  const serviceLabel = service?.shortName || (item.service === "embroidery" ? "Embroidery" : item.service || "Design");
  const enquiry = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to enquire about ${item.name}`)}`;

  return (
    <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-xl">
      {images.length > 1 ? (
        <Swiper modules={[Navigation, Pagination]} navigation pagination>
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={item.name}
                onClick={() => onClick(img)}
                className="h-72 w-full cursor-pointer object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={images[0] || "https://placehold.co/800x600?text=Design"}
          alt={item.name}
          onClick={() => images[0] && onClick(images[0])}
          className="h-72 w-full cursor-pointer object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#9D174D]">
              {serviceLabel}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-gray-950">{item.name}</h3>
          </div>
          <span className="shrink-0 bg-[#FDF2F8] px-3 py-1 text-xs font-medium text-[#9D174D]">
            {item.category}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={enquiry}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center bg-[#9D174D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#831843]"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
