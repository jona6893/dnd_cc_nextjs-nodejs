

function Hover({children}) {
  return (
    <div className="absolute w-full bottom-full h-28 bg-overlay/50 drop-shadow-md">
        {children}
    </div>
  )
}

export default Hover