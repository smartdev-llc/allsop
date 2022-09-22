using System;
using System.ComponentModel.DataAnnotations;

namespace AllSop.Models
{
  public class ApplyPromotionCodVM
  {
    public Guid CartId { get; set; }
    [Required]
    public string PromotionCode { get; set; }
  }
}