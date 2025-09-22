# CAN_I_DO_THIS??

問題解析ツール - 学習に必要な知識と手順を可視化

## 概要

CAN_I_DO_THIS??は、学習者が直面する問題を分析し、解決に必要な知識体系と学習パスを提示するWebアプリケーションです。テキスト入力またはファイルアップロードにより、AI（Gemini 1.5 Pro）が自動的に解析を行います。

## 主な機能

- **テキスト入力**: 問題の内容を直接記述して解析
- **ファイルアップロード**: 画像、テキストファイル、PDFファイルの解析対応
- **知識マップ生成**: 問題解決に必要な概念と前提知識の可視化
- **学習パス提示**: 段階的な学習手順の自動生成
- **難易度判定**: 問題の複雑さと推定学習時間の算出
- **レスポンシブデザイン**: デスクトップ・モバイル両対応

## 使用方法

1. Webページにアクセス
2. 入力方法を選択：
   - **Text**: テキストエリアに問題を記述
   - **File**: ファイルをアップロード（画像、テキストファイル、PDF）
3. 「解析する」ボタンをクリック
4. 解析結果の確認

※ユーザー登録は不要です。

---

## 入力形式・対応ファイル

### テキスト入力
- 問題の詳細な説明（最大2000文字）
- プログラミング課題、数学問題、技術的な疑問など

### ファイルアップロード
- **画像ファイル**: JPEG, PNG, GIF（最大10MB）
  - スクリーンショット、図表、手書きメモなど
- **テキストファイル**: .txt形式（最大10MB）
  - コードスニペット、要件定義、ドキュメントなど  
- **PDFファイル**: 仕様書、論文、チュートリアルなど（最大10MB）

### 対応分野
プログラミング、数学・統計、資格試験、技術習得、学術分野など、学習に関連する幅広い分野に対応しています。

---

## 技術仕様

### フロントエンド
- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React

### AI・バックエンド
- **AI Model**: Google Gemini 1.5 Pro
- **API**: Google Generative AI (@google/generative-ai)
- **Security**: Rate limiting, input sanitization
- **Data Storage**: sessionStorage (temporary, no persistent data)

### 対応環境
- **Desktop**: Chrome, Firefox, Safari, Edge (最新版)
- **Mobile**: iOS Safari, Android Chrome
- **Response**: 完全レスポンシブデザイン

---

## セキュリティ・プライバシー

### データ保護
- 入力データは解析処理時のみ使用され、サーバーに永続保存されません
- セッション終了時にすべてのデータが自動削除されます
- 第三者への情報提供は行いません

## 貢献・フィードバック

Issue や Pull Request を歓迎します。改善提案やバグ報告は GitHub Issues までお願いします。
