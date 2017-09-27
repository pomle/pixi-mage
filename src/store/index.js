import {Record} from 'immutable';

const State = Record({
    image: null,
    point: null,
});

const Actions = {
    SET_LOCATION: 'r/set-location',
};

export function setLocation(x, y) {
    return {
        type: Actions.SET_LOCATION,
        point: {x, y},
    };
}

export function reducer(state = new State(), action = {}) {
    switch(action.type) {
    case Actions.SET_LOCATION:
        return state.set('point', action.point);

    default:
        return state;
    }
}