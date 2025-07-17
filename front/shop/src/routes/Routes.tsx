import { Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import OglasPrikaz from '../pages/Oglas/OglasPrikaz';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OglasForm from '../components/ui/OglasForm/OglasForm';
import Homepage from '../pages/Homepage/Homepage';
import AuthPage from '../pages/AuthPage/AuthPage';
import Layout from '../components/shared/Layout/Layout';
import Login from '../components/ui/Login/Login';
import Register from '../components/ui/Login/Register';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="auth" element={<AuthPage />}>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="oglas/form" element={<OglasForm />} />
                <Route path="oglas/form/:oglasId" element={<OglasForm />} />
                <Route path="oglas/:oglasId" element={<OglasPrikazWrapper />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

const OglasPrikazWrapper = () => {
    const { oglasId } = useParams<{ oglasId: string }>();
    return oglasId ? <OglasPrikaz oglasId={parseInt(oglasId)} /> : <div>Neispravan ID oglasa</div>;
};
