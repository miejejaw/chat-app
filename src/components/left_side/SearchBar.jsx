import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const SearchBar = () => {
    return (
        <section className="w-full h-16 px-2 flex justify-center items-center">
            {/* Menu Icon */}
            <MenuIcon fontSize="large" className="text-gray-400" />

            {/* Search Bar */}
            <div className="ml-4 flex-grow max-w-md px-4 bg-light-grey rounded-3xl h-10 flex items-center space-x-2">
                <SearchIcon className="text-gray-400" />
                <input
                    className="outline-none bg-transparent text-navy-grey flex-grow"
                    placeholder="Search"
                />
            </div>
        </section>
    );
};

export default SearchBar;
