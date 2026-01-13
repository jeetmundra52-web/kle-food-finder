
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
    print("TC-11: Starting Vendor Add Menu Item Test")

    # Login
    driver.get("http://localhost:8080/vendor/login")
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Vendor Email']"))).send_keys("doughpaze@kletech.ac.in")
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys("Doughpaze@123")
    driver.find_element(By.XPATH, "//button[contains(text(), 'Vendor Login')]").click()

    # Wait for dashboard
    wait.until(EC.url_contains("/vendor/dashboard"))
    print("Logged in.")

    # Click Menu Tab
    menu_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Menu']")))
    menu_tab.click()
    print("Switched to Menu tab.")

    # Click Add Item
    add_item_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add Item')]")))
    add_item_btn.click()
    print("Clicked Add Item.")

    # Fill Form
    # The dialog labels are Name, Price (₹), Category, Description
    # We can target inputs by following labels or proximity
    
    # Name
    wait.until(EC.presence_of_element_located((By.XPATH, "//label[text()='Name']/following-sibling::input"))).send_keys("Selenium Test Burger")
    
    # Price
    driver.find_element(By.XPATH, "//label[contains(text(), 'Price')]/following-sibling::input").send_keys("99")
    
    # Category
    driver.find_element(By.XPATH, "//label[text()='Category']/following-sibling::input").send_keys("Test")
    
    # Description
    driver.find_element(By.XPATH, "//label[text()='Description']/following-sibling::input").send_keys("Automated test item")

    # Submit
    submit_btn = driver.find_element(By.XPATH, "//button[text()='Add']")
    submit_btn.click()
    print("Submitted new item.")

    # Verify Item Exists
    # We look for the item name in the menu grid
    item_locator = (By.XPATH, "//h3[text()='Selenium Test Burger']")
    wait.until(EC.presence_of_element_located(item_locator))
    print("TC-11 PASSED: Item added and visible in menu.")
    
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc11_add_menu.png")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc11_add_menu_error.png")
    print(f"TC-11 FAILED: {str(e)}")
finally:
    driver.quit()
