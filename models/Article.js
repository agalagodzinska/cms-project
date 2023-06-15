import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    imageUrl: { type: String },
    url: { type: String, required: true, unique: true },
    title: { type: String, },
    description: { type: String,},
    datePublished: { type: String,  },
    provider: { type: String, },
    category: { type: String, },
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model('Article', articleSchema);
export default Article;
