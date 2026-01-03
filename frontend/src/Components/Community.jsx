import React, { useState } from "react";
import "./Community.css";

function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alice",
      topic: "Trips",
      content: "Just completed a trip to Paris! Eiffel Tower was amazing 😍",
      likes: 5,
      comments: ["So jealous!", "Beautiful photos!"],
    },
    {
      id: 2,
      user: "Bob",
      topic: "Activities",
      content: "Tried cycling in the Alps, super fun but exhausting 🚴‍♂️",
      likes: 8,
      comments: ["Wow!", "Adding this to my bucket list!"],
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [newTopic, setNewTopic] = useState("Trips");

  const addPost = () => {
    if (!newPost) return;
    const post = {
      id: posts.length + 1,
      user: "You",
      topic: newTopic,
      content: newPost,
      likes: 0,
      comments: [],
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const likePost = (id) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(updated);
  };

  const addComment = (id, comment) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, comments: [...p.comments, comment] } : p
    );
    setPosts(updated);
  };

  return (
    <div className="community-container">
      <h2 className="page-title">Community</h2>

      {/* New Post Section */}
      <div className="new-post-card">
        <select value={newTopic} onChange={(e) => setNewTopic(e.target.value)}>
          <option value="Trips">Trips</option>
          <option value="Activities">Activities</option>
          <option value="Tips">Tips</option>
        </select>

        <textarea
          placeholder="Share your experience..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />

        <button onClick={addPost}>Post</button>
      </div>

      {/* Feed Section */}
      <div className="posts-feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-user">{post.user}</span>
              <span className="post-topic">{post.topic}</span>
            </div>
            <p className="post-content">{post.content}</p>

            <div className="post-actions">
              <button onClick={() => likePost(post.id)}>👍 {post.likes}</button>
              <button
                onClick={() => {
                  const comment = prompt("Enter your comment:");
                  if (comment) addComment(post.id, comment);
                }}
              >
                💬 {post.comments.length}
              </button>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="comments-section">
                {post.comments.map((c, idx) => (
                  <div key={idx} className="comment">
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
