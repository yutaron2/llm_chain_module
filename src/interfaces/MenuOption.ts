// サービスタイプの定義
// 新しいサービスを追加する場合は、ここに追加してください
export type ServiceType = 'service1' | 'service2' | 'service3' | 'exit';

export interface MenuOption {
  name: string;
  value: string;
}

export interface ServiceMenuOption extends MenuOption {
  value: ServiceType;
}

// 各コントローラーのパラメータは、BaseParamを継承して定義してください