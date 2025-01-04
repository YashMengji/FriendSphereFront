import React from 'react'

function IconBtn({Icon, color, isActive, children, ...props}) {
  return (
    <button 
      className={`btn icon-btn ${isActive ? "icon-btn-active" : ""} ${color || ""}`}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""}`} >
        <Icon />
      </span>
      <div className="div-like-count" style={{color: "white"}}>
        {children}
      </div>
    </button>
  )
}

export default IconBtn