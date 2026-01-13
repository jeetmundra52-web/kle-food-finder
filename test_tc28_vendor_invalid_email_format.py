
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

# TC-28: Vendor Login - Invalid Email Format
# Input: "vendor@" (Invalid type="email")
# Expected: Browser Block (HTML5)

try:
    print("TC-28: Starting Vendor Invalid Format Test")
    driver.get("http://localhost:8080/vendor/login")
    
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Vendor Email']"))).send_keys("vendor@")
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys("Pass123")
    driver.find_element(By.XPATH, "//button[contains(text(), 'Vendor Login')]").click()

    time.sleep(2)
    
    if "login" in driver.current_url:
        print("TC-28 Check 1 PASSED: Still on login page.")
    else:
        raise Exception("Redirected unexpectedly!")

    # Check validity
    # Select by placeholder since ID might typically be missing or dynamic in some implementations, but let's try finding the input element directly.
    email_input = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    is_valid = driver.execute_script("return arguments[0].checkValidity();", email_input)
    
    if not is_valid:
        print("TC-28 Check 2 PASSED: Browser blocked submission.")
    else:
        print("TC-28 WARNING: Browser considers input valid?")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc28_vendor_invalid_format.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc28_vendor_invalid_format_error.png")
    print(f"TC-28 FAILED: {str(e)}")
finally:
    driver.quit()
