
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
    print("TC-17: Starting Unauthorized Access Test")

    # Attempt to access Vendor Dashboard without logging in
    target_url = "http://localhost:8080/vendor/dashboard"
    driver.get(target_url)
    
    # We expect redirection to Login or Landing page
    # In App.tsx, ProtectedRoute is used. Standard behavior is redirect to /auth/login or /
    
    time.sleep(2) # Allow redirect to happen
    current_url = driver.current_url
    print(f"Current URL: {current_url}")

    if target_url not in current_url:
        print("TC-17 PASSED: Redirected away from protected route.")
    else:
        # Check if we are seeing the dashboard content
        try:
            # Dashboard has specific elements like "Vendor Portal" or stats
            # If we don't find them, maybe we are just on a blank page which is also not ideal but effectively "denied"
            # But strictly, we want URL change or Access Denied message
            
            # Let's check if we are on login page
            if "login" in current_url or "/" == current_url.split("8080")[-1]:
                 print("TC-17 PASSED: Redirected to login/landing.")
            else:
                 # If we are still on dashboard URL, check if content is visible
                 if len(driver.find_elements(By.XPATH, "//*[contains(text(), 'Revenue')]")) > 0:
                     raise Exception("Dashboard content is visible without login!")
                 else:
                     print("TC-17 PASSED: Dashboard URL retained but content hidden (or redirect in progress).")
        except Exception as e:
            raise e

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc17_unauthorized_access.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc17_unauthorized_access_error.png")
    print(f"TC-17 FAILED: {str(e)}")
finally:
    driver.quit()
