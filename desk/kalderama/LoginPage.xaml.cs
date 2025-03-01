using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Newtonsoft.Json;

namespace kalderama
{
    public partial class LoginPage : Window
    {
        private const string BaseUrl = "http://localhost:5369";
        private string CanteenId = "";
        private string Name = "";

        public LoginPage()
        {
            InitializeComponent();
        }

        private async void BtnLogin_Click(object sender, RoutedEventArgs e)
        {
            var identifier = txtIdentifier.Text;
            var password = txtPassword.Password;

            var loginResponse = await LoginAsync(identifier, password);
            if (loginResponse != null && loginResponse.Message == "Login successful")
            {
                // Store canteenId for future requests
                CanteenId = loginResponse.CanteenId.ToString();
                Name = loginResponse.Name.ToString();
                //MessageBox.Show("Login Successful");
                // Proceed to the Dashboard
                var dashboard = new DashBoard(CanteenId, Name);
                dashboard.Show();
                this.Close();
            }
            else
            {
                MessageBox.Show("Login Failed");
            }
        }

        private async Task<LoginResponse> LoginAsync(string identifier, string password)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var url = $"{BaseUrl}/auth/login";
                    var data = new { identifier = identifier, password = password };
                    var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

                    // Make the POST request
                    var response = await client.PostAsync(url, content);

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonResponse = await response.Content.ReadAsStringAsync();
                        try
                        {
                            // Attempt to deserialize the response
                            return JsonConvert.DeserializeObject<LoginResponse>(jsonResponse);
                        }
                        catch (JsonException ex)
                        {
                            // Log or handle JSON deserialization errors
                            System.Windows.MessageBox.Show($"Error parsing response: {ex.Message}");
                            return null;
                        }
                    }
                    else
                    {
                        // Handle non-successful HTTP responses
                        var errorMessage = await response.Content.ReadAsStringAsync();
                        System.Windows.MessageBox.Show($"Login failed: {response.StatusCode} - {errorMessage}");
                    }
                }
            }
            catch (HttpRequestException ex)
            {
                // Handle network-related errors (e.g., no internet connection)
                System.Windows.MessageBox.Show($"Network error: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Catch any other unhandled errors
                System.Windows.MessageBox.Show($"Unexpected error: {ex.Message}");
            }

            return null; // Return null in case of failure
        }

    }

    public class LoginResponse
    {
        public string Message { get; set; }
        public string Type { get; set; }
        public int CanteenId { get; set; }
        public string Name { get; set; }
        public string Token { get; set; }
    }
}
