
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  // Format price as currency
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Handle quantity changes
  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    updateQuantity(bookId, newQuantity);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {/* Empty cart state */}
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link 
            to="/books" 
            className="inline-flex items-center bg-accent text-white px-6 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4">Book</th>
                    <th className="text-center p-4 hidden sm:table-cell">Price</th>
                    <th className="text-center p-4">Quantity</th>
                    <th className="text-right p-4 hidden sm:table-cell">Total</th>
                    <th className="text-right p-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      {/* Book info */}
                      <td className="p-4">
                        <div className="flex items-center">
                          <Link to={`/books/${item.id}`} className="shrink-0 mr-4">
                            <img 
                              src={item.coverImage} 
                              alt={item.title} 
                              className="w-16 h-24 object-cover rounded"
                            />
                          </Link>
                          <div>
                            <Link 
                              to={`/books/${item.id}`}
                              className="font-medium hover:text-accent transition-colors"
                            >
                              {item.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.author}</p>
                          </div>
                        </div>
                      </td>
                      
                      {/* Price */}
                      <td className="text-center p-4 hidden sm:table-cell">
                        {formatPrice(item.price)}
                      </td>
                      
                      {/* Quantity */}
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 border rounded-l-md border-border hover:bg-secondary"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center border-y border-border py-1">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 border rounded-r-md border-border hover:bg-secondary"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      
                      {/* Total */}
                      <td className="text-right p-4 hidden sm:table-cell">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                      
                      {/* Remove */}
                      <td className="text-right p-4">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-destructive/10"
                          aria-label="Remove from cart"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items ({getCartCount()})</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
              </div>
              
              <button 
                className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-md font-medium transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4">
                <Link 
                  to="/books" 
                  className="text-center block w-full text-sm text-accent hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
