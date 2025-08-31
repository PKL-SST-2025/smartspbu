import { Router, Route, Navigate } from '@solidjs/router';
import MainLayout from './ui/layout/MainLayout';
import { lazy, createSignal, createEffect } from 'solid-js';

const Dashboard = lazy(() => import('./ui/pages/Dashboard'));
const Sites = lazy(() => import('./ui/pages/Sites'));
const Alerts = lazy(() => import('./ui/pages/Alerts'));
const Users = lazy(() => import('./ui/pages/Users'));
const Profil = lazy(() => import('./ui/pages/Profil'));
const Login = lazy(() => import('./ui/pages/Login'));
const Register = lazy(() => import('./ui/pages/Register'));

// Auth check function
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Protected Route Component
function ProtectedRoute(props: { children: any }) {
  if (!isAuthenticated()) {
    return <Navigate href="/login" />;
  }
  return props.children;
}

export default function AppRouter() {
	return (
		<Router>
			{/* Public Routes */}
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			
			{/* Protected Routes */}
			<Route path="/" component={() => (
				<ProtectedRoute>
					<Navigate href="/dashboard" />
				</ProtectedRoute>
			)} />
			
			<Route path="/dashboard" component={() => (
				<ProtectedRoute>
					<MainLayout>
						<Dashboard />
					</MainLayout>
				</ProtectedRoute>
			)} />
			
			<Route path="/sites" component={() => (
				<ProtectedRoute>
					<MainLayout>
						<Sites />
					</MainLayout>
				</ProtectedRoute>
			)} />
			
			<Route path="/alerts" component={() => (
				<ProtectedRoute>
					<MainLayout>
						<Alerts />
					</MainLayout>
				</ProtectedRoute>
			)} />
			
			<Route path="/users" component={() => (
				<ProtectedRoute>
					<MainLayout>
						<Users />
					</MainLayout>
				</ProtectedRoute>
			)} />
			
			<Route path="/profil" component={() => (
				<ProtectedRoute>
					<MainLayout>
						<Profil />
					</MainLayout>
				</ProtectedRoute>
			)} />
		</Router>
	);
}
