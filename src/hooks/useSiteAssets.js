import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config";
import { defaultSiteAssetMap } from "../data/siteAssets";

const useSiteAssets = () => {
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/site-assets`)
      .then(response => (response.ok ? response.json() : []))
      .then(data => {
        if (!cancelled) {
          const nextOverrides = (data || []).reduce((map, asset) => {
            map[asset.key] = asset.image;
            return map;
          }, {});
          setOverrides(nextOverrides);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setOverrides({});
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => ({ ...defaultSiteAssetMap, ...overrides }), [overrides]);
};

export default useSiteAssets;
