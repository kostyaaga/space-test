import React from "react";
import styles from "../Cart/Cart.module.scss";
import iconHeart from "../../assets/img/heart.svg";
import iconActiveHeart from "../../assets/img/active-heart.svg";
import iconDelete from "../../assets/img/delete.svg";
import type { Items } from "../../types/items.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { toggleLike, selectIsLiked } from "../../redux/slisec/filterSlice.ts";
import { Link } from "react-router-dom";
import { deleteItem } from "../../redux/slisec/itemsSlice.ts";

const Cart: React.FC<Items> = ({ id, imageUrl, title, description }) => {
  const isLiked = useAppSelector(selectIsLiked(id));
  const dispatch = useAppDispatch();

  const onChangeLiked = () => {
    dispatch(
      toggleLike({
        id,
        imageUrl,
        title,
        description,
      }),
    );
  };

  const onDelete = () => {
    dispatch(deleteItem(id));
  };

  return (
    <div className={styles.cart}>
      <Link to={`/item/${id}`} key={id}>
        <img className={styles.cart_image} src={imageUrl} alt="" />
      </Link>

      <div className={styles.cart_meta}>
        <Link to={`/item/${id}`} key={id}>
          <h4 className={styles.cart_title}>{title}</h4>
        </Link>
        <div className={styles.cart_btn}>
          <button onClick={onChangeLiked} className={styles.cart_btn_heart}>
            {isLiked ? (
              <img src={iconActiveHeart} alt="" />
            ) : (
              <img src={iconHeart} alt="" />
            )}
          </button>
          <button onClick={onDelete} className={styles.cart_btn_delete}>
            <img src={iconDelete} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
