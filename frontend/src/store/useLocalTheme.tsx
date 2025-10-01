/* eslint-disable*/
'use client'

import { useState, useEffect } from "react"

function useLocalTheme() {

    const [themeSave, setThemeSave] = useState<null | string>(null)
    // const [theme, setTheme] = useState<null|string>(null)

    useEffect(() => {
        const currTheme = localStorage.getItem('savedTheme')
        if (currTheme) {
            setThemeSave(currTheme)
        } else {
            localStorage.setItem('savedTheme', 'light')
            setThemeSave('light')
        }

    }, [])


    return themeSave
}