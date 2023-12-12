function createInterval(callback: any, delay: number) {
  const intervalId = setInterval(callback, delay)

  return () => clearInterval(intervalId)
}

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}


export { 
  createInterval, 
  delay 
}
