
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

# TC-25: Student Login - Empty Password
# Input: Valid Email + ""
# Fix: Check ID active element after click

try:
    print("TC-25: Starting Empty Password Test")
    driver.get("http://localhost:8080/auth/login")
    
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "login-button").click()

    time.sleep(2)
    
    if "login" in driver.current_url:
        print("TC-25 Check 1 PASSED: Still on login page.")
    else:
         raise Exception("Redirected unexpectedly!")

    active_elem = driver.switch_to.active_element
    if active_elem.get_attribute("id") == "password-input":
        print("TC-25 Check 2 PASSED: Focus moved to empty password input.")
    else:
        print(f"TC-25 WARNING: Focus is on {active_elem.tag_name}, expected password-input.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc25_student_empty_pass.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc25_student_empty_pass_error.png")
    print(f"TC-25 FAILED: {str(e)}")
finally:
    driver.quit()
