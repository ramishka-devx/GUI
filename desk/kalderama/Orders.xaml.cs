using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using Newtonsoft.Json;

namespace kalderama
{
    public partial class Orders : Page
    {
        private const string BaseUrl = "http://localhost:5369";
        private List<Order> _allOrders = new List<Order>();

        public Orders()
        {
            InitializeComponent();
            dpSelectedDate.SelectedDate = DateTime.Today; // Set default date to today
            LoadOrdersData();
        }

        private async void LoadOrdersData(string searchQuery = "")
        {
            if (dpSelectedDate.SelectedDate == null) return;

            using (var client = new HttpClient())
            {
                // Convert the selected date to string format YYYY-MM-DD
                string selectedDate = dpSelectedDate.SelectedDate.Value.ToString("yyyy-MM-dd");

                // Build API URL
                string url = $"{BaseUrl}/admin/orders?selectedDate={selectedDate}&canteenId=1";

                // Check if there is a search query
                if (!string.IsNullOrWhiteSpace(txtSearch.Text))
                {
                    string searchQueryParam = txtSearch.Text.Trim();
                    url += $"&search={Uri.EscapeDataString(searchQueryParam)}";
                }

                // Call API using GET method
                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var orderResponse = JsonConvert.DeserializeObject<OrderResponse>(jsonResponse);

                    if (orderResponse.Success)
                    {
                        _allOrders = orderResponse.Data;

                        // ✅ Ensure all orders are updated with correct UI properties
                        foreach (var order in _allOrders)
                        {
                            order.UpdateDynamicProperties(); // Ensure the correct status is set
                        }

                        ordersGrid.ItemsSource = null; // Refresh DataGrid
                        ordersGrid.ItemsSource = _allOrders;
                    }
                }
                else
                {
                    System.Windows.MessageBox.Show("Failed to load orders.");
                }
            }
        }

        private async void UpdateOrderStatus_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is Order order)
            {
                int newStatus = order.OrderStatus == 1 ? 0 : 1; // Toggle status (1 -> 0 or 0 -> 1)

                using (var client = new HttpClient())
                {
                    string url = $"{BaseUrl}/admin/orders/update";

                    var requestBody = new
                    {
                        orderId = order.OrderId,
                        status = newStatus
                    };

                    var jsonRequest = JsonConvert.SerializeObject(requestBody);
                    var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                    var response = await client.PutAsync(url, content);

                    if (response.IsSuccessStatusCode)
                    {
                        // ✅ Update order status and refresh UI
                        order.OrderStatus = newStatus;
                        order.UpdateDynamicProperties();

                        ordersGrid.ItemsSource = null; // Force UI Refresh
                        ordersGrid.ItemsSource = _allOrders;
                    }
                    else
                    {
                        System.Windows.MessageBox.Show("Failed to update order status.");
                    }
                }
            }
        }

        private void DpSelectedDate_SelectedDateChanged(object sender, SelectionChangedEventArgs e)
        {
            txtSearch.Clear(); // Clear search when date is changed
            LoadOrdersData(); // Reload orders with new date
        }

        private void TxtSearch_TextChanged(object sender, TextChangedEventArgs e)
        {
            LoadOrdersData(); // Reload orders with search query
        }
    }

    public class OrderResponse
    {
        public bool Success { get; set; }
        public List<Order> Data { get; set; }
    }

    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName => $"{FirstName} {LastName}";

        public DateTime Date { get; set; }

        // Ensure TotalPrice is set correctly from API response
        public decimal TotalPrice { get; set; }

        // Correctly format the price with "LKR"
        public string TotalPriceFormatted => TotalPrice > 0 ? $"LKR {TotalPrice:F2}" : "LKR 0.00";

        // Format the Date to show properly
        public string FormattedDate => Date.ToLocalTime().ToString("yyyy-MM-dd hh:mm tt");

        public int OrderStatus { get; set; }
        public List<OrderItem> OrderItems { get; set; }

        public string OrderItemsSummary => string.Join(", ", OrderItems.ConvertAll(i => $"{i.FoodTitle}, {i.Quantity} x {i.Price}"));

        // Dynamic UI Properties
        public string ButtonText { get; private set; }
        public string ButtonColor { get; private set; }
        public string StatusText { get; private set; }

        public void UpdateDynamicProperties()
        {
            ButtonText = OrderStatus == 1 ? "Reset" : "Finish";
            ButtonColor = OrderStatus == 1 ? "Red" : "Green";
            StatusText = OrderStatus == 1 ? "Completed" : "Pending";
        }
    }

    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int FoodId { get; set; }
        public string FoodTitle { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
