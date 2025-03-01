using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows;
using Newtonsoft.Json;

namespace kalderama
{
    public partial class DashBoard : Window
    {
        private readonly string _canteenId;
        private const string BaseUrl = "http://localhost:5369";

        public DashBoard(string canteenId)
        {
            InitializeComponent();
            _canteenId = canteenId;
        }

        private async void btnLoadGraph_Click(object sender, RoutedEventArgs e)
        {
            var orderData = await GetDailyOrdersAsync();
            if (orderData != null)
            {
                txtTotalOrders.Text = $"Total Orders: {orderData.TotalOrders}";
                txtTotalRevenue.Text = $"Total Revenue: {orderData.TotalRevenue}";
                // Call the graph API to display the graphs
                LoadRevenueGraph();
            }
            else
            {
                // Handle the null case, e.g., show an error message
                MessageBox.Show("Failed to load order data.");
            }
        }


        private async Task<DashboardResponse> GetDailyOrdersAsync()
        {
            using (var client = new HttpClient())
            {
                var url = $"{BaseUrl}/admin/dashboard/graph/dailyorders?canteenId={_canteenId}";
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<DashboardResponse>(jsonResponse);
                }
            }
            return null;
        }

        private void LoadRevenueGraph()
        {
            // Add graph rendering code here
        }
    }

    public class DashboardResponse
    {
        public int TotalOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public int PendingOrders { get; set; }
        public int CompletedOrders { get; set; }
    }
}
