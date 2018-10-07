import React, { Component } from 'react';
import FbImageLibrary from './react-fb-image-grid';
import FacebookEmoji from 'react-facebook-emoji';

import './FBPost.css';

import defaultAvtar from './imgs/default-avatar.jpg';
import privacyPublic from './imgs/privacy-public.PNG';
import privacyFriends from './imgs/privacy-friends.PNG';
import LikeBtn from './imgs/like-btn.PNG';
import CommentBtn from './imgs/comment-btn.PNG';
import ShareBtn from './imgs/share-btn.PNG';
import Liked from './imgs/liked.PNG';
import Loved from './imgs/loved.PNG';
import Hahaed from './imgs/hahaed.PNG';
import Wowed from './imgs/wowed.PNG';
import Saded from './imgs/saded.PNG';
import Angred from './imgs/angred.PNG';

let LikeBtnImg = LikeBtn;

class FBPost extends Component {
  static defaultProps = {
    avtar: false,
    name: 'Your Name',
    time: 'Just Now',
    privacy: 'public',
    caption: 'Some Awesome Caption',
    images: [],
    likes: 0,
    includeLike: false,
    includeLove: false,
    includeHaha: false,
    includeWow: false,
    includeSad: false,
    includeAngry: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      emojiesShown: false,
      emoji: null,
      iLiked: false,
      iLoved: false,
      iHahaed: false,
      iWowed: false,
      iSaded: false,
      iAngred: false,
    };
  }

  showEmojies = isTrue => {
    this.setState({ emojiesShown: isTrue });
  };

  setEmoji = (newEmoji, fromBtn) => {
    const { emoji } = this.state;

    if (emoji && emoji !== 'like' && fromBtn) {
      this.setState({ emoji: null }, this.setEmojiImg(null));
      return;
    }

    if (!emoji || emoji !== newEmoji)
      this.setState({ emoji: newEmoji }, this.setEmojiImg(newEmoji));

    if (emoji === newEmoji)
      this.setState({ emoji: null }, this.setEmojiImg(null));

    this.showEmojies(false);
  };

  setEmojiImg = emoji => {
    let { iLiked, iLoved, iHahaed, iWowed, iSaded, iAngred } = this.state;

    switch (emoji) {
      case 'like':
        LikeBtnImg = Liked;
        this.setState({
          iLiked: !iLiked,
          iLoved: false,
          iHahaed: false,
          iWowed: false,
          iSaded: false,
          iAngred: false,
        });
        break;

      case 'love':
        LikeBtnImg = Loved;
        this.setState({
          iLiked: false,
          iLoved: !iLoved,
          iHahaed: false,
          iWowed: false,
          iSaded: false,
          iAngred: false,
        });
        break;

      case 'haha':
        LikeBtnImg = Hahaed;
        this.setState({
          iLiked: false,
          iLoved: false,
          iHahaed: !iHahaed,
          iWowed: false,
          iSaded: false,
          iAngred: false,
        });
        break;

      case 'wow':
        LikeBtnImg = Wowed;
        this.setState({
          iLiked: false,
          iLoved: false,
          iHahaed: false,
          iWowed: !iWowed,
          iSaded: false,
          iAngred: false,
        });
        break;

      case 'sad':
        LikeBtnImg = Saded;
        this.setState({
          iLiked: false,
          iLoved: false,
          iHahaed: false,
          iWowed: false,
          iSaded: !iSaded,
          iAngred: false,
        });
        break;

      case 'angry':
        LikeBtnImg = Angred;
        this.setState({
          iLiked: false,
          iLoved: false,
          iHahaed: false,
          iWowed: false,
          iSaded: false,
          iAngred: !iAngred,
        });
        break;

      default:
        LikeBtnImg = LikeBtn;
        this.setState({
          iLiked: false,
          iLoved: false,
          iHahaed: false,
          iWowed: false,
          iSaded: false,
          iAngred: false,
        });
        break;
    }
  };

  render() {
    const {
      emojiesShown,
      emoji,
      iLiked,
      iLoved,
      iHahaed,
      iWowed,
      iSaded,
      iAngred,
    } = this.state;
    const {
      avtar,
      name,
      time,
      privacy,
      caption,
      images,
      likes,
      includeLike,
      includeLove,
      includeHaha,
      includeWow,
      includeSad,
      includeAngry,
    } = this.props;

    return (
      <div className="post">
        <div className="head">
          <div className="avatar">
            <img src={avtar ? avtar : defaultAvtar} alt="Img" />
          </div>

          <span className="name">{name}</span>

          <div className="time">
            {time} &nbsp;-&nbsp;
            <span className="privacy">
              <img
                src={privacy === 'friends' ? privacyFriends : privacyPublic}
                alt="."
              />
            </span>
          </div>

          <div className="dots">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="caption">{caption}</div>
        <div
          className="images"
          style={images.length > 0 ? { height: 400 } : { height: 0 }}
        >
          <FbImageLibrary beautify images={images} />
        </div>

        <div className="likesCount">
          <div className="likes">
            {(includeLike || iLiked || likes > 0) && (
              <img src={Liked} alt="." />
            )}
            {(includeLove || iLoved) && <img src={Loved} alt="." />}
            {(includeHaha || iHahaed) && <img src={Hahaed} alt="." />}
            {(includeWow || iWowed) && <img src={Wowed} alt="." />}
            {(includeSad || iSaded) && <img src={Saded} alt="." />}
            {(includeAngry || iAngred) && <img src={Angred} alt="." />}
            {emoji && ' You'} {emoji && likes > 0 && ' & '}
            {likes > 0 && likes} {emoji && likes > 0 && ' Others'}
          </div>
        </div>

        <div className="btns">
          <div
            className="likeBtn"
            onMouseEnter={() => this.showEmojies(true)}
            onMouseLeave={() => this.showEmojies(false)}
          >
            {emojiesShown && (
              <div className="emojies">
                <div className="emoji" onClick={() => this.setEmoji('like')}>
                  <FacebookEmoji type="like" size="sm" />
                </div>
                <div className="emoji" onClick={() => this.setEmoji('love')}>
                  <FacebookEmoji type="love" size="sm" />
                </div>
                <div className="emoji" onClick={() => this.setEmoji('haha')}>
                  <FacebookEmoji type="haha" size="sm" />
                </div>
                <div className="emoji" onClick={() => this.setEmoji('wow')}>
                  <FacebookEmoji type="wow" size="sm" />
                </div>
                <div className="emoji" onClick={() => this.setEmoji('sad')}>
                  <FacebookEmoji type="sad" size="sm" />
                </div>
                <div className="emoji" onClick={() => this.setEmoji('angry')}>
                  <FacebookEmoji type="angry" size="sm" />
                </div>
              </div>
            )}
            <img
              onClick={() => this.setEmoji('like', true)}
              src={LikeBtnImg}
              alt="Like"
            />
          </div>
          <div className="commentBtn">
            <img src={CommentBtn} alt="Comment" />
          </div>
          <div className="shareBtn">
            <img src={ShareBtn} alt="Share" />
          </div>
        </div>
      </div>
    );
  }
}

export default FBPost;
