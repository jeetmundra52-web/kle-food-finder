
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
wait = WebDriverWait(driver, 20) # Increased wait time

try:
    print("TC-12: Starting Student My Orders Test (Revised)")

    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("1234")
    driver.find_element(By.ID, "login-button").click()

    # Wait for dashboard
    wait.until(EC.url_contains("/student/outlets"))
    print("Logged in.")

    # Navigate to My Orders
    driver.get("http://localhost:8080/student/orders")
    print("Navigated to My Orders URL.")
    
    # Wait for loading text to disappear (if it appears)
    try:
        wait.until(EC.invisibility_of_element_located((By.XPATH, "//*[contains(text(), 'Loading your orders')]")))
        print("Loading finished.")
    except:
        print("Loading indicator not seen or persisted too long (ignored).")

    # Wait for Header
    wait.until(EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'My Orders')]")))
    print("Header 'My Orders' found.")

    # Verify content
    # Look for either "No orders found" or an order card
    # Order card wrapper has class "border border-gray-100" (from MyOrders.tsx) or we can look for "Grand Total"
    
    try:
        # Wait for either no orders message OR an order card content
        wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Grand Total') or contains(text(), 'No orders found')]")))
        print("TC-12 PASSED: Orders page loaded successfully with content.")
    except Exception as e:
        print("Page loaded but content check failed/timed out.")
        raise e

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc12_my_orders_fixed.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc12_my_orders_error.png")
    print(f"TC-12 FAILED: {str(e)}")
finally:
    driver.quit()
