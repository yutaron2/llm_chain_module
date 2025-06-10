import { ControllerFactory } from './factories/ControllerFactory';
import { exit } from 'process';
import { ParamFactory } from './factories/ParamFactory';
import { MenuInquierer } from './CLI/MenuInquierer';
import { ServiceMenuOption, ServiceType } from './interfaces/MenuOption';
import { Container } from 'inversify';
import { BaseController } from './controllers/BaseController';
import { Service1Controller } from './controllers/Service1Controller';
import { Service2Controller } from './controllers/Service2Controller';
import { Service3Controller } from './controllers/Service3Controller';
import { ResponseService, ResponseServiceImpl } from './services/ResponseService';
import { PromptService, PromptServiceImpl } from './services/PromptService';
import { TYPES } from './controllers/types';
import { Server } from 'http';

async function main() {
  welcome();
  
  //メニューの選択肢を作成する。
  const SERVICE_NAMES = {
    service1: 'Test Prompt Chain',
    service2: 'Test Service 1',
    service3: 'Test Service 2',
    exit: 'Exit'
  };
  
  console.log("please select a service:")
  const serviceChoices = createServiceChoices(SERVICE_NAMES);


  // サービスの選択を受け取る
  const service: ServiceType = await MenuInquierer.handleGUIInput(serviceChoices, 'service') as ServiceType;
  if (service === 'exit') {
    exit(0);
  }
  console.log('\n' + '='.repeat(50));
  console.log('🚀 サービス名');
  console.log('='.repeat(50));
  console.log(service)
  const controller = getController(service)

  // この処理でコントローラーにパラメータの入力を受ける。
  const param = await ParamFactory.create(service);
  // const controller = ControllerFactory.create(param);
  const statusCode = await controller.execute();
  console.log("statusCode:", statusCode);
  console.log("statusCode is...")
  console.log(statusCode);
}

const getController = (serviceName: string): BaseController => {
  const capitalizedServiceName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
  const container = new Container();
  // to()にはコンストラクタを渡している。
  container.bind<BaseController>(TYPES.Service1Controller).to(Service1Controller);
  container.bind<BaseController>(TYPES.Service2Controller).to(Service2Controller);
  container.bind<BaseController>(TYPES.Service3Controller).to(Service3Controller);

  container.bind<ResponseService>(TYPES.ResponseService).to(ResponseServiceImpl);
  container.bind<PromptService>(TYPES.PromptService).to(PromptServiceImpl);
  // 入力されたserviceNameにControllerを足すと、TYPESのキーのどれかになるはず
  const typeKey = `${capitalizedServiceName}Controller` as keyof typeof TYPES;


  return container.get<BaseController>(TYPES[typeKey]);
};

function welcome() {
  console.log("\x1b[31m  _    _  \x1b[32m______  \x1b[33m_      \x1b[34m_       \x1b[35m____  ");
  console.log("\x1b[31m | |  | |\x1b[32m|  ____|\x1b[33m| |    \x1b[34m| |     \x1b[35m/ __ \\ ");
  console.log("\x1b[31m | |__| |\x1b[32m| |__   \x1b[33m| |    \x1b[34m| |    \x1b[35m| |  | |");
  console.log("\x1b[31m |  __  |\x1b[32m|  __|  \x1b[33m| |    \x1b[34m| |    \x1b[35m| |  | |");
  console.log("\x1b[31m | |  | |\x1b[32m| |____ \x1b[33m| |____\x1b[34m| |____\x1b[35m| |__| |");
  console.log("\x1b[31m |_|  |_|\x1b[32m|______|\x1b[33m|______|\x1b[34m|______|\x1b[35m\\____/ ");
  console.log("\x1b[0m"); // リセット


  console.log("🤖 Prompt Chain Assistant 🤖")
}

function createServiceChoices(serviceNames: Record<ServiceType, string>): ServiceMenuOption[] {
  return Object.entries(serviceNames).map(([value, name]) => ({
    name,
    value: value as ServiceType
  }));
}

main();