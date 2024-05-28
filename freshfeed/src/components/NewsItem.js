import React, { Component } from "react";
import PropTypes from "prop-types";

export class NewsItem extends Component {
  //
  render() {
    //let {title, description, imageUrl, NewsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ marginLeft: "50px" }}>
          <div>
            <span
              className="badge rounded-pill bg-danger"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
              }}
            >
              {this.props.source}
            </span>
          </div>
          <img
            src={
              this.props.imageUrl == null
                ? "https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"
                : this.props.imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.title}...</h5>
            <p className="card-text">{this.props.description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {this.props.author == null ? "unknown" : this.props.author}{" "}
                on {new Date(this.props.date).toGMTString()}
              </small>
            </p>
            <a href={this.props.NewsUrl} className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
