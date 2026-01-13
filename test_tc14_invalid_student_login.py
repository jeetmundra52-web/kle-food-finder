
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
    print("TC-14: Starting Invalid Student Login Test")

    driver.get("http://localhost:8080/auth/login")
    
    # Enter valid email but wrong password
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("WrongPassword123")
    driver.find_element(By.ID, "login-button").click()

    # Expect Error Toast
    # Toast usually appears in a div with role='status' or class containing 'toast'
    # Sonner toasts roughly look like: <li data-sonner-toast="">...</li>
    # We'll look for text "Invalid Credentials" or "Login failed"
    
    error_msg = wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Invalid Credentials') or contains(text(), 'Login failed')]")))
    print(f"TC-14 PASSED: Error message displayed: '{error_msg.text}'")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc14_invalid_student_login.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc14_invalid_student_login_error.png")
    print(f"TC-14 FAILED: {str(e)}")
finally:
    driver.quit()
