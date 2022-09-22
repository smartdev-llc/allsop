using System;
using AllSop.Entities;

namespace AllSop.Repositories
{
  public interface ICartRepository
  {
    void AddCard(Cart cart);
    Cart Get(Guid id);
    void UpdateCart(Cart cart);
    bool UpdateCartItem(CartItem item);
    void AddCartItem(CartItem item);
    void RemoveCartItem(Guid cartId, Guid cartItemId);
  }
}