
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

# TC-27: Vendor Login - Unregistered Email
# Input: Valid format email "unregistered@kletech.ac.in"
# Expected: Backend 401/404 -> Toast "Invalid Credentials"

try:
    print("TC-27: Starting Vendor Unregistered Email Test")
    driver.get("http://localhost:8080/vendor/login")
    
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Vendor Email']"))).send_keys("unregistered@kletech.ac.in")
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys("RandomPass")
    driver.find_element(By.XPATH, "//button[contains(text(), 'Vendor Login')]").click()

    # Look for "Login failed" (generic) or "Invalid Credentials" or "Not a vendor account"
    # The VendorLogin.tsx code shows: toast.error(data.msg || "Login failed")
    error_msg = wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Invalid Credentials') or contains(text(), 'Login failed') or contains(text(), 'Not a vendor')]")))
    print(f"TC-27 PASSED: Error '{error_msg.text}' displayed.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc27_vendor_unregistered.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc27_vendor_unregistered_error.png")
    print(f"TC-27 FAILED: {str(e)}")
finally:
    driver.quit()
