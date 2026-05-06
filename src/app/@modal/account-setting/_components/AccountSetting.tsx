"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { uploadImageAction, updateUserInfoAction } from "@/actions/setting";
import { getMyInfo } from "@/api/data";
import { Button } from "@/components/Button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { ModalHeader } from "@/components/modal/ModalHeader";
import { ProfileChange } from "@/components/ProfileChange";
import { cn } from "@/lib/cn";

import { PasswordChange } from "./PasswordChange";

export function AccountSetting() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [view, setView] = useState<"profile" | "password">("profile");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const [nickname, setNickname] = useState(() => userData?.nickname || "");
  const [imageUrl, setImageUrl] = useState(
    () => userData?.profileImageUrl || ""
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      let finalImageUrl = imageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const uploadResult = await uploadImageAction(formData);
        if (!uploadResult.success)
          throw new Error(uploadResult.message || "이미지 업로드 실패");
        finalImageUrl = uploadResult.profileImageUrl!;
      }

      const updateResult = await updateUserInfoAction({
        nickname,
        profileImageUrl: finalImageUrl === "" ? null : finalImageUrl,
      });

      if (!updateResult.success)
        throw new Error(updateResult.message || "정보 수정 실패");
    },
    onSuccess: () => {
      // ✅ 이 한 줄이 UserAccount도 자동 갱신
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      router.back();
    },
    onError: (error) => {
      console.error("수정 프로세스 에러:", error);
    },
  });

  const handleShowPasswordView = () => setView("password");
  const handleShowProfileView = () => setView("profile");
  const handleImageChange = (file: File) => {
    setImageUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };
  const handleImageDelete = () => {
    setImageUrl("");
    setSelectedFile(null);
  };
  const handleCancel = () => router.back();
  const handleName = (value: string) => {
    setError(value.length > 10 ? "닉네임은 10자 이하로 작성해주세요." : "");
  };

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>;

  return (
    <div className="max-md:bg-modal-background -m-7.5 flex h-full flex-col gap-7.5 p-7.5 max-lg:flex-col max-lg:gap-7.5 max-md:fixed max-md:top-0 max-md:left-0 max-md:z-55 max-md:m-0 max-md:mt-12.5 max-md:w-full max-md:gap-6 max-md:p-7.5 max-md:pt-6">
      <ModalHeader
        isPasswordView={view === "password"}
        onBack={handleShowProfileView}
      >
        {view === "profile" ? "내 정보 수정" : "비밀번호 변경"}
      </ModalHeader>
      {view === "profile" ? (
        <div className="flex flex-col gap-7.5 max-md:gap-6">
          <div className="flex flex-col gap-7.5 max-md:gap-6">
            <ProfileChange
              currentImageUrl={imageUrl}
              onImageChange={handleImageChange}
              onImageDelete={handleImageDelete}
            />
            <Input isDisabled className="max-md:gap-2.5">
              <Label htmlFor="email">이메일</Label>
              <Input.Wrapper>
                <Input.Field
                  id="email"
                  type="email"
                  defaultValue={userData?.email}
                />
              </Input.Wrapper>
            </Input>
            <Input errorMessage={error} className="max-md:gap-2.5">
              <Label htmlFor="nickname">닉네임</Label>
              <Input.Wrapper>
                <Input.Field
                  id="nickname"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    handleName(e.target.value);
                  }}
                />
              </Input.Wrapper>
              <Input.Error />
            </Input>
          </div>
          <div className="flex flex-col gap-3 max-md:gap-2.5">
            <span className="text-gray-300">비밀번호</span>
            <Button
              size="sm"
              className="w-29.5 font-semibold text-gray-100"
              colorType="secondary"
              onClick={handleShowPasswordView}
            >
              비밀번호 변경
            </Button>
          </div>
          <div
            className={cn(
              "flex w-135 items-center justify-center gap-5",
              "max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full",
              "max-md:bg-modal-background max-md:gap-3 max-md:px-3.5 max-md:pb-9"
            )}
          >
            <Button
              onClick={handleCancel}
              size="lg"
              className="font-semibold text-gray-100 max-md:h-12.5 max-md:text-base"
              colorType="secondary"
              disabled={isPending}
            >
              취소
            </Button>
            <Button
              onClick={() => mutate()}
              size="lg"
              className="font-semibold text-gray-100 max-md:h-12.5 max-md:text-base"
              colorType="primary"
              disabled={isPending}
            >
              {isPending ? "저장 중..." : "변경"}
            </Button>
          </div>
        </div>
      ) : (
        <PasswordChange onBack={handleShowProfileView} />
      )}
    </div>
  );
}
