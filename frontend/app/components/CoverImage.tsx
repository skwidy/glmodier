import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { urlForImage } from "@/sanity/lib/utils";

interface CoverImageProps {
  image: any;
  priority?: boolean;
  className?: string;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority, className } = props;
  
  // Check if source and asset exist before processing
  const hasValidImage = source && typeof source === 'object' && 'asset' in source && source.asset
  
  const image = hasValidImage ? (
    <Image
      className={`w-full h-full object-cover ${className || ""}`}
      width={getImageDimensions(source).width}
      height={getImageDimensions(source).height}
      alt={stegaClean(source?.alt) || ""}
      src={urlForImage(source)?.url() as string}
      priority={priority}
    />
  ) : null;

  return <div className="h-full w-full">{image}</div>;
}
