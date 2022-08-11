import mongoose from "mongoose";
const {Schema} = mongoose;

const ArticleSchema = new mongoose.Schema({
    title: String,
    body: String,
    tag: [String],
    authorId: {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.model('Article', ArticleSchema)