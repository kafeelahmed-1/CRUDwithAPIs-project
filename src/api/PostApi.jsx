import api from "./apiConfig";

// Function to fetch posts
export const getPost = () => {
  return api.get("/posts");
};

// Function to delete a post
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

// Function to add a post
export const postData = (post) => {
  return api.post("/posts", post);
};

// Function to update a post (PUT method)

export const updateData = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
