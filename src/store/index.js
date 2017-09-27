import {Record} from 'immutable';

const State = Record({
    image: null,
    point: null,
});

export function reducer(state = new State(), action = {}) {

    return state;
}