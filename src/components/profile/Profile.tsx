import Image from "next/image";

interface ProfileProps {
  name: string;
  type: "member" | "invite";
  imageUrl?: string | null;
}

export function Profile({ name, type, imageUrl }: ProfileProps) {
  return (
    <div className="relative flex gap-2">
      {type === "member" && (
        <div className="bg-profile-green relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-2xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
              fill
            />
          ) : (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] font-semibold whitespace-nowrap text-white">
              {name.slice(0, 2)}
            </span>
          )}
        </div>
      )}
      <span className="inline-block truncate text-lg max-md:max-w-37.5 max-md:text-base">
        {name}
      </span>
    </div>
  );
}
