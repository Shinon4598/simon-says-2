import React, { useEffect } from 'react'

const ThemeOption = ({theme}) => {
  
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme) {
      document.querySelector('body').setAttribute('data-theme', currentTheme)
    }
  }, [])

  const setTheme = () => {
    document.querySelector('body').setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }
  return (
    <div onClick={setTheme} className='theme-option' id={`theme-${theme}`}></div>
  )
}

export default ThemeOption