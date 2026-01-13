
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

# TC-23: Student Login - Invalid Email (No Domain)
# Input: "user@"
# Issue: HTML5 validation blocks submission.
# Fix: Check for blocking behavior.

try:
    print("TC-23: Starting Invalid Email (No Domain) Test")
    driver.get("http://localhost:8080/auth/login")
    
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("user@")
    driver.find_element(By.ID, "password-input").send_keys("Password123")
    driver.find_element(By.ID, "login-button").click()

    time.sleep(2)
    
    # Check 1: URL should still be login
    if "login" in driver.current_url:
        print("TC-23 Check 1 PASSED: Still on login page.")
    else:
        raise Exception("Redirected unexpectedly!")
        
    # Check 2: Validity
    email_input = driver.find_element(By.ID, "email-input")
    is_valid = driver.execute_script("return arguments[0].checkValidity();", email_input)
    
    if not is_valid:
        print("TC-23 Check 2 PASSED: Browser blocked submission.")
    else:
        print("TC-23 WARNING: Browser considers input valid? Unexpected.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc23_student_no_domain.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc23_student_no_domain_error.png")
    print(f"TC-23 FAILED: {str(e)}")
finally:
    driver.quit()
