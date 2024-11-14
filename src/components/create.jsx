import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase";

export default function Create() {
  const values = {
    fieldName: "",
  };
  const [formData, setFormData] = useState(values);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);

      await addDoc(collection(db, "fields"), formData);

      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <p className="font-bold">Create</p>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="fieldName"
          placeholder="field name"
          value={formData.fieldName}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
