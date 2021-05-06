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


var i, c, e, w = ""
var n = 0
console.log('%cScript created by pxtrez', "color:#ff66ff")
console.log('Cheat is under GNU General Public License v3.0.\nGithub repo: https://github.com/pxtrez/kaheet-kahoot-cheat/')
const d = prompt("Kaheet\n\nPlease enter quiz id. This value is visible on teacher's screen.\n\nFor example:\n https://play.kahoot.it/v2/lobby?quizId=\n-> 4487beab-3d31-4e9e-8d94-94ef15f87230")
if (!d == "") {
    /* consoleimg v1.0 - chris johnson / @defaced */
    const consoleimg = (function() {
            return {
                load: function(ind, { size: s = 500, color: c = 'transparent' } = {}) {
                    const question = q.question
                    const answer = q.answer
                    const rad = new FileReader()
                    rad.addEventListener('load', function() {
                        const o = 'background: url(\'' + rad.result + '\') left top no-repeat; font-size: 30px; background-size: contain; background-repeat: no-repeat; background-color:' + c
                        console.log(`%c        Question: ${question}    Answer: ${answer}`, o)
                    }, false)
                    fetch(ind)
                        .then(rad => rad.blob())
                        .then(bad => {
                            if (bad.type.indexOf('image') === 0) {
                                if (bad.size > 8192 && navigator.userAgent.indexOf('Firefox') > 0) {
                                    throw new Error('Image size too big to be displayed in Firefox.')
                                }
                                return bad
                            } else {
                                throw new Error('Valid image not found.')
                            }
                        })
                        .then(ind => rad.readAsDataURL(ind))
                        .catch(ead => console.warn(ead.message))
                }
            }
        })()
        //
    fetch(`https://kahoot.it/rest/kahoots/${d}`)
        .then(function(r) {
            if (!r.ok) {
                console.log(`%cQuizID is invalid! Please try again.\nYour quizid: ${d}`, "color:#ff5252")
            } else {
                return r.json()
            }
        })
        .then(function(a) {
            const k = Object.keys(a.questions).length
            for (let e = 0; e < k; e += 1) {
                q = { "question": "", "answer": "" }
                q.question = a.questions[e].question
                const img = a.questions[e].image
                for (let w = 0; w < (a.questions[e].choices).length; w++) {
                    if (a.questions[e].choices[w].correct.toString() == "true") {
                        q.answer = a.questions[e].choices[w].answer
                        console.log('%c-----------------', "color:purple")
                        console.log(`%cQuestion: ${q.question}`, "color:yellow")
                        console.log(`%cAnswer: ${q.answer}`, "color:yellow")
                        if (img != "") {
                            consoleimg.load(img, {
                                color: 'transparent'
                            });
                        }
                        if (n > 1) {
                            console.log(`Question have ${(a.questions[e].choices).length} choices.`)
                        } else {
                            console.log(`Question have ${(a.questions[e].choices).length} choices.`)
                        }
                    }
                }
            }
        });
} else {
    console.log(`%cInput can't be empty!`, "color:#ff5252")
}
