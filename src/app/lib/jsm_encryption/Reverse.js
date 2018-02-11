class Reverse {

  constructor() {

  }

  rule() {
    return '';
  }

  perform(message) {
    return message.slice().reverse();
  }

  unperform(message) {
    return message.slice().reverse();
  }

}

module.exports = Reverse;
