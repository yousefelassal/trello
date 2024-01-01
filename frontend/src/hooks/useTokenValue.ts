import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const tokenValue = atomWithStorage<string | null>('trello-3al-daya2-token', null)

export const useTokenValue = () => {
  const [token, setToken] = useAtom(tokenValue)

  return {
    token,
    setToken
  }
}