
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
    print("TC-19: Starting Multi-Vendor Cart Conflict Test")

    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("1234")
    driver.find_element(By.ID, "login-button").click()
    
    # Wait for outlet list
    wait.until(EC.url_contains("/student/outlets"))
    
    # Select FIRST outlet
    # All outlet cards are links with href starting with /student/outlets/
    outlets = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "a[href^='/student/outlets/']")))
    if len(outlets) < 2:
        raise Exception("Need at least 2 outlets for this test.")
        
    first_outlet = outlets[0]
    first_outlet.click()
    
    # Add item from First Outlet
    add_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "add-to-cart")))
    add_btn.click()
    print("Added item from first outlet.")
    
    # Short wait for toast or state update
    time.sleep(1)

    # Go back to Outlets List
    driver.get("http://localhost:8080/student/outlets")
    
    # Select SECOND outlet
    outlets = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "a[href^='/student/outlets/']")))
    second_outlet = outlets[1]
    second_outlet.click()
    print("Navigated to second outlet.")

    # Add item from Second Outlet
    add_btn_2 = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "add-to-cart")))
    add_btn_2.click()
    print("Clicked Add on second outlet.")

    # Expect Vendor Switch Dialog
    # Dialog title: "Switch Vendor?"
    
    dialog_title = wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Switch Vendor?')]")))
    print(f"TC-19 PASSED: Warning dialog displayed: '{dialog_title.text}'")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc19_multivendor_cart.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc19_multivendor_cart_error.png")
    print(f"TC-19 FAILED: {str(e)}")
finally:
    driver.quit()
