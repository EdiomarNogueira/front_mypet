import { Routes, Route, useRoutes } from 'react-router-dom';
import { Loading } from '../pages/Loading/Loading';

import { Home } from '../pages/Home/Home';
import { MyPets } from '../pages/MyPets/MyPets';
import { MyPet } from '../pages/MyPet/MyPet';
import { NotFound } from '../pages/NoteFound/NoteFound';
import { RequireAuth } from '../contexts/Auth/requireAuth';
import { Login } from '../pages/Login';
import { UserRegister } from '../pages/UserRegister';
import { User } from '../pages/User/User';
import { MyPetsAdd } from '../pages/MyPetsAdd/MyPetsAdd';

export const MainRoutes = () => {
  //ROTAS ATRAVÉS DE OBJETOS (useRoutes)
  return useRoutes([
    { path: '/', element: <Loading /> },
    { path: '/user', element: <RequireAuth><User /></RequireAuth> },
    { path: '/Home', element: <RequireAuth><Home /></RequireAuth> },
    { path: '/auth/login', element: <Login /> },
    { path: '/auth/user_register', element: <UserRegister /> },
    { path: '/user/:user/mypets', element: <RequireAuth><MyPets /></RequireAuth> },
    { path: '/user/:user/add/mypet', element: <RequireAuth><MyPetsAdd /></RequireAuth> },
    { path: '/user/:user/mypet/:slug', element: <RequireAuth><MyPet /></RequireAuth> },
    { path: '*', element: <NotFound /> }
  ]

    // <Routes>
    //   <Route path='/' element={<Home />} />
    //   <Route path='/user/:id/mypets' element={<RequireAuth><MyPets /></RequireAuth>} />
    //   <Route path='/user/:id/mypet/:slug' element={<MyPet />} />

    //   <Route path='*' element={<NotFound />} />

    // </Routes>
  );
}