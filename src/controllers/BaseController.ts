export interface BaseController {
  execute(): Promise<any>
  // 共通処理などを追加
}