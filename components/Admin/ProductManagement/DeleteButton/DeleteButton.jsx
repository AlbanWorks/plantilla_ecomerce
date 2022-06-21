import{React, useState, useEffect}from 'react'
import classes from './DeleteButton.module.css'

const DeleteButton = ({alCambiar}) => {
	const [deleteState, setDelete] = useState(false)

	useEffect(() => {
		alCambiar(deleteState)
	}, [deleteState])

  return (
	<div className={classes.Button} onClick={()=>(setDelete(!deleteState))}>
		<i className={"fa-solid fa-circle-xmark"}></i>
	</div>
  )
}

export default DeleteButton