import requests

def clear_memory(url):
    response = requests.post(url, json={"unload_models": True, "free_memory": True})
    if response.status_code == 200:
        print("Memory cleared successfully.")
    else:
        print(f"Failed to clear memory. Status code: {response.status_code}, Response: {response.text}")

# Replace with your ComfyUI API URL
if __name__ == '__main__':
    clear_memory("http://http://127.0.0.1:8188/api/free")