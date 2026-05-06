"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";

import { getCardList, postCardImage, putCardUpdate } from "@/api/data";
import { Dropdown } from "@/components/Dropdown";
import { ImageUpload } from "@/components/ImageUpload";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { FlowbiteDatePicker } from "@/components/style/FlowbiteDatePicker";
import { cardKeys } from "@/hooks/useCards";

interface Member {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
}

interface Column {
  id: number;
  title: string;
}

interface CardDetail {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate?: string;
  imageUrl?: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
  assignee?: {
    id: number;
    nickname: string;
    profileImageUrl?: string | null;
  };
}

interface TaskEditFormProps {
  columnList: Column[];
  memberList: Member[];
  dashboardId: number;
  initialData: CardDetail;
  onCancel: () => void;
}

export function TaskEditForm({
  columnList,
  memberList,
  initialData,
  onCancel,
}: TaskEditFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [imageKey, setImageKey] = useState(() => Date.now());

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    columnId: initialData?.columnId || 0,
    assigneeUserId: initialData.assignee?.id || 0,
    title: initialData?.title || "",
    description: initialData?.description || "",
    dueDate: initialData?.dueDate?.replace(" ", "T") || "",
  });

  const uniqueMembers = useMemo(() => {
    const map = new Map<number, Member>();
    memberList.forEach((member) => {
      const mId = member.userId || (member as Member & { id?: number }).id;
      if (mId && !map.has(mId)) {
        map.set(mId, { ...member, userId: mId });
      }
    });
    return Array.from(map.values());
  }, [memberList]);

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
          getCardList({ columnId: col.id, size: 50 })
        );
        const results = await Promise.all(requests);
        results.forEach((res) => {
          if (res.cards) {
            res.cards.forEach((card: CardDetail) => {
              card.tags.forEach((tag) => tagSet.add(tag));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageUrl: string | null = initialData?.imageUrl ?? null;

      if (isImageRemoved) {
        finalImageUrl = null;
      }

      if (imageFile) {
        const uploadRes = await postCardImage(
          Number(formData.columnId),
          imageFile
        );
        finalImageUrl = uploadRes.imageUrl;
      }

      await putCardUpdate(initialData.id, {
        columnId: Number(formData.columnId),
        title: formData.title,
        description: formData.description,
        ...(formData.assigneeUserId && {
          assigneeUserId: Number(formData.assigneeUserId),
        }),
        ...(formData.dueDate
          ? { dueDate: formData.dueDate.replace("T", " ") }
          : { dueDate: null }),
        tags,
        imageUrl: finalImageUrl,
      });

      queryClient.invalidateQueries({
        queryKey: cardKeys.list(formData.columnId),
      });
      if (formData.columnId !== initialData.columnId) {
        queryClient.invalidateQueries({
          queryKey: cardKeys.list(initialData.columnId),
        });
      }

      router.refresh();
      onCancel();
    } catch (error) {
      console.error("수정 실패:", error);
      alert("할 일 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = onCancel;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-6 bg-transparent text-white"
    >
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          label="컬럼"
          defaultValue={String(formData.columnId)}
          options={columnList.map((c) => ({
            label: c.title,
            value: String(c.id),
          }))}
          onSelect={(val) =>
            setFormData({ ...formData, columnId: Number(val) })
          }
        />

        <Dropdown
          label="담당자"
          showAvatar
          defaultValue={String(formData.assigneeUserId)}
          options={uniqueMembers.map((m) => ({
            label: m.nickname,
            value: String(m.userId),
            image: m.profileImageUrl || undefined,
          }))}
          onSelect={(val) =>
            setFormData({ ...formData, assigneeUserId: Number(val) })
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
              setFormData({
                ...formData,
                title: (e.target as HTMLInputElement).value,
              })
            }
            className="border-none! bg-[#201F23]"
          />
        </Input.Wrapper>
      </Input>

      <div className="flex flex-col gap-2">
        <Label>설명</Label>
        <textarea
          rows={4}
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full rounded-[14px] border border-gray-700 bg-[#201F23] p-3 transition-colors outline-none focus:border-[#00BFFF]"
        />
      </div>

      <Input>
        <Label htmlFor="dueDate">마감일</Label>
        <FlowbiteDatePicker
          value={formData.dueDate}
          onChange={(selectedDate) =>
            setFormData({ ...formData, dueDate: selectedDate })
          }
          className="z-[2000]"
        />
      </Input>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tags">태그</Label>
        <div className="relative">
          <div className="flex flex-wrap gap-2 rounded-[14px] border border-gray-700 bg-[#201F23] p-3 transition-colors focus-within:border-[#00BFFF]">
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
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
              placeholder="태그 입력"
              className="flex-1 bg-transparent text-gray-100 outline-none"
            />
          </div>

          {tagInput && (
            <div className="absolute top-[calc(100%+8px)] z-110 w-full rounded-xl border border-gray-700 bg-[#1e1e1e] p-4 shadow-2xl">
              <p className="mb-3 text-xs text-gray-500">기존 태그 검색 결과</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags
                  .filter((t) => t.includes(tagInput) && !tags.includes(t))
                  .map((match) => (
                    <button
                      key={match}
                      type="button"
                      onClick={() => addTag(match)}
                      className="rounded bg-[#333] px-3 py-1 text-sm text-white hover:bg-[#00A200]"
                    >
                      {match}
                    </button>
                  ))}
                {!suggestedTags.some((t) => t === tagInput) && (
                  <div className="mt-1 w-full border-t border-gray-800 pt-3">
                    <button
                      type="button"
                      onClick={() => addTag(tagInput)}
                      className="rounded bg-[#00A200] px-3 py-1 text-sm font-medium text-white"
                    >
                      &ldquo;{tagInput}&rdquo; 신규 추가
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ImageUpload
        key={imageKey}
        initialImageUrl={
          isImageRemoved ? undefined : (initialData?.imageUrl ?? undefined)
        }
        onImageChange={(file) => {
          if (file && !/\.(png|jpg|jpeg)$/i.test(file.name)) {
            alert("png,jpg, jpeg 형식의 이미지만 업로드 가능합니다.");
            setImageFile(null);
            setImageKey(Date.now());
            return;
          }
          setImageFile(file);
          setIsImageRemoved(file === null);
        }}
      />

      <div className="mt-4 flex gap-3 pb-4">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 rounded-[14px] border border-gray-700 py-4 transition-colors hover:bg-white/5"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-[14px] bg-[#00A200] py-4 font-bold transition-colors hover:bg-[#008100] disabled:bg-gray-600"
        >
          {isLoading ? "수정 중..." : "수정"}
        </button>
      </div>
    </form>
  );
}
