import { ServiceType } from '../interfaces/MenuOption';
import fs from 'fs';
import path from 'path';
import { MenuInquierer } from '../CLI/MenuInquierer';
import { MenuOption } from '../interfaces/MenuOption';

// 基本パラメータインターフェース
export interface BaseParam {
	service: ServiceType;
	input: string;
}

// 各サービスのパラメータインターフェース
// 新しい機能を追加する場合、ここに新しいインターフェースを追加する
export interface Service1Param extends BaseParam {}

export interface Service2Param extends BaseParam {
	template: string;
}

export interface Service3Param extends BaseParam {
	filePath: string;
}

// コントローラーパラメータの型定義
export type ControllerParam = Service1Param | Service2Param | Service3Param;

// 抽象ファクトリクラス
export abstract class AbstractParamFactory {
  static async create(service: ServiceType): Promise<ControllerParam> {
    const factory = new ParamFactory();
    switch (service) {
      case 'service1':
          return await factory.createService1Param();
      case 'service2':
        return await factory.createService2Param();
      case 'service3':
        return await factory.createService3Param();
      default:
        throw new Error('Invalid service type');
    }
  }   
  
  // 各サービスのパラメータ生成メソッド
  abstract createService1Param(): Promise<Service1Param>;
  abstract createService2Param(): Promise<Service2Param>;
  abstract createService3Param(): Promise<Service3Param>;
  abstract showConfigMenu(configChoices: MenuOption[]): Promise<string>;
}

// 具象ファクトリクラス
export class ParamFactory extends AbstractParamFactory {
	async createService1Param(): Promise<Service1Param> {
		return {
			service: 'service1',
			input: 'default'
		};
	}

	async createService2Param(): Promise<Service2Param> {
		return {
			service: 'service2',
			input: 'template',
			template: 'default'
		};
	}

	async createService3Param(): Promise<Service3Param> {
		return {
			service: 'service3',
			input: 'document',
			filePath: 'default'
		};
	}

	async showConfigMenu(configChoices: MenuOption[]): Promise<string> {
		const response = await MenuInquierer.handleGUIInput(configChoices, 'config');
		return response;
	}
}