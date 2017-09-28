import {Record, List} from 'immutable';

const State = Record({
    image: null,
    point: null,
    activeArea: null,
    sprites: new List(),
    selectedSprite: null,
    scale: 1,
});

const Actions = {
    ADD_SPRITE: 'r/add-sprite',
    REPLACE_SPRITE: 'r/replace-sprite',
    SET_IMAGE: 'r/set-image',
    SET_SCALE: 'r/set-scale',
    SET_ACTIVE_AREA: 'r/set-active-area',
    SET_LOCATION: 'r/set-location',
    SELECT_SPRITE: 'r/select-sprite',
};

export function selectSprite(area) {
    return {
        area,
        type: Actions.SELECT_SPRITE,
    }
}

export function setImage(image) {
    return {
        image,
        type: Actions.SET_IMAGE,
    };
}

export function setScale(scale) {
    return {
        scale,
        type: Actions.SET_SCALE,
    };
}

export function addSprite(sprite) {
    return {
        sprite,
        type: Actions.ADD_SPRITE,
    };
}

export function replaceSprite(oldSprite, newSprite) {
    return {
        oldSprite,
        newSprite,
        type: Actions.REPLACE_SPRITE,
    };
}

export function setActiveArea(area) {
    return {
        area,
        type: Actions.SET_ACTIVE_AREA,
    };
}

export function setLocation(x, y) {
    return {
        type: Actions.SET_LOCATION,
        point: {x, y},
    };
}


export function reducer(state = new State(), action = {}) {
    switch(action.type) {
    case Actions.SET_IMAGE:
        return state
            .set('image', action.image)
            .set('sprites', new List());

    case Actions.ADD_SPRITE:
        return state
            .set('sprites', state.sprites.push(action.sprite))
            .set('selectedSprite', action.sprite);

    case Actions.REPLACE_SPRITE:
        return state
            .set('sprites', state.sprites.withMutations(sprites => {
                const index = sprites.findIndex(sprite => sprite === action.oldSprite);
                if (index > -1) {
                    sprites.set(index, action.newSprite);
                }
                return sprites;
            }))
            .set('selectedSprite', action.newSprite);

    case Actions.SET_ACTIVE_AREA:
        return state.set('activeArea', action.area);

    case Actions.SET_SCALE:
        return state.set('scale', action.scale);

    case Actions.SET_LOCATION:
        return state.set('point', action.point);

    case Actions.SELECT_SPRITE:
        return state.set('selectedSprite', action.area);

    default:
        return state;
    }
}