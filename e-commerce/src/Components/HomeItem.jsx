import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bagActions } from '../store/bagSlice';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { formatImageUrl, handleImageError } from '../utils/imageHelper';

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(item.id) >= 0;

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  const imageSrc = formatImageUrl(item?.image, item?.category);

  return (
    <div className="item-container">
      <div className="item-image-wrapper">
        <img
          className="item-image"
          src={imageSrc}
          alt={item?.item_name || "Product"}
          onError={(e) => handleImageError(e, item?.category, item?.item_name)}
          loading="lazy"
        />
        <div className="rating">
          <span className="rating-stars">{item.rating?.stars ?? 4.2} ⭐</span>
          <span className="rating-divider">|</span>
          <span className="rating-count">{item.rating?.count ?? 100}</span>
        </div>
      </div>

      <div className="item-info">
        <div className="company-name">{item.company}</div>
        <div className="item-name" title={item.item_name}>
          {item.item_name}
        </div>
        <div className="price">
          <span className="current-price">₹{item.current_price}</span>
          {item.original_price && item.original_price > item.current_price && (
            <span className="original-price">₹{item.original_price}</span>
          )}
          {item.discount_percentage > 0 && (
            <span className="discount">({item.discount_percentage}% OFF)</span>
          )}
        </div>

        {elementFound ? (
          <button
            type="button"
            className="btn-item-action btn-remove-bag"
            onClick={handleRemove}
          >
            <MdDeleteOutline className="btn-icon" /> Remove from Bag
          </button>
        ) : (
          <button
            type="button"
            className="btn-item-action btn-add-bag"
            onClick={handleAddToBag}
          >
            <IoIosAddCircleOutline className="btn-icon" /> Add to Bag
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeItem;