import requests

BASE_URL = "http://127.0.0.1:8000/api"

print("🚀 Testing Backend...\n")


# Test 2: Login
print("2️⃣ Login...")
r = requests.post(f"{BASE_URL}/auth/login/", json={
    "username": "farmer1",
    "password": "test1234"
})
token = r.json().get('tokens', {}).get('access')
print(f"   {r.status_code} - Token: {token[:20]}...\n")

headers = {"Authorization": f"Bearer {token}"}

# Test 3: Products
print("3️⃣ Get Products...")
r = requests.get(f"{BASE_URL}/products/")
print(f"   {r.status_code} - Found {len(r.json())} products\n")

# Test 4: Search
print("4️⃣ Search...")
r = requests.get(f"{BASE_URL}/products/?search=apple")
print(f"   {r.status_code} - Found {len(r.json())} results\n")

# Test 5: Add to Cart
print("5️⃣ Add to Cart...")
r = requests.post(f"{BASE_URL}/cart/add/", json={"product_id": 1, "quantity": 2}, headers=headers)
print(f"   {r.status_code} - {r.json().get('message', r.json())}\n")

# Test 6: Get Cart
print("6️⃣ Get Cart...")
r = requests.get(f"{BASE_URL}/cart/", headers=headers)
print(f"   {r.status_code} - Items: {r.json()['item_count']}, Total: ₹{r.json()['total']}\n")

print("✅ Backend tests complete!")