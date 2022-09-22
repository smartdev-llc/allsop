using System;
using System.Collections.Generic;
using System.Linq;
using AllSop.Entities;

namespace AllSop.Repositories
{
  public class CartRepository : ICartRepository
  {
    private static readonly List<Cart> Carts = new List<Cart>();

    public void AddCard(Cart cart)
    {
      Carts.Add(cart);
    }

    public Cart Get(Guid id)
    {
      return Carts.FirstOrDefault(x => x.Id == id);
    }

    public void UpdateCart(Cart cart)
    {
      var updatingCart = Get(cart.Id);
      if (updatingCart != null)
      {
        updatingCart.Promotions = cart.Promotions;
      }
    }

    public bool UpdateCartItem(CartItem item)
    {
      var cart = Get(item.CartId);
      if (cart == null) return false;
      var updatingItem = cart.CartItems.FirstOrDefault(s => s.Id == item.Id);
      if (updatingItem == null) return false;
      updatingItem.Quantity = item.Quantity;
      return true;
    }

    public void AddCartItem(CartItem item)
    {
      var cart = Get(item.CartId);
      if (cart != null)
      {
        cart.CartItems.Add(item);
      }
    }

    public void RemoveCartItem(Guid cartId, Guid cartItemId)
    {
      var cart = Get(cartId);
      if (cart != null)
      {
        cart.CartItems = cart.CartItems.Where(x => x.Id != cartItemId).ToList();
      }
    }
  }
}