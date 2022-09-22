using System;
using System.Collections.Generic;
using System.Linq;
using AllSop.Entities;
using AllSop.Models;
using AllSop.Promotions;
using AllSop.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AllSop.Controllers
{
  [Route("api/cart")]
  [ApiController]
  public class CartController : ControllerBase
  {
    private readonly ICartRepository _cartRepository;
    private readonly IProductRepository _productRepository;
    private readonly IPromotionProvider _promotionProvider;
    private readonly ICodePromotionRepository _codePromotionRepository;

    public CartController(ICartRepository cartRepository, IProductRepository productRepository, IPromotionProvider promotionProvider, ICodePromotionRepository codePromotionRepository)
    {
      _cartRepository = cartRepository;
      _productRepository = productRepository;
      _promotionProvider = promotionProvider;
      _codePromotionRepository = codePromotionRepository;
    }

    /// <summary>
    /// Get card instance by id
    /// </summary>
    /// <param name="id">CardId</param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
      var card = _cartRepository.Get(id);
      if (card == null)
      {
        return NotFound();
      }

      card.CalculatePromotion(_promotionProvider.GetPromotions());
      return Ok(card);
    }

    /// <summary>
    /// Create a card instance. (If the client application not find a cart instance, the client will call this to create a new one)
    /// </summary>
    /// <returns></returns>
    [HttpPost("create-cart")]
    public IActionResult CreateCard()
    {
      var card = new Cart()
      {
        Id = Guid.NewGuid(),
      };
      _cartRepository.AddCard(card);
      return Ok(card);
    }

    /// <summary>
    /// Add product to card
    /// </summary>
    /// <returns></returns>
    [HttpPost("add-product-to-cart")]
    public IActionResult AddProductToCard(AddProductToCardVM vm)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var cart = _cartRepository.Get(vm.CartId);
      if (cart == null)
      {
        return BadRequest("Invalid card id");
      }

      var product = _productRepository.GetProductById(vm.ProductId);
      if (product == null)
      {
        return BadRequest("Invalid product id");
      }

      if (product.AvailableQuantity == 0)
      {
        return BadRequest("Out of stock");
      }
      
      var cartItem = cart.CartItems.FirstOrDefault(s => s.ProductId == vm.ProductId);
      if (cartItem == null)
      {
        // Add card item
        cartItem = new CartItem()
        {
          Id = Guid.NewGuid(),
          ProductId = vm.ProductId,
          Product = product,
          Quantity = 1,
          CartId = vm.CartId,
        };
        _cartRepository.AddCartItem(cartItem);
        cart.CalculatePromotion(_promotionProvider.GetPromotions());
        _cartRepository.UpdateCart(cart);
        // Update product available quantity
        product.AvailableQuantity--;
        _productRepository.UpdateProduct(product);
      }
      else
      {
        // Update card item
        cartItem.Quantity++;
        cart.CalculatePromotion(_promotionProvider.GetPromotions());
        _cartRepository.UpdateCart(cart);
        // Update product available quantity
        product.AvailableQuantity--;
        _productRepository.UpdateProduct(product);
        _cartRepository.UpdateCartItem(cartItem);
      }

      return Ok(cart);
    }

    /// <summary>
    /// Remove cart item from cart
    /// </summary>
    /// <param name="vm"></param>
    /// <returns></returns>
    [HttpPost("remove-cart-item")]
    public IActionResult RemoveCartItem(RemoveCartItemVM vm)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      _cartRepository.RemoveCartItem(vm.CartId, vm.CartItemId);
      var cart = _cartRepository.Get(vm.CartId);
      cart.CalculatePromotion(_promotionProvider.GetPromotions());
      _cartRepository.UpdateCart(cart);
      return Ok(cart);
    }

    /// <summary>
    /// Update cart item quantity
    /// </summary>
    /// <param name="vm"></param>
    /// <returns></returns>
    [HttpPost("update-cart-item")]
    public IActionResult UpdateCartItem(UpdateCartItemVM vm)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var cart = _cartRepository.Get(vm.CartId);
      var cartItem = cart.CartItems.FirstOrDefault(s => s.Id == vm.CartItemId);
      if (cartItem == null)
      {
        return NotFound();
      }
      cartItem.Quantity = vm.Quantity;
      _cartRepository.UpdateCartItem(cartItem);
      cart.CalculatePromotion(_promotionProvider.GetPromotions());
      _cartRepository.UpdateCart(cart);
      return Ok(cart);
    }

    /// <summary>
    /// User apply promotion code to card
    /// </summary>
    /// <param name="vm"></param>
    /// <returns></returns>
    [HttpPost("apply-promotion-code")]
    public IActionResult ApplyPromotionCode(ApplyPromotionCodVM vm)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var cart = _cartRepository.Get(vm.CartId);
      if (cart == null)
      {
        return BadRequest("Invalid CartId");
      }
      // Check code validation
      var codes = _codePromotionRepository.GetPromotionCodes();
      var isValidCode = codes.Any(c => c == vm.PromotionCode);
      if (!isValidCode)
      {
        return BadRequest("Invalid promotion code");
      }
      cart.PromotionCode = vm.PromotionCode;
      _cartRepository.UpdateCart(cart);
      cart.CalculatePromotion(_promotionProvider.GetPromotions());
      return Ok(cart);
    }
  }
}