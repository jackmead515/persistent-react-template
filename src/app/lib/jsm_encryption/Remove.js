class Remove {

  constructor(letter, number, jump) {
    this.letter = letter;
    this.number = number;
    this.jump = jump;
    this.value = `${this.letter}${this.number}${this.jump}`;
  }

  randomizeRule() {
    let characters = '~!@#$%^&*()_+{}[]|:;<>,.?/'.split('');
    let lIndex = Math.floor(Math.random() * (characters.length));
    let nIndex = Math.floor(Math.random() * (9)) + 1;
    let jIndex = Math.floor(Math.random() * (9)) + 1;

    this.value = `${characters[lIndex]}${nIndex}${jIndex}`;
    return this.value;
  }

  rule() {
    return this.value;
  }

  perform(message) {
    let m = message.slice();
    let j = 0;
    let nl = m.length-this.number;
    let js = [];
    if(nl < this.jump) return m;

    for(let i = 0; i < this.number; i++) {
      j+=this.jump;
      if(j > nl-1) j = j - nl;
      if()
      js.push(j); nl-=1;
    }

    for(let i = 0; i < js.length; i++) {
        m.splice(js[i], 1);
    }

    return m;
  }

  unperform(message) {
    let m = message.slice();
    let j = 0;
    if(m.length < this.jump) return m;
    for(let i = 0; i < this.number; i++) {
      j+=this.jump;
      if(j > m.length-1) j = j - m.length;
      m.splice(j, 0, this.letter);
    }
    return m;
  }

}

module.exports = Remove;
