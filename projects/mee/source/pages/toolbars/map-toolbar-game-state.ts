import { GameState } from '../../domain/game-state';
import { GameStateDataService } from '../../services/game-state-data-service';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject()
export class MapToolBarGameStates {
  constructor(public GameStateDataService: GameStateDataService) { }
  activate() {}
}
