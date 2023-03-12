import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SessionProvider } from '../contexts/SessionContext'
import { PrivateOutlet, PublicOutlet } from './components/Outlet'
import { Activity } from './pages/Activity'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Meal } from './pages/Meal'

export function App(): JSX.Element | null {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicOutlet />}>
            <Route index element={<Login />} />
          </Route>

          <Route element={<PrivateOutlet />}>
            <Route path="/" element={<Home />} />
            <Route path="/meal" element={<Meal />} />
            <Route path="/activity" element={<Activity />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}
