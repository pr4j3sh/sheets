import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

export default function Read() {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    async function getFields() {
      const res = await getDocs(collection(db, "fields"));
      const data = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFields(data);
    }

    getFields();
  }, []);

  const values = {
    fieldName: "",
  };
  const [formData, setFormData] = useState(values);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);

      // await addDoc(collection(db, "fields"), formData);

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
      <p className="font-bold">Read</p>

      <form onSubmit={handleSubmit} method="post">
        {fields.length > 0 ? (
          fields.map((field) => (
            <input
              key={field.id}
              type="text"
              name={field?.fieldName}
              placeholder={field?.fieldName}
              value={field?.fieldName}
              onChange={handleChange}
            />
          ))
        ) : (
          <p>No data</p>
        )}
      </form>
    </>
  );
}
