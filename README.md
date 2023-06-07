# Wordmasters Game

Welcome to Wordmasters Game! This is a JavaScript-based word game where players guess words based on clues. The game utilizes APIs to fetch a word of the day and validate user inputs.

## How to Play

1. The game consists of multiple rounds. Each round presents a word clue, and players attempt to guess the word.

2. Use the keyboard to enter your guess:
   - Press individual letters to add them to your guess.
   - Press Enter to submit your guess.
   - Press Backspace to delete the last entered letter.

3. Guesses will be marked as correct, close, or wrong:
   - Correct: A letter is in the correct position.
   - Close: A letter is in the word but not in the correct position.
   - Wrong: A letter is not in the word.

4. The game allows a maximum of 5 attempts per word. If you don't guess the word within the given attempts, you lose the round.

5. If you correctly guess the word, you win the round and become the Wordmaster!

## Installation

1. Clone the repository:


2. Change to the project directory:

3. Open the `index.html` file in your web browser.

## API Usage

The game utilizes the following APIs:

- [Words API](https://words.dev-apis.com/word-of-the-day): Fetches a word of the day for gameplay.
- [Validate Word API](https://words.dev-apis.com/validate-word): Validates if the user's guess is a valid English word.
