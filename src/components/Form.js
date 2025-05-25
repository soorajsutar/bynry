import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import RegForm from './RegForm'

const Form = ({open, handleClose}) => {
  return (
    <Dialog open={open} onClose={handleClose}> 
    <DialogTitle textAlign={'center'}>Employee Form</DialogTitle>
    <DialogContent>
        <RegForm handleClose={handleClose}/>
    </DialogContent>
    </Dialog>
  )
}

export default Form
