import { bindable, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';


@inject(Router)
export class MapHelp {
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }

}
