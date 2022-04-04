import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import AppContext from './context'
import { Orders } from './pages/Orders';



function App() {
    const [cartOpened, setCartOpened] = useState(false);
    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // const [cartResponce, favoritesResponce, itemsResponce] = 
                //     await Promise.all(
                //         axios
                //         .get('https://62362b704d0977f1db431f2f.mockapi.io/cart'),
                //         axios
                //         .get('https://62362b704d0977f1db431f2f.mockapi.io/favorites'),
                //         axios
                //         .get('https://62362b704d0977f1db431f2f.mockapi.io/items')
                //     );

                setIsLoading(true) ;
                const cartResponce = await axios
                .get('https://62362b704d0977f1db431f2f.mockapi.io/cart')


                const favoritesResponce = await axios
                .get('https://62362b704d0977f1db431f2f.mockapi.io/favorites')

                const itemsResponce = await axios
                .get('https://62362b704d0977f1db431f2f.mockapi.io/items')

                setIsLoading(false);

                setCartItems(cartResponce.data);
                setFavorites(favoritesResponce.data);
                setItems(itemsResponce.data);
            } catch (error) {
                alert('Ошибка при запросе данных :(')
            }
        }
        fetchData();
    }, []);

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://62362b704d0977f1db431f2f.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Ошибка при удалении из "Корзины"');
        }
    };

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://62362b704d0977f1db431f2f.mockapi.io/cart/${findItem.id}`);
            } else {
                const { data } = await axios.post('https://62362b704d0977f1db431f2f.mockapi.io/cart', obj);
                setCartItems((prev) => [...prev, data]);
            }
            
        } catch (error) {
            alert('Ошибка при добавлении в "Корзину"');
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(
                    `https://62362b704d0977f1db431f2f.mockapi.io/favorites/${obj.id}`
                    );
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post(
                    'https://62362b704d0977f1db431f2f.mockapi.io/favorites',
                    obj
                    );
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Ошибка при добавлении в "Избранные"');
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    }

    return (
        <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems}}>
            <div className="wrapper clear">
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}
                />

            <Header onClickCart={() => setCartOpened(true)} />

            <Routes>
                <Route
                    path="/"
                    exact
                    element={
                        <Home
                            items={items}
                            cartItems={cartItems}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            isLoading={isLoading}
                        />
                    }
                />
                <Route
                    path="/favorites"
                    exact
                    element={
                        <Favorites
                            onAddToFavorite={onAddToFavorite}
                        />
                    }
                />
                <Route
                    path="/orders"
                    exact
                    element={
                        <Orders
                        />
                    }
                />
            </Routes>
        </div>
        </AppContext.Provider>
    );
}

export default App;
