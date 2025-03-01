using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace kalderama
{
    public partial class DashBoard : Window
    {
        private readonly string _canteenId;

        public DashBoard(string canteenId)
        {
            InitializeComponent();
            _canteenId = canteenId;
            LoadDashboardPage(); // Load default summary page in MainFrame
        }

        private void LoadDashboardPage()
        {
            MainFrame.Content = new DashboardHome();  // Loads DashboardHome.xaml inside MainFrame
        }

        private void btndash_Click(object sender, RoutedEventArgs e)
        {
            LoadDashboardPage();  // Navigate back to the Dashboard Summary
        }

        private void btnOrders_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            MainFrame.Content = new Orders(); // Loads Orders Page inside Frame
        }


        private void btnFoods_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Content = new Foods(); // Load Foods Page in Frame
        }

        private void btnLogout_Click(object sender, RoutedEventArgs e)
        {
            //MessageBox.Show("Logging out...");
         // Close the Dashboard window (optional)
            LoginPage loginPage = new LoginPage();
            loginPage.Show(); // Show the Login Page
            this.Close();

        }


    }
}
