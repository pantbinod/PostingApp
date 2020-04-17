import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Register from './user/Register'
import User from './user/Users'
import Login from './user/Login'
import Posts from "./post/Posts";
import UserProfile from "./user/UserProfile";
import ErrorPage from "./premitive/ErrorPage";

export const Routes: React.FC = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/users" component={User} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/user/profile" component={UserProfile} />
                <Route exact path="/error/:networkError/:apiError" component={ErrorPage} />
            </Switch>
        </>
    )
}