import reducer from './reducer';
// name of file, since it's default
import { makeGuess, restartGame, generateAuralUpdate } from './actions';

describe('Reducer', () => {
  it('Should set initial state when not arguments passed in', () => {
    const state = reducer(undefined, { type: '__UNKNOWN' });

    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.auralStatus).toEqual('');
  });

  it('Generates aural updates', () => {
    let state = {
      guesses: [10, 15, 20],
      feedback: "You're Ice Cold...",
      auralStatus: ''
    };

    state = reducer(state, generateAuralUpdate());
    expect(state.auralStatus).toEqual(
      "Here's the status of the game right now: You're Ice Cold... You've made 3 guesses. In order of most- to least-recent, they are: 20, 15, 10"
    );
  });

  describe('makeGuess', () => {
    it('Should make a guess', () => {
      let state = {
        guesses: [],
        feedback: '',
        correctAnswer: 100
      };
      // test for each guess feedback and each guess in state.guesses
      state = reducer(state, makeGuess(1));
      expect(state.guesses).toEqual([1]);
      expect(state.feedback).toEqual("You're Ice Cold...");

      state = reducer(state, makeGuess(60));
      expect(state.guesses).toEqual([1, 60]);
      expect(state.feedback).toEqual("You're Cold...");

      state = reducer(state, makeGuess(89));
      expect(state.guesses).toEqual([1, 60, 89]);
      expect(state.feedback).toEqual("You're Warm.");

      state = reducer(state, makeGuess(99));
      expect(state.guesses).toEqual([1, 60, 89, 99]);
      expect(state.feedback).toEqual("You're Hot!");

      state = reducer(state, makeGuess(100));
      expect(state.guesses).toEqual([1, 60, 89, 99, 100]);
      expect(state.feedback).toEqual('You got it!');
    });
  });

  describe('restartGame', () => {
    it('Should start new game', () => {
      // dummy game data
      let state = {
        guesses: [11, 89, 17, 26],
        feedback: 'Schtuff',
        correctAnswer: 33
      };
      const correctAnswer = 50;
      // reducer(state, action)
      state = reducer(state, restartGame(correctAnswer));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.correctAnswer).toEqual(correctAnswer);
      expect(state.auralStatus).toEqual('');
    });
  });
});
