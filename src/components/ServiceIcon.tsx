import React from "react";
import {
  Palette,
  Code2,
  Share2,
  TrendingUp,
  PenTool,
  Compass,
  LucideProps,
} from "lucide-react";
import { ServiceItem } from "@/types";

interface ServiceIconProps extends LucideProps {
  name: ServiceItem["iconName"];
}

export function ServiceIcon({ name, ...props }: ServiceIconProps) {
  switch (name) {
    case "Palette":
      return <Palette {...props} />;
    case "Code2":
      return <Code2 {...props} />;
    case "Share2":
      return <Share2 {...props} />;
    case "TrendingUp":
      return <TrendingUp {...props} />;
    case "PenTool":
      return <PenTool {...props} />;
    case "Compass":
    default:
      return <Compass {...props} />;
  }
}
