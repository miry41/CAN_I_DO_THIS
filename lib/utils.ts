import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 入力サニタイゼーション関数
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // HTMLタグを削除
  const withoutHtml = input.replace(/<[^>]*>/g, '');
  
  // 危険な文字をエスケープ
  const escaped = withoutHtml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  return escaped;
}

// XSS攻撃を防ぐための厳格なサニタイゼーション
export function strictSanitizeInput(input: string): string {
  if (!input) return '';
  
  // 危険なJavaScriptイベントハンドラーを削除
  const withoutEvents = input.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // 危険なJavaScriptプロトコルを削除
  const withoutProtocols = withoutEvents.replace(/javascript:|vbscript:|data:|file:/gi, '');
  
  // HTMLタグを削除（より厳格）
  const withoutHtml = withoutProtocols.replace(/<[^>]*>/g, '');
  
  // 危険な文字をエスケープ
  const escaped = withoutHtml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#x5C;');
  
  return escaped;
}

// URLの検証（より厳格）
export function validateUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    // 許可されたプロトコルのみ
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // 危険なドメインをブロック
    const dangerousDomains = [
      'javascript:',
      'data:',
      'file:',
      'vbscript:'
    ];
    
    if (dangerousDomains.some(domain => urlObj.href.toLowerCase().includes(domain))) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

// テキスト長の制限
export function truncateText(text: string, maxLength: number = 1000): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// ファイル名のサニタイゼーション
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return '';
  
  // 危険な文字を除去
  return fileName
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\.\./g, '')
    .substring(0, 255); // ファイル名の最大長制限
}

// JSONデータのサニタイゼーション
export function sanitizeJsonData(data: any): any {
  if (typeof data === 'string') {
    return strictSanitizeInput(data);
  }
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeJsonData(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[strictSanitizeInput(key)] = sanitizeJsonData(value);
    }
    return sanitized;
  }
  
  return data;
}

// ファイル拡張子の検証
export function isValidFileExtension(fileName: string, validMimeTypes: string[]): boolean {
  if (!fileName) return false;
  
  const extension = fileName.toLowerCase().split('.').pop();
  if (!extension) return false;
  
  const extensionToMimeType: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'txt': 'text/plain',
    'pdf': 'application/pdf'
  };
  
  const mimeType = extensionToMimeType[extension];
  return mimeType ? validMimeTypes.includes(mimeType) : false;
}

// IPアドレスのホワイトリスト検証（必要に応じて）
export function isValidIP(ip: string): boolean {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipRegex.test(ip) || ipv6Regex.test(ip);
}

// CSRFトークン検証用（将来的な拡張）
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
