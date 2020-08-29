import { createStore, createEvent } from 'effector'

export const defaultStat = {
    angle: 0,
    speed: 0,
    cursorX: 0,
    cursorY: 0,
}

export const setAngle = createEvent<number>('setAngle')
export const setSpeed = createEvent<number>('setSpeed')
export const setCursor = createEvent<[number, number]>('setCursor')

export const store = createStore(defaultStat)
    .on(setAngle, (state, angle) => ({
        ...state,
        angle,
    }))
    .on(setSpeed, (state, speed) => ({
        ...state,
        speed,
    }))
    .on(setCursor, (state, [cursorX, cursorY]) => ({
        ...state,
        cursorX,
        cursorY,
    }))
