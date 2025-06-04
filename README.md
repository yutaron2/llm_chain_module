# LLM Chain Module

LLM Chain Moduleは、llmによるプロンプトチェーンを簡易に構築するためのCLIツールです。


## セットアップ

### 前提条件

- Node.js v22.0.0以上
- pnpm v10.9.0以上

### インストール

1. リポジトリをクローン：
```bash
git clone [repository-url]
cd LLM Chain Module
```

2. 依存関係のインストール：
```bash
pnpm install
```

3. 環境変数の設定：
`.env`ファイルを作成し、以下の内容を追加：
```
API_KEY=your-anthropic-api-key
```

## 使用方法

アプリケーションを起動するには：

```bash
pnpm dev
```

起動後、以下の手順で操作します：

1. メインメニューから実行したい機能を選択
2. 選択した機能に応じて必要なパラメータを入力
3. 処理が完了すると、結果が表示されます


## 開発

### プロジェクト構造

```
src/
├── config/         # 設定ファイル
├── controllers/    # コントローラー実装
├── factories/      # ファクトリークラス
├── fetchers/       # APIフェッチャー
├── CLI/           # ユーザーインターフェース
├── interfaces/     # 型定義
└── resources/      # リソースファイル
```

