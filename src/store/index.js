import {Record, List} from 'immutable';

const State = Record({
    image: null,
    point: null,
    currentArea: null,
    areas: new List(),
});

const Actions = {
    ADD_AREA: 'r/add-area',
    SET_IMAGE: 'r/set-image',
    SET_CURRENT_AREA: 'r/set-current-area',
    SET_LOCATION: 'r/set-location',
};

export function setImage(image) {
    return {
        image,
        type: Actions.SET_IMAGE,
    };
}

export function addArea(area) {
    return {
        area,
        type: Actions.ADD_AREA,
    };
}

export function setCurrentArea(area) {
    return {
        area,
        type: Actions.SET_CURRENT_AREA,
    };
}

export function setLocation(x, y) {
    return {
        type: Actions.SET_LOCATION,
        point: {x, y},
    };
}

function createBuffer(image, area) {
    const buffer = document.createElement('canvas');
    buffer.width = area.w;
    buffer.height = area.h;
    buffer.getContext('2d').drawImage(image, area.x, area.y, area.w, area.h, 0, 0, area.w, area.h);
    return buffer;
}

export function reducer(state = new State(), action = {}) {
    switch(action.type) {
    case Actions.SET_IMAGE:
        return state.set('image', action.image);

    case Actions.ADD_AREA:
        if (!state.image) {
            return state;
        }

        return state.set('areas', state.areas.push(Object.assign(action.area, {
            buffer: createBuffer(state.image, action.area),
        })));

    case Actions.SET_CURRENT_AREA:
        return state.set('currentArea', action.area);

    case Actions.SET_LOCATION:
        return state.set('point', action.point);

    default:
        return state;
    }
}