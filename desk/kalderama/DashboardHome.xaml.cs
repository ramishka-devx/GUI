using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Controls;
using Newtonsoft.Json;

namespace kalderama
{
    public partial class DashboardHome : Page
    {
        private const string BaseUrl = "http://localhost:5369";

        public DashboardHome()
        {
            InitializeComponent();
            LoadDashboardData();
        }

        private async void LoadDashboardData()
        {
            using (var client = new HttpClient())
            {
                var url = $"{BaseUrl}/admin/dashboard/orders?canteenId=1";
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var data = JsonConvert.DeserializeObject<DashboardResponse>(jsonResponse);

                    txtTotalOrders.Text = $"{data.TotalOrders}";
                    txtTotalRevenue.Text = $"LKR {data.TotalRevenue}";
                    txtPendingOrders.Text = $"{data.PendingOrders}";
                    txtCompletedOrders.Text = $"{data.CompletedOrders}";
                }
            }
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
