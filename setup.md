# 一段読書 v3 開発環境セットアップ

## 前提条件

- Docker
- Docker Compose

## セットアップ手順

1. 環境変数ファイルの作成
```bash
cp .env.example .env
```

2. 環境変数の設定
`.env`ファイルを編集し、必要な値を設定してください。

3. Docker環境の起動
```bash
docker-compose up --build
```

4. 別のターミナルでデータベースの初期化
```bash
docker-compose exec app npm run db:push
```

5. ブラウザでアクセス
http://localhost:3000

## 開発コマンド

- `docker-compose up --build` - 開発環境の起動
- `docker-compose down` - 環境の停止
- `docker-compose exec app npm run db:studio` - Prisma Studio起動
- `docker-compose exec app npm run lint` - Lintチェック

## 技術スタック

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Container**: Docker, Docker Compose

## プロジェクト構造

```
src/
├── app/           # Next.js App Router
├── components/    # React Components
├── lib/           # Utility functions
└── types/         # TypeScript type definitions
```

## 機能一覧

- ✅ オンボーディング質問（3問）
- ✅ 書籍推薦システム
- ✅ 1行読書記録機能
- ✅ 読書カレンダー
- ⏳ 読書家プロフィールページ
- ⏳ Amazon Associate連携
- ⏳ 認証システム