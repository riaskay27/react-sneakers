import { useState } from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer(props) {
    const {
        items = [],
        onClose = Function.prototype,
        onRemove = Function.prototype,
        opened,
    } = props;

    const {cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://62362b704d0977f1db431f2f.mockapi.io/orders', {items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++ ) {
                const item = cartItems[i];
                await axios.delete('https://62362b704d0977f1db431f2f.mockapi.io/cart/' + item.id);
                await delay();
            }
        } catch (error) {
            alert("Не удалось создать заказ :(")
        }
        setIsLoading(false);
    }
    
    return (
        <div //style={{ display: 'none' }}
            className={`${styles.overlay} ${opened ? styles.overlayVisible : '' }`}
        >
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">
                    Корзина{' '}
                    <img
                        onClick={onClose}
                        className="cu-p"
                        src="/img/btn-remove.svg"
                        alt="Close"
                    />
                </h2>

                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div style={{ flex: 1 }} className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div
                                        style={{
                                            backgroundImage: `url(${obj.imageUrl})`,
                                        }}
                                        className="cartItemImg"
                                    ></div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} грн.</b>
                                    </div>

                                    <img
                                        className="removeBtn"
                                        src="/img/btn-remove.svg"
                                        alt="Remove"
                                        onClick={() => onRemove(obj.id)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} грн.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{Math.round(totalPrice/100 * 5)} грн.</b>
                                </li>
                            </ul>

                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                Оформить заказ
                                <img src="/img/errow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"} />
                    
                )}
            </div>
        </div>
    );
}

export { Drawer };
