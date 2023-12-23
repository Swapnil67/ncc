let sentence = "Welcome to dream11";
let sentence_reverse = "";

let sentence_arr = sentence.split(" ");

for (let i = 0; i < sentence_arr.length; i++) {
  const word = sentence_arr[i];
  let rev = "";
  for (let i = word.length-1; i >= 0; i--) {
    const character = word[i];
    rev += character
  }
  sentence_reverse += ` ${rev}`;
}

console.log("sentence: ", sentence);
console.log("sentence_reverse: ", sentence_reverse);