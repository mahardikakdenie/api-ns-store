import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long'],
        maxlength: [50, 'Product name cannot exceed 50 characters']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    mediaId: {
        type: mongoose.Types.ObjectId,
        ref: 'Media', 
    default: null
    },
    category: {
        type: String,
        enum: ['Electronics', 'Books', 'Clothing', 'Accessories', 'Other'],
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Use Date instead of Number
    },
    updatedAt: {
        type: Date,
        default: Date.now // Use Date instead of Number
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt with type Date
});

// Automatically update the updatedAt field before each save
productSchema.pre('save', function(next) {
    this.updatedAt = new Date(); // Ensure this is a Date object
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
