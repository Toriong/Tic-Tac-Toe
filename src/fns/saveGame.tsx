import { GameObj } from "../interfaces/interfaces";


export const saveGame = (fieldName: string, val: string | Object | boolean) => {
    let game: GameObj = JSON.parse(localStorage.getItem('game') as string);
    game = { ...game, [fieldName]: val };
    localStorage.setItem('game', JSON.stringify(game));
}