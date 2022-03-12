import React, { useEffect } from 'react'

export default (props) => {
  useEffect(() => {
    props.onExited && props.onExited();
  }, [])

  return <div>
    {props.in ? props.children : null}
  </div>
}