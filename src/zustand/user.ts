import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";

type TUseUserStoreStateProps = {
    display_name: string;
    email: string;
    isLoggedIn: boolean;
    points: number;
    uuid: string;
}

type TUseUserStoreProps = {
    updateUser: (state: TUseUserStoreStateProps) => void;
    resetUser: (state: TUseUserStoreStateProps) => void;
} & TUseUserStoreStateProps

export const USE_USER_STORE_DEFAULT_PROPS = {
    display_name: '',
    email: '',
    isLoggedIn: false,
    points: 0,
    uuid: '',
}

export const useUserStore = create<TUseUserStoreProps>()(
    persist(
        (set) => ({
            ...USE_USER_STORE_DEFAULT_PROPS,
            updateUser: (state) => set(() => ({...state, isLoggedIn: true})),
            resetUser: (state) => set(() => (state ?? USE_USER_STORE_DEFAULT_PROPS))
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)