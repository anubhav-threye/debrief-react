import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ALTITUDE,
} from "@/constants";

export const formatData = (item) => {
  if (!item?.update) return null;

  const values = item.update.split(",");

  const cleanedData = values.reduce(
    (acc, curr) => {
      if (curr.includes("T=")) {
        // Filter out coords from the string and restrict the values
        const coords = curr.split("=")[1].split("|").slice(0, 3);

        acc.long = coords[0];
        acc.lat = coords[1];
        acc.alt = coords[2];
      } else if (curr.includes("Name=")) acc.name = curr.split("=")[1];
      else if (curr.includes("Color=")) acc.color = curr.split("=")[1];

      return acc;
    },
    {
      long: null,
      lat: null,
      alt: null,
      name: "",
      color: "",
    }
  );

  return {
    id: item.id,
    ...cleanedData,
  };
};
