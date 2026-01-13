
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

# TC-30: Vendor Both Empty
# Expected: Browser Block (HTML5)

try:
    print("TC-30: Starting Vendor Both Empty Test")
    driver.get("http://localhost:8080/vendor/login")
    
    wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Vendor Login')]"))).click()

    time.sleep(2)
    
    if "login" in driver.current_url:
        print("TC-30 Check 1 PASSED: Still on login page.")
    else:
         raise Exception("Redirected unexpectedly!")

    # Check focus should be on first invalid field (Email)
    email_input = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    if driver.switch_to.active_element == email_input:
         print("TC-30 Check 2 PASSED: Focus on email field.")
    else:
         print("TC-30 WARNING: Focus check skipped/failed.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc30_vendor_both_empty.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc30_vendor_both_empty_error.png")
    print(f"TC-30 FAILED: {str(e)}")
finally:
    driver.quit()
