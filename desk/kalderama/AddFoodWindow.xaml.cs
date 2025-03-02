using Newtonsoft.Json;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Windows;
using Microsoft.Win32;
using System.Windows.Controls;

namespace kalderama
{
    public partial class AddFoodWindow : Window
    {
        private const string BaseUrl = "http://localhost:5369";
        private string _imageFilePath;

        public AddFoodWindow()
        {
            InitializeComponent();
        }

        // Open the file dialog to choose an image
        private void ChooseImage_Click(object sender, RoutedEventArgs e)
        {
            var openFileDialog = new OpenFileDialog
            {
                Filter = "Image Files|*.jpg;*.jpeg;*.png;*.gif;*.bmp"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                _imageFilePath = openFileDialog.FileName;
                txtImagePath.Text = _imageFilePath; // Display the selected file path
            }
        }

        // Handle the submission of the new food item
        private async void AddFood_Click(object sender, RoutedEventArgs e)
        {
            var title = txtTitle.Text;
            var price = decimal.TryParse(txtPrice.Text, out var parsedPrice) ? parsedPrice : 0;
            var category = cmbCategory.SelectedItem as ComboBoxItem;
            var categoryId = category != null ? GetCategoryId(category.Content.ToString()) : 1;

            if (string.IsNullOrEmpty(title) || price <= 0 || string.IsNullOrEmpty(_imageFilePath))
            {
                MessageBox.Show("Please fill all the fields and select an image.");
                return;
            }

            var foodData = new
            {
                categoryId = categoryId,
                title = title,
                price = price
            };

            using (var client = new HttpClient())
            {
                var url = $"{BaseUrl}/admin/foods/new";

                // Create multipart form data content
                var formData = new MultipartFormDataContent();

                // Add text fields
                formData.Add(new StringContent(foodData.title), "title");
                formData.Add(new StringContent(foodData.price.ToString()), "price");
                formData.Add(new StringContent(foodData.categoryId.ToString()), "categoryId");

                // Add the image file
                var imageContent = new StreamContent(File.OpenRead(_imageFilePath));
                imageContent.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg"); // or "image/png" depending on the image format
                formData.Add(imageContent, "image", Path.GetFileName(_imageFilePath)); // The name "image" is required by the API

                // Make the POST request
                var response = await client.PostAsync(url, formData);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Food added successfully.");
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Failed to add food.");
                }
            }
        }

        private void CloseWindow_Click(object sender, RoutedEventArgs e)
        {
            this.Close(); // Closes the window
        }

        // Helper method to map category name to categoryId
        private int GetCategoryId(string categoryName)
        {
            return categoryName switch
            {
                "Beverages" => 1,
                "Desserts" => 3,
                "Main Course" => 4,
                "Snacks" => 5,
                _ => 1
            };
        }
    }
}
