using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Windows.Controls;
using Newtonsoft.Json;

namespace kalderama
{
    public partial class Foods : Page
    {
        private const string BaseUrl = "http://localhost:5369";
        private List<Food> _foodItems = new List<Food>();

        public Foods()
        {
            InitializeComponent();
            LoadFoodData(); // Load food items when the page is loaded
        }

        private async void LoadFoodData()
        {
            using (var client = new HttpClient())
            {
                string url = $"{BaseUrl}/admin/foods/all?canteenId=1";

                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var foodItems = JsonConvert.DeserializeObject<List<Food>>(jsonResponse); // Deserialize to List<Food>

                    // Update the UI with food data
                    _foodItems = foodItems;
                    foreach (var food in _foodItems)
                    {
                        food.UpdateDynamicProperties(); // Update button text and color based on the status
                    }

                    foodsGrid.ItemsSource = _foodItems; // Bind food data to the DataGrid
                }
                else
                {
                    System.Windows.MessageBox.Show("Failed to load food data.");
                }
            }
        }

        private async void DeleteOrRestoreFood_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is Food food)
            {
                if (food.Status == 1) // If the food is ACTIVE, delete the food item
                {
                    // Call the API to delete the food item
                    await DeleteFoodItem(food.FoodId);
                }
                else // If the food is INACTIVE, restore the food status to ACTIVE
                {
                    // Call the API to restore the food status to ACTIVE
                    await RestoreFoodStatus(food.FoodId);
                }
            }
        }

        private async Task DeleteFoodItem(int foodId)
        {
            using (var client = new HttpClient())
            {
                string url = $"{BaseUrl}/admin/foods/updatestatus"; // API URL to update the food status to inactive

                var requestBody = new
                {
                    foodId = foodId,
                    status = 0 // Set status to 0 (INACTIVE)
                };

                var jsonRequest = JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var response = await client.PutAsync(url, content); // Use PUT to update status

                if (response.IsSuccessStatusCode)
                {
                    // Find the food item and update its status to INACTIVE
                    var food = _foodItems.FirstOrDefault(f => f.FoodId == foodId);
                    if (food != null)
                    {
                        food.Status = 0; // Set status to INACTIVE
                        food.UpdateDynamicProperties(); // Update button text and color based on the new status

                        foodsGrid.ItemsSource = null; // Force UI refresh
                        foodsGrid.ItemsSource = _foodItems; // Rebind updated data
                    }
                }
                else
                {
                    System.Windows.MessageBox.Show("Failed to update food status.");
                }
            }
        }


        private async Task RestoreFoodStatus(int foodId)
        {
            using (var client = new HttpClient())
            {
                string url = $"{BaseUrl}/admin/foods/updatestatus";

                var requestBody = new
                {
                    foodId = foodId,
                    status = 1 // Set status to 1 (ACTIVE)
                };

                var jsonRequest = JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var response = await client.PutAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    // Find the food item and update its status to ACTIVE
                    var food = _foodItems.FirstOrDefault(f => f.FoodId == foodId);
                    if (food != null)
                    {
                        food.Status = 1; // Set to ACTIVE
                        food.UpdateDynamicProperties(); // Update button text and color based on the new status

                        foodsGrid.ItemsSource = null; // Force UI refresh
                        foodsGrid.ItemsSource = _foodItems; // Rebind updated data
                    }
                }
                else
                {
                    System.Windows.MessageBox.Show("Failed to restore food status.");
                }
            }
        }

    }

    public class Food
    {
        public int FoodId { get; set; }
        public string Category { get; set; }
        public string FoodTitle { get; set; }
        public decimal Price { get; set; }

        // Format price as LKR
        public string PriceFormatted => $"LKR {Price:F2}";

        // Status property to track active/inactive
        public int Status { get; set; }

        // StatusText property to display Active/Inactive status in the UI
        public string StatusText => Status == 1 ? "ACTIVE" : "INACTIVE"; // If Status = 1, show ACTIVE, else INACTIVE

        public string StatusColor => Status == 1 ? "Green" : "Orange"; // Optional: Color for the status (green for active, orange for inactive)

        public string ButtonActionText { get; set; }
        public string ButtonActionColor { get; set; }

        public string ImageUrl { get; set; } // URL to the food image

        // Method to update UI properties (Button Text, Color)
        public void UpdateDynamicProperties()
        {
            ButtonActionText = Status == 1 ? "Delete" : "Restore"; // Button text based on active/inactive
            ButtonActionColor = Status == 1 ? "Red" : "Green"; // Button color (red for delete, green for restore)
        }
    }

}
