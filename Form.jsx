import React from 'react';
import { auth, db, storage } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

export default function Form({ user }) {
  const [form, setForm] = React.useState({
    proposition: '',
    topic: '',
    caseName: '',
    citation: '',
    keywords: ''
  });
  const fileInput = React.useRef();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'submissions'), {
      ...form,
      uid: user.uid,
      email: user.email,
      timestamp: Date.now()
    });
    const file = fileInput.current.files[0];
    if (file) {
      const storageRef = ref(storage, `${docRef.id}/${file.name}`);
      await uploadBytes(storageRef, file);
    }
    alert('Submitted!');
  };

  return (
    <div>
      <button onClick={() => auth.signOut()}>Logout</button>
      <form onSubmit={handleSubmit}>
        <textarea name="proposition" placeholder="Proposition of Law" value={form.proposition} onChange={handleChange} required/>
        <input name="topic" placeholder="Topic" value={form.topic} onChange={handleChange} required/>
        <input name="caseName" placeholder="Case Name" value={form.caseName} onChange={handleChange} required/>
        <input name="citation" placeholder="Case Citation" value={form.citation} onChange={handleChange} required/>
        <input name="keywords" placeholder="Key Words" value={form.keywords} onChange={handleChange}/>
        <input type="file" ref={fileInput} accept=".pdf,.docx,.txt"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
