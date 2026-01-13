
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
wait = WebDriverWait(driver, 15)

try:
    print("TC-13: Starting Logout Test")

    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("1234")
    driver.find_element(By.ID, "login-button").click()

    # Wait for dashboard
    wait.until(EC.url_contains("/student/outlets"))
    print("Logged in.")

    # Click Logout
    # Logout button has "Logout" text and class "text-red-500"
    logout_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Logout')]")))
    logout_btn.click()
    print("Clicked Logout.")

    # Verify Redirect to Landing Page (/)
    # Landing page usually has "Start Ordering" or "Vendor Login"
    wait.until(EC.url_matches("http://localhost:8080/$")) # Matches exactly root
    
    # Double check by looking for "Start Ordering" link/button
    wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Start Ordering')]")))
    
    print("TC-13 PASSED: Logged out and returned to Landing page.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc13_logout.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc13_logout_error.png")
    print(f"TC-13 FAILED: {str(e)}")
finally:
    driver.quit()
