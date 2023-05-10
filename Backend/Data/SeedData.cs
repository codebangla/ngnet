using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public static class SeedData
    {
        public static void Initialize(DataContext context)
        {
            context.Database.EnsureCreated();

            if (context.Products.Any())
            {
                return; // Data already seeded
            }

            context.Products.AddRange(
                new Product { Id = 1, Name = "Elegant Evening Dress", Description = "Beautiful dress for any formal evening event", Price = 59.99m, Quantity = 5 },
                new Product { Id = 2, Name = "Summer Floral Dress", Description = "Light and breezy dress with a floral pattern", Price = 79.99m, Quantity = 10 },
                new Product { Id = 3, Name = "Foundation Makeup", Description = "High-quality foundation for a flawless look", Price = 29.99m, Quantity = 15 },
                new Product { Id = 4, Name = "Long-lasting Lipstick", Description = "Vibrant lipstick with long-lasting color", Price = 14.99m, Quantity = 8 },
                new Product { Id = 5, Name = "Casual Maxi Dress", Description = "Comfortable and stylish dress for casual occasions", Price = 89.99m, Quantity = 20 },
                new Product { Id = 6, Name = "Gentle Facial Cleanser", Description = "Gentle cleanser for all skin types", Price = 9.99m, Quantity = 3 },
                new Product { Id = 7, Name = "Striped Midi Dress", Description = "Chic dress with a striped pattern", Price = 49.99m, Quantity = 12 },
                new Product { Id = 8, Name = "Nourishing Body Lotion", Description = "Moisturizing lotion with a pleasant fragrance", Price = 19.99m, Quantity = 6 },
                new Product { Id = 9, Name = "Embroidered Party Dress", Description = "Stunning dress with intricate embroidery for special occasions", Price = 99.99m, Quantity = 18 },
                new Product { Id = 10, Name = "Volumizing Mascara", Description = "Mascara for voluminous and dramatic lashes", Price = 12.99m, Quantity = 9 }
            );

            context.SaveChanges();
        }
    }
}
