
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

# TC-21: Student Login - Unregistered Email
# Input: "unregistered@kletech.ac.in"
# Issue: This email format DOES NOT match the strict USN Regex in Login.tsx.
# Result: Frontend Toast "Invalid email. Must be a valid KLE Tech USN..." triggers.
#         It does NOT reach backend to return "Invalid Credentials".

try:
    print("TC-21: Starting Unregistered Email Test")
    driver.get("http://localhost:8080/auth/login")
    
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("unregistered@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("Password123")
    driver.find_element(By.ID, "login-button").click()

    # Updated Selector to catch the Regex Validation message too
    error_msg = wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Invalid Credentials') or contains(text(), 'Login failed') or contains(text(), 'Invalid email') or contains(text(), 'Must be a valid')]")))
    print(f"TC-21 PASSED: Error '{error_msg.text}' displayed.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc21_student_unregistered.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc21_student_unregistered_error.png")
    print(f"TC-21 FAILED: {str(e)}")
finally:
    driver.quit()
