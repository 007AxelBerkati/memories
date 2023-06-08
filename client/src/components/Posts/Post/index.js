import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Modal,
  Box,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../reduxx/actions/posts';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post?.likes);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('profile'));

  const userId = user?.dataLogin.sub || user?.dataLogin?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (post?.dataLogin?.sub || post?.dataLogin?._id)
      ) ? (
        <>
          <ThumbUpAltIcon style={{ color: '#2A86FF' }} fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" style={{ color: '#2A86FF' }} />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = (e) => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography
            variant="h6"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 150,
            }}
          >
            {post.name}
          </Typography>
          <Typography variant="body2" style={{ color: '#8D8E92' }}>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.dataLogin?.sub === post?.creator ||
          user?.dataLogin?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ color: 'white' }}
          >
            {post.message.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.dataLogin}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.dataLogin?.sub === post?.creator ||
          user?.dataLogin?._id === post?.creator) && (
          <>
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                setOpen(true);
              }}
            >
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh',
                }}
              >
                <Box
                  sx={{
                    width: 400,
                    backgroundColor: '#1E1F23',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: 30,
                  }}
                >
                  <h2 id="parent-modal-title" style={{ color: 'white' }}>
                    Are You Sure You Want To Delete This Memory?
                  </h2>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        dispatch(deletePost(post._id));
                      }}
                    >
                      yes
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpen(false)}
                    >
                      No
                    </Button>
                  </div>
                </Box>
              </Box>
            </Modal>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
