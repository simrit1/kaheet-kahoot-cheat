/*  Kaheet 
**  Kahoot cheat
** Author: pxtrez

**  Kaheet is free software.
*  The author assumes no responsibility for any damages that may arise from the use of this software.
*  By using this software, you accept the terms of the GNU General Public License v3.0
*  The license can also be found at https://www.gnu.org/licenses/gpl-3.0.en.html

** Used consoleimg v1.0 and modified for my purposes
** You can found it on: https://github.com/workeffortwaste/consoleimg/

*** Pull requests are welcome
*** Github repositiory: https://github.com/pxtrez/kaheet-kahoot-cheat/
*/

let consoleimg = (function() {
    return {
        load: function(ind, { color: c = 'transparent' } = {}) {
            let question = q.question
            let answer = q.answer
            let reader = new FileReader()
            reader.addEventListener('load', function() {
                let o = 'background: url(\'' + reader.result + '\') left top no-repeat; font-size: 30px; color: #f6ff51; border: 5px solid #000; display: block; background-size: contain; background-repeat: no-repeat; background-color:' + c
                if (question != "" || answer != "") {
                    console.log(`%c        Question: ${question} || Answer: ${(answer)}`, o)
                }
            }, false)
            fetch(ind)
                .then(reader => reader.blob())
                .then(res => {
                    if (res.type.indexOf('image') === 0) {
                        if (res.size > 8192 && navigator.userAgent.indexOf('Firefox') > 0) {
                            throw new Error('Image size too big to be displayed in Firefox.')
                        }
                        return res
                    } else {
                        throw new Error('Valid image not found.')
                    }
                })
                .then(ind => reader.readAsDataURL(ind))
                .catch(ead => console.warn(ead.message))
        }
    }
})()

let getQuizid = (input) => {
    let found = 0;
    let time = { "start": "", "end": "" }
    time.start = Date.now()
    fetch(`https://kahoot.it/rest/kahoots/${input}`)
        .then((r) => {
            if (!r.ok) {
                console.log(`%cCannot find quiz by id: ${input}! Please try again`, "color:#ff5252")
                getUserInput(`Cannot find quiz by id: ${input}`)
            } else {
                return r.json()
            }
        })
        .then((a) => {
            let quiz = { "author": "", "title": "", "questions": "", "found": "", "content": 0 }
            quiz.author = a.creator_username;
            quiz.title = a.title;
            let quiz_type = a.quizType;
            if (quiz_type) {
                if (quiz_type != "quiz") {
                    return alert(`This quiz type: ${quiz_type} is not supported yet!`)
                }
            }
            let k = Object.keys(a.questions).length;
            for (let i = 0; i < k; i++) {
                let img = "";
                q = { "question": "", "answer": "" };
                q.question = a.questions[i].question;
                if (a.questions[i].image) {
                    img = a.questions[i].image;
                } else {
                    if (a.questions[i].image.id) {
                        img = `https://media.kahoot.it/${a.questions[i].image.id}`;
                    } else {
                        throw new Error('Cannot find any image for this question.')
                    }
                }
                if (a.questions[i].type === "content") {
                    quiz.content++;
                }
                if (a.questions[i].type === "quiz" || a.questions[i].type === "multiple_select_quiz" || a.questions[i].type === "jumble") {
                    found++;
                    for (let j = 0; j < (a.questions[i].choices).length; j++) {
                        if (a.questions[i].choices[j].correct.toString() == "true") {
                            if (a.questions[i].choices[j].answer) {
                                q.answer = a.questions[i].choices[j].answer;
                            } else {
                                if (a.questions[i].choices[j].image.id) {
                                    q.answer = `Only image answer...`;
                                }
                            }
                            console.log('%c-----------------', "color:purple");
                            console.log(`%cQuestion: ${q.question}`, "color:yellow");
                            console.log(`%cAnswer: ${q.answer}`, "color:yellow");
                            console.log(`Question info: ${(a.questions[i].choices).length} choices, ${a.questions[i].time / 1000} seconds, ${a.questions[i].pointsMultiplier}x points multiplier.`);
                            if (img != "") {
                                consoleimg.load(img, {
                                    color: 'transparent'
                                })
                            }
                        }
                    }
                }
            }
            time.end = Date.now();
            quiz.found = found;
            quiz.questions = k;
            return quiz;
        })
        .then((quiz) => {
            return `Got answers for ${quiz.found}/${quiz.questions - quiz.content} questions.\nTime to get answers: ${(time.end - time.start) / 100 }s.\nSelected quiz: "${quiz.title}" created by ${quiz.author}.`;
        })
        .then((data) => {
            setTimeout(() => {
                console.log(data)
                alert(data)
            }, 1000 * 1)
        })
}

console.clear()
console.log('%cScript created by pxtrez', "color:#ff66ff");
console.log('Cheat is under GNU General Public License v3.0.\nGithub repo: https://github.com/pxtrez/kaheet-kahoot-cheat/');
(function getUserInput(reason) {
    let userInput = prompt(`${reason}\nEnter the quiz ID. It is visible on the teacher's screen.\n\nFor example: https://play.kahoot.it/v2/lobby?quizId= \"4487beab-3d31-4e9e-8d94-94ef15f87230\"`);
    if (userInput != "") {
        console.log(`Trying to fetch "${userInput}"`);
        fetch(`https://kahoot.it/rest/kahoots/${userInput}`)
            .then((r) => {
                if (!r.ok) {
                    alert(`Wrrr, can't find the quiz by id: ${userInput}! Try again!`)
                } else {
                    alert(`HAHAHA, kahoot sucks so I found the answers for you!`)
                    getQuizid(userInput)
                }
            });
    } else {
        console.log(`%cInput can't be empty!`, "color:#ff5252");
        getUserInput("")
    }
})()
