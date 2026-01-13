
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
    print("TC-20: Starting Vendor Add Item Validation Test")

    # Login
    driver.get("http://localhost:8080/vendor/login")
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Vendor Email']"))).send_keys("doughpaze@kletech.ac.in")
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys("Doughpaze@123")
    driver.find_element(By.XPATH, "//button[contains(text(), 'Vendor Login')]").click()

    wait.until(EC.url_contains("/vendor/dashboard"))
    
    # Click Menu Tab
    menu_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Menu']")))
    menu_tab.click()

    # Click Add Item
    add_item_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add Item')]")))
    add_item_btn.click()
    print("Opened Add Item Dialog.")

    # Try to submit without filling anything
    # Name, Price, Category are required
    
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Add']")))
    submit_btn.click()
    print("Clicked Submit empty form.")

    # Verification:
    # Since we are using HTML5 required attribute, the browser intercepts the submission.
    # The dialog should remain Open.
    # If submission succeeded (failure case), the dialog would close.
    
    # Check if dialog title "Add New Item" is still visible
    time.sleep(1) # Give it a moment to potentially close
    
    if len(driver.find_elements(By.XPATH, "//h2[contains(text(), 'Add New Item')]")) > 0:
        print("TC-20 PASSED: Form did not submit (Dialog still open).")
    else:
        raise Exception("Dialog closed! Validation failed.")

    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc20_vendor_validation.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc20_vendor_validation_error.png")
    print(f"TC-20 FAILED: {str(e)}")
finally:
    driver.quit()
