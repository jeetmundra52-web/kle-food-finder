
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

# TC-24: Student Login - Empty Email
# Input: ""
# Issue: HTML5 validation blocks submission (required).
# Fix: Check for blocking behavior.

try:
    print("TC-24: Starting Empty Email Test")
    driver.get("http://localhost:8080/auth/login")
    
    wait.until(EC.presence_of_element_located((By.ID, "password-input"))).send_keys("Password123")
    driver.find_element(By.ID, "login-button").click()

    time.sleep(2)
    
    # Check 1: URL should still be login
    if "login" in driver.current_url:
        print("TC-24 Check 1 PASSED: Still on login page.")
    else:
        raise Exception("Redirected unexpectedly!")
        
    # Check 2: Check active element (Browser focuses invalid input)
    active_elem = driver.switch_to.active_element
    if active_elem.get_attribute("id") == "email-input":
        print("TC-24 Check 2 PASSED: Focus moved to invalid email input.")
    else:
        print(f"TC-24 WARNING: Focus is on {active_elem.tag_name}, expected email-input.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc24_student_empty_email.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc24_student_empty_email_error.png")
    print(f"TC-24 FAILED: {str(e)}")
finally:
    driver.quit()
