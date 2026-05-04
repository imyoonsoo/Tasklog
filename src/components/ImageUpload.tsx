"use client";

import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

import imageIcon from "@/assets/common/ic-image.svg";
import iconX from "@/assets/common/ic-x-circle.svg";

interface ImageUploaderProps {
  onImageChange?: (file: File | null) => void;

  initialImageUrl?: string;
}

export function ImageUpload({
  onImageChange,
  initialImageUrl,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl || null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* initialImageUrl 변경 대응 */
  useEffect(() => {
    setPreviewUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const newUrl = URL.createObjectURL(file);

    setPreviewUrl(newUrl);

    onImageChange?.(file);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onImageChange?.(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex w-full flex-col gap-2.5">
      <label className="text-[16px] font-semibold text-gray-300">이미지</label>

      <div
        onClick={handleClick}
        className={`relative flex h-36.75 w-full rounded-xl transition-all md:h-42.75 ${
          previewUrl
            ? "items-start justify-start p-2"
            : "bg-black-800 hover:bg-black-700 cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed border-gray-600"
        }`}
      >
        {previewUrl ? (
          <div className="relative ml-1 h-35 w-57.75 rounded-[14px] border-[1.5px] border-gray-700">
            <div className="h-full w-full overflow-hidden rounded-xl">
              <Image
                src={previewUrl}
                alt="업로드 이미지"
                fill
                className="object-contain object-center"
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="absolute -top-3 -right-3 z-50 h-7 w-7 hover:scale-110"
            >
              <Image src={iconX} alt="삭제" fill />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Image src={imageIcon} alt="이미지" width={32} height={32} />

            <span className="text-[16px] font-semibold text-gray-400">
              + image upload
            </span>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
