import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import ProductCarousel from '../components/ProductCarousel';

const { FiHeart, FiShare2, FiStar, FiTruck, FiShield, FiRotateCcw, FiMapPin, FiUser, FiMessageCircle } = FiIcons;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById, products } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, getProductById]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-purple-600 hover:text-purple-800"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 8);

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new': return 'text-green-600 bg-green-100';
      case 'like-new': return 'text-blue-600 bg-blue-100';
      case 'good': return 'text-yellow-600 bg-yellow-100';
      case 'fair': return 'text-orange-600 bg-orange-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-lg overflow-hidden border">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-purple-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.brand}</p>
            
            {/* Condition Badge */}
            {product.condition && (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getConditionColor(product.condition)}`}>
                {product.condition.charAt(0).toUpperCase() + product.condition.slice(1).replace('-', ' ')}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <SafeIcon
                  key={i}
                  icon={FiStar}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.discount && product.discount > 0 && (
                <span className="text-green-600 font-semibold">
                  {product.discount}% off
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">Price includes all applicable taxes</p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Seller Information</h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.seller || 'Anonymous Seller'}</p>
                <p className="text-sm text-gray-600">Member since 2023</p>
              </div>
            </div>
            {product.location && (
              <div className="flex items-center space-x-2 mt-3">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">{product.location}</span>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                ADD TO CART
              </button>
              <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                BUY NOW
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <SafeIcon icon={FiHeart} />
                <span>Save for later</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                <SafeIcon icon={FiShare2} />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 transition-colors">
                <SafeIcon icon={FiMessageCircle} />
                <span>Contact Seller</span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiShield} className="text-green-600" />
              <span className="text-sm text-gray-700">Buyer Protection</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiTruck} className="text-blue-600" />
              <span className="text-sm text-gray-700">
                {product.shipping === 'free' ? 'Free Shipping' : 
                 product.shipping === 'paid' ? 'Shipping Available' : 'Local Pickup'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiRotateCcw} className="text-purple-600" />
              <span className="text-sm text-gray-700">30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {['description', 'specifications', 'seller'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">{product.brand || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Condition</span>
                    <span className="font-medium">{product.condition || 'New'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {product.shipping === 'free' ? 'Free' : 
                       product.shipping === 'paid' ? 'Paid' : 'Local Only'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'seller' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">About the Seller</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{product.seller || 'Anonymous Seller'}</h4>
                    <p className="text-gray-600">Member since 2023</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <SafeIcon
                          key={i}
                          icon={FiStar}
                          className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.8 seller rating</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                    <p className="text-sm text-gray-600">Items Sold</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-sm text-gray-600">Positive Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">24h</p>
                    <p className="text-sm text-gray-600">Response Time</p>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Contact Seller
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductCarousel title="Similar Products" products={relatedProducts} />
      )}
    </motion.div>
  );
};

export default ProductDetail;