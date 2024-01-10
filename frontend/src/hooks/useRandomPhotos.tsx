// import useSWR from 'swr' 
import { useState, useEffect } from 'react'

const useRandomPhotos = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_ACCESS_KEY}&count=4&topics=minimalism,wallpapers,nature,textures-patterns`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
            })
    }, [])

    return {
        photos: data.map((photo:any) => photo.urls.regular), // eslint-disable-line
        error,
        isLoading
    }
}

export default useRandomPhotos