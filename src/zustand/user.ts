import {create} from 'zustand'

type TUseUserStoreStateProps = {
    display_name: string;
    email: string;
    isLoggedIn: boolean;
    points: number;
    uuid: string;
}

type TUseUserStoreProps = {
    updateUser: (state: TUseUserStoreStateProps) => void;
    resetUser: () => void;
} & TUseUserStoreStateProps

export const useUserStore = create<TUseUserStoreProps>((set) => ({
    display_name: '',
    email: '',
    isLoggedIn: false,
    points: 0,
    uuid: '',
    updateUser: (state) => set(() => ({...state, isLoggedIn: true})),
    resetUser: () => set(() => ({displayName: '', email: '', isLoggedIn: false, points: 0, uuid: ''}))
}))