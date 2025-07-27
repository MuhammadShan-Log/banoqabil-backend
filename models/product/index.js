const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    images: [
      {
        url: { type: String, required: [false, ""] },
        alt: { type: String },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    sku: {
      type: String,
      unique: true,
      required: [true, "SKU is required."],
      trim: true,
    },
    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required."],
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:[true, "User id is required."]
    },
    slug: {
      type: String,
      required: [true, "Slug is required."],
      unique: true,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    seo: {
      metaTitle: {
        type: String,
        trim: true,
      },
      metaDescription: {
        type: String,
        trim: true,        
      },
      metaKeywords: [
        {
          type: [String],
          trim: true,
          lowercase: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
