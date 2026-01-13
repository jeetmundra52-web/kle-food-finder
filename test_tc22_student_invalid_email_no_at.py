
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

# TC-22: Student Login - Invalid Email (No '@')
# Input: "invalidemail"
# Issue: <input type="email"> triggers HTML5 browser validation popup.
# Result: Form submission is BLOCKED. React `handleSubmit` is NEVER called. NO Toast appears.
# Fix: Verify we stay on the same page and no toast appears (or just check URL).

try:
    print("TC-22: Starting Invalid Email (No @) Test")
    driver.get("http://localhost:8080/auth/login")
    
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("invalidemail")
    driver.find_element(By.ID, "password-input").send_keys("Password123")
    login_btn = driver.find_element(By.ID, "login-button")
    login_btn.click()

    # Wait a bit to ensure no redirection happens
    time.sleep(2)
    
    # Check 1: URL should still be login
    if "login" in driver.current_url:
        print("TC-22 Check 1 PASSED: Still on login page.")
    else:
        raise Exception("Redirected unexpectedly!")
        
    # Check 2: Check for validity using JS (HTML5 API)
    email_input = driver.find_element(By.ID, "email-input")
    is_valid = driver.execute_script("return arguments[0].checkValidity();", email_input)
    
    if not is_valid:
        msg = driver.execute_script("return arguments[0].validationMessage;", email_input)
        print(f"TC-22 PASSED: Browser blocked submission. Validation message: '{msg}'")
    else:
        # If valid, then maybe browser didn't catch it? But it should.
        print("TC-22 WARNING: Browser considers input valid? This is unexpected for 'invalidemail' with type='email'.")
        
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc22_student_no_at.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc22_student_no_at_error.png")
    print(f"TC-22 FAILED: {str(e)}")
finally:
    driver.quit()
