"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { getCardList, postCardImage, putCardUpdate } from "@/api/data";

import { Dropdown } from "@/components/Dropdown";
import { ImageUpload } from "@/components/ImageUpload";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";

interface Member {
  userId?: number;
  id?: number;
  nickname: string;
}

interface Column {
  id: number;
  title: string;
}

interface TaskEditFormProps {
  columnList: Column[];
  memberList: Member[];
  dashboardId: number;
  initialData: any; // API 응답 스펙에 따라 정의 권장
  onCancel: () => void;
}

export default function TaskEditForm({
  columnList,
  memberList,
  dashboardId,
  initialData,
  onCancel,
}: TaskEditFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    columnId: initialData?.columnId || 0,
    assigneeUserId:
      initialData?.assignee?.userId || initialData?.assignee?.id || 0,
    title: initialData?.title || "",
    description: initialData?.description || "",
    dueDate: initialData?.dueDate?.replace(" ", "T") || "",
  });

  /** 1. 대시보드 내 기존 태그들을 수집하여 추천 목록 생성 */
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagSet = new Set<string>([
          "프로젝트",
          "운영",
          "기획",
          "디자인",
          "개발",
        ]);

        const requests = columnList.map((col) =>
          getCardList({
            columnId: col.id,
            size: 50,
          })
        );

        const results = await Promise.all(requests);

        results.forEach((res) => {
          if (res.cards) {
            res.cards.forEach((card: any) => {
              card.tags.forEach((tag: string) => tagSet.add(tag));
            });
          }
        });

        setSuggestedTags(Array.from(tagSet));
      } catch (error) {
        console.error("태그 로드 실패:", error);
      }
    };

    if (columnList.length > 0) fetchTags();
  }, [columnList]);

  /** 2. 태그 추가 로직 */
  const addTag = (tagName: string) => {
    const trimmed = tagName.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      if (!suggestedTags.includes(trimmed)) {
        setSuggestedTags((prev) => [...prev, trimmed]);
      }
    }
    setTagInput("");
  };

  /** 3. 수정 데이터 제출 (Submit) */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = initialData?.imageUrl;

      // 이미지 삭제 처리
      if (isImageRemoved) {
        imageUrl = null;
      }

      // 새 이미지 업로드 처리
      if (imageFile) {
        const uploadRes = await postCardImage(
          Number(formData.columnId),
          imageFile
        );
        imageUrl = uploadRes.imageUrl;
      }

      const submitData: any = {
        columnId: Number(formData.columnId),
        assigneeUserId: Number(formData.assigneeUserId),
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate ? formData.dueDate.replace("T", " ") : null,
        tags,
      };

      // 이미지 상태에 따른 데이터 할당
      if (isImageRemoved) {
        submitData.imageUrl = null;
      } else if (imageUrl) {
        submitData.imageUrl = imageUrl;
      }

      await putCardUpdate(initialData.id, submitData);

      router.refresh();
      onCancel();
    } catch (error) {
      console.error("수정 실패:", error);
      alert("할 일 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      {/* 컬럼 및 담당자 선택 */}
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          label="컬럼"
          options={columnList.map((c) => c.title)}
          defaultValue={
            columnList.find((c) => c.id === formData.columnId)?.title
          }
          onSelect={(val) => {
            const selected = columnList.find((c) => c.title === val);
            setFormData((prev) => ({ ...prev, columnId: selected?.id || 0 }));
          }}
        />

        <Dropdown
          label="담당자"
          options={memberList.map((m) => m.nickname)}
          defaultValue={
            memberList.find(
              (m) =>
                m.userId === formData.assigneeUserId ||
                m.id === formData.assigneeUserId
            )?.nickname || ""
          }
          onSelect={(val) => {
            const selected = memberList.find((m) => m.nickname === val);
            setFormData((prev) => ({
              ...prev,
              assigneeUserId: selected?.userId || selected?.id || 0,
            }));
          }}
        />
      </div>

      {/* 제목 입력 */}
      <Input>
        <Label htmlFor="title">제목</Label>
        <Input.Wrapper>
          <Input.Field
            id="title"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border-none! bg-[#201F23]"
          />
        </Input.Wrapper>
      </Input>

      {/* 설명 입력 */}
      <div className="flex flex-col gap-2">
        <Label>설명</Label>
        <textarea
          rows={4}
          required
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full rounded-[14px] border border-gray-700 bg-[#201F23] p-3 text-white transition-colors outline-none focus:border-[#00A200]"
        />
      </div>

      {/* 마감일 입력 */}
      <Input>
        <Label htmlFor="dueDate">마감일</Label>
        <Input.Wrapper>
          <Input.Field
            id="dueDate"
            type="datetime-local"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
            }
            className="border-none! bg-[#201F23]"
          />
        </Input.Wrapper>
      </Input>

      {/* 이미지 업로드 영역 */}
      <div className="flex flex-col gap-2">
        <ImageUpload
          initialImageUrl={isImageRemoved ? undefined : initialData?.imageUrl}
          onImageChange={(file) => {
            setImageFile(file);
            setIsImageRemoved(file === null);
          }}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-[14px] border border-gray-700 py-4 text-white transition-colors hover:bg-white/5"
        >
          취소
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-[14px] bg-[#00A200] py-4 font-bold text-white transition-colors hover:bg-[#008500] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "수정 중..." : "수정"}
        </button>
      </div>
    </form>
  );
}
