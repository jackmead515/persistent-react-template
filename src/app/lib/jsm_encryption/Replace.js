class Replace {

  constructor(tletter, rletter) {
    this.tletter = tletter;
    this.rletter = rletter;
    this.value = this.value = `${tletter}${rletter}`;
  }

  randomizeRule() {
    let characters = ':nkopq_r&s}tuvi{hw.xyz;%A^BCD,EF<j*[GmHIfgeJ(?KLM>NOPlQc@)RdST$U/!VW+~a]XY|b#Z'.split('');
    let tIndex = Math.floor(Math.random() * (characters.length));
    let rIndex = Math.floor(Math.random() * (characters.length));

    this.value = `${characters[tIndex]}${characters[rIndex]}`;
    return this.value;
  }

  rule() {
    return this.value;
  }

  perform(message) {
    let m = message.slice();
    for(let i = 0; i < m.length; i++) {
      if(m[i] === this.tletter) {
        m[i] = this.rletter;
      }
    }
    return m;
  }

  unperform(message) {
    let m = message.slice();
    for(let i = 0; i < m.length; i++) {
      if(m[i] === this.rletter) {
        m[i] = this.tletter;
      }
    }
    return m;
  }

}

module.exports = Replace;
