export class Tile {
    constructor(
        public layerIndex: number,
        public x: number,
        public y: number,
        public xIndex: number,
        public yIndex: number,
        public yPosition: number,
        public xPosition: number,
        public name: string) {
        this.id = genId();
    }
    public id: string;
}

export class Layer {
    constructor(
        public x: number,
        public y: number,
        public name: string,
        public order: number) {
        this.id = genId();
        this.tiles = new Array<Tile>();
    }
    public id: string;
    public tiles: Array<Tile>;
}

export class Event {
    constructor(
        public x: number,
        public y: number) {
        this.id = genId();
        this.actions = new Array<Action>();
    }
    public id: string;
    public actions: Array<Action>;
}

export class Condition {
    constructor(
        public x: number,
        public y: number) {
        this.id = genId();
    }
    public id: string;
}

export class Transform {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
    ) {
        this.width = 1;
        this.height = 1;
    }
    public id: string;
}

export class Trigger {
    constructor(
        public name: string,
        public layer: Layer,
        public transform: Transform) {
        this.id = genId();
        this.events = new Array<Event>();
    }
    public events: Array<Event>;
    public id: string;
}

export class Action {
    constructor(
        public name: string
    ) {
        this.params = new Array<Param>();
        this.id = genId()
    }
    public params: Array<Param>;
    public id: string;
}

export class Param {
    constructor(
        public x: number,
        public y: number) {
        this.id = genId();
    }
    public id: string;
}

export class Tool {
    constructor() { }
    public state: number;
    public mode: number;
    public xPos1: number;
    public yPos1: number;
    public xPos2: number;
    public yPos2: number;
}

function genId() {
    return Math.random().toString(36).substr(2, 9);
}