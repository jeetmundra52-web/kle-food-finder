
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
    print("TC-18: Starting Invalid Coupon Test")

    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("1234")
    driver.find_element(By.ID, "login-button").click()
    
    # Wait for dashboard
    outlet_card = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href^='/student/outlets/']")))
    outlet_card.click()

    # Add item to cart to ensure cart is not empty
    add_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "add-to-cart")))
    add_btn.click()
    print("Added item to cart.")

    # Go to Cart
    driver.get("http://localhost:8080/student/cart")
    
    # Look for Coupon Input 
    # In Cart.tsx, input is likely near "Apply Coupon" button.
    # We can search for placeholder or proximity to button
    
    # Using general input selector might be risky if there are multiple inputs (payment method?)
    # But usually coupon input is the only text input in cart unless address is there.
    # Let's target by placeholder if possible, or by looking for button sibling.
    
    # Check Cart.tsx code again (mental model):
    # <Input ... value={couponCode} ... />
    # <Button onClick={applyCoupon} ...>Apply</Button>
    
    apply_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Apply')]")))
    
    # Use XPath to find the input preceding the Apply button
    # Assuming Input is reasonably close in DOM
    coupon_input = driver.find_element(By.XPATH, "//button[contains(text(), 'Apply')]/preceding-sibling::input | //button[contains(text(), 'Apply')]/parent::div//input")
    
    coupon_input.clear()
    coupon_input.send_keys("INVALID123")
    apply_btn.click()
    
    # Expect Error Toast
    error_msg = wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Invalid coupon code')]")))
    print(f"TC-18 PASSED: Error message displayed: '{error_msg.text}'")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc18_invalid_coupon.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc18_invalid_coupon_error.png")
    print(f"TC-18 FAILED: {str(e)}")
finally:
    driver.quit()
