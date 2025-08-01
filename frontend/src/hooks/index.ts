import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    author: {
        name: string
    },
    title: string,
    content: string,
    publishedDate: string,
    id: number
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization : localStorage.getItem("token")
            }
        })
            .then((res) => {
                setBlogs(res.data.post)
                setLoading(false)
            })
    }, [])
    return {
        loading,
        blogs
    }
}

export const useBlog = ({id} : {id: string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization : localStorage.getItem("token")
            }
        })
            .then((res) => {
                setBlog(res.data.post)
                setLoading(false)
            })
    }, [])
    return {
        loading,
        blog
    }
}