
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
    print("TC-10: Starting Vendor Login Test")

    # Login
    driver.get("http://localhost:8080/vendor/login")
    
    # Selectors based on placeholders since IDs are not explicit
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Vendor Email']"))).send_keys("doughpaze@kletech.ac.in")
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys("Doughpaze@123")
    
    # Button contains "Vendor Login"
    driver.find_element(By.XPATH, "//button[contains(text(), 'Vendor Login')]").click()

    # Wait for dashboard
    wait.until(EC.url_contains("/vendor/dashboard"))
    print("TC-10 PASSED: Logged in and redirected to Vendor Dashboard.")
    
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc10_vendor_login.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc10_vendor_login_error.png")
    print(f"TC-10 FAILED: {str(e)}")
finally:
    driver.quit()
