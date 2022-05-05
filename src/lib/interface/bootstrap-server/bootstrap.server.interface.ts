export interface BootstrapServerInterface {
  initDedicatedMiddleware(): void;
  initThirdPartyDependentApplication(): void;
  initCustomRuntimeApplication(): void;

  initRouters(): void;
  listen(port: number, host: string, callback?: Function): void;
}
