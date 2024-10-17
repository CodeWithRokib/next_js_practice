// src/pages/api/posts/index.js
import dbConnect from '../../../lib/db';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const posts = await Post.find({});
      res.status(200).json(posts);
      break;

    case 'POST':
      const post = new Post(req.body);
      await post.save();
      res.status(201).json(post);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
