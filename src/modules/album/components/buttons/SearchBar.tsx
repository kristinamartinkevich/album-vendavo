import useStore from '../../../../store';

function SearchBar() {
    const { photos, searchTerm, setSearchTerm, setFilteredPhotos } = useStore();

    function handleChange(term) {
        setSearchTerm(term);
        setFilteredPhotos(photos.filter(photo =>
            photo.title.toLowerCase().includes(term.toLowerCase())
        ));
    };

    return (
        <input
            type="text"
            placeholder="Search by album title"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
        />
    );
};

export default SearchBar;
