var sequelize = require('../lib/sequelize.js'),
    Sequelize = require('sequelize'),
    Message = require('./message.js')

CELL_NUMBER_REGEXP = /^(\d{7}|(\+?1)?\d{10})$/

var Contact = sequelize.define('contacts', {
  cell_number: Sequelize.STRING
}, {
  classMethods: {
    normalizeCellNumber: function(cellNumber) {
      cellNumber = cellNumber.replace(/[^\d]/g, '').trim()

      // FIXME: This assumes US numbers; Need l10n.
      if (cellNumber.length == 10) {
        cellNumber = '+1' + cellNumber
      }
      else if ((cellNumber.length == 11) && (cellNumber[0] == '1')) {
        cellNumber = '+' + cellNumber
      }

      return cellNumber

    },

    isValidNumber: function(cellNumber) {
      cellNumber = cellNumber.replace(/[^\d]/g, '').trim()
      return (cellNumber.match(CELL_NUMBER_REGEXP) != null)
    }
  }
})

Contact.hasMany(Message)

module.exports = Contact
