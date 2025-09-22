/**
 * コンタクトフォーム管理用カスタムフック
 * フォームデータの管理、バリデーション、送信処理を提供
 */

import { useState, useCallback } from "react";
import { ContactFormData, SubmitStatus, ContactFormHook } from "@/types";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm(): ContactFormHook {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  /**
   * フォーム入力値の変更ハンドラー
   */
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**
   * フォームをリセット
   */
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setSubmitStatus("idle");
  }, []);

  /**
   * フォームデータを送信
   */
  const submitForm = useCallback(async (apiEndpoint: string): Promise<void> => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // バリデーション
      if (!formData.name.trim() || !formData.email.trim() || 
          !formData.subject.trim() || !formData.message.trim()) {
        throw new Error("All fields are required");
      }

      // メール形式チェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Invalid email format");
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitStatus("success");
      resetForm();
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
      throw error; // 呼び出し側でエラーハンドリングが必要な場合
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resetForm]);

  return {
    formData,
    isSubmitting,
    submitStatus,
    handleChange,
    resetForm,
    submitForm,
  };
}
