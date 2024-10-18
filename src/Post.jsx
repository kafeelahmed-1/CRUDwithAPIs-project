import { useEffect, useState } from "react";
import { getPost, deletePost } from "./api/PostApi";
import { Form } from "./Form";

export default function Posts() {
    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});

    const getPostData = async () => {
        try {
            const res = await getPost();
            console.log(res.data); 
            setData(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getPostData();
    }, []);

    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id);
            console.log(res);
            if (res.status === 200) {
                const newUpdatedPosts = data.filter((curPost) => curPost.id !== id);
                setData(newUpdatedPosts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdatePost = (curElem) => {
        setUpdateDataApi(curElem); // Set state with the selected post data
    };

    return (
        <>
            <section className="section-form">
                <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />
            </section>
            <section className="section-post">
                <ol>
                    {data.map((curElem) => {
                        const { id, body, title } = curElem;
                        return (
                            <li key={id}>
                                <p>Title: {title}</p>
                                <p>Body: {body}</p>
                                <button className="edit-tn" onClick={() => handleUpdatePost(curElem)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDeletePost(id)}>Delete</button>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </>
    );
}
