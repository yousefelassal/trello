import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LoginDocument, LoginMutation, LoginMutationVariables } from "@/generated/graphql"
import { toast } from "sonner"
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Login = ({ setToken }:{ setToken:any }) => {
    useDocumentTitle('Login | Trello 3al daya2')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const form = useForm()
    
    const [login] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
        onError(error) {
            toast.error(error.message)
        },
        onCompleted(data) {
            const token = data?.login?.value
            setToken(token)
        },
    })

    const submit = async () => {
        login({ variables: { username, password } })
    }
    
    return (
        <div className="min-h-screen w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="flex flex-col p-8 md:px-14 w-full md:w-auto bg-black/80 rounded-xl shadow-xl">
        <div className="max-w-sm w-full text-gray-600">
            <div className="text-center flex flex-col items-center">
                <Link to="/">
                    <span className="sr-only">Home</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="102.86" height="100" viewBox="0 0 264 259" fill="none">
                    <g clipPath="url(#clip0_1_2)">
                    <rect width="246" height="246" rx="35" fill="url(#paint0_linear_1_2)"/>
                    <rect x="37" y="23" width="80" height="176" rx="15" fill="#D9D9D9"/>
                    <rect x="132" y="23" width="76" height="104" rx="15" fill="#D9D9D9"/>
                    <path d="M107.722 254.187C106.501 254.937 105.383 255.506 104.37 255.895C103.197 256.342 102.046 256.442 100.917 256.197C99.7993 255.906 98.9175 255.235 98.2717 254.185C98.0622 253.844 97.9118 253.408 97.8204 252.877C97.7289 252.347 97.7379 251.852 97.8474 251.394C97.9394 250.907 98.1274 250.576 98.4113 250.401C98.6953 250.227 98.9246 250.282 99.0991 250.565C99.1864 250.707 99.2277 251.093 99.223 251.722C99.2182 252.351 99.3642 252.907 99.661 253.389C100.83 255.292 103.176 255.161 106.697 252.997C107.691 252.386 108.641 251.704 109.548 250.951C110.455 250.198 111.304 249.383 112.095 248.506C114.168 246.214 115.715 243.796 116.734 241.253C117.963 238.033 118.019 235.259 116.902 232.933L116.719 232.635C115.549 230.732 114.047 230.071 112.213 230.65C110.669 233.36 109.202 235.142 107.81 235.997C106.618 236.73 105.882 236.87 105.602 236.415C105.55 236.33 105.529 236.264 105.54 236.219C105.244 235.227 105.573 234.203 106.528 233.147C108.138 231.374 109.637 230.121 111.024 229.385C113.869 223.255 114.418 218.77 112.673 215.93C111.416 213.885 109.396 213.718 106.613 215.429C103.575 217.297 101.585 220.202 100.643 224.145C100.611 224.283 100.593 224.509 100.591 224.823C100.617 225.12 100.644 225.514 100.672 226.006C100.731 226.674 100.479 227.474 99.9172 228.406C99.856 228.561 99.7118 228.709 99.4846 228.848C98.8598 229.232 98.3991 229.183 98.1023 228.7C97.9976 228.53 97.9529 228.362 97.9683 228.196C98.461 221.868 101.079 217.246 105.821 214.331C109.74 211.922 112.529 212.067 114.187 214.765C116.054 217.804 115.69 222.527 113.095 228.935C115.379 228.704 117.15 229.612 118.406 231.656L118.642 232.04C120.47 235.65 119.954 239.841 117.095 244.611C114.68 248.638 111.556 251.83 107.722 254.187ZM130.38 239.028C128.733 240.04 127.429 239.765 126.469 238.204C125.841 237.181 125.41 235.94 125.178 234.478C124.956 232.972 124.93 231.403 125.101 229.771C125.255 228.112 125.578 226.505 126.07 224.95C126.545 223.367 127.171 221.966 127.946 220.745C128.705 219.497 129.595 218.558 130.618 217.93C132.435 216.813 133.894 217.149 134.993 218.938C135.709 220.102 135.783 220.859 135.215 221.208C134.704 221.522 134.3 221.438 134.003 220.955C133.881 220.756 133.801 220.531 133.764 220.28C133.738 219.983 133.647 219.707 133.489 219.451C133.001 218.656 132.217 218.59 131.138 219.253C129.405 220.318 128.045 222.974 127.055 227.221C126.832 228.258 126.693 229.4 126.637 230.647C126.582 231.894 126.635 233.094 126.796 234.247C126.968 235.354 127.298 236.305 127.787 237.1C128.258 237.867 128.92 237.989 129.772 237.465C130.51 237.011 131.151 236.304 131.695 235.344C132.268 234.366 132.719 233.443 133.047 232.576C133.72 230.871 134.213 228.808 134.524 226.386C134.583 226.037 134.655 225.582 134.741 225.021C134.826 224.459 134.928 223.829 135.047 223.131C135.101 222.901 135.228 222.726 135.427 222.604C135.881 222.324 136.248 222.412 136.527 222.866L136.401 226.289C136.299 228.543 136.563 230.181 137.191 231.203C137.645 231.941 138.227 232.092 138.937 231.656C139.533 231.289 140.09 230.732 140.608 229.983C141.126 229.234 141.516 228.564 141.779 227.972C142.321 226.818 142.818 225.495 143.271 224.003C143.707 222.484 144.099 220.99 144.45 219.523C144.493 219.339 144.629 219.178 144.856 219.038C145.282 218.777 145.6 218.816 145.809 219.157C146.001 219.469 146.021 219.946 145.867 220.588C145.43 222.422 145.009 224.03 144.607 225.413C144.187 226.766 143.722 227.952 143.213 228.969C142.865 229.613 142.399 230.35 141.813 231.179C141.227 232.009 140.423 232.738 139.401 233.366C138.009 234.221 136.86 233.911 135.952 232.434C135.603 231.866 135.386 231.354 135.301 230.897C134.235 234.956 132.595 237.666 130.38 239.028ZM152.98 226.135C151.674 226.938 150.421 227.16 149.222 226.801C148.035 226.397 147.031 225.527 146.21 224.192C145.617 223.227 145.072 221.958 144.575 220.385C143.757 217.718 143.125 214.429 142.677 210.518C142.371 207.537 142.176 204.546 142.092 201.546C141.991 198.517 142.044 195.452 142.251 192.351C142.564 187.385 143.203 184.606 144.169 184.012C144.794 183.628 145.211 183.607 145.42 183.948C145.717 184.43 145.664 186.126 145.26 189.035L144.504 194.488C143.84 199.2 143.687 203.695 144.048 207.973C144.436 212.234 145.18 216.277 146.278 220.101C146.599 221.195 147.012 222.154 147.518 222.978C148.845 225.136 150.388 225.674 152.149 224.592C152.774 224.208 153.299 223.631 153.725 222.86C154.169 222.118 154.419 221.729 154.476 221.694C154.817 221.485 155.136 221.621 155.432 222.104C155.694 222.53 155.739 222.953 155.566 223.372C154.95 224.533 154.088 225.454 152.98 226.135ZM186.599 209.111C186.371 209.251 186.018 209.312 185.537 209.294C185.103 209.287 184.739 209.237 184.446 209.143C183.844 208.926 183.302 208.555 182.822 208.028C182.342 207.502 181.884 206.883 181.448 206.173C181.081 205.577 180.703 204.929 180.312 204.23C179.933 203.485 179.555 202.68 179.18 201.816C178.965 203.121 178.642 204.474 178.212 205.873C177.791 207.227 177.256 208.456 176.604 209.561C175.981 210.648 175.244 211.453 174.392 211.977C172.262 213.286 170.499 212.805 169.103 210.533C167.654 208.176 167.081 205.398 167.384 202.199C167.545 200.613 167.845 199.001 168.285 197.361C168.724 195.721 169.334 194.231 170.115 192.891C170.895 191.551 171.853 190.531 172.989 189.833C173.841 189.31 174.794 189.174 175.849 189.425C175.836 189.277 175.794 189.049 175.722 188.741C175.678 188.415 175.634 187.993 175.588 187.473C175.362 185.577 175.172 183.581 175.018 181.485C174.847 179.36 174.765 177.571 174.772 176.119C174.795 174.501 175.133 173.491 175.786 173.09C176.24 172.811 176.686 173.026 177.122 173.736C177.873 174.957 178.477 178.518 178.934 184.419C178.949 184.761 178.982 185.387 179.031 186.296C179.092 187.158 179.152 188.178 179.21 189.355C179.279 190.486 179.334 191.626 179.375 192.775C179.416 193.924 179.447 194.961 179.468 195.887C179.501 196.767 179.51 197.387 179.497 197.747C179.97 199.217 180.479 200.587 181.024 201.856C181.552 203.097 182.191 204.327 182.942 205.549C183.221 206.003 183.488 206.406 183.744 206.758C184.045 207.12 184.35 207.363 184.66 207.485C184.907 207.568 185.142 207.6 185.364 207.581C185.605 207.59 185.865 207.567 186.144 207.512C186.537 207.388 186.83 207.482 187.022 207.795C187.336 208.306 187.195 208.745 186.599 209.111ZM177.657 190.075C177.601 187.566 177.497 185.263 177.343 183.166C177.172 181.042 176.905 179.112 176.544 177.378C176.315 179.553 176.324 181.7 176.57 183.818C176.815 185.936 177.178 188.022 177.657 190.075ZM173.308 210.882C174.132 210.376 174.832 209.574 175.409 208.476C175.997 207.332 176.468 206.124 176.82 204.851C177.139 203.715 177.393 202.601 177.582 201.507C177.753 200.384 177.872 199.274 177.941 198.176C177.557 197.042 177.21 195.905 176.901 194.765C176.62 193.608 176.367 192.433 176.143 191.24C175.252 190.809 174.395 190.847 173.571 191.353C172.719 191.877 171.969 192.788 171.32 194.087C170.681 195.34 170.167 196.732 169.778 198.263C169.417 199.776 169.157 201.168 168.999 202.439C168.749 205.214 169.278 207.667 170.587 209.797C171.407 211.131 172.314 211.493 173.308 210.882ZM190.407 202.134C188.76 203.146 187.457 202.871 186.497 201.309C185.868 200.287 185.438 199.045 185.205 197.584C184.983 196.077 184.958 194.508 185.129 192.877C185.283 191.218 185.606 189.611 186.098 188.056C186.573 186.473 187.198 185.072 187.974 183.851C188.732 182.603 189.623 181.664 190.645 181.036C192.463 179.919 193.921 180.255 195.021 182.044C195.736 183.208 195.81 183.965 195.242 184.314C194.731 184.628 194.327 184.544 194.03 184.061C193.908 183.862 193.829 183.637 193.792 183.386C193.766 183.089 193.674 182.813 193.517 182.557C193.028 181.762 192.244 181.696 191.165 182.359C189.433 183.424 188.072 186.08 187.083 190.327C186.859 191.364 186.72 192.506 186.665 193.753C186.609 195 186.662 196.2 186.823 197.353C186.995 198.46 187.325 199.411 187.814 200.206C188.285 200.973 188.947 201.095 189.799 200.571C190.537 200.117 191.179 199.41 191.723 198.449C192.296 197.471 192.746 196.549 193.074 195.682C193.748 193.977 194.24 191.914 194.551 189.492C194.611 189.143 194.683 188.688 194.768 188.126C194.854 187.565 194.956 186.935 195.074 186.237C195.129 186.007 195.256 185.832 195.454 185.709C195.909 185.43 196.276 185.518 196.555 185.972L196.428 189.395C196.327 191.649 196.59 193.286 197.218 194.309C197.672 195.047 198.254 195.198 198.964 194.762C199.56 194.395 200.118 193.838 200.636 193.089C201.153 192.34 201.544 191.67 201.806 191.078C202.348 189.923 202.846 188.6 203.299 187.109C203.734 185.589 204.127 184.096 204.477 182.629C204.521 182.445 204.656 182.284 204.883 182.144C205.309 181.882 205.627 181.922 205.837 182.263C206.029 182.575 206.048 183.052 205.895 183.694C205.457 185.528 205.037 187.136 204.634 188.518C204.214 189.872 203.75 191.058 203.24 192.075C202.893 192.719 202.426 193.456 201.84 194.285C201.255 195.115 200.451 195.844 199.428 196.472C198.037 197.327 196.887 197.016 195.98 195.54C195.63 194.972 195.413 194.46 195.329 194.003C194.263 198.062 192.622 200.772 190.407 202.134ZM215.727 205.411C213.995 206.476 212.5 205.986 211.244 203.941C210.179 202.209 209.518 200.306 209.262 198.234C209.201 197.88 209.298 197.624 209.554 197.467C210.065 197.153 210.46 197.223 210.739 197.678C210.809 197.791 210.854 197.959 210.873 198.182C210.939 198.416 210.999 198.673 211.053 198.952C211.186 199.614 211.379 200.278 211.632 200.944C211.885 201.61 212.212 202.27 212.613 202.923C213.067 203.661 213.472 204.097 213.828 204.231C214.184 204.364 214.518 204.335 214.83 204.143C215.569 203.689 216.225 202.816 216.8 201.523C217.404 200.213 217.791 198.488 217.963 196.349C218.084 194.827 218.111 193.088 218.044 191.134C217.978 189.179 217.837 186.977 217.622 184.527C217.353 181.288 216.959 178.068 216.438 174.866C216.287 176.211 216.09 177.545 215.847 178.869C215.603 180.192 215.269 181.493 214.842 182.773C213.724 186.238 212.384 188.45 210.822 189.41C208.948 190.562 207.348 190.059 206.021 187.901C205.55 187.134 205.125 186.124 204.745 184.87C204.395 183.599 204.061 182.102 203.746 180.379C203.691 180.099 203.62 179.888 203.533 179.746C203.428 179.576 203.366 179.379 203.347 179.157C203.19 177.883 203.262 176.313 203.562 174.446C203.632 174.051 203.753 173.801 203.923 173.696C204.349 173.435 204.754 173.616 205.138 174.241C204.879 179.995 205.614 184.278 207.342 187.089C208.075 188.282 208.91 188.59 209.847 188.014C210.898 187.368 211.915 185.745 212.899 183.145C213.606 181.302 214.134 179.393 214.485 177.417C214.818 175.412 215.011 173.435 215.064 171.485C215.113 170.164 215.104 169.035 215.037 168.098C214.981 167.115 214.917 166.47 214.845 166.162C214.725 165.649 214.793 165.314 215.048 165.157C215.588 164.825 215.997 164.886 216.277 165.341C216.416 165.568 216.556 166.049 216.695 166.785C216.845 167.476 217.009 168.314 217.185 169.301C217.446 170.745 217.753 172.708 218.105 175.191C218.458 177.675 218.824 180.658 219.204 184.141C219.674 188.469 219.796 192.17 219.572 195.242C219.431 197.559 219.01 199.676 218.31 201.593C217.639 203.492 216.778 204.765 215.727 205.411ZM227.638 179.251C225.991 180.263 224.688 179.988 223.728 178.426C223.099 177.404 222.669 176.162 222.436 174.701C222.214 173.194 222.189 171.625 222.36 169.994C222.514 168.335 222.837 166.728 223.329 165.173C223.804 163.59 224.429 162.188 225.205 160.968C225.963 159.719 226.854 158.781 227.876 158.153C229.694 157.036 231.152 157.372 232.252 159.161C232.967 160.325 233.041 161.082 232.473 161.431C231.962 161.745 231.558 161.661 231.261 161.178C231.139 160.979 231.06 160.754 231.023 160.503C230.997 160.206 230.905 159.93 230.748 159.674C230.259 158.879 229.475 158.813 228.396 159.476C226.664 160.541 225.303 163.197 224.314 167.444C224.09 168.481 223.951 169.623 223.896 170.87C223.841 172.116 223.893 173.316 224.054 174.47C224.226 175.577 224.557 176.528 225.045 177.323C225.517 178.09 226.178 178.212 227.03 177.688C227.768 177.234 228.41 176.527 228.954 175.566C229.527 174.588 229.977 173.666 230.305 172.799C230.979 171.094 231.471 169.031 231.783 166.609C231.842 166.26 231.914 165.804 232 165.243C232.085 164.682 232.187 164.052 232.305 163.353C232.36 163.124 232.487 162.948 232.685 162.826C233.14 162.547 233.507 162.635 233.786 163.089L233.66 166.512C233.558 168.765 233.821 170.403 234.45 171.426C234.903 172.164 235.485 172.315 236.195 171.879C236.792 171.512 237.349 170.955 237.867 170.206C238.385 169.457 238.775 168.787 239.037 168.195C239.579 167.04 240.077 165.717 240.53 164.226C240.965 162.706 241.358 161.213 241.708 159.746C241.752 159.562 241.887 159.401 242.115 159.261C242.541 158.999 242.858 159.039 243.068 159.38C243.26 159.692 243.279 160.169 243.126 160.811C242.688 162.645 242.268 164.253 241.865 165.635C241.445 166.989 240.981 168.174 240.471 169.192C240.124 169.836 239.657 170.573 239.071 171.402C238.486 172.232 237.682 172.961 236.659 173.589C235.268 174.444 234.118 174.133 233.211 172.657C232.862 172.089 232.645 171.577 232.56 171.12C231.494 175.179 229.854 177.889 227.638 179.251ZM260.39 159.766C257.011 161.843 252.833 163.609 247.858 165.063L247.884 165.105C246.71 167.079 245.47 168.467 244.164 169.27C243.397 169.741 242.574 169.993 241.694 170.025C240.608 170.105 239.856 169.805 239.437 169.123C239.071 168.527 239.072 167.861 239.442 167.125C239.722 166.562 240.202 166.071 240.884 165.652C241.423 165.32 243.375 164.708 246.738 163.814L246.915 163.529L247.05 163.271C253.119 151.246 256.1 141.901 255.995 135.236C255.957 132.247 255.511 130.056 254.655 128.665C253.381 126.592 251.367 126.402 248.612 128.095C246.795 129.212 245.203 130.855 243.837 133.025C242.56 135.022 241.654 137.145 241.118 139.391C241.019 139.804 240.925 140.351 240.835 141.032C240.728 141.685 240.625 142.472 240.526 143.394C240.535 143.662 240.411 143.875 240.155 144.032C239.673 144.329 239.283 144.236 238.986 143.753C238.899 143.611 238.877 143.449 238.921 143.265C239.076 140.079 239.954 136.957 241.556 133.898C243.259 130.622 245.375 128.206 247.902 126.653C249.436 125.71 250.88 125.292 252.236 125.398C253.758 125.518 254.973 126.317 255.881 127.794C256.998 129.611 257.576 132.112 257.616 135.296C257.713 142.201 254.845 151.476 249.012 163.121C253.199 161.721 256.656 160.184 259.382 158.508C264.295 155.488 266.141 153.082 264.922 151.288L264.722 151.059C264.39 150.519 264.466 150.101 264.949 149.805C265.375 149.543 265.788 149.738 266.19 150.392C267.918 153.203 265.984 156.328 260.39 159.766ZM243.215 167.916C243.953 167.463 244.663 166.772 245.345 165.844C243.583 166.223 242.488 166.544 242.062 166.805C241.296 167.277 241.043 167.725 241.305 168.151C241.584 168.606 242.221 168.527 243.215 167.916Z" fill="white"/>
                    </g>
                    <defs>
                    <linearGradient id="paint0_linear_1_2" x1="123" y1="-2.08616e-06" x2="123" y2="576" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#208AC7"/>
                    <stop offset="1" stopColor="#0078BE" stopOpacity="0"/>
                    </linearGradient>
                    <clipPath id="clip0_1_2">
                    <rect width="264" height="259" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </Link>
                <div className="mt-5 space-y-2">
                    <h3 className="text-gray-100 text-xl font-bold sm:text-3xl">Log in to your account</h3>
                    <p className="text-sm">Don&apos;t have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link></p>
                </div>
            </div>
            <Form {...form}>
                <form className="space-y-4 grid">
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input 
                                    placeholder="" {...field}
                                    className="w-full mt-2 px-3 py-2 text-gray-900 bg-white outline-none border focus:border-blue-600 shadow-sm rounded-lg focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-opacity-50 transition"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={form.watch("showPassword") ? "text" : "password"}
                                            placeholder=""
                                            {...field}
                                            className="w-full mt-2 px-3 py-2 text-gray-900 bg-white 
                                            outline-none border focus:border-blue-600 shadow-sm rounded-lg focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-opacity-50 transition"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => form.setValue("showPassword", !form.watch("showPassword"))}
                                            className="absolute inset-y-0 end-0 grid place-content-center px-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 hover:stroke-blue-400 transition-all"
                                                style={{
                                                    color: form.watch("showPassword") ? "#60a5fa" : "#9CA3AF",
                                                }}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit"
                        className="shrink-0 flex mt-4 gap-1 items-center justify-center w-full h-10 bg-gradient-to-br from-blue-400 to-blue-700 shadow-md hover:bg-gradient-to-tr px-12 py-3 text-sm font-medium text-white transition focus:border-blue-600 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-opacity-50"
                        onClick={form.handleSubmit(submit)}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? <><Loader2 className="aniamte-spin"/> Logging in...</> : "Login"}
                    </Button>
                </form>
            </Form>
        </div>
        </div>
        </div>
    )
}

export default Login