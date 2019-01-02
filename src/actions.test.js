import {
  MAKE_GUESS,
  makeGuess,
  RESTART_GAME,
  restartGame,
  GENERATE_AURAL_UPDATE,
  generateAuralUpdate
} from './actions';

describe('makeGuess', () => {
  it('Should return the action', () => {
    const guess = 50;
    const action = makeGuess(guess);
    expect(action.type).toEqual(MAKE_GUESS);
    expect(action.guess).toEqual(guess);
  });
});

describe('restartGame', () => {
  it('Should return the action', () => {
    const correctAnswer = 50;
    const action = restartGame(correctAnswer);
    expect(action.type).toEqual(RESTART_GAME);
    expect(action.correctAnswer).toEqual(correctAnswer);
  });
});

describe('generateAuralUpdate', () => {
  it('Should return the action', () => {
    const action = generateAuralUpdate();
    expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
  });
});
