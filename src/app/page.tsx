"use client";
import { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { session } from '@/db/schema';

export default function LoginForm() {
    const { data: session } = authClient.useSession();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await authClient.signUp.email({
                email,
                name,
                password,
            }, {
                onRequest: (ctx) => {
                    console.log("Request:", ctx);
                },
                onSuccess: (ctx) => {
                    console.log("Success:", ctx);
                },
                onError: (ctx) => {
                    console.error("Full Error:", ctx.error);
                    console.error("Error Details:", ctx.error?.response?.data);
                },
            });
        } catch (error) {
            console.error("Unexpected Error:", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await authClient.signIn.email({
                email,
                password,
            }, {
                onRequest: (ctx) => {
                    console.log("Request:", ctx);
                },
                onSuccess: (ctx) => {
                    console.log("Success:", ctx);
                },
                onError: (ctx) => {
                    console.error("Full Error:", ctx.error);
                    console.error("Error Details:", ctx.error?.response?.data);
                },
            });
        } catch (error) {
            console.error("Unexpected Error:", error);
        }
    }

    if (session) {
        return (
            <>
                <p>Logged in as {session.user.name}</p>
                <button onClick={() => {
                    authClient.signOut()
                }}>logout</button>
            </>
        )
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div> */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='button'>Login</button>
            </form>
        </div>
    );
}
