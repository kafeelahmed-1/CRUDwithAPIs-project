import { useEffect, useState } from "react";
import { postData, updateData } from "./api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({ title: "", body: "" });

  const isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    if (!isEmpty) {
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    }
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const addPostData = async () => {
    try {
      const res = await postData(addData);
      if (res.status === 201) {
        setData([...data, res.data]);
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePostData = async () => {
    try {
      // Check if updateDataApi.id and addData are correct before making the request
      console.log("Updating post with ID:", updateDataApi.id);
      console.log("Data being sent:", addData);

      const res = await updateData(updateDataApi.id, addData);

      if (res.status === 200) {
        // Log the response to verify the data returned
        console.log("Update response:", res.data);

        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === updateDataApi.id ? res.data : curElem
          )
        );
        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      } else {
        console.error("Failed to update post. Status:", res.status);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;

    if (action === "Add") {
      await addPostData();
    } else if (action === "Edit") {
      await updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};
