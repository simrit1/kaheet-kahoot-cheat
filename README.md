# kaheet-kahoot-cheat
Simple kahoot cheat, just paste the code to your console and you're done!

* [Usage](#Usage "Goto Usage")
* [Bugs](#Bugs "Goto Bugs")

## Usage
1. Open [kahoot](https://kahoot.it/)
2. Right click, inspect (open console)
3. Paste this:

```js
fetch("https://raw.githubusercontent.com/pxtrez/kaheet-kahoot-cheat/master/dist/script.js")
.then((res) => res.text()
.then((t) => eval(t)))
```

4. Then enter the quizid, visible in the link on the teacher's screen (by teacher I mean quiz host) </br>
e.g. `https://play.kahoot.it/v2/lobby?quizId=` **`4487beab-3d31-4e9e-8d94-94ef15f87230`**
5. Correct answers should appear in the console. </br></br></br>
![example](./docs/example.png)</br></br></br>

cheat supports images in kahoot quizzes!

## Bugs
* When a question has more than one correct answer, the answer is not displayed.

## Other
Pull requests are welcome!
