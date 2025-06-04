import { ControllerFactory } from './factories/ControllerFactory';
import { exit } from 'process';
import { ParamFactory } from './factories/ParamFactory';
import { MenuInquierer } from './CLI/MenuInquierer';
import { ServiceMenuOption, ServiceType } from './interfaces/MenuOption';

async function main() {
  welcome();
  
  //メニューの選択肢を作成する。
  const SERVICE_NAMES = {
    service1: 'test a prompt chain',
    service2: 'mock',
    service3: 'mock',
    exit: 'Exit'
  };
  
  console.log("please select a service:")
  const serviceChoices = createServiceChoices(SERVICE_NAMES);
  showServiceMenu(serviceChoices);


  // サービスの選択を受け取る
  const service: ServiceType = await MenuInquierer.handleGUIInput(serviceChoices, 'service') as ServiceType;
  if (service === 'exit') {
    exit(0);
  }

  // この処理でコントローラーにパラメータの入力を受ける。
  const param = await ParamFactory.create(service);
  const controller = ControllerFactory.create(param);
  const statusCode = await controller.execute();
  console.log("statusCode:", statusCode);
  console.log("statusCode is...")
  console.log(statusCode);
  exit(0);
}


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
function showServiceMenu(serviceChoices: ServiceMenuOption[]) {
  console.log("showServiceMenu is ready")
  console.log(serviceChoices)
}

main();