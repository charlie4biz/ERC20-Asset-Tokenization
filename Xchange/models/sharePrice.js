/**
 * Set the price unit price of shares
 */
const {Schema, model } = require('mongoose')

const Status = Object.freeze({
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected'
  })

const SharePriceSchema = new Schema({
    username: { type: Schema.Types.String, ref: 'Users', required: true },
    price: { type: Schema.Types.Number},
    status: { type: Schema.Types.String, enum: Object.values(Status), default: Status.PENDING},
    approver: {type: Schema.Types.String, ref: 'Users'}
},
{ timestamps: true }, { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)

SharePriceSchema.statics.Status = Status
const SharePrice = model('SharePrice', SharePriceSchema)

exports.SharePriceModel = SharePrice