var Add = require('./Add');
var Reverse = require('./Reverse');
var Arrange = require('./Arrange');
var Tick = require('./Tick');
var Replace = require('./Replace');

class RuleBook {

  constructor(ruleBook) {
    this.ruleBook = ruleBook;
  }

  encrypt(message, password) {
    let m = message.split('');
    let p = password.split('');

    for(let i = 0; i < p.length; i++) {
      if(this.ruleBook[p[i]]) {

        let order = this.ruleBook[p[i]].o.split('');
        let rule = this.ruleBook[p[i]].r.split('');

        for(let x = 0; x < order.length; x++) {
          let o = parseInt(order[x]);

          if(o === 1) {
            let tick = new Tick(parseInt(rule[1]), parseInt(rule[2]));
            m = tick.perform(m);

          } else if(o === 2) {
            let arrange = new Arrange(parseInt(rule[4]), parseInt(rule[5]))
            m = arrange.perform(m);

          } else if(o === 3) {
            let add = new Add(rule[7], parseInt(rule[8]), parseInt(rule[9]));
            m = add.perform(m);

          } else if(o === 4) {
          let rep = new Replace(/*rule[11], rule[12]*/);
            m = rep.perform(m);

          } else if(o === 5) {
            let rev = new Reverse();
            m = rev.perform(m);

          }
        }
      }
    }
    return m.join('');
  }

  decrypt(message, password) {
    let m = message.split('');
    let p = password.split('').slice().reverse();

    for(let i = 0; i < p.length; i++) {
      if(this.ruleBook[p[i]]) {

        let order = this.ruleBook[p[i]].o.split('').reverse();
        let rule = this.ruleBook[p[i]].r.split('');

        for(let x = 0; x < order.length; x++) {
          let o = parseInt(order[x]);

          if(o === 1) {
            let tick = new Tick(parseInt(rule[1]), parseInt(rule[2]));
            m = tick.unperform(m);

          } else if(o === 2) {
            let arrange = new Arrange(parseInt(rule[4]), parseInt(rule[5]))
            m = arrange.unperform(m);

          } else if(o === 3) {
            let add = new Add(rule[7], parseInt(rule[8]), parseInt(rule[9]));
            m = add.unperform(m);

          } else if(o === 4) {
          let rep = new Replace(/*rule[11], rule[12]*/);
            m = rep.unperform(m);

          } else if(o === 5) {
            let rev = new Reverse();
            m = rev.unperform(m);

          }
        }
      }
    }
    return m.join('');
  }

}

module.exports = RuleBook;
