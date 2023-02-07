import { BookList } from "../BooksList/BooksList";
import { Navbar } from "../Navbar/Navbar";
import { SearchForm } from "../SearchForm/SearchForm";

export const Home = () => {
    return <div>
        <div>You are in Home now</div>
        <Navbar />
        <SearchForm />
        <BookList />
    </div>
}