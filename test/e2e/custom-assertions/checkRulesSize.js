// A custom Nightwatch assertion.
// The assertion name is the filename.
// Example usage:
//
//   browser.assert.elementCount(selector, count)
//
// For more information on custom assertions see:
// http://nightwatchjs.org/guide#writing-custom-assertions

exports.assertion = function (rules) {
    this.message = 'Testing rules length'
    this.expected = rules
    this.pass = function (val) {
      return val.length === this.expected.length
    }
    this.value = function (res) {
      console.log('########res##le ###'+res.value.length)
      return res.value
    }
    this.command = function (cb) {
      var self = this
      return this.api.execute(function (rules) {
                return rules
      }, [rules], function (rules) {
            cb.call(self, rules)
      })
    }
  }
  