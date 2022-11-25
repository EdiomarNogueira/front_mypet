import { Routes, Route, useRoutes } from 'react-router-dom';
import { Loading } from '../pages/Loading/Loading';

import { Home } from '../pages/Home/Home';
import { MyPets } from '../pages/MyPets/MyPets';
import { MyPet } from '../pages/MyPet/MyPet';
import { NotFound } from '../pages/NoteFound/NoteFound';
import { RequireAuth } from '../contexts/Auth/requireAuth';
import { Login } from '../pages/Login';
import { User } from '../pages/User/User';
import { MyPetsAdd } from '../pages/MyPetsAdd/MyPetsAdd';
import { Perfil } from '../pages/Perfil/Perfil';
import { Gallery } from '../pages/GaleryPhotos/GaleryPhotos';
import { UserRegister } from '../pages/UserRegister';
import { ConnectionsUser } from '../pages/ConnectionsUser/ConnectionsUser';

export const MainRoutes = () => {
  //ROTAS ATRAVÉS DE OBJETOS (useRoutes)
  return useRoutes([
    { path: '/', element: <RequireAuth><Loading /></RequireAuth> },
    { path: '/home', element: <RequireAuth><Home /></RequireAuth> },

    { path: '/auth/login', element: <Login /> },

    // { path: '/user', element: <RequireAuth><Perfil /></RequireAuth> },
    { path: '/user/:id_user', element: <RequireAuth><Perfil /></RequireAuth> },
    { path: '/user/:id_user/gallery', element: <RequireAuth><Gallery /></RequireAuth> },
    { path: '/user/:id_user/connections', element: <RequireAuth><ConnectionsUser /></RequireAuth> },
    { path: '/user/config', element: <RequireAuth><User /></RequireAuth> },
    { path: '/auth/user_register', element: <UserRegister /> },
    { path: '/user/:id_user/mypets', element: <RequireAuth><MyPets /></RequireAuth> },
    { path: '/user/:id_user/add/mypet', element: <RequireAuth><MyPetsAdd /></RequireAuth> },
    { path: '/user/:id_user/mypet/:slug', element: <RequireAuth><MyPet /></RequireAuth> },
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