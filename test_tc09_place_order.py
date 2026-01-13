
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
    print("TC-09: Starting Place Order Test")

    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("1234")
    driver.find_element(By.ID, "login-button").click()

    # Wait for dashboard and navigation to outlets
    wait.until(EC.url_contains("/student/outlets"))
    print("Logged in successfully.")

    # Select the first outlet/card
    # Using a generic selector that should match the outlet card link
    outlet_card = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href^='/student/outlets/']")))
    outlet_card.click()
    print("Navigated to outlet.")
    
    # Click ADD on first menu item
    # This class "add-to-cart" was verified in OutletDetails.tsx
    add_button = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "add-to-cart")))
    add_button.click()
    print("Item added to cart.")

    # Go to Cart
    driver.get("http://localhost:8080/student/cart")
    wait.until(EC.url_contains("/student/cart"))
    print("Navigated to cart.")
    
    # Click Place Order
    # The button text is "Place Order" or "Placing Order..."
    place_order_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Place Order')]")))
    place_order_btn.click()
    print("Clicked Place Order.")
    
    # Verify Success - Redirect to /student/orders
    wait.until(EC.url_contains("/student/orders"))
    
    # Optional: Verify "Order placed successfully!" toast if possible, but URL change is strong evidence
    
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc09_place_order.png")
    
    print("TC-09 PASSED: Order placed and redirected to Orders page.")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc09_place_order_error.png")
    print(f"TC-09 FAILED: {str(e)}")
finally:
    driver.quit()
