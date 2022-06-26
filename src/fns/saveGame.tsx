import { GameObj } from "../interfaces/interfaces";


export const saveGame = (fieldName: string, val: string | Object | boolean, isGameDone?: boolean) => {
    let game: GameObj = JSON.parse(localStorage.getItem('game') as string);
    isGameDone && delete game.currentTurn;
    game = { ...game, [fieldName]: val };
    localStorage.setItem('game', JSON.stringify(game));
}