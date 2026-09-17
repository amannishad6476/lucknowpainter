import React from 'react';
import { X, User as UserIcon, LogOut, Award, Package, MapPin, Clock, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


export const AccountDrawer: React.FC = () => {
  const { user, isAccountDrawerOpen, closeAccountDrawer, logout } = useAuth();

  if (!isAccountDrawerOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="absolute inset-0" 
        onClick={closeAccountDrawer} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950/95 border-l border-amber-500/20 text-white shadow-2xl flex flex-col justify-between overflow-y-auto">
          
          {/* Header */}
          <div>
            <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-950 border border-amber-400/50 flex items-center justify-center text-amber-400">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">My Sanctuary</h3>
                  <p className="text-xs text-amber-400/80">AURA Membership</p>
                </div>
              </div>

              <button
                onClick={closeAccountDrawer}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview Card */}
            <div className="p-6 space-y-6">
              <div className="glass-card p-5 rounded-2xl border border-amber-500/30 relative overflow-hidden bg-gradient-to-br from-emerald-950/60 to-zinc-950">
                <div className="absolute top-0 right-0 bg-amber-400/10 border-b border-l border-amber-400/30 px-3 py-1 rounded-bl-xl text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                  {user.tier}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 font-bold text-xl">
                      {user.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h4 className="font-serif font-bold text-xl text-white">{user.name}</h4>
                    <p className="text-xs text-zinc-400 truncate max-w-[200px]">{user.email}</p>
                    <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Member since {user.memberSince}
                    </p>
                  </div>
                </div>

                {/* Loyalty Points Counter */}
                <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-zinc-300">AURA Rewards:</span>
                  </div>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {user.loyaltyPoints} PTS
                  </span>
                </div>
              </div>

              {/* Saved Address Preview */}
              {user.defaultAddress && (
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Default Delivery Address</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{user.defaultAddress}</p>
                </div>
              )}

              {/* Order History */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>Order History</span>
                  </h5>
                  <span className="text-[10px] text-zinc-400">{user.orders.length} Orders</span>
                </div>

                {user.orders.length === 0 ? (
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center text-xs text-zinc-400">
                    No orders placed yet. Explore our luxury formulations!
                  </div>
                ) : (
                  <div className="space-y-2">
                    {user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-xs hover:border-amber-500/40 transition-all"
                      >
                        <div>
                          <div className="font-mono font-semibold text-zinc-200">{order.id}</div>
                          <div className="text-[10px] text-zinc-400">
                            {order.date} • {order.itemsCount} items
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-mono font-bold text-amber-400">${order.total.toFixed(2)}</div>
                          <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* VIP Benefits Perks */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-emerald-900/20 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>VIP Privileges Active</span>
                </div>
                <ul className="text-[11px] text-zinc-300 space-y-1 pl-5 list-disc marker:text-amber-400">
                  <li>Complimentary priority eco-distillation shipping</li>
                  <li>Exclusive early access to seasonal micro-batches</li>
                  <li>Direct consultation with Master Apothecary</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Action: Logout */}
          <div className="p-6 border-t border-zinc-800/80 bg-zinc-950">
            <button
              onClick={logout}
              className="w-full py-3 px-4 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-200 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out of Account</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
