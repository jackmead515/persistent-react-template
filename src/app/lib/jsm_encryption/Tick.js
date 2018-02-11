class Tick {

  constructor(rounds, jump) {
    this.rounds = rounds;
    this.jump = jump;
    this.value = `${rounds}${jump}`;
  }

  randomizeRule() {
    let rIndex = Math.floor(Math.random() * (9)) + 1;
    let jIndex = Math.floor(Math.random() * (9)) + 1;

    this.value = `${rIndex}${jIndex}`
    return this.value;
  }

  rule() {
    return this.value;
  }

  perform(message) {
    let m = message.slice();
    for(let i = 0; i < this.rounds; i++) {
      for(let x = 0; x < m.length; x++) {
        let l = m[x];
        let cc = m[x].charCodeAt(0);
        if(cc >= 65 && cc <= 90) {
          cc = cc+this.jump;
          if(cc > 90) {
            let dif = cc - 90;
            cc = 64 + dif;
            m[x] = String.fromCharCode(cc);
          } else {
            m[x] = String.fromCharCode(cc);
          }
        } else if(cc >= 97 && cc <= 122) {
          cc = cc+this.jump;
          if(cc > 122) {
            let dif = cc - 122;
            cc = 96 + dif;
            m[x] = String.fromCharCode(cc);
          } else {
            m[x] = String.fromCharCode(cc);
          }
        }
      }
    }
    return m;
  }

  unperform(message) {
    let m = message.slice();
    for(let i = 0; i < this.rounds; i++) {
      for(let x = 0; x < m.length; x++) {
        let l = m[x];
        let cc = m[x].charCodeAt(0);
        if(cc >= 65 && cc <= 90) {
          cc = cc-this.jump;
          if(cc < 65) {
            let dif = 65 - cc;
            cc = 91 - dif;
            m[x] = String.fromCharCode(cc);
          } else {
            m[x] = String.fromCharCode(cc);
          }
        } else if(cc >= 97 && cc <= 122) {
          cc = cc-this.jump;
          if(cc < 97) {
            let dif = 97 - cc;
            cc = 123 - dif;
            m[x] = String.fromCharCode(cc);
          } else {
            m[x] = String.fromCharCode(cc);
          }
        }
      }
    }
    return m;
  }

}

module.exports = Tick;
