
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

# TC-26: Student Both Empty
# Fix: Check focus

try:
    print("TC-26: Starting Both Fields Empty Test")
    driver.get("http://localhost:8080/auth/login")
    
    wait.until(EC.presence_of_element_located((By.ID, "login-button"))).click()
    
    time.sleep(2)
    
    if "login" in driver.current_url:
         print("TC-26 Check 1 PASSED: Stayed on Login page.")
    else:
         raise Exception("Form submitted with empty fields!")

    active_elem = driver.switch_to.active_element
    # Should focus first invalid element (email)
    if active_elem.get_attribute("id") == "email-input":
        print("TC-26 Check 2 PASSED: Focus on email input.")
    else:
        print(f"TC-26 WARNING: Focus on {active_elem.tag_name}")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc26_student_both_empty.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc26_student_both_empty_error.png")
    print(f"TC-26 FAILED: {str(e)}")
finally:
    driver.quit()
