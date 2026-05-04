"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { putDashboardUpdate } from "@/api/data";
import { DashboardColorChoiceList } from "@/components/DashboardColorChoiceList";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { SaveToast } from "@/components/SaveToast";

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

type ColorName = "red" | "orange" | "yellow" | "green" | "blue";

interface ColorMap {
  [hex: string]: ColorName;
}

const COLOR_MAP: ColorMap = {
  "#AE2E24": "red",
  "#9F4B00": "orange",
  "#BD8C00": "yellow",
  "#206E4E": "green",
  "#1458BC": "blue",
};

export const REVERSE_COLOR_MAP = Object.fromEntries(
  Object.entries(COLOR_MAP).map(([hex, name]) => [name, hex])
);

interface DashboardEditProps {
  initialData: { title: string; color: string };
  onUpdate: () => void;
}

export function DashboardEdit({ initialData, onUpdate }: DashboardEditProps) {
  const params = useParams();
  const dashboardId = Number(params.id);

  const [dashboardData, setDashboardData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [isUpdating, setIsUpdating] = useState(false);

  const isChanged =
    dashboardData.title !== originalData.title ||
    dashboardData.color !== originalData.color;

  useEffect(() => {
    const syncInitialData = async () => {
      await Promise.resolve();
      setDashboardData(initialData);
      setOriginalData(initialData);
    };

    syncInitialData();
  }, [initialData]);

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      await putDashboardUpdate(dashboardId, dashboardData);
      setOriginalData(dashboardData);
      onUpdate(); // 부모 데이터 갱신 요청
    } catch (error) {
      const err = error as ApiError;
      const errorMessage =
        err.response?.data?.message || "저장에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const selectedColorName: ColorName = COLOR_MAP[dashboardData.color];

  const handleColorChange = (name: string) => {
    const hexCode = REVERSE_COLOR_MAP[name];
    setDashboardData({ ...dashboardData, color: hexCode });
  };
  if (!dashboardData.color) {
    return null; // 또는 <div>데이터 불러오는 중...</div>
  }

  return (
    <div>
      <form
        className="flex flex-col gap-7.5 max-md:gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input>
          <Label htmlFor="name">이름</Label>
          <Input.Wrapper>
            <Input.Field
              value={dashboardData.title}
              id="name"
              placeholder="이름을 입력해주세요"
              onChange={(e) =>
                setDashboardData({ ...dashboardData, title: e.target.value })
              }
            />
          </Input.Wrapper>
        </Input>
        <div className="min-w-83.75">
          <DashboardColorChoiceList
            type={"edit"}
            selectedColorName={selectedColorName}
            onColorChange={handleColorChange}
          />
        </div>
      </form>
      {isChanged && <SaveToast onSave={handleSave} isLoading={isUpdating} />}
    </div>
  );
}
