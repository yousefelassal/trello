// import useSWR from 'swr' 
import { useState, useEffect } from 'react'

const dataIfError = [
    {
        "id": "0z-sWoAqs0c",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=85",
            "regular": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=1080",
            "small": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=400",
            "thumb": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=200",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1704500355467-88351c0797c3"
        },
    },
    {
        "id": "01jCnEZBPIc",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1703795801713-09cbfb047cf5?ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1703795801713-09cbfb047cf5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=85",
            "regular": "https://images.unsplash.com/photo-1703795801713-09cbfb047cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=1080",
            "small": "https://images.unsplash.com/photo-1703795801713-09cbfb047cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=400",
            "thumb": "https://images.unsplash.com/photo-1703795801713-09cbfb047cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=200",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1703795801713-09cbfb047cf5"
        }
    },
    {
        "id": "IOmZdSe8FUs",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1703797967065-539818bc9770?ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1703797967065-539818bc9770?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=85",
            "regular": "https://images.unsplash.com/photo-1703797967065-539818bc9770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=1080",
            "small": "https://images.unsplash.com/photo-1703797967065-539818bc9770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=400",
            "thumb": "https://images.unsplash.com/photo-1703797967065-539818bc9770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=200",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1703797967065-539818bc9770"
        }
    },
    {
        "id": "1SWSykZCB-0",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1704137825357-5d23b837f40f?ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1704137825357-5d23b837f40f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=85",
            "regular": "https://images.unsplash.com/photo-1704137825357-5d23b837f40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=1080",
            "small": "https://images.unsplash.com/photo-1704137825357-5d23b837f40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=400",
            "thumb": "https://images.unsplash.com/photo-1704137825357-5d23b837f40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4ODYwOTJ8&ixlib=rb-4.0.3&q=80&w=200",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1704137825357-5d23b837f40f"
        }
    }
]

const useRandomPhotos = () => {
    const [data, setData] = useState<any>([])// eslint-disable-line
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedBg, setSelectedBg] = useState('')

    const handleBgChange = (bg: string) => {
        setSelectedBg(bg)
    }

    useEffect(() => {
        setIsLoading(true)
        setData([])
        fetch(`https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_ACCESS_KEY}&count=4&topics=minimalism,wallpapers,nature,textures-patterns`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setSelectedBg(data[0].urls.regular)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
                setData(dataIfError)
            })
    }, [])

    return {
        photos: data.map((photo:any) => photo.urls.regular), // eslint-disable-line
        error,
        isLoading,
        selectedBg,
        handleBgChange
    }
}

export default useRandomPhotos