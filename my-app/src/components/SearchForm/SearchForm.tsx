import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import classes from './SearchForm.module.css'

export const SearchForm = () => {

    const searchText = useRef('')

    return (
        <div className={classes['search-form']}>
            <form >
                <input type='text' placeholder="ex. The Paul Street Boys..."/>
                <button type='submit'>
                <FaSearch size={32} />
                </button>
            </form>
        </div>
    )
}