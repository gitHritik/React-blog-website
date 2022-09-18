import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ posts }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      <img className="postImg" src={PF + posts.photo} alt="" />
      <div className="postInfo">
        <div className="postCats">
          {posts.categories.map((cat) => (
            <span className="postCat">
              <Link className="link" to="/posts?cat=Music">
                {cat.name}
              </Link>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${posts._id}`} className="link">
            {posts.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(posts.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{posts.desc}</p>
    </div>
  );
}
