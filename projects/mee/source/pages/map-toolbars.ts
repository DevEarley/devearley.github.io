import { bindable, autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

@autoinject
export class MapToolbars {
  private router: Router;

  @bindable 
  public currentToolbar = 'A';

  constructor(router: Router) {}
  clickToolbar(_toolbar: string) {
    if(this.currentToolbar == _toolbar)
    {
      this.currentToolbar = '';
      return;
    }
    this.currentToolbar = _toolbar;
  }
}
