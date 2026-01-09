# Corrected Selenium Scripts

I have updated the scripts to use the new credentials and the reliable IDs I added to the frontend.

**Credentials used:**
- **Email:** `01fe23bcs142@kletech.ac.in`
- **Password:** `123`

## 📄 test_tc04_navigation.py
```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
wait = WebDriverWait(driver, 15)

try:
    # LOGIN
    driver.get("http://localhost:8080/auth/login")

    wait.until(EC.visibility_of_element_located((By.ID, "email-input"))) \
        .send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("123")
    driver.find_element(By.ID, "login-button").click()

    # VERIFY REDIRECT TO OUTLETS
    wait.until(EC.url_contains("/student/outlets"))

    # VERIFY OUTLETS PAGE CONTENT
    outlets = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "outlet-card")))

    if not os.path.exists("screenshots"):
        os.makedirs("screenshots")

    driver.save_screenshot("screenshots/tc04_navigation.png")

    assert len(outlets) > 0
    print("TC-04 PASSED: Login navigation redirected to Outlets page")

except Exception as e:
    if not os.path.exists("screenshots"):
        os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc04_navigation_error.png")
    print("TC-04 FAILED:", e)

finally:
    driver.quit()
```

## 📄 test_tc05_view_outlets.py
```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
wait = WebDriverWait(driver, 15)

try:
    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("123")
    driver.find_element(By.ID, "login-button").click()

    # Wait for outlet cards to load
    outlets = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "outlet-card")))
    
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc05_view_outlets.png")
    assert len(outlets) > 0
    print("TC-05 PASSED: Food outlets displayed")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc05_view_outlets_error.png")
    print(f"TC-05 FAILED: {str(e)}")
finally:
    driver.quit()
```

## 📄 test_tc06_search_outlet.py
```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
wait = WebDriverWait(driver, 15)

try:
    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("123")
    driver.find_element(By.ID, "login-button").click()

    # Wait for search box using ID
    search_box = wait.until(EC.visibility_of_element_located((By.ID, "searchInput")))
    search_box.send_keys("Doughpaze") 
    
    # Wait for results to filter
    results = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "outlet-card")))
    
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc06_search_outlet.png")
    assert len(results) > 0
    print("TC-06 PASSED: Search outlet works")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc06_search_outlet_error.png")
    print(f"TC-06 FAILED: {str(e)}")
finally:
    driver.quit()
```

## 📄 test_tc07_view_menu.py
```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
wait = WebDriverWait(driver, 15)

try:
    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("123")
    driver.find_element(By.ID, "login-button").click()

    # Click first outlet card
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "outlet-card"))).click()
    
    # Wait for menu items
    menu_items = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "menu-item")))
    
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc07_view_menu.png")
    assert len(menu_items) > 0
    print("TC-07 PASSED: Menu displayed")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc07_view_menu_error.png")
    print(f"TC-07 FAILED: {str(e)}")
finally:
    driver.quit()
```

## 📄 test_tc08_add_to_cart.py
```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
wait = WebDriverWait(driver, 15)

try:
    # Login
    driver.get("http://localhost:8080/auth/login")
    wait.until(EC.presence_of_element_located((By.ID, "email-input"))).send_keys("01fe23bcs142@kletech.ac.in")
    driver.find_element(By.ID, "password-input").send_keys("123")
    driver.find_element(By.ID, "login-button").click()

    # Go to an outlet
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "outlet-card"))).click()
    
    # Click ADD on first menu item
    add_button = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "add-to-cart")))
    add_button.click()
    
    # Verify cartCount badge exists and is > 0
    cart_count_element = wait.until(EC.presence_of_element_located((By.ID, "cartCount")))
    
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc08_add_to_cart.png")
    
    assert int(cart_count_element.text) > 0
    print(f"TC-08 PASSED: Item added to cart. Count: {cart_count_element.text}")

except Exception as e:
    if not os.path.exists("screenshots"): os.makedirs("screenshots")
    driver.save_screenshot("screenshots/tc08_add_to_cart_error.png")
    print(f"TC-08 FAILED: {str(e)}")
finally:
    driver.quit()
```
