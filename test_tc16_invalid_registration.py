
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
    print("TC-16: Starting Invalid Registration Test")

    driver.get("http://localhost:8080/auth/register")
    
    # Fill form with invalid email (not @kletech.ac.in)
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Full Name']"))).send_keys("Test User")
    driver.find_element(By.XPATH, "//input[@placeholder='Email Address']").send_keys("testuser@gmail.com")
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys("password123")
    
    driver.find_element(By.XPATH, "//button[contains(text(), 'Sign Up')]").click()

    # Expect Error Toast for Invalid Email
    # Using visibility_of_element_located ensures the element is visible
    # We locate the element that specifically contains the text we want
    locator = (By.XPATH, "//*[contains(text(), 'Invalid email')]")
    error_msg = wait.until(EC.visibility_of_element_located(locator))
    
    # Retrieve text using both .text and textContent fallback
    msg_text = error_msg.text
    if not msg_text:
        msg_text = error_msg.get_attribute("textContent")
        
    print(f"TC-16 PASSED: Error message displayed: '{msg_text.strip()}'")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc16_invalid_registration.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc16_invalid_registration_error.png")
    print(f"TC-16 FAILED: {str(e)}")
finally:
    driver.quit()
