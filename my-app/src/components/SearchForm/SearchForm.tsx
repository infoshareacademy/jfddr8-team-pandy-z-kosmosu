import { FaSearch } from 'react-icons/fa';

export const SearchForm = () => {
    return (
        <div>
            <form>
                <input type='text' placeholder="ex. The Paul Street Boys..."/>
                <button type='submit'>
                <FaSearch size={32} />
                </button>
            </form>
        </div>
    )
}