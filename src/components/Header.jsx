import React, {useState} from 'react'
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="flex justify-between items-center mb-8">
            <div className="relative flex-1 max-w-xl">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 rounded-full bg-gray-200 w-full"
                />
            </div>
            <div className="flex items-center space-x-4 ml-4">
                <button onClick={() => console.log('Settings clicked')} className="hover:opacity-80">
                    <FiSettings className="text-2xl text-gray-600" />
                </button>
                <button onClick={() => console.log('Notifications clicked')} className="hover:opacity-80">
                    <FiBell className="text-2xl text-gray-600" />
                </button>
                <button onClick={() => console.log('Profile clicked')} className="flex items-center space-x-2 hover:opacity-80">
                   
                    <span className="font-medium">Mandy</span>
                </button>
            </div>
        </div>
    )
}

export default Header