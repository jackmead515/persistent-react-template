var Add = require('./Add');
var Reverse = require('./Reverse');
var Arrange = require('./Arrange');
var Tick = require('./Tick');
var Replace = require('./Replace');

class RuleBookGenerator {

  constructor(maxColumns, minColumns) {
    this.rows = 26;
    this.maxColumns = maxColumns;
    this.minColumns = minColumns;
    this.ruleBook = {};
    this.password = '';
    this.alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    this.addRule = new Add();
    this.reverseRule = new Reverse();
    this.arrangeRule = new Arrange();
    this.tickRule = new Tick();
    this.replaceRule = new Replace();
  }

  book() {
    return this.ruleBook;
  }

  randomArr(min, max, length) {
    let rArr = [];
    for(let i = 0; i < length; i++) {
      let rand = Math.floor(Math.random() * (max - min + 1)) + min;
      rArr.push(rand);
    }
    return rArr;
  }

  randomizeRules() {
    this.replaceRule.randomizeRule();
    this.addRule.randomizeRule();
    //this.reverseRule doesn't need randomizing
    this.arrangeRule.randomizeRule();
    this.tickRule.randomizeRule();
  }

  generateRandomRuleBook() {
    for(let i = 0; i < this.alphabet.length; i++) {
      let letter = this.alphabet[i];
      let dif = this.maxColumns - this.minColumns;
      let columns = Math.floor(Math.random() * (dif + 1)) + this.minColumns;
      let ruleNums = this.randomArr(1, 5, columns).join('');
      this.randomizeRules();

      let tr = '1'.concat(this.tickRule.rule()); //3
      let ar = '2'.concat(this.arrangeRule.rule()); //3
      let adr = '3'.concat(this.addRule.rule()); //4
      let rr = '4'.concat(this.replaceRule.rule()); //3
      let rer = '5'.concat(this.reverseRule.rule()); //1

      let rule = tr.concat(ar).concat(adr).concat(rr).concat(rer);

      this.ruleBook[letter] = {
        'o': ruleNums,
        'r': rule
      }
    }
  }

  generateRandomPassword() {

  }

}

module.exports = RuleBookGenerator;
