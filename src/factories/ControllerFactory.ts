import { BaseController } from '../controllers/BaseController';
import { Service1Controller } from '../controllers/Service1Controller';
import { Service2Controller } from '../controllers/Service2Controller';
import { Service3Controller } from '../controllers/Service3Controller';
import { ResponseServiceImpl } from '../services/ResponseService';
import { ControllerParam, Service1Param, Service2Param, Service3Param } from './ParamFactory';
import { PromptServiceImpl } from '../services/PromptService';
import { TYPES } from '../controllers/types';
import { Container } from 'inversify';
import { ResponseService } from '../services/ResponseService';
import { PromptService } from '../services/PromptService';

const CONTROLLER_CONFIG = {
  service1: Service1Controller,
  service2: Service2Controller,
  service3: Service3Controller,
} as const;

export class ControllerFactory {
  static create(serviceName: string): BaseController {
    const container = new Container();
    
    // サービスをバインド
    container.bind<ResponseService>(TYPES.ResponseService).to(ResponseServiceImpl);
    container.bind<PromptService>(TYPES.PromptService).to(PromptServiceImpl);
    
    // コントローラーをバインド
    Object.entries(CONTROLLER_CONFIG).forEach(([key, ControllerClass]) => {
      const typeKey = `${key.charAt(0).toUpperCase() + key.slice(1)}Controller` as keyof typeof TYPES;
      container.bind<BaseController>(TYPES[typeKey]).to(ControllerClass);
    });
    
    // 指定されたコントローラーを返す
    const typeKey = `${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}Controller` as keyof typeof TYPES;
    return container.get<BaseController>(TYPES[typeKey]);
  }
}