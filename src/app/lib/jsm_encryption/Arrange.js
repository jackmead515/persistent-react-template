class Arrange {

  constructor(rounds, jump) {
    this.rounds = rounds;
    this.jump = jump;
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.value = `${this.rounds}${this.jump}`;
  }

  randomizeRule() {
    let rIndex = Math.floor(Math.random() * (9)) + 1;
    let jIndex = Math.floor(Math.random() * (9)) + 1;

    this.value = `${rIndex}${jIndex}`;
    return this.value;
  }

  rule() {
    return this.value;
  }

  perform(message) {
    let m = message.slice();
    for(let i = 0; i < this.rounds; i++) {
      for(let x = 0; x < m.length; x++) {
        if(m[x+this.jump]) {
          let temp = m[x];
          m[x] = m[x+this.jump];
          m[x+this.jump] = temp;
        }
      }
    }
    return m;
  }

  unperform(message) {
    let m = message.slice();
    for(let i = 0; i < this.rounds; i++) {
      for(let x = m.length-1; x >= 0; x--) {
        if(m[x-this.jump]) {
          let temp = m[x];
          m[x] = m[x-this.jump];
          m[x-this.jump] = temp;
        }
      }
    }
    return m;
  }

}

module.exports = Arrange;
