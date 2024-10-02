# Blogging Platform API

This project is one of the beginners' backend projects in [roadmap.sh](https://roadmap.sh).

See also the [**project description**](https://roadmap.sh/projects/blogging-platform-api)).

## Getting Started

Make sure you have [node](https://nodejs.org/download) installed.

Create a MongoDB cluster. Create a `.env` file.

```sh
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.z4femdq.mongodb.net/platform-blog?retryWrites=true&w=majority&appName=Cluster0
```

### Create Blog Post

Create a new blog post using the `POST` method

```plaintext
POST /posts
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

**Note:** Category must be one of the predefined options - technology, health, lifestyle, education or food.


### Update Blog Post

Update an existing blog post using the `PUT` method

```plaintext
PUT /posts/1
{
  "title": "My Updated Blog Post",
  "content": "This is the updated content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

### Delete Blog Post

Delete an existing blog post using the `DELETE` method

```plaintext
DELETE /posts/1
```

### Get Blog Post

Get a single blog post using the `GET` method

```plaintext
GET /posts/1
```

### Get All Blog Posts

Get all blog posts using the `GET` method

```plaintext
GET /posts
```

While retrieving posts, user can also filter posts by a search term. For example:

```plaintext
GET /posts?term=tech
```
