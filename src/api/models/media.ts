import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'URL is required'],
        trim: true,
    },
    type: {
        type: String,
        required: true
    },
    meta: {
        type: Object,
        require: true,
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
mediaSchema.pre('save', function(next) {
    this.updatedAt = new Date(); // Ensure this is a Date object
    next();
});

const Media = mongoose.model('Media', mediaSchema);

export default Media;
