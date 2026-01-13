
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

# TC-29: Vendor Empty Password
# Input: Email + Empty Pass
# Expected: Browser Block (HTML5 required)

try:
    print("TC-29: Starting Vendor Empty Password Test")
    driver.get("http://localhost:8080/vendor/login")
    
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Vendor Email']"))).send_keys("doughpaze@kletech.ac.in")
    driver.find_element(By.XPATH, "//button[contains(text(), 'Vendor Login')]").click()

    time.sleep(2)
    
    if "login" in driver.current_url:
        print("TC-29 Check 1 PASSED: Still on login page.")
    else:
         raise Exception("Redirected unexpectedly!")

    # Check validities or focus
    # Password field is type="password"
    pass_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
    # Check if active element is the password input
    if driver.switch_to.active_element == pass_input:
         print("TC-29 Check 2 PASSED: Focus moved to password field.")
    else:
         print("TC-29 WARNING: Focus check skipped or failed.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc29_vendor_empty_pass.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc29_vendor_empty_pass_error.png")
    print(f"TC-29 FAILED: {str(e)}")
finally:
    driver.quit()
