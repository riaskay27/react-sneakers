import { useState, useContext, useEffect } from 'react';
import  AppContext  from '../context';
import axios from 'axios';
import { Card } from '../components/Card';

const Orders = () => {
    const { onAddToFavorite } = useContext(AppContext);
    
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios
                    .get('https://62362b704d0977f1db431f2f.mockapi.io/orders');
                setOrders(data.reduce((prev,obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов');
                console.error(error);
            }
        })();

    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export { Orders };
