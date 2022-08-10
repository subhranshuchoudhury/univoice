import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';

function App() {
    // call refresh endpoint
    const { loading } = useLoadingWithRefresh();

    return loading ? (
        <Loader message="Loading, please wait.." />
    ) : (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <GuestRoute path="/univoice" exact>
                    <Home />
                </GuestRoute>
                <GuestRoute path="/univoice/authenticate">
                    <Authenticate />
                </GuestRoute>
                <SemiProtectedRoute path="/univoice/activate">
                    <Activate />
                </SemiProtectedRoute>
                <ProtectedRoute path="/univoice/rooms">
                    <Rooms />
                </ProtectedRoute>
                <ProtectedRoute path="/univoice/room/:id">
                    <Room />
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}

const GuestRoute = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/univoice/rooms',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

const SemiProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/univoice',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user.activated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/univoice/rooms',
                            state: { from: location },
                        }}
                    />
                );
            }}
        ></Route>
    );
};

const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/univoice',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user.activated ? (
                    <Redirect
                        to={{
                            pathname: '/univoice/activate',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

export default App;
