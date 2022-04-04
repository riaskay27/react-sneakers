import { useContext } from 'react';
import  AppContext  from '../context';
import { Card } from '../components/Card';

const Favorites = ({ onAddToFavorite }) => {
    const {favorites} = useContext(AppContext);
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {favorites.map((item, index) => (
                    <Card
                        key={index}
                        onFavorite={onAddToFavorite}
                        favorited={true}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export { Favorites };
