import { remote } from 'electron';
import { I18N } from 'aurelia-i18n';
import { inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

@inject(I18N)
export class App {
  private i18n: I18N;
  public login = true;
  public dashboard = false;
  public router:Router;
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      {
        route: ['', 'workspace'],
        name: 'workspace',
        moduleId: 'pages/map-workspace' ,
        nav:true
      }    
    ]);
  }
  constructor(i18n: I18N) {
    this.i18n = i18n;
  }

  open() {
    remote.dialog.showMessageBox({
      message: this.i18n.tr("test"),
      buttons: ["OK"]
    });
  }
}
