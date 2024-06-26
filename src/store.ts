import { create } from 'zustand';
import { Album, ToDo, User, Photo } from './model/model';

interface StoreState {
    users: User[];
    todosMap: { [key: number]: ToDo[] } | undefined;
    albumsMap: { [key: number]: Album[] } | undefined;
    photos: Photo[] | undefined;
    file: File | undefined;
    user: User | undefined;
    albums: Album[];
    searchTerm: string;
    filteredPhotos: Photo[];
    offset: number;
    hasMore: boolean;
    setHasMore: (hasMore: boolean) => void;
    setOffset: (offset: number) => void;
    setFilteredPhotos: (filteredPhotos: Photo[]) => void;
    setSearchTerm: (searchTerm: string) => void;
    setUser: (user: User) => void;
    setAlbums: (albums: Album[]) => void;
    setUsers: (users: User[]) => void;
    setTodosMap: (todosMap: { [key: number]: ToDo[] }) => void;
    setAlbumsMap: (albumsMap: { [key: number]: Album[] }) => void;
    setPhotos: (photos: Photo[]) => void;
    setFile: (file: File | string) => void;
}

const useStore = create<StoreState>((set) => ({
    users: [],
    todosMap: undefined,
    albumsMap: undefined,
    photos: undefined,
    file: undefined,
    user: undefined,
    albums: [],
    searchTerm: '',
    filteredPhotos: [],
    offset: 20,
    hasMore: false,
    setHasMore: (hasMore: boolean) => set({ hasMore }),
    setOffset: (offset: number) => set({ offset }),
    setFilteredPhotos: (filteredPhotos: Photo[]) => set({ filteredPhotos }),
    setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    setUser: (user: User) => set({ user }),
    setAlbums: (albums: Album[]) => set({ albums }),
    setUsers: (users) => set({ users }),
    setTodosMap: (todosMap) => set({ todosMap }),
    setAlbumsMap: (albumsMap) => set({ albumsMap }),
    setPhotos: (photos) => set({ photos }),
    setFile: (file) => set({ file })
}));

export default useStore;
