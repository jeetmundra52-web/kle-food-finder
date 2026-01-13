
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
    print("TC-15: Starting Invalid Vendor Login Test")

    driver.get("http://localhost:8080/vendor/login")
    
    # Enter valid email but wrong password
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Vendor Email']"))).send_keys("doughpaze@kletech.ac.in")
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys("WrongPass")
    
    driver.find_element(By.XPATH, "//button[contains(text(), 'Vendor Login')]").click()

    # Expect Error Toast
    error_msg = wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Invalid Credentials') or contains(text(), 'Login failed')]")))
    print(f"TC-15 PASSED: Error message displayed: '{error_msg.text}'")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc15_invalid_vendor_login.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc15_invalid_vendor_login_error.png")
    print(f"TC-15 FAILED: {str(e)}")
finally:
    driver.quit()
