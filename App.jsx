npm install
  import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Form from './Form';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState(undefined);
  React.useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);
  if (user === undefined) return <div>Loading...</div>;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <Form user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
