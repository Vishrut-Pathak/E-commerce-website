import React from 'react';
import { useDispatch } from 'react-redux';
import { bagActions } from '../store/bagSlice';
import { IoCloseOutline } from 'react-icons/io5';
import { FiCheckCircle } from 'react-icons/fi';
import { formatImageUrl, handleImageError } from '../utils/imageHelper';

const BagItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  const imageSrc = formatImageUrl(item?.image, item?.category);

  return (
    <div className="bag-item-container">
      <div className="item-left-part">
        <img
          className="bag-item-img"
          src={imageSrc}
          alt={item?.item_name || "Product"}
          onError={(e) => handleImageError(e, item?.category, item?.item_name)}
        />
      </div>
      <div className="item-right-part">
        <div className="company">{item.company}</div>
        <div className="item-name">{item.item_name}</div>
        <div className="price-container">
          <span className="current-price">₹{item.current_price}</span>
          {item.original_price && item.original_price > item.current_price && (
            <span className="original-price">₹{item.original_price}</span>
          )}
          {item.discount_percentage > 0 && (
            <span className="discount-percentage">
              ({item.discount_percentage}% OFF)
            </span>
          )}
        </div>
        <div className="return-period">
          <span className="return-period-days">
            <FiCheckCircle style={{ marginRight: 4, color: "#03a685" }} />
            {item.return_period || 14} days
          </span>{" "}
          return available
        </div>
        <div className="delivery-details">
          Delivery by{" "}
          <span className="delivery-details-days">
            {item.delivery_date || "3-5 Business Days"}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="remove-from-cart-btn"
        onClick={handleRemoveItem}
        title="Remove item"
      >
        <IoCloseOutline />
      </button>
    </div>
  );
};

export default BagItem;