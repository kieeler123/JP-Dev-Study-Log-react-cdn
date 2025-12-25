# JP Dev Study Log (React CDN Version)

---

## 🇯🇵 日本語（メイン / 面接・将来の振り返り用）

### 1. プロジェクト概要

このプロジェクトは **ビルドなし（CDN方式）のReact** を使って  
学習ログを記録するシンプルなWebページを作成し、  
**実装結果よりも「思考の流れ」と「設計判断」** を記録することを目的としています。

---

### 2. このプロジェクトを作った理由

- CDN版Reactの仕組みと制約を理解するため
- localStorageによる状態管理を体験するため
- デスクトップ／モバイルでUIの役割を分ける設計練習
- 日本企業の面接で説明できる「設計意図」を持つため

---

### 3. 初期の試行：React CDN + Vercel

#### 試したこと
- React / ReactDOM を CDN で読み込み
- ビルドなしの静的HTMLとして Vercel にデプロイ

#### 発生した問題
- ローカルで `file://` から開くと CORS エラー
- Vercel では 404 エラーが発生

#### 原因
- CDN方式のReactは **HTTP(S) 環境が必須**
- `file://` プロトコルではJS読み込みが制限される
- DB接続URLをAPIのように直接呼ぶ構造は成立しない

#### 判断
- CDN方式は **学習用・静的用途に限定** するのが適切
- DB連携はサーバー必須 → 今回は対象外

#### 対応
- サーバー関連の実装をすべて削除
- localStorageのみを使う構成に整理

---

### 4. UI設計の考え方

#### 左側（入力・最近5件）
- 役割：現在の作業文脈を保つ
- 最新5件のみ表示
- モバイルでは非表示

理由：
- 作業中の視線分散を防ぐ
- 日本の業務系UIで一般的な構成

#### 右側（一覧）
- 役割：全データの管理
- 検索・フィルター・並び替え
- スクロールは右側のみ

---

### 5. モバイル対応の判断

- 小さい画面では「入力 + 一覧」で十分
- 最近5件は情報過多になるため非表示
- Tailwind の `hidden lg:block` を使用

---

### 6. React Hooks のエラー対応

#### 発生した警告

#### 原因
- state が null のときに早期 return
- Hook の呼び出し順がレンダリング毎に変化

#### 対応
- `useStore()` が常に初期stateを返すように修正
- Hook を必ず同じ順序で呼び出す構造に変更

---

### 7. レイアウト調整

- 左右の高さが不揃いに見える問題
- 右側カードに `min-height` を設定
- 一覧部分のみスクロール可能に調整

---

### 8. このプロジェクトで得たもの

- CDN React の限界と用途の理解
- サーバー／クライアント責務の整理
- 見た目ではなく「役割」でUIを設計する意識
- React Hooks ルールの実体験による理解

---

## 🇺🇸 English (Reference / Self-Review)

### Overview

This project explores **React without build tools (CDN-based React)**  
to record learning logs while focusing on **design decisions and error handling**,  
rather than feature completeness.

---

### Key Learnings

- CDN-based React requires HTTP(S) environments
- Server-side logic cannot be skipped when using databases
- UI should be designed by **role**, not appearance
- React Hooks rules must be followed structurally, not conditionally
- Desktop and mobile UIs should have different priorities

---

### Structure Decisions

- Left pane: input + recent context (max 5 items)
- Right pane: full list with search and filters
- Mobile: simplified view without recent preview

---

### Outcome

This project serves as:
- A learning experiment
- An interview explanation resource
- A personal snapshot of my development thinking at this stage

---

## 🇰🇷 한국어 (기록용 / 추억 보관)

### 프로젝트를 만든 이유

이 프로젝트는 **결과물을 만들기 위한 작업이 아니라**  
“왜 이렇게 만들었는지”,  
“어디서 막혔고 왜 방향을 바꿨는지”를 남기기 위한 기록이다.

---

### 시행착오

- CDN으로 DB까지 연결하려다 구조적 한계를 체감
- Vercel / file:// 환경 차이로 CORS 문제 발생
- Hook 규칙을 어기며 실제 에러를 경험

---

### 배운 점

- CDN React는 학습용으로는 훌륭하지만 실전용은 아님
- 서버는 결국 필요하다
- UI는 예쁘게보다 **설명 가능하게**
- 모바일과 데스크탑은 같은 화면일 필요가 없다

---

### 이 기록의 의미

나중에 이 파일을 다시 보게 된다면  
“이때는 여기까지 고민했구나”를 떠올릴 수 있으면 충분하다.

완성도보다 **사고의 흔적을 남긴 프로젝트**.
