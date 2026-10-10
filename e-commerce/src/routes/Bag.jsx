import React from 'react';
import BagSummury from '../Components/BagSummury';
import BagItem from '../Components/BagItem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

const Bag = () => {
  const bagItems = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);

  const finalitems = items.filter((item) => {
    return bagItems.indexOf(item.id) >= 0;
  });

  return (
    <main className="bag-main-section">
      <div className="bag-page">
        {bagItems.length === 0 ? (
          <div className="empty-bag-card">
            <div className="empty-bag-icon">
              <FiShoppingBag size={64} color="#ff3f6c" />
            </div>
            <h2>Hey, it feels so light!</h2>
            <p>There is nothing in your bag. Let's add some items.</p>
            <Link to="/" className="btn-shop-now">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="bag-items-container">
              <div className="bag-header-notice">
                <span>Check delivery time & services to your area</span>
              </div>
              {finalitems.map((item) => (
                <BagItem key={item.id} item={item} />
              ))}
            </div>
            <BagSummury />
          </>
        )}
      </div>
    </main>
  );
};

export default Bag;