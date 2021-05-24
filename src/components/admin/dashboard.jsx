import React from 'react'
import { Route } from 'react-router-dom';
import SideBar from './sidebar';
import Users from './users';
const Dashboard = () => {
    return (
        <>
            <SideBar />
            <Route to="/admin/users" component={Users} />
        </>
    )
}

export default Dashboard;
