import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, KeyRound } from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authMode,
    setAuthMode,
    login,
    signup,
    quickLoginDemo
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        if (!email.trim() || !password) {
          setErrorMsg('Please provide both email and password.');
          setIsLoading(false);
          return;
        }
        const res = await login(email, password);
        if (res.success) {
          setSuccessMsg(res.message);
        }
      } else if (authMode === 'signup') {
        if (!name.trim() || !email.trim() || !password) {
          setErrorMsg('All fields are required.');
          setIsLoading(false);
          return;
        }
        const res = await signup(name, email, password);
        if (res.success) {
          setSuccessMsg(res.message);
        }
      } else if (authMode === 'forgot') {
        if (!email.trim()) {
          setErrorMsg('Please enter your registered email address.');
          setIsLoading(false);
          return;
        }
        await new Promise((res) => setTimeout(res, 600));
        setSuccessMsg(`Password reset instructions sent to ${email}`);
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-zinc-950/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(229,193,88,0.15)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900/80 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-950/90 border border-amber-400/40 text-amber-400 shadow-md mb-1">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            {authMode === 'login' && 'Welcome to AURA'}
            {authMode === 'signup' && 'Create VIP Account'}
            {authMode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-emerald-300/80 max-w-xs mx-auto">
            {authMode === 'login' && 'Sign in to access your bespoke oil formulations & VIP privileges.'}
            {authMode === 'signup' && 'Join the AURA Sanctuary to receive 200 complimentary loyalty points.'}
            {authMode === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Tabs */}
        {authMode !== 'forgot' && (
          <div className="flex bg-zinc-900/90 p-1 rounded-full border border-amber-500/20 mb-6 text-xs font-semibold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-full transition-all text-center ${
                authMode === 'login'
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-full transition-all text-center ${
                authMode === 'signup'
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Error / Success Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <X className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-amber-200/80 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Aria Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-amber-500/20 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-amber-200/80 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="e.g. aria.sterling@apothecary.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900/80 border border-amber-500/20 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-zinc-600"
                required
              />
            </div>
          </div>

          {authMode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-medium text-amber-200/80 uppercase tracking-wider block">
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-amber-400/80 hover:text-amber-300 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-amber-500/20 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-zinc-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-600 text-zinc-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>
                  {authMode === 'login' && 'Sign In to AURA'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {authMode === 'forgot' && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setAuthMode('login')}
              className="text-xs text-zinc-400 hover:text-amber-400 flex items-center justify-center gap-1.5 mx-auto"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </div>
        )}

        {/* Quick Demo Logins Section */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <div className="flex items-center gap-1.5 justify-center text-[11px] uppercase tracking-widest text-zinc-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Demo Accounts</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => quickLoginDemo(0)}
              className="p-2.5 rounded-xl bg-zinc-900/90 border border-amber-500/30 hover:border-amber-400 text-left transition-all group"
            >
              <div className="text-[11px] font-bold text-amber-400 group-hover:text-amber-300 truncate">
                {DEMO_USERS[0].name}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">VIP Gold Member</div>
            </button>

            <button
              type="button"
              onClick={() => quickLoginDemo(1)}
              className="p-2.5 rounded-xl bg-zinc-900/90 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all group"
            >
              <div className="text-[11px] font-bold text-zinc-200 group-hover:text-white truncate">
                {DEMO_USERS[1].name}
              </div>
              <div className="text-[10px] text-zinc-400">Botanical Enthusiast</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
