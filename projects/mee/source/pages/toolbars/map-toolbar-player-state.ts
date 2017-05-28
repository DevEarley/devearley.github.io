import { PlayerState } from '../../domain/player-state';
import { PlayerStateDataService } from '../../services/player-state-data-service';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject()
export class MapToolBarPlayerStates {
  constructor(public PlayerStateDataService: PlayerStateDataService) { }
  activate() {}
}
