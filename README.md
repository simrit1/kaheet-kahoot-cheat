## kaheet-kahoot-cheat

# How to use?
1. Open [kahoot](https://kahoot.it/)
2. Right click, inspect (open console)
3. Paste following script:

```js
fetch("https://raw.githubusercontent.com/pxtrez/kaheet-kahoot-cheat/main/dist/script.js")
.then((res) => res.text()
.then((t) => eval(t)))
```

4. Then enter quizid. </br>

<details>
  <summary>What is quizid?</summary>
  QuizID is visible on host's screen.

  e.g. `https://play.kahoot.it/v2/lobby?quizId=`**`4487beab-3d31-4e9e-8d94-94ef15f87230`**
</details>
  
5. Correct answers should appear in the console. </br></br>
<img src="./docs/preview.png" width="70%"></br></br></br>

cheat supports images in kahoot quizzes!

Join our [Discord](https://dsc.gg/elekcje) to access searching quiz by name, not QuizID<br><br>
## How to use kaheet bot on discord?
1. Join our discord.
2. Open `︴🤖・commands` channel.
3. Type ` .kaheet [id <QuizID>] / [name <kahoot name>]`.

# Suggestions
Pull requests are welcome!

# Any problems?
Create an issue
