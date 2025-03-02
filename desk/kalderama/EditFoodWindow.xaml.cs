using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace kalderama
{
    public partial class EditFoodWindow : Window
    {
        private const string BaseUrl = "http://localhost:5369";
        private int _foodId;

        public EditFoodWindow(int foodId)
        {
            InitializeComponent();
            _foodId = foodId;
            LoadFoodData(); // Load food data when the window is opened
        }

        // Load food data using GET request
        private async void LoadFoodData()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var url = $"{BaseUrl}/admin/foods?foodId={_foodId}";
                    var response = await client.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonResponse = await response.Content.ReadAsStringAsync();
                        var food = JsonConvert.DeserializeObject<FoodItem>(jsonResponse); // ✅ Semicolon added

                        if (food != null) // ✅ Null check
                        {
                            txtTitle.Text = food.title;
                            txtPrice.Text = food.Price.ToString();
                            txtImageUrl.Text = food.image_url;

                            if (!string.IsNullOrEmpty(food.image_url))
                            {
                                foodImage.Source = new System.Windows.Media.Imaging.BitmapImage(new Uri(food.image_url));
                            }
                        }
                        else
                        {
                            MessageBox.Show("Failed to load food data.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading food data: {ex.Message}"); // ✅ Semicolon added
            }
        }

        private void Window_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton == MouseButtonState.Pressed)
            {
                this.DragMove(); // Enables window dragging
            }
        }

        private void CloseWindow_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }




        // Handle the Update button click
        private async void UpdateFood_Click(object sender, RoutedEventArgs e)
        {
            var title = txtTitle.Text;
            var price = decimal.TryParse(txtPrice.Text, out var parsedPrice) ? parsedPrice : 0;

            if (string.IsNullOrEmpty(title) || price <= 0)
            {
                MessageBox.Show("Please fill all the fields.");
                return;
            }

            var foodData = new
            {
                foodId = _foodId,
                title = title,
                price = price
            };

            using (var client = new HttpClient())
            {
                var url = $"{BaseUrl}/admin/foods/update";
                var content = new StringContent(JsonConvert.SerializeObject(foodData), Encoding.UTF8, "application/json");

                var response = await client.PutAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Food updated successfully.");
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Failed to update food.");
                }
            }
        }
    }

    // Renamed Food class to FoodItem to resolve ambiguity
    public class FoodItem
    {
        public int FoodId { get; set; }
        public string Category { get; set; }
        public string title { get; set; }
        public decimal Price { get; set; }
        public string StatusText => Status == 1 ? "ACTIVE" : "INACTIVE";
        public string StatusColor => Status == 1 ? "Green" : "Orange";

        // The property name should match the API response field
        public string image_url { get; set; } // This should be lowercase to match the API response

        public int Status { get; set; }
        public string ButtonActionText { get; set; }
        public string ButtonActionColor { get; set; }

        // Method to update UI properties (Button Text, Color)
        public void UpdateDynamicProperties()
        {
            ButtonActionText = Status == 1 ? "Delete" : "Restore";
            ButtonActionColor = Status == 1 ? "Red" : "Green";
        }
    }
}
