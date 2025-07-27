const mongoose = require("mongoose");
const orderStatus = require("../enums/orderStatus");

const orderSchema = mongoose.Schema(
  {
    orderBy: {
      userId: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingDetails: {
      name: String,
      phone: String,
      email: String,
      country: String,
      city: String,
      zipCode: String,
      address: String,
      notes: String,
    },
    status: {
      type: String,
      default: orderStatus.Pending,
      enum: Object.values(orderStatus),
    },
  },
  {
    timestamps: true,
  }
);
