import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getRandomPhoto(){
  const photo = await fetch(`https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_ACCESS_KEY}`)
  .then((data) => data.json())
  .then((json) => {
      return json.urls.regular
  })

  return photo
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCache = (cache:any, query:any, added:any) => {
  // helper that is used to eliminate saving same person twice
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniqByName = (a:any) => {
    const seen = new Set()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return a.filter((item:any) => {
      const k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache.updateQuery(query, ({ all }:any) => {
    return {
      allPersons: uniqByName(all.concat(added)),
    }
  })
}