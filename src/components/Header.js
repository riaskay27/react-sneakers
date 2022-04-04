import { Link } from 'react-router-dom';
import React from "react";
import { useCart } from '../hooks/useCart'

function Header(props) {
    const {totalPrice} = useCart();
    const { onClickCart = Function.prototype } = props;
    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img
                        width={40}
                        height={40}
                        src="/img/logo.png"
                        alt="Logotype"
                    />

                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li onClick={onClickCart} className="mr-30 cu-p">
                    <img
                        width={18}
                        height={18}
                        src="/img/cart.svg"
                        alt="Cart"
                    />
                    <span>{totalPrice}  грн.</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="/favorites">
                        <img
                            className="cu-p"
                            width={18}
                            height={18}
                            src="/img/heart-unliked.svg"
                            alt="Favorites"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img
                            className="cu-p"
                            width={18}
                            height={18}
                            src="/img/user.svg"
                            alt="User"
                        />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export { Header };
