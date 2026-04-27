// Refreshed Earth Science Data
import { Mountain, Wind, Droplets, Flame, Thermometer, Compass } from "lucide-react";

export interface EarthScienceBranch {
  id: string;
  title: string;
  icon: any;
  color: string;
  border: string;
  description: string;
  details: string;
}

export const earthScienceBranches: EarthScienceBranch[] = [
  {
    id: "geology",
    title: "Geology",
    icon: Mountain,
    color: "text-amber-400",
    border: "border-amber-400/30",
    description: "Rocks, minerals, and the Earth's crust.",
    details: "Explore plate tectonics, earthquake mechanics, and the fascinating history of our planet's formation."
  },
  {
    id: "meteorology",
    title: "Meteorology",
    icon: Wind,
    color: "text-sky-400",
    border: "border-sky-400/30",
    description: "Atmospheric science and weather patterns.",
    details: "Understand how high and low pressure zones, the jet stream, and global warming affect our daily weather."
  },
  {
    id: "volcanology",
    title: "Volcanology",
    icon: Flame,
    color: "text-orange-500",
    border: "border-orange-500/30",
    description: "Magma, eruptions, and volcanic landscapes.",
    details: "Study the fiery heart of our planet, from deep-sea vents to massive stratovolcanoes."
  },
  {
    id: "hydrology",
    title: "Hydrology",
    icon: Droplets,
    color: "text-blue-400",
    border: "border-blue-400/30",
    description: "The movement and distribution of water.",
    details: "Master the water cycle, ocean currents, and the critical science of groundwater preservation."
  },
  {
    id: "climatology",
    title: "Climatology",
    icon: Thermometer,
    color: "text-red-400",
    border: "border-red-400/30",
    description: "Long-term climate trends and global changes.",
    details: "Analyze historical climate data and future projections to understand our changing world."
  },
  {
    id: "cartography",
    title: "Cartography & GPS",
    icon: Compass,
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    description: "Mapping the world with precision.",
    details: "Learn the science of coordinates, topographic mapping, and modern satellite navigation systems."
  }
];
