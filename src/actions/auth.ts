"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { postLogin, postSignup } from "@/api/data";
import { APIResponse } from "@/types/api";

export async function login(formData: FormData): Promise<APIResponse> {
  // 왜 ``와 같이 사용하는가? => string 속성을 강제하기 위해서
  const email = `${formData.get("email") || ""}`;
  const password = `${formData.get("password") || ""}`;

  try {
    const response = await postLogin({ email, password });

    const cookieStore = await cookies();
    cookieStore.set("accessToken", response.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
    });
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, message: e.message };
    }
    return { success: false, message: "로그인에 실패했습니다." };
  }

  redirect("/mydashboard");
}

export async function logout(): Promise<APIResponse> {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");

  return { success: true, message: "로그아웃 되었습니다." };
}

export async function signup(formData: FormData): Promise<APIResponse> {
  const email = `${formData.get("email") || ""}`;
  const nickname = `${formData.get("nickname") || ""}`;
  const password = `${formData.get("password") || ""}`;

  try {
    await postSignup({ email, nickname, password });
    return { success: true, message: "가입이 완료되었습니다." };
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, message: e.message };
    }
    return { success: false, message: "회원가입에 실패했습니다." };
  }
}
