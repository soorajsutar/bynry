import { Button } from '@mui/material'
import React, { useState } from 'react'
import Form from './Form';

const Addbutton = () => {
  const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
      }
    
      const handleClose = () => {
        setOpen(false);
      }
  return (
    <>
       <Button variant="contained" onClick={handleOpen}> ADD</Button>
       <Form open={open} handleClose={handleClose}/>
    </>
  )
}

export default Addbutton;
