import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAPI, delItem } from '../Redux/actions/ItemAction';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText'; 
import IconButton from '@material-ui/core/IconButton';
import ModalsPopover from './ModalsPopover'

const theme = {
  spacing: [0, 2, 3, 5, 8],
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ShopingList = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAPI())
  }, [])

  const ListItems = useSelector(state => state.Items.ListItems)
  const isloading = useSelector(state => state.Items.isloading)
  const isAuthenticated = useSelector(state => state.Auths.isAuthenticated)

  const delHandler = (id) => {
    dispatch(delItem(id))
  }

  const listofItems = ListItems.length > 0 ?
    (<>
      {ListItems.map(item => {
        return (
          <ListItem key={item._id}>
            <ListItemText>{item.name}</ListItemText>
            <ListItemSecondaryAction onClick={(e) => { delHandler(item._id) }}>
              { isAuthenticated ?  
                <IconButton edge="end" aria-label="comments">
                  <DeleteIcon color="action"  />
                </IconButton>
                : null
              }
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </>) :
    (
      isloading ? (<p>LOading...</p>) : (<p>List is empty</p>)
    )

  return (
    <>
      <ModalsPopover />
      <div className={classes.root}>
        <Box mx="auto" m={2}>
          <List className={classes.root}>
            {listofItems}
          </List>
        </Box>
      </div>
    </>
  );
}

export default ShopingList
