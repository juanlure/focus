import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Capsule } from '@/lib/types';

interface FocusStore {
    capsules: Capsule[];
    archivedCapsules: Capsule[];
    googleAiKey: string;
    isOnboarded: boolean;
    userName: string;
    addCapsule: (capsule: Omit<Capsule, 'id' | 'createdAt'> & { id?: string }) => void;
    removeCapsule: (id: string) => void;
    archiveCapsule: (id: string) => void;
    getCapsule: (id: string) => Capsule | undefined;
    updateAction: (capsuleId: string, actionId: string, isCompleted: boolean) => void;
    setGoogleAiKey: (key: string) => void;
    setIsOnboarded: (val: boolean) => void;
    setUserName: (name: string) => void;
}

export const useFocusStore = create<FocusStore>()(
    persist(
        (set, get) => ({
            capsules: [],
            archivedCapsules: [],
            googleAiKey: '',
            isOnboarded: false,
            userName: '',
            addCapsule: (newCapsule) => {
                const id = newCapsule.id || crypto.randomUUID();
                const createdAt = new Date().toISOString();
                set((state) => ({
                    capsules: [{ ...newCapsule, id, createdAt }, ...state.capsules],
                }));
            },
            removeCapsule: (id) => {
                set((state) => ({
                    capsules: state.capsules.filter((c) => c.id !== id),
                }));
            },
            archiveCapsule: (id) => set((state) => {
                const capsule = state.capsules.find((c) => c.id === id);
                if (!capsule) return state;
                return {
                    capsules: state.capsules.filter((c) => c.id !== id),
                    archivedCapsules: [capsule, ...(state.archivedCapsules || [])]
                };
            }),
            getCapsule: (id) => {
                return get().capsules.find((c) => c.id === id);
            },
            updateAction: (capsuleId, actionId, isCompleted) => {
                set((state) => ({
                    capsules: state.capsules.map((c) =>
                        c.id === capsuleId
                            ? {
                                ...c,
                                actions: c.actions.map((a) =>
                                    a.id === actionId ? { ...a, isCompleted } : a
                                ),
                            }
                            : c
                    ),
                }));
            },
            setGoogleAiKey: (key) => set({ googleAiKey: key }),
            setIsOnboarded: (val) => set({ isOnboarded: val }),
            setUserName: (name) => set({ userName: name }),
        }),
        {
            name: 'focus-storage',
        }
    )
);
