import { useState } from "react";
import { Wallet} from "lucide-react";



interface LoginPageProps {
    onLogin: (name: string) => void;
}

export default function LoginPage ({onLogin} : LoginPageProps) {
    const [name , setName] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault ();

        const trimmed = name.trim();
        if (!trimmed) return;
        onLogin(trimmed)
    }

    return(
        <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-sm flex flex-col gap-6">
                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                        <Wallet />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800"> Parkohsam FinTrack</h1>
                    <p className="text-xs text-gray-400 mt-1">Your personal finance tracker</p>
                </div>
                    <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label htmlFor="" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-gray-600">What's your name?</span>
                            <input type="text"  placeholder="e.g Adediran" value={name} onChange={(e)=>setName(e.target.value)} autoFocus className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-blue-200"/>
                        </label>
                        <button type="submit" className="w-full bg-blue-600 rounded-xl py-2.5 text-sm font-bold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                Get started →
                        </button>
                        <p className="text-xs text-gray-300 text-center"> No account need. Your data stays in your devices</p>
                    </form>
            </div>
        </div>
        </>
    )
}
