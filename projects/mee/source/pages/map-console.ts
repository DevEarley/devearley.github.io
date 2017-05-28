import { bindable, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';


@inject(Router)
export class MapConsole {
  router: Router;
  @bindable showConsole:boolean = false;
  constructor(router: Router) {
    this.router = router;
  }

}
