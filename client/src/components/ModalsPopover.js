import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { postItem } from '../Redux/actions/ItemAction';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SimpleModal = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const isAuthenticated = useSelector(state => state.Auths.isAuthenticated)
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const [name, setName] = useState({
    name: ''
  })

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(postItem(name))
    setName({ name: '' })
    setOpen(false);
  }

  const changeHandler = (e) => {
    setName({
      [e.target.name]: e.target.value
    })
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Enter Item" name="name" value={name.name} onChange={changeHandler} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );

  return (
    <div>
      {
        isAuthenticated ? 
        <button type="button" onClick={handleOpen}>
          Add Items
        </button>
        : null
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default SimpleModal
