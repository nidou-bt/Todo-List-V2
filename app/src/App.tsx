import { Route, Routes } from 'react-router';
import ProtectedRoute from './router/ProtectedRoute';
import PublicRoute from './router/PublicRoute';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Error from './views/Error';
import Favorit from './views/Favorit';
import Important from './views/Important';
import Today from './views/Today';
import Todos from './views/Todos';

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Today />} />
        <Route path="/important" element={<Important />} />
        <Route path="/favorit" element={<Favorit />} />
        <Route path="/todos/:id" element={<Todos />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
