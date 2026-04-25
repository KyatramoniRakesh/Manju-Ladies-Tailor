import heroBanner from "../assets/hero-tailor-banner.png";
import { embroideryCategories, embroideryService, serviceList } from "./servicesData";

const serviceAssetDefinitions = [embroideryService, ...serviceList].map(service => ({
  key: `service-${service.id}`,
  label: `${service.name} Card`,
  section: "Service Cards",
  defaultImage: service.image,
}));

const embroideryAssetDefinitions = embroideryCategories.map(category => ({
  key: `embroidery-category-${category.id}`,
  label: `${category.name} Card`,
  section: "Embroidery Categories",
  defaultImage: category.image,
}));

export const siteAssetDefinitions = [
  {
    key: "hero-banner",
    label: "Home Hero Banner",
    section: "Banner",
    defaultImage: heroBanner,
  },
  ...serviceAssetDefinitions,
  ...embroideryAssetDefinitions,
];

export const siteAssetSections = ["All", ...new Set(siteAssetDefinitions.map(asset => asset.section))];

export const defaultSiteAssetMap = siteAssetDefinitions.reduce((map, asset) => {
  map[asset.key] = asset.defaultImage;
  return map;
}, {});
