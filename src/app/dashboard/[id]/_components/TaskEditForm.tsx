/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { putCardUpdate, postCardImage } from "@/api/data";
import { Dropdown } from "@/components/Dropdown";
import { ImageUpload } from "@/components/ImageUpload";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { ModalCloseButton } from "@/components/modal/ModalCloseButton";

interface TaskEditFormProps {
  columnList: any[];
  memberList: any[];
  dashboardId: number;
  initialData: any;
}

export default function TaskEditForm({
  columnList,
  memberList,
  dashboardId,
  initialData,
}: TaskEditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const [formData, setFormData] = useState({
    columnId: initialData?.columnId,
    assigneeUserId: initialData?.assignee?.userId || 0,
    title: initialData?.title || "",
    description: initialData?.description || "",
    dueDate: initialData?.dueDate ? initialData.dueDate.replace(" ", "T") : "",
  });

  const addTag = (tagName: string) => {
    const trimmed = tagName.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageUrl = initialData?.imageUrl;
      if (imageFile) {
        const uploadRes = await postCardImage(
          Number(formData.columnId),
          imageFile
        );
        imageUrl = uploadRes.imageUrl;
      }

      const submitData = {
        columnId: Number(formData.columnId),
        title: formData.title,
        description: formData.description,
        assigneeUserId: Number(formData.assigneeUserId),
        dueDate: formData.dueDate ? formData.dueDate.replace("T", " ") : null,
        tags: tags,
        imageUrl: imageUrl,
      };

      await putCardUpdate(initialData.id, submitData);
      router.back();
      router.refresh();
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:bg-modal-background [&::-webkit-scrollbar]:display-none fixed top-1/2 left-1/2 z-100 flex h-full max-h-203 w-full max-w-93.75 -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto border-none bg-[#1B1A1F] p-5 text-white shadow-2xl [-ms-overflow-style:none] [scrollbar-width:none] md:fixed md:top-1/2 md:h-auto md:max-h-[calc(100vh-100px)] md:w-126.5 md:max-w-none md:translate-y-[-50%] md:rounded-3xl md:border md:border-[#333] md:p-7 lg:max-h-[calc(100vh-128px)] lg:w-150 lg:p-7.5">
      {" "}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">할 일 수정</h2>
        <ModalCloseButton />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            label="컬럼"
            options={columnList.map((c) => c.title)}
            defaultValue={
              columnList.find((c) => c.id === formData.columnId)?.title
            }
            onSelect={(val) =>
              setFormData({
                ...formData,
                columnId: columnList.find((c) => c.title === val)?.id || 0,
              })
            }
          />
          <Dropdown
            label="담당자"
            options={memberList.map((m) => m.nickname)}
            defaultValue={
              memberList.find((m) => m.userId === formData.assigneeUserId)
                ?.nickname ||
              initialData?.assignee?.nickname ||
              ""
            }
            onSelect={(val) =>
              setFormData({
                ...formData,
                assigneeUserId:
                  memberList.find((m) => m.nickname === val)?.userId || 0,
              })
            }
          />
        </div>
        <Input>
          <Label htmlFor="title">제목</Label>
          <Input.Wrapper>
            <Input.Field
              id="title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border-none! bg-[#201F23]"
            />
          </Input.Wrapper>
        </Input>
        <div className="flex flex-col gap-2">
          <Label>설명</Label>
          <textarea
            required
            rows={4}
            className="w-full rounded-[14px] border border-gray-700 bg-[#201F23] p-3 text-white outline-none focus:border-[#00BFFF]"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <Input>
          <Label htmlFor="dueDate">마감일</Label>
          <Input.Wrapper>
            <Input.Field
              id="dueDate"
              type="datetime-local"
              className="w-full border-none! bg-[#201F23]"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </Input.Wrapper>
        </Input>
        <div className="flex flex-col gap-2">
          <Label htmlFor="tags">태그</Label>
          <div className="flex flex-wrap gap-2 rounded-[14px] border border-gray-700 bg-[#201F23] p-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded bg-[#333] px-2 py-1 text-sm text-[#00A200]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag(tagInput))
              }
              placeholder="태그 입력"
              className="flex-1 bg-transparent text-gray-100 outline-none"
            />
          </div>
        </div>
        <ImageUpload
          initialImageUrl={initialData?.imageUrl}
          onImageChange={(file) => setImageFile(file)}
        />
        <div className="mt-4 flex gap-3 pb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-[14px] border border-gray-700 py-4 hover:bg-white/5"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded-[14px] bg-[#00A200] py-4 font-bold disabled:bg-gray-600"
          >
            {isLoading ? "수정 중..." : "수정"}
          </button>
        </div>
      </form>
    </div>
  );
}
